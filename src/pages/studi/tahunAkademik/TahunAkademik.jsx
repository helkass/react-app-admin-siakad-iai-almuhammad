import * as Chakra from "@chakra-ui/react";
import { ModalConfirm, ModalDefault, TableLoader } from "../../../components";
import { useFetch } from "../../../helpers";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toastConfig } from "../../../constant/app";

const TahunAkademik = () => {
   const { fetchIsLoading, getDatas, data, deleteData, postData } = useFetch();
   const [selectToDelete, setSelectToDelete] = useState(null);
   const [formData, setFormData] = useState({ tahun_akhir: 0, tahun_awal: 0 });
   // delete disclosure
   const { isOpen, onClose, onOpen } = Chakra.useDisclosure();
   // add disclosure
   const addDisclosure = Chakra.useDisclosure();
   const toast = Chakra.useToast({ title: "Tahun Status", ...toastConfig });

   const handleChange = (e) => {
      const val = e.target.value;
      setFormData({ tahun_akhir: Number(val) + 1, tahun_mulai: val });
   };

   function handleDelete() {
      deleteData(`/tahun/${selectToDelete?.id}`)
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
            getDatas("/tahun");
         });

      setFormData({ tahun_akhir: 0, tahun_awal: 0 });
   }

   // add tahun akademik
   function handleSubmit(e) {
      e.preventDefault();
      postData("/tahun", formData, { "Content-Type": "application/json" })
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
            getDatas("/tahun");
         });
   }

   useEffect(() => {
      getDatas("/tahun");
   }, []);

   return (
      <Chakra.Stack>
         <Chakra.Button
            onClick={addDisclosure.onOpen}
            alignSelf="end"
            colorScheme="linkedin">
            Tambah
         </Chakra.Button>
         <ModalDefault
            isOpen={addDisclosure.isOpen}
            onClose={addDisclosure.onClose}>
            <form onSubmit={handleSubmit}>
               <Chakra.Stack spacing="3">
                  <Chakra.FormControl isRequired>
                     <Chakra.FormLabel>Tahun mulai</Chakra.FormLabel>
                     <Chakra.Input
                        type="number"
                        name="tahun_mulai"
                        placeholder="2018"
                        onChange={handleChange}
                        defaultValue={formData.tahun_awal}
                     />
                  </Chakra.FormControl>
                  <Chakra.FormControl isReadOnly>
                     <Chakra.FormLabel>Tahun akhir</Chakra.FormLabel>
                     <Chakra.Input
                        type="text"
                        name="tahun_mulai"
                        value={formData.tahun_akhir}
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
            {fetchIsLoading ? (
               <TableLoader />
            ) : (
               <Chakra.Table variant="striped">
                  <Chakra.Thead>
                     <Chakra.Tr>
                        <Chakra.Th>No.</Chakra.Th>
                        <Chakra.Th>Tahun Mulai</Chakra.Th>
                        <Chakra.Th>Tahun Akhir</Chakra.Th>
                        <Chakra.Th>hapus</Chakra.Th>
                     </Chakra.Tr>
                  </Chakra.Thead>
                  <Chakra.Tbody>
                     {data?.map((item, i) => (
                        <Chakra.Tr key={item.id}>
                           <Chakra.Td>{i + 1}</Chakra.Td>
                           <Chakra.Td>{item.tahun_mulai}</Chakra.Td>
                           <Chakra.Td>{item.tahun_akhir}</Chakra.Td>
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
               title={`Apakah anda ingin menghapus Tahun ${selectToDelete?.tahun_mulai} - ${selectToDelete?.tahun_akhir}`}
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

export default TahunAkademik;
