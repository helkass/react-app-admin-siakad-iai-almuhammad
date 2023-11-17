import * as Chakra from "@chakra-ui/react";
import { ModalConfirm, TableLoader } from "../../../components";
import { useFetch } from "../../../helpers";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toastConfig } from "../../../constant/app";

const Fakultas = () => {
   const { fetchIsLoading, getDatas, data, deleteData, postData } = useFetch();
   const [selectToDelete, setSelectToDelete] = useState(null);
   // for delete
   const { isOpen, onClose, onOpen } = Chakra.useDisclosure();
   const addDisClosure = Chakra.useDisclosure();

   const toast = Chakra.useToast({
      title: "status mata kuliah",
      ...toastConfig,
   });
   const [isLoading, setLoading] = useState(false);
   const [formData, setFormData] = useState({});

   function handleDelete() {
      deleteData(`/fakultas/${selectToDelete?.id}`)
         .then((res) => {
            if (res.status === 200) {
               onClose();
               toast({
                  description: "berhasil menghapus data",
                  status: "success",
               });
            }
         })
         .finally(() => {
            getDatas("/jurusan");
         });
   }

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   // function add mata kuliah
   function handleSubmit(e) {
      e.preventDefault();
      setLoading(true);

      postData("/fakultas", formData)
         .then((res) => {
            if (res.status === 200) {
               toast({
                  status: "success",
                  description: "berhasil menambahkan fakultas",
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
            getDatas("/fakultas");
         });
   }

   useEffect(() => {
      getDatas("/fakultas");
   }, []);

   return (
      <Chakra.Stack>
         {/* form modal tambah jurusan / prodi */}
         <Chakra.Button
            alignSelf="end"
            onClick={addDisClosure.onOpen}
            colorScheme="linkedin">
            Tambah Fakultas
         </Chakra.Button>
         <Chakra.Modal
            isOpen={addDisClosure.isOpen}
            onClose={addDisClosure.onClose}>
            <Chakra.ModalOverlay />
            <Chakra.ModalContent>
               <Chakra.ModalCloseButton onClick={addDisClosure.onClose} />
               <Chakra.ModalBody>
                  <form onSubmit={handleSubmit}>
                     <Chakra.Stack>
                        <Chakra.FormControl isRequired>
                           <Chakra.FormLabel htmlFor="name">
                              nama
                           </Chakra.FormLabel>
                           <Chakra.Input
                              onChange={handleChange}
                              name="name"
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
         {/* main contents */}
         <Chakra.TableContainer mt="4">
            {fetchIsLoading ? (
               <TableLoader />
            ) : (
               <Chakra.Table variant="striped">
                  <Chakra.Thead>
                     <Chakra.Tr>
                        <Chakra.Th>No.</Chakra.Th>
                        <Chakra.Th>nama</Chakra.Th>
                        <Chakra.Th>hapus</Chakra.Th>
                     </Chakra.Tr>
                  </Chakra.Thead>
                  <Chakra.Tbody>
                     {data?.map((item, i) => (
                        <Chakra.Tr key={item.id}>
                           <Chakra.Td>{i + 1}</Chakra.Td>
                           <Chakra.Td>{item.name}</Chakra.Td>
                           <Chakra.Td>
                              <Chakra.Button
                                 onClick={() => {
                                    setSelectToDelete(item);
                                    onOpen();
                                 }}
                                 size="sm"
                                 colorScheme="red">
                                 <Chakra.Icon as={AiFillDelete} />
                              </Chakra.Button>
                           </Chakra.Td>
                        </Chakra.Tr>
                     ))}
                  </Chakra.Tbody>
               </Chakra.Table>
            )}
            {/* modal confirm delete */}
            <ModalConfirm
               isOpen={isOpen}
               title={`Apakah anda ingin menghapus fakultas ${selectToDelete?.name}`}
               onClose={() => {
                  setSelectToDelete(null);
                  onClose();
               }}
               handleDelete={handleDelete}
            />
         </Chakra.TableContainer>
      </Chakra.Stack>
   );
};

export default Fakultas;
