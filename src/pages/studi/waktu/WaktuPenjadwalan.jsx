import * as Chakra from "@chakra-ui/react";
import { ModalConfirm, ModalDefault, TableLoader } from "../../../components";
import { useFetch } from "../../../helpers";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toastConfig } from "../../../constant/app";

const WaktuPenjadwalan = () => {
   const { isLoading, getDatas, data, deleteData, postData } = useFetch();
   const [selectToDelete, setSelectToDelete] = useState(null);
   const { isOpen, onClose, onOpen } = Chakra.useDisclosure();
   const toast = Chakra.useToast({ title: "Delete Status", ...toastConfig });
   const [formData, setFormData] = useState(null);

   const addDisclosure = Chakra.useDisclosure();

   function handleDelete() {
      deleteData(`/waktu/${selectToDelete?.id}`)
         .then((res) => {
            if (res.status === 200) {
               onClose();
               toast({
                  description: "berhasil menghapus waktu penjadwalan",
                  status: "success",
               });
            }
         })
         .finally(() => {
            getDatas("/waktu");
         });
   }

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   function handleSubmit(e) {
      e.preventDefault();
      postData("/waktu", formData, { "Content-Type": "application/json" })
         .then((res) => {
            if (res.status === 200) {
               toast({
                  description: "berhasil menambahkan data",
                  status: "success",
               });
            }
         })
         .catch((err) => {
            toast({
               description: err.response.data.error,
               status: "error",
            });
         })
         .finally(() => {
            getDatas("/waktu");
         });
   }

   useEffect(() => {
      getDatas("/waktu");
   }, []);

   return (
      <Chakra.Stack>
         <Chakra.Button
            colorScheme="linkedin"
            onClick={addDisclosure.onOpen}
            alignSelf="end">
            Tambah
         </Chakra.Button>
         <ModalDefault
            isOpen={addDisclosure.isOpen}
            onClose={addDisclosure.onClose}>
            <form onSubmit={handleSubmit}>
               <Chakra.Stack spacing="3">
                  <Chakra.FormControl isRequired>
                     <Chakra.FormLabel>Waktu mulai</Chakra.FormLabel>
                     <Chakra.Input
                        type="text"
                        name="waktu_mulai"
                        placeholder="07:00"
                        onChange={handleChange}
                     />
                  </Chakra.FormControl>
                  <Chakra.FormControl isRequired>
                     <Chakra.FormLabel>waktu berakhir</Chakra.FormLabel>
                     <Chakra.Input
                        type="text"
                        name="waktu_berakhir"
                        placeholder="08:00"
                        onChange={handleChange}
                     />
                  </Chakra.FormControl>
                  <Chakra.Button
                     type="submit"
                     colorScheme="whatsapp"
                     alignSelf="end">
                     Submit
                  </Chakra.Button>
               </Chakra.Stack>
            </form>
         </ModalDefault>
         {/* main contents */}
         <Chakra.TableContainer mt="4">
            {isLoading ? (
               <TableLoader />
            ) : (
               <Chakra.Table variant="striped">
                  <Chakra.Thead>
                     <Chakra.Tr>
                        <Chakra.Th>No.</Chakra.Th>
                        <Chakra.Th>waktu Mulai</Chakra.Th>
                        <Chakra.Th>waktu Akhir</Chakra.Th>
                        <Chakra.Th>hapus</Chakra.Th>
                     </Chakra.Tr>
                  </Chakra.Thead>
                  <Chakra.Tbody>
                     {data?.map((item, i) => (
                        <Chakra.Tr key={item.id}>
                           <Chakra.Td>{i + 1}</Chakra.Td>
                           <Chakra.Td>{item.waktu_mulai}</Chakra.Td>
                           <Chakra.Td>{item.waktu_berakhir}</Chakra.Td>
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
               title={`Apakah anda ingin menghapus jadwal waktu ${selectToDelete?.waktu_mulai} - ${selectToDelete?.waktu_berakhir}`}
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

export default WaktuPenjadwalan;
