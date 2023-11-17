import { Button, Icon, SimpleGrid } from "@chakra-ui/react";
import { CardBerita, CardBeritaLoader, ContentLayout } from "../../components";
import { useFetch } from "../../helpers";
import { useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";

const Berita = () => {
   const { fetchIsLoading, getDatas, data } = useFetch();

   useEffect(() => {
      getDatas("/berita");
   }, []);
   return (
      <ContentLayout title="data berita">
         <Link to="upload">
            <Button colorScheme="linkedin" size="md" alignSelf="end" gap="4">
               <Icon as={FiEdit3} />
               Menulis
            </Button>
         </Link>
         <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
            {fetchIsLoading ? (
               <CardBeritaLoader />
            ) : (
               data?.map((berita) => (
                  <CardBerita
                     {...berita}
                     key={berita.id}
                     to={`preview/${berita.id}`}
                  />
               ))
            )}
         </SimpleGrid>
      </ContentLayout>
   );
};

export default Berita;
