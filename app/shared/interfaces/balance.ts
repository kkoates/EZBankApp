export interface Balance {
	amount: number;
}

export interface BalanceResponse {
	balance: Balance;
	ok: boolean;
	message: string;
}