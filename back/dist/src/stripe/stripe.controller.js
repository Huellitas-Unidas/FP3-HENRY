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
exports.StripeController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const stripe_service_1 = require("./stripe.service");
const create_checkoutSession_dto_1 = require("./dto/create.checkoutSession.dto");
let StripeController = class StripeController {
    constructor(stripeService) {
        this.stripeService = stripeService;
    }
    async createCheckoutSession(body) {
        try {
            const { amount, currency, email } = body;
            const session = await this.stripeService.createCheckoutSession(amount, currency, email);
            return { checkoutUrl: session.url };
        }
        catch (error) {
            throw new common_1.HttpException('Error al crear la session, puede que el correo no esté registrado', 400);
        }
    }
    success() {
        return {
            message: 'Pago realizado exitosamente. Gracias por tu donación.',
        };
    }
    cancel() {
        return {
            message: 'El pago fue cancelado. Vuelve a intentarlo.',
        };
    }
    async handleWebhoook(signature, req) {
        const payload = Buffer.from(req.body);
        try {
            const event = await this.stripeService.verifyWebhoock(payload, signature);
            await this.stripeService.processEvent(event);
            return { received: true };
        }
        catch (err) {
            throw new common_1.HttpException(`Error ${err}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.StripeController = StripeController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UsePipes)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_checkoutSession_dto_1.CreateCheckoutSessionDto]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createCheckoutSession", null);
__decorate([
    (0, common_1.Get)('success'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StripeController.prototype, "success", null);
__decorate([
    (0, common_1.Get)('cancel'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StripeController.prototype, "cancel", null);
__decorate([
    (0, common_1.Post)('webhook'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Headers)('stripe-signature')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "handleWebhoook", null);
exports.StripeController = StripeController = __decorate([
    (0, common_1.Controller)('stripe'),
    __metadata("design:paramtypes", [stripe_service_1.StripeService])
], StripeController);
//# sourceMappingURL=stripe.controller.js.map