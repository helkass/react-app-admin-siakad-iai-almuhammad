import {
   Box,
   Button,
   Container,
   FormControl,
   FormLabel,
   Heading,
   Image,
   Input,
   Stack,
   useToast,
} from "@chakra-ui/react";
import banner_login from "../../assets/login.png";
import { useState } from "react";
import { apiClient } from "../../api/apiClient";
import { useNavigate } from "react-router-dom";
import { toastConfig } from "../../constant/app";

const Login = () => {
   const [formData, setFormData] = useState({});
   const [isLoading, setLoading] = useState(false);
   const toast = useToast({ title: "Authentication Status", ...toastConfig });
   const navigate = useNavigate();

   const handleChange = (e) => {
      setFormData(
         (prev) => (prev = { ...prev, [e.target.name]: e.target.value })
      );
   };

   function handleSubmit(e) {
      e.preventDefault();
      setLoading(false);
      apiClient
         .post("/super/login", formData, {
            headers: {
               "Content-Type": "application/json",
            },
         })
         .then((res) => {
            if (res.status === 200) {
               localStorage.setItem(
                  "api_key_siakad",
                  JSON.stringify(res.data.data.token)
               );
               localStorage.setItem(
                  "admin_key_siakad",
                  JSON.stringify(res.data.data.admin_token)
               );
               navigate("/beranda");
            }

            if (res.status >= 400) {
               toast({
                  status: "error",
                  description: res.data.data?.error,
               });
            }
         })
         .catch((err) => {
            toast({
               status: "error",
               description: err.response.data?.error,
            });
         })
         .finally(() => {
            setLoading(false);
         });
   }
   return (
      <Container maxW="7xl">
         <Stack
            justify={{ base: "center", md: "space-around" }}
            h="100vh"
            align="center"
            display="flex"
            direction={{ base: "column", md: "row" }}>
            <Box boxSize={{ base: "sm", md: "md" }}>
               <Image src={banner_login} alt="login-image" />
            </Box>
            <form onSubmit={handleSubmit}>
               <Heading textAlign="center" mb="7" color="primary.700">
                  Welcome back admin
               </Heading>
               <Stack minW="350px" spacing="3">
                  <FormControl>
                     <FormLabel htmlFor="username">username</FormLabel>
                     <Input
                        type="text"
                        onChange={handleChange}
                        name="username"
                        id="username"
                     />
                  </FormControl>
                  <FormControl>
                     <FormLabel htmlFor="password">password</FormLabel>
                     <Input
                        type="password"
                        onChange={handleChange}
                        name="password"
                        id="password"
                     />
                  </FormControl>
                  <Button
                     isLoading={isLoading}
                     loadingText="checking..."
                     alignSelf="flex-end"
                     bg="primary.700"
                     color="white"
                     type="submit">
                     Login
                  </Button>
               </Stack>
            </form>
         </Stack>
      </Container>
   );
};

export default Login;
