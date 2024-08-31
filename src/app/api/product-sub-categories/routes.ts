import { NextApiRequest, NextApiResponse } from "next";

import subCategories from "../../_mocks/sub-categories.json";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `GET`) {
    await sampleMethod();
  } else {
    res.status(405).end(`Mothod ${req.method} not allowed`);
  }
  // This should be changed as get by catId request method
  async function sampleMethod() {
    try {
      res.status(200).end(subCategories);
    } catch (error) {
      if (error) {
        console.error(error);
        res.status(500).end();
      }
    }
  }
}
export default handler;
