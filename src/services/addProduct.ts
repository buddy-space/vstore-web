import ky from "ky";
import siteConfig from "~/config/siteConfig";
import { ProductTypes } from "./types";

const addProduct = async (params: ProductTypes) => {
  const {
    api: { baseUrl },
  } = siteConfig;
  return ky.post(`${baseUrl}/addProduct`, { json: params });
};
export default addProduct;
