import { v2 as cloudinary } from 'cloudinary';
export declare const CloudinaryConfig: {
    provide: string;
    useFactory: () => import("cloudinary").ConfigOptions;
};
export { cloudinary };
