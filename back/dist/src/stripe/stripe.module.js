"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeModule = void 0;
const common_1 = require("@nestjs/common");
const stripe_service_1 = require("./stripe.service");
const stripe_controller_1 = require("./stripe.controller");
const config_1 = require("@nestjs/config");
const email_module_1 = require("../email/email.module");
const prisma_service_1 = require("../../prisma/prisma.service");
const user_module_1 = require("../user/user.module");
const donation_module_1 = require("../donation/donation.module");
let StripeModule = class StripeModule {
};
exports.StripeModule = StripeModule;
exports.StripeModule = StripeModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, email_module_1.EmailModule, user_module_1.UserModule, donation_module_1.DonationModule],
        providers: [stripe_service_1.StripeService,
            {
                provide: "STRIPE",
                useValue: new (require('stripe'))(process.env.STRIPE_API_KEY, { apiVersion: '2024-12-18.acacia', timeout: 10000 }),
            }, prisma_service_1.PrismaService
        ],
        controllers: [stripe_controller_1.StripeController],
        exports: [stripe_service_1.StripeService],
    })
], StripeModule);
//# sourceMappingURL=stripe.module.js.map