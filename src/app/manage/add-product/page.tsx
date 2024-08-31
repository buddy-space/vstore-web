"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ky from "ky";
import React, { useMemo } from "react";
import Select from "react-select";
import useSWR from "swr";
import * as Yup from "yup";
import { CategoryTypes } from "~/services/types";

const subcategories = [
  { value: "phones", label: "Phones" },
  { value: "laptops", label: "Laptops" },
  { value: "shirts", label: "Shirts" },
  { value: "pants", label: "Pants" },

  { value: "fiction", label: "Fiction" },
  { value: "non-fiction", label: "Non-Fiction" },
];

const brands = [
  { value: "brand-a", label: "Brand A" },
  { value: "brand-b", label: "Brand B" },
  { value: "brand-c", label: "Brand C" },
];

const offers = [
  { value: "none", label: "None" },
  { value: "10-off", label: "10% Off" },
  { value: "20-off", label: "20% Off" },
  { value: "30-off", label: "30% Off" },
];

// Validation schema
const validationSchema = Yup.object({
  category: Yup.object().required("Required"),
  subcategory: Yup.object().required("Required"),
  brand: Yup.object().required("Required"),
  name: Yup.string().required("Required"),
  count: Yup.number().min(1, "Must be at least 1").required("Required"),
  price: Yup.number().min(0, "Must be at least 0").required("Required"),
  offer: Yup.object().required("Required"),
  image: Yup.mixed().required("Image is required"),
});

const ProductForm = () => {
  const handleSubmit = () => {};
  const { data: categories } = useSWR("/api/product-categories");

  const listItems = useMemo(() => {
    return (
      categories &&
      categories.map((item: CategoryTypes) => {
        return { label: item.name, value: item.id };
      })
    );
  }, [categories]);
  return (
    <Formik
      initialValues={{
        category: null,
        subcategory: null,
        brand: null,
        name: "",
        count: "",
        price: "",
        offer: null,
        image: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, errors, touched }) => (
        <Form className="space-y-4 p-4 max-w-md mx-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <Select
              options={categories || []}
              onChange={(option) => setFieldValue("category", option)}
              name="category"
              className="mt-1"
            />
            <ErrorMessage
              name="category"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subcategory
            </label>
            <Select
              options={subcategories || []}
              onChange={(option) => setFieldValue("subcategory", option)}
              name="subcategory"
              className="mt-1"
            />
            <ErrorMessage
              name="subcategory"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <Select
              options={brands || []}
              onChange={(option) => setFieldValue("brand", option)}
              name="brand"
              className="mt-1"
            />
            <ErrorMessage
              name="brand"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Field
              type="text"
              name="name"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Count
            </label>
            <Field
              type="number"
              name="count"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            <ErrorMessage
              name="count"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <Field
              type="number"
              name="price"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Offer
            </label>
            <Select
              options={offers}
              onChange={(option) => setFieldValue("offer", option)}
              name="offer"
              className="mt-1"
            />
            <ErrorMessage
              name="offer"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
              className="mt-1"
            />
            <ErrorMessage
              name="image"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
