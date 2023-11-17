import * as Chakra from "@chakra-ui/react";
import {
   ContentLayout,
   ModalConfirm,
   ModalDefault,
   TableLoader,
} from "../../../components";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../helpers";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toastConfig } from "../../../constant/app";

const DetailJadwal = () => {
   const { fetchIsLoading, getDatas, data, deleteData, postData } = useFetch();
   const [formData, setFormData] = useState(null);
   const toast = Chakra.useToast({ title: "Jadwal status", ...toastConfig });

   const matKul = useFetch();
   const ruangan = useFetch();
   const dosen = useFetch();
   const waktu = useFetch();

   const [selected, setSelected] = useState(null);

   // disclosure for delete
   const deleteDisclosure = Chakra.useDisclosure();
   // disclosure for add mata kuliah at this kelas
   const addDisclosure = Chakra.useDisclosure();

   const params = useParams();

   // delete jadwal mata kuliah on this kelas
   const handleDelete = () => {
      deleteData(`/jadwal/${selected.id}`).finally(() => {
         deleteDisclosure.onClose();
         getDatas(`/jadwal?kelas=${params.id}`);
      });
   };

   // fn submit form edit or add data
   async function handleSubmit(e) {
      e.preventDefault();

      await postData("/jadwal", { kelas: params.id, ...formData })
         .then((res) => {
            if (res.status === 200) {
               toast({
                  status: "success",
                  description: "berhasil menambahkan data",
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
            getDatas(`/jadwal?kelas=${params.id}`);
         });
   }

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   useEffect(() => {
      getDatas(`/jadwal?kelas=${params.id}`);
      matKul.getDatas("/matkul");
      ruangan.getDatas("/ruangan");
      dosen.getDatas("/dosen");
      waktu.getDatas("/waktu");
   }, []);

   return (
      <ContentLayout title={`detail rencana | jadwal kelas ${params.id}`}>
         <Chakra.Button
            onClick={addDisclosure.onOpen}
            colorScheme="linkedin"
            alignSelf="end">
            Tambahkan
         </Chakra.Button>
         <Chakra.TableContainer mt="4">
            {fetchIsLoading ? (
               <TableLoader />
            ) : (
               data !== null && (
                  <Chakra.Table variant="simple">
                     <Chakra.Thead>
                        <Chakra.Tr>
                           <Chakra.Th>No.</Chakra.Th>
                           <Chakra.Th>mata kuliah</Chakra.Th>
                           <Chakra.Th>dosen</Chakra.Th>
                           <Chakra.Th>ruangan</Chakra.Th>
                           <Chakra.Th>hari</Chakra.Th>
                           <Chakra.Th>waktu</Chakra.Th>
                           <Chakra.Th>actions</Chakra.Th>
                        </Chakra.Tr>
                     </Chakra.Thead>
                     <Chakra.Tbody>
                        {data?.length >= 0 ? (
                           data?.map((item, i) => (
                              <Chakra.Tr key={item.id}>
                                 <Chakra.Td>{i + 1}</Chakra.Td>
                                 <Chakra.Td>{item.mata_kuliah}</Chakra.Td>
                                 <Chakra.Td>
                                    {item.dosen_jadwal_kuliah.name}
                                 </Chakra.Td>
                                 <Chakra.Td>{item.ruangan}</Chakra.Td>
                                 <Chakra.Td>{item.hari}</Chakra.Td>
                                 <Chakra.Td>
                                    {item.waktu_jadwal_kuliah.waktu_mulai} -{" "}
                                    {item.waktu_jadwal_kuliah.waktu_berakhir}
                                 </Chakra.Td>
                                 <Chakra.Td>
                                    <Chakra.Button
                                       colorScheme="red"
                                       mr="1"
                                       size="sm"
                                       onClick={() => {
                                          setSelected(item);
                                          deleteDisclosure.onOpen();
                                       }}>
                                       <Chakra.Icon as={AiFillDelete} />
                                    </Chakra.Button>
                                 </Chakra.Td>
                              </Chakra.Tr>
                           ))
                        ) : (
                           <Chakra.Tr>
                              <Chakra.Td colSpan={7} textAlign="center">
                                 data belum tersedia
                              </Chakra.Td>
                           </Chakra.Tr>
                        )}
                     </Chakra.Tbody>
                  </Chakra.Table>
               )
            )}
            {/* modal confirm delete */}
            <ModalConfirm
               isOpen={deleteDisclosure.isOpen}
               title={`Apakah anda ingin menghapus jadwal mata kuliah "${selected?.mata_kuliah}" pada kelas ${params.id}`}
               onClose={() => {
                  setSelected(null);
                  deleteDisclosure.onClose();
               }}
               handleDelete={handleDelete}
            />
         </Chakra.TableContainer>
         {/* modal for edit */}
         <ModalDefault
            onClose={addDisclosure.onClose}
            isOpen={addDisclosure.isOpen}>
            <form onSubmit={handleSubmit}>
               <Chakra.Stack spacing="4">
                  <Chakra.FormControl>
                     <Chakra.FormLabel htmlFor="mata_kuliah">
                        mata kuliah
                     </Chakra.FormLabel>
                     <Chakra.Select
                        onChange={handleChange}
                        defaultValue={"pilih mata kuliah"}
                        name="mata_kuliah"
                        id="mata_kuliah">
                        <option disabled value={"pilih mata kuliah"}>
                           pilih mata kuliah
                        </option>
                        {matKul.data !== null &&
                           matKul.data?.map((mt) => (
                              <option key={mt.id} value={mt.name}>
                                 {mt.name}
                              </option>
                           ))}
                     </Chakra.Select>
                  </Chakra.FormControl>
                  <Chakra.FormControl>
                     <Chakra.FormLabel htmlFor="ruangan">
                        ruangan
                     </Chakra.FormLabel>
                     <Chakra.Select
                        onChange={handleChange}
                        defaultValue={"pilih ruangan"}
                        name="ruangan"
                        id="ruangan">
                        <option disabled value={"pilih ruangan"}>
                           pilih ruangan
                        </option>
                        {ruangan.data !== null &&
                           ruangan.data?.map((mt) => (
                              <option key={mt.id} value={mt.name}>
                                 {mt.name}
                              </option>
                           ))}
                     </Chakra.Select>
                  </Chakra.FormControl>
                  <Chakra.FormControl>
                     <Chakra.FormLabel htmlFor="dosen">dosen</Chakra.FormLabel>
                     <Chakra.Select
                        onChange={handleChange}
                        defaultValue={"pilih dosen pengajar"}
                        name="dosen"
                        id="dosen">
                        <option disabled value={"pilih dosen pengajar"}>
                           pilih dosen pengajar
                        </option>
                        {dosen.data !== null &&
                           dosen.data?.map((mt) => (
                              <option key={mt.id} value={mt.nik}>
                                 {mt.name}
                              </option>
                           ))}
                     </Chakra.Select>
                  </Chakra.FormControl>
                  <Chakra.FormControl>
                     <Chakra.FormLabel htmlFor="waktu">waktu</Chakra.FormLabel>
                     <Chakra.Select
                        onChange={handleChange}
                        defaultValue={"pilih waktu perkuliahan"}
                        name="waktu"
                        id="waktu">
                        <option disabled value={"pilih waktu perkuliahan"}>
                           pilih waktu perkuliahan
                        </option>
                        {waktu.data !== null &&
                           waktu.data?.map((mt) => (
                              <option key={mt.id} value={mt.id}>
                                 {mt.waktu_mulai} - {mt.waktu_berakhir}
                              </option>
                           ))}
                     </Chakra.Select>
                  </Chakra.FormControl>
                  <Chakra.FormControl>
                     <Chakra.FormLabel htmlFor="hari">hari</Chakra.FormLabel>
                     <Chakra.Input
                        type="text"
                        name="hari"
                        id="hari"
                        onChange={handleChange}
                     />
                  </Chakra.FormControl>
                  <Chakra.Button colorScheme="linkedin" type="submit">
                     submit
                  </Chakra.Button>
               </Chakra.Stack>
            </form>
         </ModalDefault>
      </ContentLayout>
   );
};

export default DetailJadwal;
