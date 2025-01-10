"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PqrModule = void 0;
const common_1 = require("@nestjs/common");
const pqr_service_1 = require("./pqr.service");
const pqr_controller_1 = require("./pqr.controller");
const prisma_service_1 = require("../../prisma/prisma.service");
const email_module_1 = require("../email/email.module");
const roles_guard_1 = require("../common/roles.guard");
const auth_module_1 = require("../auth/auth.module");
let PqrModule = class PqrModule {
};
exports.PqrModule = PqrModule;
exports.PqrModule = PqrModule = __decorate([
    (0, common_1.Module)({
        imports: [email_module_1.EmailModule, auth_module_1.AuthModule],
        controllers: [pqr_controller_1.PqrController],
        providers: [pqr_service_1.PqrService, prisma_service_1.PrismaService, roles_guard_1.RolesGuard],
    })
], PqrModule);
//# sourceMappingURL=pqr.module.js.map