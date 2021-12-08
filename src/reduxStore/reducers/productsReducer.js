import * as actionTypes from "../actionTypes"

const initialProductsState = {
  loading: true,
  products: [],
};

const productsReducer = (state = initialProductsState, action) => {
	switch (action.type) {
    case actionTypes.GET_PRODUCTS:
			return {
				...state,
				loading: true
			};
    case actionTypes.SET_PRODUCTS:
			return {
				...state, loading: false,
				products: action.payload
			};
    default:
      return state;
  }
};

export { productsReducer };