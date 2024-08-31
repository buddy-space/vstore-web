import type { NextApiRequest, NextApiResponse } from "next";
import addProduct from "~/services/addProduct";
import { ProductTypes } from "~/services/types";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await addProducts(req.body);
  } else if (req.method === "GET") {
    await getProducts();
  } else {
    res.status(405).end(`Mothod ${req.method} not allowed`);
  }
  async function getProducts() {
    try {
      res.status(200).end([]);
    } catch (error) {
      if (error) {
        console.error(error);
        res.status(500).end();
      }
    }
  }
  async function addProducts(params: ProductTypes) {
    try {
      const response = await addProduct(params);
      res.status(200).end(response);
    } catch (error) {
      if (error) {
        console.error(error);
        res.status(500).end();
      }
    }
  }
}
export default handler;
