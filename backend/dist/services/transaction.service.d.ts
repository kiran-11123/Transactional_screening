interface Transaction {
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: string;
    country_destination: string;
    idempotent_key: string;
}
export declare function transaction_service({ sender_customer_id, receiver_customer_id, amount, country_origin, country_destination, idempotent_key }: Transaction): Promise<string>;
export {};
//# sourceMappingURL=transaction.service.d.ts.map