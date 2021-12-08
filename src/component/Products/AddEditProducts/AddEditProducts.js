import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import {
  getProducts,
} from "../../../reduxStore/actions/productsAction";
import {  useDispatch } from "react-redux";

import "./AddEditProducts.scss";

function AddEditProducts({ selectedProd, setSelectedProd, fetchProducts }) {
	const [disableBtn, setBtnDisable]=useState(false)
	const dispatch = useDispatch();
	const prodCategory = [
    {
      categoryId: 0,
      category: "Select Category",
    },
    {
      categoryId: 1,
      category: "jewelery",
    },
    {
      categoryId: 2,
      category: "men's clothing",
    },
    {
      categoryId: 3,
      category: "electronics",
    },
    {
      categoryId: 4,
      category: "women's clothing",
    },
  ];

  const getInitialValue = () => {
    if (Object.keys(selectedProd).length > 0) {
      const { title, price, category, id, description } = selectedProd;
      let selectedCategory = prodCategory.filter((prodCat) => {
        if (prodCat.category === category) return prodCat;
	  });
      return {
        id: id,
        title: title,
        price: price,
        description: description,
        category: selectedCategory[0].category,
      };
    } else {
      return {
        title: "",
        price: "",
        description: "",
        category: prodCategory[0].category,
      };
    }
  };

	const handleFormSubmit = (values, { resetForm }) => {
		setBtnDisable(true);
    if (Object.keys(selectedProd).length > 0) {
      axios
        .put(`https://fakestoreapi.com/products/${values.id}`, values)
        .then((res) => {
			setSelectedProd({});
			dispatch(getProducts());
			fetchProducts();
			setBtnDisable(false);
        })
        .catch((err) => {});
    } else {
      axios
        .post("https://fakestoreapi.com/products", values)
		  .then((res) => {
			  resetForm({
          values: {
            title: "",
            price: "",
            description: "",
            category: prodCategory[0].category,
          },
        });
			  dispatch(getProducts());
			  fetchProducts();
			  setBtnDisable(false);
        })
        .catch((err) => {});
    }
  };

  const validateForm = (values) => {
    const errors = {};
    if (values.title === "") {
      errors.title = "Please enter product name";
    } else if (values.description === "") {
      errors.description = "Please enter product description";
    } else if (values.price === "") {
      errors.price = "Please enter product price";
    } else if (!isNaN(values.price) === false) {
      errors.price = "Please enter valid price";
    } else if (values.category === "Select Category") {
      errors.category = "Please select product category";
    }
    return errors;
  };

  return (
    <div className="addEditContainer">
      <Formik
        initialValues={getInitialValue()}
        onSubmit={handleFormSubmit}
        validate={validateForm}
        enableReinitialize
      >
        {({
          handleSubmit,
          values,
          handleChange,
          errors,
          handleReset,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={values.title}
                  onChange={handleChange}
                />
                <span className="error">{errors.title}</span>
              </div>
              <div className="form-group">
                <label>Product Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={values.description}
                  onChange={handleChange}
                />
                <span className="error">{errors.description}</span>
              </div>
              <div className="form-group">
                <label>Product Price</label>
                <input
                  type="text"
                  name="price"
                  className="form-control"
                  value={values.price}
                  onChange={handleChange}
                />
                <span className="error">{errors.price}</span>
              </div>
              <div className="form-group">
                <label>Product Category</label>
                <select
                  className="form-control"
                  name="category"
                  onChange={handleChange}
                  value={values.category}
                >
                  {prodCategory.map((cat) => {
                    return (
                      <option value={cat.category} key={"key" + cat.categoryId}>
                        {cat.category}
                      </option>
                    );
                  })}
                </select>
                <span className="error">{errors.category}</span>
              </div>
              <input
                type="submit"
                value={
                  Object.keys(selectedProd).length > 0 ? "UPDATE" : "SUBMIT"
                }
                className="btn btn-primary"
                disabled={disableBtn}
              />
              <input
                type="reset"
                value="RESET"
                onClick={() => {
                  handleReset();
                  setSelectedProd({});
                }}
                className="btn btn-primary"
                disabled={disableBtn}
              />
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddEditProducts;