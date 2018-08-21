export class PaymentRequest {
	amount: number;
	deviceId: string;
	locationLat: string;
    locationLng: string;
    constructor() { 
    }
}

export interface Payment {
	amount: number;
	deviceId: string;
	locationLat: string;
	locationLng: string;
}

export interface PaymentResponse {
	payment: Payment;
	ok: boolean;
	message: string;
}