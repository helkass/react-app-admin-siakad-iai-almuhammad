import {
   Box,
   Button,
   Card,
   CardBody,
   CardFooter,
   Heading,
   Image,
   Skeleton,
   Stack,
   Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

/**
 *
 * @param {...berita} berita properties
 * @param {to} Link react-router-dom
 * @returns
 */
const CardBerita = ({ title, image, description, article, to }) => {
   return (
      <Card
         direction={{ base: "column", sm: "row" }}
         overflow="hidden"
         variant="outline">
         {image && (
            <Image
               objectFit="cover"
               maxW={{ base: "100%", sm: "200px" }}
               src={image}
               alt={title}
            />
         )}

         <Stack>
            <CardBody>
               <Heading textTransform="capitalize" size="md">
                  {title}
               </Heading>

               <Text noOfLines={2}>{description}</Text>
            </CardBody>

            <CardFooter gap="4">
               <Link to={to}>
                  <Button variant="solid" size="sm" colorScheme="blue">
                     Lihat Detail
                  </Button>
               </Link>
               <Button variant="ghost" size="sm" colorScheme="red">
                  Hapus
               </Button>
            </CardFooter>
         </Stack>
      </Card>
   );
};

export const CardBeritaLoader = () => {
   return (
      <>
         <Skeleton w="200px" h="60" />
         <Stack>
            <Skeleton w="200px" h="15" />
            <Skeleton w="200px" h="15" />
         </Stack>
      </>
   );
};

export default CardBerita;
