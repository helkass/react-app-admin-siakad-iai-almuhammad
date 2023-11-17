import { Container, Stack } from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
   return (
      <Container maxW="8xl" px={{ base: 2, md: 3 }}>
         <Sidebar />
         <Stack mt="3">
            <Outlet />
         </Stack>
      </Container>
   );
};

export default MainLayout;
