import { ContentLayout } from "../../components";
import * as Chakra from "@chakra-ui/react";
import { useFetch } from "../../helpers";
import { useState } from "react";
import { toastConfig } from "../../constant/app";
import { useEffect } from "react";

function AddMahasiswa() {
   const { postData, getDatas, data } = useFetch();
   const kelas = useFetch();
   const [isLoading, setLoading] = useState(false);
   const [changeValueMahasiswa, setChangeValueMahasiswa] = useState({});
   const [changeValueWaliMahasiswa, setChangeValueWaliMahasiswa] = useState({});
   // upload with csv
   const [file, setFile] = useState(null);
   const { isOpen, onOpen, onClose } = Chakra.useDisclosure();

   const toast = Chakra.useToast({
      title: "Status Pendaftaran",
      ...toastConfig,
   });

   const handleChangeMahasiswa = (e) => {
      setChangeValueMahasiswa({
         ...changeValueMahasiswa,
         [e.target.name]: e.target.value,
      });
   };

   const handleChangeWaliMahasiswa = (e) => {
      setChangeValueWaliMahasiswa({
         ...changeValueWaliMahasiswa,
         [e.target.name]: e.target.value,
      });
   };

   // function submit with csv
   function handleSubmitFileCsv(e) {
      e.preventDefault();
      postData(
         "/mahasiswa/upload/csv",
         { file },
         {
            "Content-Type": "multipart/form-data",
         }
      );
   }

   function handleSubmit(e) {
      e.preventDefault();
      setLoading(true);

      postData("/mahasiswa", {
         mahasiswa: changeValueMahasiswa,
         waliMahasiswa: changeValueWaliMahasiswa,
      })
         .then((res) => {
            if (res.status === 200) {
               e.target.reset();
               toast({
                  description: "mahasiswa berhasil didaftarkan",
                  status: "success",
               });
            }

            if (res.status >= 400) {
               toast({
                  description: res.data.data?.error,
                  status: "error",
               });
            }
         })
         .catch((err) => {
            toast({
               description: err.response.data?.error,
               status: "error",
            });
         })
         .finally(() => {
            setLoading(false);
         });
   }

   useEffect(() => {
      getDatas("/jurusan");
      kelas.getDatas("/kelas");
   }, []);

   return (
      <ContentLayout title="Add Mahasiswa">
         <Chakra.Button onClick={onOpen} colorScheme="whatsapp" alignSelf="end">
            Add With CSV
         </Chakra.Button>
         <Chakra.Modal isOpen={isOpen} onClose={onClose}>
            <Chakra.ModalOverlay />
            <Chakra.ModalContent>
               <Chakra.ModalCloseButton />
               <Chakra.ModalBody>
                  <form onSubmit={handleSubmitFileCsv}>
                     <Chakra.Stack spacing="4">
                        <Chakra.FormControl>
                           <Chakra.Input
                              type="file"
                              name="file"
                              id="file"
                              border="none"
                              px="2"
                              py="1"
                              accept=".csv"
                              onChange={(e) => setFile(e.target.files[0])}
                           />
                           <Chakra.FormHelperText>
                              Max Size 2MB | ext file .csv
                           </Chakra.FormHelperText>
                        </Chakra.FormControl>
                        <Chakra.Button
                           type="submit"
                           isLoading={isLoading}
                           loadingText="loading..."
                           colorScheme="linkedin">
                           Upload
                        </Chakra.Button>
                     </Chakra.Stack>
                  </form>
               </Chakra.ModalBody>
            </Chakra.ModalContent>
         </Chakra.Modal>
         <Chakra.VStack>
            <form onSubmit={handleSubmit}>
               <Chakra.Stack spacing={8} mt={5}>
                  <Chakra.HStack
                     direction={{ base: "column", md: "row" }}
                     align="start"
                     spacing="6">
                     <Chakra.VStack w={{ base: "100%", md: "50%" }}>
                        {/* form input mahasiswa */}
                        <Chakra.Heading fontSize={20} my={3}>
                           Data Mahasiswa
                        </Chakra.Heading>
                        <Chakra.HStack w="full">
                           <Chakra.Input
                              placeholder="nim"
                              type="text"
                              name="nim"
                              isRequired
                              onChange={handleChangeMahasiswa}
                           />
                           <Chakra.Input
                              placeholder="nama"
                              type="text"
                              name="name"
                              isRequired
                              onChange={handleChangeMahasiswa}
                           />
                        </Chakra.HStack>
                        <Chakra.HStack w="full">
                           <Chakra.Input
                              placeholder="no.hanphone"
                              type="text"
                              name="phone"
                              isRequired
                              onChange={handleChangeMahasiswa}
                           />
                           <Chakra.Input
                              placeholder="7"
                              type="number"
                              name="semester"
                              isRequired
                              onChange={handleChangeMahasiswa}
                           />
                        </Chakra.HStack>
                        <Chakra.HStack w="full">
                           <Chakra.FormControl>
                              <Chakra.Select
                                 onChange={handleChangeMahasiswa}
                                 name="kelas"
                                 defaultValue="pilih kelas">
                                 <option disabled>pilih kelas</option>
                                 {kelas.data?.map((kelas) => (
                                    <option value={kelas.name} key={kelas.id}>
                                       {kelas.name}
                                    </option>
                                 ))}
                              </Chakra.Select>
                           </Chakra.FormControl>
                           <Chakra.FormControl>
                              <Chakra.Select
                                 onChange={handleChangeMahasiswa}
                                 name="jurusan"
                                 defaultValue="pilih jurusan">
                                 <option disabled>pilih jurusan</option>
                                 {data?.map((jurusan) => (
                                    <option
                                       value={jurusan.name}
                                       key={jurusan.id}>
                                       {jurusan.name}
                                    </option>
                                 ))}
                              </Chakra.Select>
                           </Chakra.FormControl>
                        </Chakra.HStack>
                        <Chakra.HStack w="full">
                           <Chakra.Input
                              placeholder="tahun angkatan"
                              type="text"
                              name="tahun"
                              isRequired
                              onChange={handleChangeMahasiswa}
                           />
                           <Chakra.Input
                              placeholder="email"
                              type="email"
                              name="email"
                              isRequired
                              onChange={handleChangeMahasiswa}
                           />
                        </Chakra.HStack>
                        <Chakra.Input
                           placeholder="Blora, 17 Agustus 1999"
                           type="text"
                           name="born"
                           isRequired
                           onChange={handleChangeMahasiswa}
                        />
                        <Chakra.HStack w="full">
                           <Chakra.Input
                              placeholder="provinsi"
                              type="text"
                              name="provinsi"
                              isRequired
                              onChange={handleChangeMahasiswa}
                           />
                           <Chakra.Input
                              placeholder="kota"
                              type="text"
                              name="kota"
                              isRequired
                              onChange={handleChangeMahasiswa}
                           />
                        </Chakra.HStack>
                        <Chakra.Textarea
                           type="text"
                           required
                           name="alamat"
                           placeholder="alamat lengkap"
                           id="alamat"
                           isRequired
                           onChange={handleChangeMahasiswa}
                        />
                     </Chakra.VStack>
                     {/* form input wali mahasiswa */}
                     <Chakra.VStack w={{ base: "200%", md: "50%" }}>
                        {/* form input mahasiswa */}
                        <Chakra.Heading fontSize={20} my={3}>
                           Data Wali Mahasiswa
                        </Chakra.Heading>
                        <Chakra.HStack w="full">
                           <Chakra.Input
                              placeholder="nama wali"
                              type="text"
                              name="name"
                              onChange={handleChangeWaliMahasiswa}
                           />
                           <Chakra.Input
                              placeholder="phone wali"
                              type="text"
                              name="phone"
                              onChange={handleChangeWaliMahasiswa}
                           />
                        </Chakra.HStack>
                        <Chakra.Textarea
                           type="text"
                           placeholder="alamat lengkap"
                           required
                           name="alamat"
                           onChange={handleChangeWaliMahasiswa}
                        />
                        <Chakra.HStack w="full">
                           <Chakra.Input
                              placeholder="provinsi"
                              type="text"
                              name="provinsi"
                              onChange={handleChangeWaliMahasiswa}
                           />
                           <Chakra.Input
                              placeholder="kota"
                              type="text"
                              name="kota"
                              onChange={handleChangeWaliMahasiswa}
                           />
                        </Chakra.HStack>
                     </Chakra.VStack>
                  </Chakra.HStack>
                  <Chakra.Button
                     isLoading={isLoading}
                     loadingText="Loading..."
                     type="submit"
                     colorScheme="linkedin"
                     minW="140px"
                     alignSelf="flex-end">
                     Tambahkan
                  </Chakra.Button>
               </Chakra.Stack>
            </form>
         </Chakra.VStack>
      </ContentLayout>
   );
}

export default AddMahasiswa;
