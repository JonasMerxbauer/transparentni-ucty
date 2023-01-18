import { type NextApiRequest, type NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // This is just a mock api
  res.status(200).json(data)
}

const data = [
    {
      "currency": "CZK",
      "id": "101010101010",
      "identification": {
        "iban": "CZ3560000000002002222222",
        "otherAccountNumber": "000000 2002222222"
      },
      "name": "Transparent 1",
      "product": "-1",
      "servicer": {
        "bankCode": "6000",
        "bic": "PMBPCZPP",
        "countryCode": "CZ"
      }
    }
  ]
  