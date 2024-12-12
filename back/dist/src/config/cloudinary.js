"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = exports.CloudinaryConfig = void 0;
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
exports.CloudinaryConfig = {
    provide: 'CLOUDINARY',
    useFactory: () => cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_APY_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    }),
};
//# sourceMappingURL=cloudinary.js.map