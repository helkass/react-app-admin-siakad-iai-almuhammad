import * as Chakra from "@chakra-ui/react";
import {
   CardSummary,
   ContentLayout,
   ModalConfirm,
   TableLoader,
} from "../../components";
import { BiUserCheck } from "react-icons/bi";
import { BsCardList } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { useFetch } from "../../helpers";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toastConfig } from "../../constant/app";
import { dateFormatIndo } from "../../utils/formatter";

const Beranda = () => {
   const presensi = useFetch();
   const kelas = useFetch();
   const mahasiswa = useFetch();
   const dosen = useFetch();
   const matKul = useFetch();
   const fakultas = useFetch();
   const jurusan = useFetch();
   const kehadiran = useFetch();
   const { isOpen, onOpen, onClose } = Chakra.useDisclosure();

   // handling confirm delete all data kehadiran mahasiswa
   // warn
   const disDeleteKehadiran = Chakra.useDisclosure();
   // id kehadiran for delete single data
   const [idKehadiran, setIdKehadiran] = useState(null);

   const toast = Chakra.useToast(toastConfig);

   // form value create kode presensi
   const [timeKode, setTimeKode] = useState(15);
   const [kelasKode, setKelasKode] = useState("");

   const deleteKodePresensi = (id) => {
      presensi
         .deleteData(`/presensi/kode/${id}`)
         .then((res) => {
            if (res.status === 200) {
               toast({
                  status: "success",
                  description: "berhasil menghapus data",
               });
            }
         })
         .finally(() => {
            presensi.getDatas("/presensi/kode");
         });
   };

   const handleDeleteKehadiran = async () => {
      if (idKehadiran) {
         await kehadiran
            .deleteData(`/presensi/kehadiran/${idKehadiran}`)
            .then((res) => {
               if (res.status === 200) {
                  toast({
                     description: res.data.success,
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
               setIdKehadiran(null);
            });
      } else {
         await kehadiran
            .deleteData(`/presensi/kehadiran`)
            .then((res) => {
               if (res.status === 200) {
                  toast({
                     description: res.data.success,
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
               setIdKehadiran(null);
            });
      }
   };

   function handleCreatePresensi(e) {
      e.preventDefault();

      presensi
         .postData(
            "/presensi/kode",
            { kelas: kelasKode, time: timeKode },
            { "Content-Type": "application/json" }
         )
         .then((res) => {
            if (res.status === 200) {
               toast({
                  description: "berhasil membuat kode",
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
            presensi.getDatas("/presensi/kode");
         });
   }

   useEffect(() => {
      presensi.getDatas("/presensi/kode");
      kelas.getDatas("/kelas");
      mahasiswa.getDatas("/mahasiswa");
      dosen.getDatas("/dosen");
      fakultas.getDatas("/fakultas");
      jurusan.getDatas("/jurusan");
      matKul.getDatas("/matkul");
      kehadiran.getDatas("/presensi/kehadiran");
   }, []);

   return (
      <Chakra.Stack>
         <ContentLayout title="Beranda">
            {/* modal confirm delete data kehadiran */}
            <ModalConfirm
               isOpen={disDeleteKehadiran.isOpen}
               onClose={disDeleteKehadiran.onCLose}
               title="apakah anda ingin menghapus seluruh data kehadiran mahasiswa?"
               handleDelete={handleDeleteKehadiran}
            />
            {/* summary cards */}
            <Chakra.HStack overflowX="hidden">
               <Chakra.HStack overflowX="auto" py="2">
                  <CardSummary
                     isLoading={mahasiswa.fetchIsLoading}
                     title="Mahasiswa"
                     val={mahasiswa?.data?.length}
                     Icon={BiUserCheck}
                  />
                  <CardSummary
                     isLoading={dosen.fetchIsLoading}
                     title="Dosen"
                     val={dosen?.data?.length}
                     Icon={BiUserCheck}
                  />
                  <CardSummary
                     isLoading={matKul.fetchIsLoading}
                     title="Mata Kuliah"
                     val={matKul?.data?.length}
                     Icon={BsCardList}
                  />
                  <CardSummary
                     isLoading={fakultas.fetchIsLoading}
                     title="Fakultas"
                     val={fakultas?.data?.length}
                     Icon={BsCardList}
                  />
                  <CardSummary
                     isLoading={jurusan.fetchIsLoading}
                     title="Jurusan"
                     val={jurusan?.data?.length}
                     Icon={FaListAlt}
                  />
               </Chakra.HStack>
            </Chakra.HStack>
            {/* kode presensi */}
            <Chakra.HStack justify="space-between" mt="5">
               <Chakra.Text color="blackAlpha.600" size="sm">
                  Daftar kode presensi
               </Chakra.Text>
               <Chakra.Button onClick={onOpen}>Buat Kode</Chakra.Button>
            </Chakra.HStack>
            {/* modal create kode presensi */}
            <Chakra.Modal isOpen={isOpen} onClose={onClose}>
               <Chakra.ModalOverlay />
               <Chakra.ModalContent>
                  <Chakra.ModalHeader>Form Kode Presensi</Chakra.ModalHeader>
                  <Chakra.ModalCloseButton />
                  <Chakra.ModalBody>
                     <form onSubmit={handleCreatePresensi}>
                        <Chakra.Stack spacing="5">
                           <Chakra.FormControl>
                              <Chakra.FormLabel htmlFor="kelas">
                                 Kelas
                              </Chakra.FormLabel>
                              <Chakra.Select
                                 defaultValue="pilih kelas"
                                 name="kelas"
                                 onChange={(e) => setKelasKode(e.target.value)}>
                                 <option disabled value="pilih kelas">
                                    pilih kelas
                                 </option>
                                 {kelas.data?.map((kls) => (
                                    <option key={kls.id} value={kls.name}>
                                       {kls.name}
                                    </option>
                                 ))}
                              </Chakra.Select>
                           </Chakra.FormControl>
                           <Chakra.FormControl>
                              <Chakra.FormLabel htmlFor="time">
                                 Waktu
                              </Chakra.FormLabel>
                              <Chakra.Select
                                 name="time"
                                 defaultValue="pilih durasi"
                                 id="time"
                                 onChange={(e) =>
                                    setTimeKode(Number(e.target.value))
                                 }>
                                 <option disabled value="pilih durasi">
                                    pilih durasi
                                 </option>
                                 {durations.map((time, idx) => (
                                    <option key={idx} value={time.time}>
                                       {time.time} minutes
                                    </option>
                                 ))}
                              </Chakra.Select>
                           </Chakra.FormControl>
                           <Chakra.Button
                              type="submit"
                              colorScheme="blue"
                              mr={3}>
                              Create
                           </Chakra.Button>
                        </Chakra.Stack>
                     </form>
                  </Chakra.ModalBody>
               </Chakra.ModalContent>
            </Chakra.Modal>
            {/* lists kode presensi */}
            <Chakra.HStack overflowX="hidden">
               <Chakra.HStack overflowX="auto" py="2">
                  {presensi.fetchIsLoading ? (
                     <Chakra.Skeleton h="16" />
                  ) : (
                     presensi.data?.map((item) => (
                        <Chakra.HStack
                           key={item.id}
                           boxShadow="md"
                           p="2"
                           rounded="sm"
                           gap="5">
                           <Chakra.Stack spacing="3">
                              <Chakra.Text>{item.kode}</Chakra.Text>
                              <Chakra.Text>{item.kelas}</Chakra.Text>
                           </Chakra.Stack>
                           <Chakra.Button
                              isDisabled={kelas.fetchIsLoading}
                              onClick={() => deleteKodePresensi(item.id)}
                              colorScheme="red">
                              <AiFillDelete size={18} />
                           </Chakra.Button>
                        </Chakra.HStack>
                     ))
                  )}
               </Chakra.HStack>
            </Chakra.HStack>
            {/* daftar mahasiswa yang melakukan presensi */}
            {kehadiran.fetchIsLoading ? (
               <TableLoader />
            ) : kehadiran.data !== null && kehadiran.data.length > 0 ? (
               <Chakra.TableContainer mt="6">
                  <Chakra.HStack align="center" justify="space-between">
                     <Chakra.Text color="blackAlpha.600">
                        Daftar presensi mahasiswa
                     </Chakra.Text>
                     <Chakra.Button
                        colorScheme="red"
                        onClick={disDeleteKehadiran.onOpen}>
                        <Chakra.Icon as={AiFillDelete} size={25} />
                        <Chakra.Text>Hapus Data Kehadiran</Chakra.Text>
                     </Chakra.Button>
                  </Chakra.HStack>
                  <Chakra.Table
                     border="1px solid"
                     mt="1"
                     borderColor="gray.100"
                     variant="striped">
                     <Chakra.Thead>
                        <Chakra.Tr>
                           <Chakra.Th>No.</Chakra.Th>
                           <Chakra.Th>NIM</Chakra.Th>
                           <Chakra.Th>Name</Chakra.Th>
                           <Chakra.Th>Kelas</Chakra.Th>
                           <Chakra.Th>Waktu</Chakra.Th>
                        </Chakra.Tr>
                     </Chakra.Thead>
                     <Chakra.Tbody>
                        {kehadiran.data?.map((item, i) => (
                           <Chakra.Tr key={item.id}>
                              <Chakra.Td>{i + 1}</Chakra.Td>
                              <Chakra.Td>{item.nim}</Chakra.Td>
                              <Chakra.Td>{item?.mahasiswa.name}</Chakra.Td>
                              <Chakra.Td>{item?.mahasiswa.kelas}</Chakra.Td>
                              <Chakra.Td>
                                 {dateFormatIndo(item.createdAt)}
                              </Chakra.Td>
                           </Chakra.Tr>
                        ))}
                     </Chakra.Tbody>
                  </Chakra.Table>
               </Chakra.TableContainer>
            ) : (
               <Chakra.VStack mt="3">
                  <Chakra.Heading fontSize={20} textAlign="center">
                     data kehadiran belum tersedia
                  </Chakra.Heading>
               </Chakra.VStack>
            )}
         </ContentLayout>
      </Chakra.Stack>
   );
};

const durations = [
   {
      time: 15,
   },
   {
      time: 30,
   },
   {
      time: 60,
   },
   {
      time: 120,
   },
   {
      time: 1440,
   },
   {
      time: 4320,
   },
];
export default Beranda;
