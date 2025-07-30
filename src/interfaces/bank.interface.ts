export interface BankApi {
    id: string;
    name: string;
}


export interface AccountTypeApi {
    id: string;
    name: string;
}


export interface BankAccountApi {
    id: string;
    accountHolderName: string;
    accountHolderId: string;
    accountNumber: string;
    createdAt: Date;
    updatedAt: Date;
    accountTypeId: string;
    bankId: string;
}