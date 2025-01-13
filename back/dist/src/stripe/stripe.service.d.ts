import Stripe from 'stripe';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'prisma/prisma.service';
export declare class StripeService {
    private readonly stripe;
    private readonly emailService;
    private prisma;
    constructor(stripe: Stripe, emailService: EmailService, prisma: PrismaService);
    createCheckoutSession(amount: number, currency: string, email: string): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    verifyWebhoock(payload: Buffer, signature: string): Promise<Stripe.Event>;
    processEvent(event: Stripe.Event): Promise<void>;
}
