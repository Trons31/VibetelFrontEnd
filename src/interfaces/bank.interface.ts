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
    accountType: AccountTypeByMotel;
    bank: BankByMotel;
}

interface BankByMotel {
    id:string,
    name:string
}

interface AccountTypeByMotel {
    id:string,
    name:string
}