"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const email_service_1 = require("../email/email.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let StripeService = class StripeService {
    constructor(stripe, emailService, prisma) {
        this.stripe = stripe;
        this.emailService = emailService;
        this.prisma = prisma;
    }
    async createCheckoutSession(amount, currency, email) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                throw new Error('User not found');
            }
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency,
                            product_data: {
                                name: 'Donación a Huellas Unidas',
                            },
                            unit_amount: amount,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                customer_email: email,
                success_url: process.env.STRIPE_SUCCESS_URL,
                cancel_url: process.env.STRIPE_CANCEL_URL,
            });
            await this.emailService.sendMailWithTemplate(email, 'Donación en proceso', { email, amount: amount / 100 }, 'donationCreation');
            return session;
        }
        catch (error) {
            throw new Error('Stripe error');
        }
    }
    async verifyWebhoock(payload, signature) {
        const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET;
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(payload, signature, endPointSecret);
        }
        catch (error) {
            console.error(error);
            throw new Error('Error to verify webhook');
        }
        await this.processEvent(event);
        return event;
    }
    async processEvent(event) {
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                const existingDonation = await this.prisma.donations.findFirst({
                    where: { paymentIntent: session.payment_intent },
                });
                if (existingDonation) {
                    console.log(`El pago con intent ${session.payment_intent} ya fue procesado.`);
                    return;
                }
                const user = await this.prisma.user.findUnique({
                    where: { email: session.customer_email },
                });
                if (!user) {
                    console.error('User not found');
                    return;
                }
                await this.prisma.donations.create({
                    data: {
                        amount: session.amount_total / 100,
                        email: session.customer_email,
                        userId: user.id,
                        paymentIntent: session.payment_intent,
                    },
                });
                await this.emailService.sendMailWithTemplate(session.customer_email, 'Pago de donación exitoso', { amount: session.amount_total / 100 }, 'donationSuccess');
                break;
            case 'payment_intent.payment_failed':
                console.error('PaymentIntent was not successful');
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('STRIPE')),
    __metadata("design:paramtypes", [stripe_1.default,
        email_service_1.EmailService,
        prisma_service_1.PrismaService])
], StripeService);
//# sourceMappingURL=stripe.service.js.map