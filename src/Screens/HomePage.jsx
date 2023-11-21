import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Image,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import axios from "axios";
import { url } from "../config/api";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Footer from "./Footer";

const HomePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [prodata, setProData] = useState([]);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data, status } = await axios.get(`${url}/product/alldata`);
      if (status === 200) {
        setLoading(false);
        setProData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      console.log(id);
      const { data, status } = await axios.delete(
        `${url}/admin/delete-product/${id}`
      );
      if (status === 200) {
        getAllProduct();
        toast({
          description: data.data,
          status: "success",
          duration: 1500,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <>
      <Spin spinning={loading} size="xl">
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
              <Button
                style={{
                  backgroundColor: "rgb(239,185,76)",
                  color: "#000",
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/add-product")}
              >
                Add Product
              </Button>
            </HStack>
          </Box>
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {prodata.map((data, index) => (
              <Box
                key={index}
                style={{
                  width: "250px",
                  height: "300px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  margin: "20px",
                }}
              >
                <Center>
                  <Image
                    src={data.image1}
                    w={"200px"}
                    h={"150px"}
                    mt={"10px"}
                  />
                </Center>
                <Heading
                  style={{
                    fontSize: "15px",
                    textAlign: "center",
                    fontWeight: "bold",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    padding: "3px",
                  }}
                >
                  {data.name}
                </Heading>
                <Center>
                  <HStack gap={20} mt={10}>
                    <DeleteIcon
                      style={{ fontSize: "30px", cursor: "pointer" }}
                      onClick={() => deleteProduct(data._id)}
                    />
                    <EditIcon
                      style={{ fontSize: "30px", cursor: "pointer" }}
                      onClick={() => navigate(`/edit-product/${data._id}`)}
                    />
                  </HStack>
                </Center>
              </Box>
            ))}
          </Box>
        </Navbar>
        <Footer />
      </Spin>
    </>
  );
};

export default HomePage;
