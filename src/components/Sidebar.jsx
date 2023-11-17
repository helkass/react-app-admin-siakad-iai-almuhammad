import {
   Button,
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   Icon,
   Stack,
   Text,
   useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { sidebarLinks } from "../constant/app";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const btnRef = useRef();
   const navigate = useNavigate();

   const handleLogout = () => {
      localStorage.clear();
      navigate("/login");
   };
   return (
      <>
         <Button
            ref={btnRef}
            fontSize="2xl"
            zIndex="50"
            colorScheme="gray"
            pos="fixed"
            top="2"
            left="2"
            onClick={onOpen}>
            <HiBars3BottomLeft />
         </Button>
         <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton />
               <DrawerHeader mb="3">Admin Siakad</DrawerHeader>

               <DrawerBody>
                  <Stack spacing="3">
                     {sidebarLinks.map((item, idx) => (
                        <Link key={idx} w="full" to={item.link}>
                           <Button
                              onClick={onClose}
                              w="full"
                              textAlign="left"
                              gap="3">
                              <Icon as={item.Icon} fontSize="xl" />
                              <Text as="span" flex="2" textAlign="center">
                                 {item.title}
                              </Text>
                           </Button>
                        </Link>
                     ))}
                  </Stack>
               </DrawerBody>

               <DrawerFooter>
                  <Button onClick={handleLogout} colorScheme="red">
                     Logout
                  </Button>
               </DrawerFooter>
            </DrawerContent>
         </Drawer>
      </>
   );
};

export default Sidebar;
