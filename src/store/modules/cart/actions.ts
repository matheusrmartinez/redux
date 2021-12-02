import { ActionTypes, IProduct } from "./types";

export function addProductToChartRequest(product: IProduct){
  return {
    type: ActionTypes.addProductToCartRequest,
    payload: {
      product
    }
  }
}

export function addProductToChartSuccess(product: IProduct){
  return {
    type: ActionTypes.addProductToCartSuccess,
    payload: {
      product
    }
  }
}

export function addProductToChartFailure(productId: number){
  return {
    type: ActionTypes.addProductToCartFailure,
    payload: {
      productId
    }
  }
}