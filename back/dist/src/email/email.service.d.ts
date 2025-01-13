export declare class EmailService {
    constructor();
    sendMail(to: string, subject: string, text: string): Promise<void>;
    sendMailWithTemplate(to: string, subject: string, data: Record<string, any>, templateType: string): Promise<void>;
    private replacePlaceholders;
}
