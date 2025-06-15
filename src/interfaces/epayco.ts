export interface TransactionData {
    success: boolean;
    title_response: string;
    text_response: string;
    last_action: string;
    data: {
        x_cust_id_cliente: number;
        x_ref_payco: number;
        x_id_factura: string;
        x_id_invoice: string;
        x_description: string;
        x_amount: number;
        x_amount_country: number;
        x_amount_ok: number;
        x_tax: number;
        x_tax_ico: number;
        x_amount_base: number;
        x_currency_code: string;
        x_bank_name: string;
        x_cardnumber: string;
        x_quotas: string;
        x_respuesta: string;
        x_response: string;
        x_approval_code: string;
        x_transaction_id: string;
        x_fecha_transaccion: string;
        x_transaction_date: string;
        x_cod_respuesta: number;
        x_cod_response: number;
        x_response_reason_text: string;
        x_cod_transaction_state: number;
        x_transaction_state: string;
        x_errorcode: string;
        x_franchise: string;
        x_business: string;
        x_customer_email: string;
    };
}
