import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETALS_REQUEST,
  PRODUCT_DETALS_SUCCESS,
  PRODUCT_DETALS_FAIL
} from '../constants/productConstans';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETALS_REQUEST:
      return { loading: true, product: {} };
    case PRODUCT_DETALS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETALS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
