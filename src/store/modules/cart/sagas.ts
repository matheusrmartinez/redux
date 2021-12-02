import { AxiosResponse } from "axios";
import { all, select, takeLatest, call, put } from "redux-saga/effects";
import { IState } from "../..";
import api from "../../../services/api";
import { addProductToChartFailure, addProductToChartRequest, addProductToChartSuccess } from "./actions";
import { ActionTypes } from "./types";

interface IStockResponse {
  id: number;
  quantity: number;
}

type CheckProductStockRequest = ReturnType<typeof addProductToChartRequest>;

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  const currentQuantity: number = yield select((state: IState) => {
    return (
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
    );
  });

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(
    api.get,
    `stock/${product.id}`
  );

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToChartSuccess(product))
  } else {
    yield put(addProductToChartFailure(product.id))
  }
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);
