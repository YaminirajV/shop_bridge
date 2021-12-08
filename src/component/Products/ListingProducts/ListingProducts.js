import React, { useEffect, useState } from "react"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../reduxStore/actions/productsAction"

import "./ListingProducts.scss"
function ListingProducts({ setSelectedProd, fetchProducts }) {
  const dispatch = useDispatch();
	const products = useSelector(({ productsReducer }) => productsReducer);
	const [disableBtn, setDisableProp]= useState(false);
  useEffect(() => {
    dispatch(getProducts());
    fetchProducts();
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        console.log(res);
		  dispatch(getProducts());
		  fetchProducts();
		  setDisableProp(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="products_container">
      {products.loading ? (
        <h1>Loading ...</h1>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Product Name</td>
              <td>Description</td>
              <td>Product Category</td>
              <td>Product Price</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {products.products.map((prod) => {
              const { title, price, category, id, description } = prod;
              return (
                <tr key={id}>
                  <td>{title}</td>
					  <td title={description}>{description}</td>
                  <td>{category}</td>
                  <td>{price}</td>
                  <td>
                    <input
                      type="button"
                      className="actionBtn btn btn-primary"
                      value="EDIT"
                      onClick={(e) => {
                        setSelectedProd(prod);
                        window.scrollTo(0, 0);
                      }}
                    />
                    <input
                      type="button"
                      className="actionBtn btn btn-danger"
                      value="DELETE"
                      disabled={disableBtn}
                      onClick={() => {
                        setDisableProp(true);
                        setSelectedProd({});
                        deleteProduct(id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListingProducts;