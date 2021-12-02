import { IProduct } from "./types";

export function addProductToChart(product: IProduct){
  return {
    type: 'ADD_PRODUCT_TO_CART',
    payload: {
      product
    }
  }
}