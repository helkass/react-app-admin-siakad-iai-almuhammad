import { Button, Heading, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const NotFoundPage = () => {
   const navigate = useNavigate();
   return (
      <Stack justify="center" align="center" h="100vh" m="auto" spacing="4">
         <Heading color="red.700">Page Not Found</Heading>
         <Button
            onClick={() => navigate(-1)}
            colorScheme="green"
            fontSize="xl"
            gap="3">
            <AiOutlineArrowLeft />
            Back
         </Button>
      </Stack>
   );
};

export default NotFoundPage;
