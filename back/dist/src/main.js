"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pg_1 = require("pg");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use('/stripe/webhook', bodyParser.raw({ type: 'application/json' }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Huellas Unidas')
        .setDescription('API DEL PROYECTO FINAL')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'Proyecto Huellas Unidas',
    });
    const pool = new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
    });
    pool.connect()
        .then(() => console.log('✅ Conexión exitosa a la base de datos'))
        .catch((error) => console.error('❌ Error al conectar a la base de datos:', error));
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'https://huellasunidas.netlify.app',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Authorization, Content-Type',
        credentials: true,
    });
    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    });
    const PORT = parseInt(process.env.PORT) || 4000;
    await app.listen(PORT);
    console.log(`🚀 Backend corriendo en http://localhost:${PORT}/`);
}
bootstrap();
//# sourceMappingURL=main.js.map