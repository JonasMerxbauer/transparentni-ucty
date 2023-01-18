import { type NextApiRequest, type NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // This is just a mock api
  res.status(200).json(data)
}

const data = {
    "amount": {
      "currency": "CZK",
      "value": 33445566.22
    },
    "date": "2022-10-18T18:47:13.614+02:00",
    "type": "2"
  }  