import { NextApiRequest, NextApiResponse } from "next";

import categories from "../../_mocks/categories.json";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await getCategories();
  } else {
    res.status(405).end(`Mothod ${req.method} not allowed`);
  }
  async function getCategories() {
    try {
      res.status(200).end(categories);
    } catch (error) {
      if (error) {
        console.error(error);
        res.status(500).end();
      }
    }
  }
}
export default handler;
