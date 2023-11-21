import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { url } from "../config/api";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";

const addProductValidation = yup.object({
  name: yup
    .string()
    .required("Please Enter Name")
    .min(5, "Please Enter min 5 Characters"),
  description: yup
    .string()
    .required("Please Enter Description")
    .min(10, "Minimum 10 characters required")
    .max(500, "Maximum 200 Character Allowed"),
  ratings: yup.string().required("Please select the ratings"),
  price: yup.string().required("Please enter the price"),
  brand: yup.string().required("Please enter the brand"),
  color: yup.string().required("Please enter the color"),
  category: yup.string().required("Please select the category"),
});

const EditProduct = () => {
  const params = useParams();
  const navigate=useNavigate();
  const [image1, setImage1] = useState(" ");
  const [image2, setImage2] = useState(" ");
  const [imageerror, setImageError] = useState("");
  const toast = useToast();
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      ratings: "4",
      brand: "",
      color: "",
      category: "others",
    },
    validationSchema: addProductValidation,
    onSubmit: async (values) => {
      try {
        values = { ...values, image1: image1, image2: image2 };
        const { data, status } = await axios.put(
          `${url}/admin/edit-product`,
      {values:values,params:params.id}
        );
        if (status === 200) {
          toast({
            description: data.data,
            status: "success",
            duration: 1500,
            position: "top-right",
            isClosable: true,
          });
          navigate("/homepage")
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleImage = async (img) => {
    try {
      if (img.type === "image/jpeg" || img.type === "image/png") {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "hlg8sh4a");
        let data = "";
        await axios
          .post(
            "https://api.cloudinary.com/v1_1/dsibhutxu/image/upload",
            formData
          )
          .then((response) => {
            data = response.data["secure_url"];
            setImage1(data);
            setImageError("");
          });
        return data;
      } else {
        setImageError("Invalid file format");
        toast({
          title: "Please select JPEG or PNG file format",
          status: "error",
          position: "top-right",
          duration: 3500,
          isClosable: true,
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage2 = async (img) => {
    try {
      if (img.type === "image/jpeg" || img.type === "image/png") {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "hlg8sh4a");
        let data = "";
        await axios
          .post(
            "https://api.cloudinary.com/v1_1/dsibhutxu/image/upload",
            formData
          )
          .then((response) => {
            data = response.data["secure_url"];
            setImage2(data);
            setImageError("");
          });
        return data;
      } else {
        setImageError("Invalid file format");
        toast({
          title: "Please select JPEG or PNG file format",
          status: "error",
          position: "top-right",
          duration: 3500,
          isClosable: true,
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProductData = async () => {
    try {
      const { data, status } = await axios.get(
        `${url}/product/get-product/${params.id}`
      );
      if (status === 200) {
        setImage1(data.data.image1);
        setImage2(data.data.image2);
        setValues(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <>
      <Navbar>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              padding: "30px",
              margin: "50px",
              width: "100%",
            }}
          >
            <Heading style={{ textAlign: "center" }}>Edit Product</Heading>
            <form onSubmit={handleSubmit}>
              <FormLabel>Product Name</FormLabel>
              <Input
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <div style={{ color: "crimson" }}>{errors.name}</div>
              ) : (
                <></>
              )}
              <FormLabel>Description</FormLabel>
              <Textarea
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                name="description"
                id="description"
              />
              {errors.description && touched.description ? (
                <div style={{ color: "crimson" }}>{errors.description}</div>
              ) : (
                <></>
              )}
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                id="price"
                type="number"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.price && touched.price ? (
                <div style={{ color: "crimson" }}>{errors.price}</div>
              ) : (
                <></>
              )}
              <FormLabel>Image1</FormLabel>
              <Input
                placeholder="Image"
                size="lg"
                type="file"
                onChange={(e) => handleImage(e.target.files[0])}
                name="image"
              />
              <FormLabel>Image2</FormLabel>
              <Input
                placeholder="Image"
                size="lg"
                type="file"
                onChange={(e) => handleImage2(e.target.files[0])}
                name="image"
              />
              <FormLabel>ratings</FormLabel>
              <Select
                name="ratings"
                id="ratings"
                value={values.ratings}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Select>
              {errors.ratings && touched.ratings ? (
                <div style={{ color: "crimson" }}>{errors.ratings}</div>
              ) : (
                <></>
              )}
              <FormLabel>Brand</FormLabel>
              <Input
                name="brand"
                id="brand"
                value={values.brand}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.brand && touched.brand ? (
                <div style={{ color: "crimson" }}>{errors.brand}</div>
              ) : (
                <></>
              )}
              <FormLabel>color</FormLabel>
              <Input
                name="color"
                id="color"
                value={values.color}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.color && touched.color ? (
                <div style={{ color: "crimson" }}>{errors.color}</div>
              ) : (
                <></>
              )}
              <FormLabel>category</FormLabel>
              <Select
                name="category"
                id="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option>mobiles</option>
                <option>laptops</option>
                <option>shoes</option>
                <option>watches</option>
                <option>clothes</option>
                <option>cameras</option>
                <option>others</option>
              </Select>
              {errors.category && touched.category ? (
                <div style={{ color: "crimson" }}>{errors.category}</div>
              ) : (
                <></>
              )}
              <Box mt={5}>
                {" "}
                <Button
                  type="submit"
                  w={"100%"}
                  style={{
                    backgroundColor: "rgb(239,185,76)",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  Edit Product
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Navbar>
      <Footer />
    </>
  );
};

export default EditProduct;
