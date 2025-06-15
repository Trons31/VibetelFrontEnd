export interface Bank {
    id: string;
    name: string;
}


export interface AccountType {
    id: string;
    typeName: string;
}


export interface BankAccount {
    id: string;
    accountHolderName: string;
    accountHolderId: string;
    accountNumber: string;
    createdAt: Date;
    updatedAt: Date;
    motelId: string;
    bankId: string;
    accountTypeId: string;
}