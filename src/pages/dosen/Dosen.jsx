import * as Chakra from "@chakra-ui/react";
import { ContentLayout } from "../../components";
import { useFetch } from "../../helpers";
import { AiFillDelete } from "react-icons/ai";
import { useEffect } from "react";
import { toastConfig } from "../../constant/app";
import { useState } from "react";

const Dosen = () => {
   const { data, getDatas, fetchIsLoading, deleteData, postData } = useFetch();
   const toast = Chakra.useToast({ title: "status dosen", ...toastConfig });
   const { isOpen, onOpen, onClose } = Chakra.useDisclosure();
   const [formData, setFormData] = useState({});
   const [isLoading, setLoading] = useState(false);

   const handleDelete = (id) => {
      deleteData(`/dosen/${id}`)
         .then((res) => {
            if (res.status === 200) {
               getDatas("/dosen");
               toast({
                  status: "success",
                  description: "berhasil menghapus",
               });
            }
         })
         .catch((err) => {
            toast({
               status: "error",
               description: err.response.data.error,
            });
         });
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   // function add data dosen
   const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      postData("/dosen", formData, { "Content-Type": "application/json" })
         .then((res) => {
            if (res.status === 200) {
               getDatas("/dosen");
               toast({
                  status: "success",
                  description: "berhasil menambahkan data dosen",
               });
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
               description: err.response.data.error,
            });
         })
         .finally(() => {
            setLoading(false);
            e.target.reset();
         });
   };

   useEffect(() => {
      getDatas("/dosen");
   }, []);

   return (
      <ContentLayout title="Daftar Dosen">
         {/* form modal tambah dosen */}
         <Chakra.Button alignSelf="end" onClick={onOpen} colorScheme="linkedin">
            Tambah Dosen
         </Chakra.Button>
         <Chakra.Modal isOpen={isOpen} onClose={onClose}>
            <Chakra.ModalOverlay />
            <Chakra.ModalContent>
               <Chakra.ModalCloseButton />
               <Chakra.ModalBody>
                  <form onSubmit={handleSubmit}>
                     <Chakra.Stack>
                        <Chakra.FormControl isRequired>
                           <Chakra.FormLabel htmlFor="nim">
                              NIK
                           </Chakra.FormLabel>
                           <Chakra.Input
                              onChange={handleChange}
                              name="nik"
                              id="nik"
                              type="text"
                           />
                        </Chakra.FormControl>
                        <Chakra.FormControl isRequired>
                           <Chakra.FormLabel htmlFor="name">
                              username
                           </Chakra.FormLabel>
                           <Chakra.Input
                              name="name"
                              onChange={handleChange}
                              id="name"
                              type="text"
                           />
                        </Chakra.FormControl>
                        <Chakra.Button
                           alignSelf="end"
                           type="submit"
                           isDisabled={isLoading}
                           colorScheme="whatsapp"
                           isLoading={isLoading}
                           loadingText="loading...">
                           Tambah
                        </Chakra.Button>
                     </Chakra.Stack>
                  </form>
               </Chakra.ModalBody>
            </Chakra.ModalContent>
         </Chakra.Modal>
         {/* end modal form */}
         {fetchIsLoading ? (
            <Chakra.Stack>
               <Chakra.Skeleton h="12" />
               <Chakra.Skeleton h="12" />
               <Chakra.Skeleton h="12" />
            </Chakra.Stack>
         ) : (
            <Chakra.TableContainer>
               <Chakra.Table variant="striped">
                  <Chakra.Thead>
                     <Chakra.Tr>
                        <Chakra.Th>No.</Chakra.Th>
                        <Chakra.Th>NIK</Chakra.Th>
                        <Chakra.Th>Nama</Chakra.Th>
                        <Chakra.Th>Delete</Chakra.Th>
                     </Chakra.Tr>
                  </Chakra.Thead>
                  <Chakra.Tbody>
                     {data?.map((item, idx) => (
                        <Chakra.Tr key={item.id}>
                           <Chakra.Td>{idx + 1}</Chakra.Td>
                           <Chakra.Td>{item.nik}</Chakra.Td>
                           <Chakra.Td>{item.name}</Chakra.Td>
                           <Chakra.Td>
                              <Chakra.Button
                                 colorScheme="red"
                                 isDisabled={isLoading}
                                 size="sm"
                                 onClick={() => handleDelete(item.id)}>
                                 <Chakra.Icon as={AiFillDelete} />
                              </Chakra.Button>
                           </Chakra.Td>
                        </Chakra.Tr>
                     ))}
                  </Chakra.Tbody>
               </Chakra.Table>
            </Chakra.TableContainer>
         )}
      </ContentLayout>
   );
};

export default Dosen;
