import * as Chakra from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiClient } from "../../../api/apiClient";
import { FiSearch } from "react-icons/fi";
import { ModalConfirm, TableLoader } from "../../../components";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ImLink } from "react-icons/im";
import { toastConfig } from "../../../constant/app";

const Penjadwalan = () => {
   const [data, setData] = useState(null);
   const [records, setRecords] = useState([]);
   const [isLoading, setLoading] = useState(false);
   const [selectToDelete, setSelectToDelete] = useState(null);
   const { isOpen, onClose, onOpen } = Chakra.useDisclosure();
   const toast = Chakra.useToast({ title: "Delete Status", ...toastConfig });

   function fetchData() {
      setLoading(true);
      apiClient
         .get("/kelas", {
            headers: {
               admin_key_siakad: JSON.parse(
                  localStorage.getItem("admin_key_siakad")
               ),
               api_key_siakad: JSON.parse(
                  localStorage.getItem("api_key_siakad")
               ),
            },
         })
         .then((d) => {
            setData(d.data.data);
            setRecords(d.data.data);
         })
         .finally(() => setLoading(false));
   }

   useEffect(() => {
      fetchData();
   }, []);

   function searchByName(e) {
      setRecords(
         data.filter((d) => d.name.toLowerCase().includes(e.target.value))
      );
   }

   function handleDelete() {
      apiClient
         .delete(`/kelas/${selectToDelete.id}`, {
            headers: {
               admin_key_siakad: JSON.parse(
                  localStorage.getItem("admin_key_siakad")
               ),
               api_key_siakad: JSON.parse(
                  localStorage.getItem("api_key_siakad")
               ),
            },
         })
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
            fetchData();
         });
   }

   return (
      <Chakra.Stack>
         <Chakra.InputGroup>
            <Chakra.InputLeftElement pointerEvents="none">
               <Chakra.Icon as={FiSearch} size={30} />
            </Chakra.InputLeftElement>
            <Chakra.Input
               name="search"
               type="text"
               onChange={searchByName}
               placeholder="cari berdasarkan nama"
            />
         </Chakra.InputGroup>
         {/* main contents */}
         <Chakra.TableContainer mt="4">
            {isLoading ? (
               <TableLoader />
            ) : (
               <Chakra.Table variant="simple">
                  <Chakra.Thead>
                     <Chakra.Tr>
                        <Chakra.Th>No.</Chakra.Th>
                        <Chakra.Th>Kelas</Chakra.Th>
                        <Chakra.Th>Detail</Chakra.Th>
                        <Chakra.Th>Hapus</Chakra.Th>
                     </Chakra.Tr>
                  </Chakra.Thead>
                  <Chakra.Tbody>
                     {records.map((item, i) => (
                        <Chakra.Tr key={item.id}>
                           <Chakra.Td>{i + 1}</Chakra.Td>
                           <Chakra.Td>{item.name}</Chakra.Td>
                           <Chakra.Td>
                              <Link to={`rencana/${item.name}`}>
                                 <Chakra.Button size="sm">
                                    <Chakra.Icon as={ImLink} />
                                 </Chakra.Button>
                              </Link>
                           </Chakra.Td>
                           <Chakra.Td>
                              <Chakra.Button
                                 colorScheme="red"
                                 size="sm"
                                 onClick={() => {
                                    setSelectToDelete(item);
                                    onOpen();
                                 }}>
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
               title={`Apakah anda ingin menghapus jadwal pada kelas ${selectToDelete?.name}`}
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

export default Penjadwalan;
