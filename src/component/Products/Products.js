import React, { useState } from "react"
import axios from "axios"
import AddEditProducts from "./AddEditProducts/AddEditProducts";
import ListingProducts from "./ListingProducts/ListingProducts"
import { useDispatch } from "react-redux";
import {
  setProducts,
} from "../../reduxStore/actions/productsAction";
function Products() {
	const dispatch = useDispatch();
	const [selectedProd, setSelectedProd] = useState({});

	const fetchProducts = () => {
    axios
      .get("https://fakestoreapi.com/products?limit=8&sort=desc")
      .then((res) => {
        dispatch(setProducts(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
	};

	return (
    <div className="container">
      <AddEditProducts
        selectedProd={selectedProd}
        setSelectedProd={setSelectedProd}
        fetchProducts={fetchProducts}
      />
      <ListingProducts
        setSelectedProd={setSelectedProd}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}

export default Products;