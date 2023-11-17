import * as Chakra from "@chakra-ui/react";
import { ContentLayout } from "../../components";
import { useState } from "react";
import { useFetch } from "../../helpers";
import { useEffect } from "react";

const Setting = () => {
   const [isLoading, setLoading] = useState(false);
   const { updateData, getDatas, data, fetchIsLoading } = useFetch();
   const [formDataChange, setFormDataChange] = useState({});
   const toast = Chakra.useToast({
      isClosable: true,
      duration: 4000,
      title: "Settings Status",
   });

   const handleChange = (e) => {
      setFormDataChange({ ...formDataChange, [e.target.name]: e.target.value });
   };

   const handleUpdate = (e) => {
      e.preventDefault();
      setLoading(true);

      updateData(`/super/${data[0]?.id}`, formDataChange)
         .then((res) => {
            if (res.status === 200) {
               toast({
                  description: "data berhasil di update",
                  status: "success",
               });
            }

            if (res.status >= 400) {
               toast({ description: res.data.error, status: "error" });
            }
         })
         .catch((err) => {
            toast({ description: err.response.data.error, status: "error" });
         })
         .finally(() => {
            setLoading(false);
         });
   };

   useEffect(() => {
      getDatas("/super");
   }, []);

   return (
      <ContentLayout title="Setting">
         <Chakra.VStack align="start">
            {/* auth admin */}
            {fetchIsLoading ? (
               <Chakra.VStack>
                  <Chakra.Skeleton h="10" />
                  <Chakra.Skeleton h="10" />
               </Chakra.VStack>
            ) : (
               data !== null && (
                  <form onSubmit={handleUpdate}>
                     <Chakra.VStack spacing={3} minW="340px">
                        <Chakra.FormControl>
                           <Chakra.FormLabel htmlFor="username">
                              username
                           </Chakra.FormLabel>
                           <Chakra.Input
                              name="username"
                              type="text"
                              id="username"
                              defaultValue={data[0]?.username}
                              onChange={handleChange}
                           />
                        </Chakra.FormControl>
                        <Chakra.FormControl>
                           <Chakra.FormLabel htmlFor="password">
                              password
                           </Chakra.FormLabel>
                           <Chakra.Input
                              name="password"
                              defaultValue={data[0]?.password}
                              onChange={handleChange}
                              type="password"
                              id="password"
                           />
                        </Chakra.FormControl>
                        <Chakra.Button
                           type="submit"
                           colorScheme="yellow"
                           isLoading={isLoading}
                           loadingText="updating..."
                           isDisabled={isLoading}>
                           Update
                        </Chakra.Button>
                     </Chakra.VStack>
                  </form>
               )
            )}
         </Chakra.VStack>
      </ContentLayout>
   );
};

export default Setting;
