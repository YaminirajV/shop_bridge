import * as actionTypes from "../actionTypes"

const getProducts = (data) => {
  return {
    type: actionTypes.GET_PRODUCTS,
  };
};

const setProducts = (data) => {
	return {
		type: actionTypes.SET_PRODUCTS,
		payload:data
	}
}

export {getProducts, setProducts}