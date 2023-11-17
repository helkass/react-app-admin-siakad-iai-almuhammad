import * as Chakra from "@chakra-ui/react";
import { ModalConfirm, TableLoader, ContentLayout } from "../components";
import { useFetch } from "../helpers";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toastConfig } from "../constant/app";

const Ruangan = () => {
   const { isLoading, getDatas, data, deleteData, postData } = useFetch();
   const [selectToDelete, setSelectToDelete] = useState(null);
   const { isOpen, onClose, onOpen } = Chakra.useDisclosure();
   const formModal = Chakra.useDisclosure();
   const toast = Chakra.useToast({ title: "Delete Status", ...toastConfig });
   const [ruanganName, setRuanganName] = useState("");

   function handleDelete() {
      deleteData(`/ruangan/${selectToDelete.id}`)
         .then((res) => {
            if (res.status === 200) {
               onClose();
               toast({
                  description: "berhasil menghapus ruangan",
                  status: "success",
               });
            }
         })
         .finally(() => {
            getDatas("/ruangan");
         });
   }

   function handleSubmit(e) {
      e.preventDefault();
      postData(
         "/ruangan",
         { name: ruanganName },
         { "Content-Type": "application/json" }
      )
         .then((res) => {
            if (res.status === 200) {
               toast({
                  title: "Add Data Status",
                  description: "berhasil menambahkan ruangan",
                  status: "success",
               });
            }
            if (res.status >= 400) {
               toast({
                  title: "Add Data Status",
                  description: res.data.data.error,
                  status: "error",
               });
            }
         })
         .catch((err) => {
            toast({
               title: "Add Data Status",
               description: err.response.data.error,
               status: "error",
            });
         })
         .finally(() => {
            getDatas("/ruangan");
         });
   }

   useEffect(() => {
      getDatas("/ruangan");
   }, []);

   return (
      <Chakra.Stack>
         <ContentLayout title="Ruangan">
            {/* modal form add data */}
            <Chakra.Modal isOpen={formModal.isOpen} onClose={formModal.onClose}>
               <Chakra.ModalOverlay />
               <Chakra.ModalContent>
                  <Chakra.ModalCloseButton onClick={formModal.onClose} />
                  <Chakra.ModalHeader>
                     <Chakra.Heading fontSize="md">
                        Tambahkan Ruangan
                     </Chakra.Heading>
                  </Chakra.ModalHeader>
                  <Chakra.ModalBody>
                     <form onSubmit={handleSubmit}>
                        <Chakra.Stack spacing="3">
                           <Chakra.FormControl>
                              <Chakra.FormLabel htmlFor="name">
                                 nama
                              </Chakra.FormLabel>
                              <Chakra.Input
                                 type="text"
                                 name="name"
                                 id="name"
                                 onChange={(e) =>
                                    setRuanganName(e.target.value)
                                 }
                              />
                           </Chakra.FormControl>
                           <Chakra.Button type="submit" colorScheme="linkedin">
                              Tambah
                           </Chakra.Button>
                        </Chakra.Stack>
                     </form>
                  </Chakra.ModalBody>
               </Chakra.ModalContent>
            </Chakra.Modal>
            <Chakra.Button
               bg="primary.900"
               alignSelf="end"
               onClick={formModal.onOpen}
               color="white">
               Tambah Ruangan
            </Chakra.Button>
            {/* main contents */}
            <Chakra.TableContainer mt="4">
               {isLoading ? (
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
                  title={`Apakah anda ingin menghapus ruangan ${selectToDelete?.name}?`}
                  onClose={() => {
                     setSelectToDelete(null);
                     onClose();
                  }}
                  handleDelete={handleDelete}
               />
            </Chakra.TableContainer>
         </ContentLayout>
      </Chakra.Stack>
   );
};

export default Ruangan;
