"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotService = void 0;
const common_1 = require("@nestjs/common");
let ChatbotService = class ChatbotService {
    constructor() {
        this.responses = {
            'cómo puedo buscar una mascota perdida': 'Puedes buscar mascotas usando filtros por raza, color, tamaño o ubicación en nuestra plataforma.',
            'qué debo hacer si encuentro una mascota perdida': 'Si encuentras una mascota perdida, puedes reportarla en nuestra plataforma llenando un formulario con los detalles y, si es posible, subiendo una foto.',
            'dónde puedo reportar haber visto una mascota': "Dirígete a la sección 'Reportar mascota vista' en nuestra plataforma para registrar los detalles.",
            'puedo filtrar las mascotas por raza, color o tamaño': 'Sí, puedes aplicar filtros por raza, color, tamaño y más en la sección de búsqueda.',
            'cómo puedo buscar en una ubicación específica': 'En la sección de búsqueda, puedes ingresar una ciudad o código postal para encontrar mascotas en esa área.',
            'cómo puedo reportar mi mascota perdida': "Dirígete a la sección 'Reportar mascota perdida' y completa el formulario con la información y una foto de tu mascota.",
            'qué información necesito para reportar mi mascota': 'Necesitarás proporcionar el nombre, raza, color, tamaño, ubicación, una foto y la fecha en la que se perdió.',
            'puedo subir una foto de mi mascota perdida': 'Sí, puedes subir una foto de tu mascota para ayudar a identificarla fácilmente.',
            'dónde se publicará la información de mi mascota': "La información de tu mascota perdida se publicará en la sección de 'Mascotas perdidas' visible para todos los usuarios.",
            'cómo funciona esta plataforma': 'Esta plataforma te permite buscar y reportar mascotas perdidas, y conectar a las personas que encuentran mascotas con sus dueños.',
            'es gratuita': 'Sí, esta plataforma es completamente gratuita.',
            'cómo puedo actualizar mi cuenta o reporte': "Puedes actualizar tu cuenta o reporte desde la sección 'Mi cuenta' o 'Mis publicaciones' en tu perfil.",
        };
    }
    getResponse(question) {
        const normalizedQuestion = question.toLowerCase();
        const answer = this.responses[normalizedQuestion] ||
            'Lo siento, no entiendo esa pregunta. ¿Puedes intentarlo de otra forma?';
        return { question, answer };
    }
    getAllQuestions() {
        return Object.keys(this.responses);
    }
};
exports.ChatbotService = ChatbotService;
exports.ChatbotService = ChatbotService = __decorate([
    (0, common_1.Injectable)()
], ChatbotService);
//# sourceMappingURL=chatbot.service.js.map