import React from "react";
import pizzaicon from "../assets/UnlimitedShopping.png";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Image,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../config/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const { values, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "123456789",
    },
    onSubmit: async (values) => {
      try {
        const { data,status } = await axios.post(`${url}/admin/login`,values);
        if (status === 200) {

          localStorage.setItem("AuthTokenAdmin", data.token);
          navigate("/homepage");
        }
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.data);
      }
    },
  });
  console.log(values);
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
      style={{
        backgroundImage: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
      }}
    >
      <Container
        backgroundColor={"white"}
        boxShadow={{ base: "none", sm: "lg" }}
        py={{ base: "0", sm: "8" }}
        px={{ base: "0", sm: "10" }}
        borderRadius={{ base: "none", sm: "xl" }}
        padding="20px"
      >
        <Center>
          <Image
            src={pizzaicon}
            alt="logo"
            style={{ width: "150px", height: "150px" }}
          />
        </Center>

        <Center fontSize={20} fontWeight={"bold"}>
          ADMIN LOGIN
        </Center>
        <Box>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="email" fontSize={17}>
                Email
              </FormLabel>
              <Input
                required
                height="40px"
                id="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={values.email}
                name="email"
              />
              <FormLabel mt={2} htmlFor="password" fontSize={17}>
                Password
              </FormLabel>
              <Input
                required
                height="40px"
                id="password"
                type="Password"
                placeholder="password"
                onChange={handleChange}
                value={values.password}
                name="password"
              />
            </FormControl>
            <Center mt={"6"}>
              <Button
                style={{
                  backgroundColor: "rgb(239,185,76)",
                  color: "#000",
                  fontWeight: "bold",
                }}
                type="submit"
              >
                Sign in
              </Button>
            </Center>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
