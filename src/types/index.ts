 export type Account = {
    currency: string;
    id: string;
    identification: Identification;
    name: string;
    product: string;
    servicer: Servicer;
};

export type Identification = {
    iban: string;
    otherAccountNumber: string;
};

export type Servicer = {
    bankCode: string;
    bic: string;
    countryCode: string;
};

  
export type Transaction = {
    amount: Amount;
    bankref: string;
    bookingDate: string;
    counterPartyAccount: CounterPartyAccount;
    creditDebitIndicator: string;
    details: Details;
    id: string;
    ownAccountNumber: string;
    postingDate: string;
    productBankRef: string;
    specificSymbol: string;
    statementNumber: string;
    statementPeriod: string;
    transactionId: string;
    transactionType: string;
    transactionTypeCode: number;
    variableSymbol: string;
};
    
export type Balance = {
    amount: Amount;
    date: string;
    type: string;
};

export type Amount = {
    currency: string;
    value: number;
};

export type CounterPartyAccount = {
    accountName: string;
    accountNumber: string;
    bankCode: string;
};

export type Details = {
    detail1: string;
};