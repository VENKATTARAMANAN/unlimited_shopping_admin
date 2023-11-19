import React, { useState } from "react";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const addProductValidation = yup.object({
  name: yup
    .string()
    .required("Please Enter Name")
    .min(5, "Please Enter min 5 Characters")
    .max(30, "Maximum 25 Character Allowed"),
  description: yup
    .string()
    .required("Please Enter Description")
    .min(10, "Minimum 10 characters required")
    .max(200, "Maximum 200 Character Allowed"),
    ratings:yup.string
});

const HomePage = () => {
  const [show, setShow] = useState("add");
  const [image1, setImage1] = useState(" ");
  const [image2, setImage2] = useState(" ");
  const [imageerror,setImageError]=useState("");
const toast=useToast();
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    initialValues,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      ratings: "",
      brand: "",
      color: "",
      category: "",
    },
    validationSchema: addProductValidation,
    onSubmit: async () => {
      try {
      } catch (error) {}
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
            setImageError("")
          });
        return data;
      } else {
        setImageError("Invalid file format")
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
            setImageError("")
          });
        return data;
      } else {
        setImageError("Invalid file format")
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


  return (
    <>
      <Navbar>
        <Box
          style={{
            width: "100%",
            height: "60px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <HStack spacing={10}>
            <Button style={{ color: "Black" }} onClick={() => setShow("edit")}>
              Edit
            </Button>
            <Button style={{ color: "black" }} onClick={() => setShow("add")}>
              Add
            </Button>
          </HStack>
        </Box>
        {show === "add" ? (
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
              <form onSubmit={handleSubmit}>
                <Heading style={{ textAlign: "center" }}>Add Product</Heading>
                <FormControl>
                  <FormLabel>Product Name</FormLabel>
                  <Input value={values.name} onChange={handleChange} />
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={values.description}
                    onChange={handleChange}
                  />
                  <FormLabel>Price</FormLabel>
                  <Input value={values.price} onChange={handleChange} />
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
                  <Input value={values.ratings} onChange={handleChange} />
                  <FormLabel>Brand</FormLabel>
                  <Input value={values.brand} onChange={handleChange} />
                  <FormLabel>color</FormLabel>
                  <Input value={values.color} onChange={handleChange} />
                  <FormLabel>category</FormLabel>
                  <Select>
                    <option>Mobiles</option>
                    <option>laptops</option>
                    <option>shoes</option>
                    <option>watches</option>
                    <option>clothes</option>
                    <option>cameras</option>
                  </Select>
                  <Box display={"flex"} justifyContent={"center"} mt={10}>
                  <Button >Add Product</Button>
                  </Box>
                </FormControl>
              </form>
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </Navbar>
    </>
  );
};

export default HomePage;
