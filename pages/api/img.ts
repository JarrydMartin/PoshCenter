import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    success : 1,
    file: {
        url : req.body.url
    }
})
}