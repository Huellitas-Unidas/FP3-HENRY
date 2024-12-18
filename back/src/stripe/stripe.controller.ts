import { Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import Stripe from 'stripe';

@Controller('stripe')
export class StripeController {
    constructor (@Inject('STRIPE_CLIENT')private readonly stripeClient: Stripe){}
    @Post('webhook')
    async handle (@Req() req:Request, @Res() res: Response){
        const sig = req.headers['stripe-signature'];
        // const rawBody = req.rawBody;

        let event: Stripe.Event;
        try {
            event = this.stripeClient.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            return res.status(400).send({
                message: `Webhook Error: ${err}`})
        }
    }
}
