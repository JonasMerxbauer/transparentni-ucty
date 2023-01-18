import { type NextApiRequest, type NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
// This is just a mock api
const filteredData = data.filter(transaction => transaction.ownAccountNumber === "2002222222" || transaction.counterPartyAccount.accountNumber === "2002222222");

res.status(200).json(filteredData)
}

const data = [ 
    {
        "amount": {
            "currency": "CZK",
            "value": 1500
        },
        "bankref": "PS221019SO314822",
        "bookingDate": "2022-10-19",
        "counterPartyAccount": {
            "accountName": "PPF BANKA A.S.",
            "accountNumber": "0000009504010019",
            "bankCode": "6000"
        },
        "creditDebitIndicator": "CRDT",
        "details": {
            "detail1": "Posílám peníze"
        },
        "id": "20221019:0000000219",
        "ownAccountNumber": "2002222222",
        "postingDate": "2022-10-19",
        "productBankRef": "PS221019SO314822",
        "specificSymbol": "12",
        "statementNumber": "196",
        "statementPeriod": "2022",
        "transactionId": "4831716",
        "transactionType": "DPO",
        "transactionTypeCode": 1012209,
        "variableSymbol": "12"
    },
    {
        "amount": {
            "currency": "CZK",
            "value": 1999
        },
        "bankref": "PS221019SO314822",
        "bookingDate": "2022-10-19",
        "counterPartyAccount": {
            "accountName": "PPF BANKA A.S.",
            "accountNumber": "0000009505020008",
            "bankCode": "6000"
        },
        "creditDebitIndicator": "CRDT",
        "details": {
            "detail1": "Trvalý příkaz 8"
        },
        "id": "20221019:0000000220",
        "ownAccountNumber": "2002222222",    
        "postingDate": "2022-10-19",
        "productBankRef": "PS221019SO314822",
        "specificSymbol": "12",
        "statementNumber": "196",
        "statementPeriod": "2022",
        "transactionId": "4831701",
        "transactionType": "DPO",
        "transactionTypeCode": 0,
        "variableSymbol": "12"
    },
    {
        "amount": {
            "currency": "CZK",
            "value": 2000
        },
        "bankref": "PS221019SO314823",
        "bookingDate": "2022-10-19",
        "counterPartyAccount": {
            "accountName": "PPF BANKA A.S.",
            "accountNumber": "0000009503010009",
            "bankCode": "6000"
        },
        "creditDebitIndicator": "CRDT",
        "details": {
            "detail1": "Na dárky"
        },
        "id": "20221019:0000000221",
        "ownAccountNumber": "9504010019",
        "postingDate": "2022-10-19",
        "productBankRef": "PS221019SO314823",
        "specificSymbol": "61",
        "statementNumber": "196",
        "statementPeriod": "2022",
        "transactionId": "4831700",
        "transactionType": "DPO",
        "transactionTypeCode": 1012209,
        "variableSymbol": "61"
    },
    {
        "amount": {
            "currency": "CZK",
            "value": 100
        },    
        "bankref": "PS221018SO314645",
        "bookingDate": "2022-10-18",
        "counterPartyAccount": {
            "accountName": "PPF BANKA A.S.",
            "accountNumber": "0000009504010019",
            "bankCode": "6000"
        },
        "creditDebitIndicator": "CRDT",
        "details": {
            "detail1": "Příspěvek"
        },
        "id": "20221018:0000003607",
        "ownAccountNumber": "9505020008",
        "postingDate": "2022-10-18",
        "productBankRef": "PS221018SO314645",
        "specificSymbol": "12",
        "statementNumber": "195",
        "statementPeriod": "2022",
        "transactionId": "4831425",
        "transactionType": "DPO",
        "transactionTypeCode": 1012209,
        "variableSymbol": "12"
    },
    {
        "amount": {
            "currency": "CZK",
            "value": 1594
        },
        "bankref": "PS221018SO314645",
        "bookingDate": "2022-10-18",
        "counterPartyAccount": {
            "accountName": "PPF BANKA A.S.",
            "accountNumber": "0000009505020008",
            "bankCode": "6000"
        },
        "creditDebitIndicator": "DBIT",
        "details": {
            "detail1": "Platba elektřiny"
        },
        "id": "20221018:0000003608",
        "ownAccountNumber": "9504010019",
        "postingDate": "2022-10-18",
        "productBankRef": "PS221018SO314645",
        "specificSymbol": "12",
        "statementNumber": "195",
        "statementPeriod": "2022",
        "transactionId": "4831381",
        "transactionType": "DPO",
        "transactionTypeCode": 0,
        "variableSymbol": "12"
    }
    ]