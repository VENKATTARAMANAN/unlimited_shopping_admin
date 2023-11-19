import {
  Avatar,
  Box,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Unlimited from "../assets/Mainpage.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const logOut = () => {
    const logout = localStorage.removeItem("AuthTokenAdmin");
    navigate("/");
  };
  useEffect(() => {}, []);
  return (
    <>
        <Box
          height={"60px"}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgb(19,25,33)",
          }}
        >
          <Box ml={5}>
            <Image
              src={Unlimited}
              width={"100px"}
              height={"40px"}
              onClick={() => navigate("/homepage")}
            />
          </Box>
          <Box mr={"10px"}>
            <Menu>
              <MenuButton>
                <Avatar bg="teal.500" width={10} height={10} />
              </MenuButton>
              <MenuList
                mt={3}
                boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
              >
                <MenuItem>Welcome</MenuItem>
                <MenuItem onClick={() => logOut()}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      <main>{children}</main>
    </>
  );
};

export default Navbar;
