import { StripeService } from './stripe.service';
import { CreateCheckoutSessionDto } from './dto/create.checkoutSession.dto';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createCheckoutSession(body: CreateCheckoutSessionDto): Promise<{
        checkoutUrl: string;
    }>;
    success(): {
        message: string;
    };
    cancel(): {
        message: string;
    };
    handleWebhoook(signature: string, req: Request): Promise<{
        received: boolean;
    }>;
}
