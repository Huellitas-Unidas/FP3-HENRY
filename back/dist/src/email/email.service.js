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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const sendgrid = require("@sendgrid/mail");
const dotenv = require("dotenv");
const templates_1 = require("../templates/templates");
dotenv.config();
let EmailService = class EmailService {
    constructor() {
        sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    }
    async sendMail(to, subject, text) {
        const msg = {
            to,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject,
            text,
        };
        try {
            await sendgrid.send(msg);
        }
        catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    }
    async sendMailWithTemplate(to, subject, data, templateType) {
        let template = '';
        if (templateType === 'donationCreation') {
            template = templates_1.templates.donationCreation;
        }
        else if (templateType === 'donationSuccess') {
            template = templates_1.templates.donationSuccess;
        }
        else if (templateType === 'register') {
            template = templates_1.templates.register;
        }
        else if (templateType === 'postCreation') {
            template = templates_1.templates.postCreation;
        }
        else if (templateType === 'petCreation') {
            template = templates_1.templates.petCreation;
        }
        else if (templateType === 'pqrCreation') {
            template = templates_1.templates.pqrCreation;
        }
        const html = this.replacePlaceholders(template, data);
        const msg = {
            to,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject,
            html,
        };
        try {
            await sendgrid.send(msg);
        }
        catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    }
    replacePlaceholders(template, data) {
        let result = template;
        for (const key in data) {
            const placeholder = `{{${key}}}`;
            result = result.replace(new RegExp(placeholder, 'g'), data[key]);
        }
        return result;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map