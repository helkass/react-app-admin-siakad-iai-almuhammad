import * as Chakra from "@chakra-ui/react";
import { useFetch } from "../../helpers";
import { useEffect, useState } from "react";
import { ModalConfirm, TableLoader, ContentLayout } from "../../components";
import { RxDownload } from "react-icons/rx";
import { toastConfig } from "../../constant/app";
import { AiFillDelete } from "react-icons/ai";
import { triggerBase64Download } from "react-base64-downloader";
import * as base64Converter from "../../utils/base64Converter";

const RencanaStudi = () => {
   const { fetchIsLoading, data, getDatas, deleteData, postData } = useFetch();
   const [selectToDelete, setSelectToDelete] = useState(null);
   const { isOpen, onClose, onOpen } = Chakra.useDisclosure();
   const [formData, setFormData] = useState({});
   const addDisClosure = Chakra.useDisclosure();
   const uploadHasilStudiDisClosure = Chakra.useDisclosure();
   const [isLoading, setLoading] = useState(false);
   const [file, setFile] = useState(null);
   const [nim, setNim] = useState("");

   const toast = Chakra.useToast({
      title: "Delete Status",
      ...toastConfig,
   });

   const year = useFetch();

   function handleDelete() {
      deleteData(`/transkrip/rencana/${selectToDelete.id}`)
         .then((res) => {
            if (res.status === 200) {
               onClose();
               toast({
                  description: "berhasil menghapus data",
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
            getDatas("/transkrip/rencana");
         });
   }

   const handleDownload = (item) => {
      triggerBase64Download(item.file, `krs_${item.nim}`);
   };

   // function add mata kuliah
   function handleSubmit(e) {
      e.preventDefault();
      setLoading(true);

      base64Converter.getBase64(file, async (err, result) => {
         await postData(
            "/transkrip/rencana",
            { nim, file: result },
            { "Content-Type": "application/json" }
         )
            .then((res) => {
               if (res.status === 200) {
                  toast({
                     status: "success",
                     description: "berhasil rencana studi",
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
               getDatas("/transkrip/rencana");
            });
      });
   }

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   function handleUploadHasilStudi(e) {
      e.preventDefault();
      setLoading(true);

      postData(
         "/transkrip/studi/upload",
         { ...formData, file },
         { "Content-Type": "multipart/form-data" }
      )
         .then((res) => {
            if (res.status === 200) {
               toast({
                  status: "success",
                  description: "berhasil menambahkan data hasil studi",
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
   }

   useEffect(() => {
      getDatas("/transkrip/rencana");
      year.getDatas("/tahun");
   }, []);
   return (
      <Chakra.Stack>
         <ContentLayout title="Transkrip Nilai Mahasiswa">
            {/* navigates */}
            <Chakra.HStack gap="6">
               <Chakra.Button onClick={addDisClosure.onOpen}>
                  Upload Rencana Studi
               </Chakra.Button>
               <Chakra.Button onClick={uploadHasilStudiDisClosure.onOpen}>
                  Upload Hasil Studi
               </Chakra.Button>
            </Chakra.HStack>
            {/* modal form upload rencana studi */}
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
                              <Chakra.FormLabel htmlFor="nim">
                                 nim
                              </Chakra.FormLabel>
                              <Chakra.Input
                                 onChange={(e) => setNim(e.target.value)}
                                 name="nim"
                                 id="nim"
                                 type="text"
                              />
                           </Chakra.FormControl>
                           <Chakra.FormControl isRequired>
                              <Chakra.FormLabel htmlFor="file">
                                 file
                              </Chakra.FormLabel>
                              <Chakra.Input
                                 name="file"
                                 onChange={(e) => setFile(e.target.files[0])}
                                 id="file"
                                 type="file"
                                 accept=".pdf"
                              />
                              <Chakra.FormHelperText>
                                 max size 2MB and ext include .pdf
                              </Chakra.FormHelperText>
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
            {/* modal form upload hasil studi */}
            <Chakra.Modal
               isOpen={uploadHasilStudiDisClosure.isOpen}
               onClose={uploadHasilStudiDisClosure.onClose}>
               <Chakra.ModalOverlay />
               <Chakra.ModalContent>
                  <Chakra.ModalCloseButton
                     onClick={uploadHasilStudiDisClosure.onClose}
                  />
                  <Chakra.ModalBody>
                     <form onSubmit={handleUploadHasilStudi}>
                        <Chakra.Stack>
                           <Chakra.FormControl isRequired>
                              <Chakra.FormLabel htmlFor="nim">
                                 nim
                              </Chakra.FormLabel>
                              <Chakra.Input
                                 onChange={handleChange}
                                 name="nim"
                                 id="nim"
                                 type="text"
                              />
                           </Chakra.FormControl>
                           <Chakra.FormControl isRequired>
                              <Chakra.FormLabel htmlFor="file">
                                 file
                              </Chakra.FormLabel>
                              <Chakra.Input
                                 name="file"
                                 onChange={(e) => setFile(e.target.files[0])}
                                 id="file"
                                 type="file"
                                 accept=".csv"
                              />
                              <Chakra.FormHelperText>
                                 max size 2MB and ext include .csv
                              </Chakra.FormHelperText>
                           </Chakra.FormControl>
                           <Chakra.FormControl isRequired>
                              <Chakra.FormLabel htmlFor="nilai">
                                 nilai
                              </Chakra.FormLabel>
                              <Chakra.Input
                                 onChange={handleChange}
                                 name="nilai"
                                 id="nilai"
                                 type="nilai komulatif"
                              />
                              <Chakra.FormHelperText>
                                 nilai komulatif
                              </Chakra.FormHelperText>
                           </Chakra.FormControl>
                           <Chakra.Select
                              name="semester"
                              onChange={handleChange}
                              defaultValue="pilih semester">
                              <option value="pilih semester" disabled>
                                 pilih semester
                              </option>
                              <option value="ganjil">Ganjil</option>
                              <option value="genap">Genap</option>
                           </Chakra.Select>
                           {year.data !== null && (
                              <Chakra.Select
                                 onChange={handleChange}
                                 name="tahun"
                                 defaultValue="pilih tahun">
                                 <option value="pilih tahun" disabled>
                                    pilih tahun
                                 </option>
                                 {year.data?.map((y) => (
                                    <option value={y.id} key={y.id}>
                                       {y.tahun_mulai}/{y.tahun_akhir}
                                    </option>
                                 ))}
                              </Chakra.Select>
                           )}
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
            {/* main contents */}
            <Chakra.TableContainer mt="4">
               {fetchIsLoading ? (
                  <TableLoader />
               ) : (
                  <Chakra.Table variant="striped">
                     <Chakra.Thead>
                        <Chakra.Tr>
                           <Chakra.Th>No.</Chakra.Th>
                           <Chakra.Th>NIM</Chakra.Th>
                           <Chakra.Th>Download</Chakra.Th>
                           <Chakra.Th>Hapus</Chakra.Th>
                        </Chakra.Tr>
                     </Chakra.Thead>
                     <Chakra.Tbody>
                        {data?.map((item, i) => (
                           <Chakra.Tr key={item.id}>
                              <Chakra.Td>{i + 1}</Chakra.Td>
                              <Chakra.Td>{item.nim}</Chakra.Td>
                              <Chakra.Td>
                                 <Chakra.Button
                                    onClick={() => handleDownload(item)}
                                    size="sm"
                                    colorScheme="yellow">
                                    <Chakra.Icon as={RxDownload} />
                                 </Chakra.Button>
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
                  title={`Apakah anda ingin menghapus rencana studi ${selectToDelete?.nim}`}
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

export default RencanaStudi;
