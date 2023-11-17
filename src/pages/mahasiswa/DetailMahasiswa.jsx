import { useState } from "react";
import { ContentLayout, ModalConfirm } from "../../components";
import { useFetch, useMahasiswa } from "../../helpers";
import * as Chakra from "@chakra-ui/react";
import { toastConfig } from "../../constant/app";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import HasilStudiMahasiswa from "./HasilStudiMahasiswa";

const navigates = ["detail", "hasil studi"];

const DetailMahasiswa = () => {
   const { updateData, deleteData } = useFetch();
   const [isLoading, setLoading] = useState(false);
   const [changeValueMahasiswa, setChangeValueMahasiswa] = useState({});
   const [changeValueWaliMahasiswa, setChangeValueWaliMahasiswa] = useState({});
   const params = useParams();
   const [activeContent, setActiveContent] = useState(navigates[0]);
   const { isOpen, onOpen, onClose } = Chakra.useDisclosure();
   const navigate = useNavigate();

   const toast = Chakra.useToast({
      title: "Status Mahasiswa",
      ...toastConfig,
   });
   const {
      mahasiswa,
      getMahasiswa,
      waliMahasiswa,
      mahasiswaIsLoading,
      hasilStudi,
   } = useMahasiswa();
   const jurusan = useFetch();

   const handleDeleteMahasiswa = () => {
      deleteData("/mahasiswa/" + mahasiswa.nim)
         .then((res) => {
            if (res.status === 200) {
               onClose();
               toast({
                  description: "berhasil menghapus data",
                  status: "success",
               });
               navigate("/mahasiswa", { replace: true });
            }
         })
         .catch((err) => {
            toast({
               description: err.response.data.error,
               status: "success",
            });
         });
   };

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
   function handleSubmit(e) {
      e.preventDefault();
      setLoading(true);

      updateData(`/mahasiswa/${mahasiswa.id}?author=admin`, {
         mahasiswa: { id: mahasiswa.id, ...changeValueMahasiswa },
         waliMahasiswa: { id: waliMahasiswa.id, ...changeValueWaliMahasiswa },
      })
         .then((res) => {
            if (res.status === 200) {
               toast({
                  description: "data mahasiswa berhasil di update",
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
      getMahasiswa("/" + params.id);
      jurusan.getDatas("/jurusan");
   }, []);
   return (
      <ContentLayout title="Detail Mahasiswa">
         <Chakra.HStack justify="space-between">
            <Chakra.HStack gap="4">
               {navigates.map((item, i) => (
                  <Chakra.Button
                     variant="unstyled"
                     textTransform="capitalize"
                     onClick={() => setActiveContent(item.toLocaleLowerCase())}
                     key={i}>
                     {item}
                  </Chakra.Button>
               ))}
            </Chakra.HStack>
            {/* danger delete mahasiswa */}
            <Chakra.Button
               gap="4"
               alignSelf="end"
               onClick={onOpen}
               colorScheme="red">
               <Chakra.Icon as={AiFillDelete} />
               Hapus Mahasiswa
            </Chakra.Button>
            {/* modal confirm delete mahasiswa */}
            <ModalConfirm
               onClose={onClose}
               isOpen={isOpen}
               handleDelete={handleDeleteMahasiswa}
               title={"Apakah anada ingin menghapus mahasiswa"}
            />
         </Chakra.HStack>

         {mahasiswaIsLoading ? (
            <Chakra.Stack>
               <Chakra.Skeleton h="12" />
               <Chakra.Skeleton h="12" />
               <Chakra.Skeleton h="12" />
               <Chakra.Skeleton h="12" />
            </Chakra.Stack>
         ) : (
            <>
               {activeContent === navigates[0] && (
                  <Chakra.VStack w="full">
                     <form onSubmit={handleSubmit} style={{ minWidth: "100%" }}>
                        <Chakra.Stack spacing={8} mt={5}>
                           <Chakra.Stack
                              display="flex"
                              direction={{ base: "column", md: "row" }}
                              spacing="6">
                              <Chakra.VStack w={{ md: "50%" }}>
                                 {/* form input mahasiswa */}
                                 <Chakra.Heading fontSize={20} my={3}>
                                    Data Mahasiswa
                                 </Chakra.Heading>
                                 <Chakra.HStack w="full">
                                    <Chakra.FormControl>
                                       <Chakra.FormLabel htmlFor="nim">
                                          NIM
                                       </Chakra.FormLabel>
                                       <Chakra.Input
                                          placeholder="nim"
                                          type="text"
                                          name="nim"
                                          defaultValue={mahasiswa?.nim}
                                          onChange={handleChangeMahasiswa}
                                       />
                                    </Chakra.FormControl>
                                    <Chakra.FormControl>
                                       <Chakra.FormLabel htmlFor="name">
                                          Nama
                                       </Chakra.FormLabel>
                                       <Chakra.Input
                                          placeholder="nama"
                                          type="text"
                                          name="name"
                                          defaultValue={mahasiswa?.name}
                                          onChange={handleChangeMahasiswa}
                                       />
                                    </Chakra.FormControl>
                                 </Chakra.HStack>
                                 <Chakra.FormControl>
                                    <Chakra.FormLabel htmlFor="password">
                                       Password
                                    </Chakra.FormLabel>
                                    <Chakra.Input
                                       placeholder="password"
                                       type="password"
                                       name="password"
                                       id="password"
                                       defaultValue={mahasiswa?.password}
                                       onChange={handleChangeMahasiswa}
                                    />
                                 </Chakra.FormControl>
                                 <Chakra.HStack w="full">
                                    <Chakra.FormControl>
                                       <Chakra.FormLabel htmlFor="phone">
                                          No Hanphone
                                       </Chakra.FormLabel>
                                       <Chakra.Input
                                          placeholder="no.hanphone"
                                          type="text"
                                          defaultValue={mahasiswa?.phone}
                                          name="phone"
                                          onChange={handleChangeMahasiswa}
                                       />
                                    </Chakra.FormControl>
                                    <Chakra.FormControl>
                                       <Chakra.FormLabel htmlFor="semester">
                                          Semester
                                       </Chakra.FormLabel>
                                       <Chakra.Input
                                          placeholder="semester"
                                          type="text"
                                          name="semester"
                                          defaultValue={mahasiswa?.semester}
                                          onChange={handleChangeMahasiswa}
                                       />
                                    </Chakra.FormControl>
                                 </Chakra.HStack>
                                 <Chakra.HStack w="full">
                                    <Chakra.FormControl>
                                       <Chakra.FormLabel htmlFor="kelas">
                                          Kelas
                                       </Chakra.FormLabel>
                                       <Chakra.Input
                                          placeholder="kelas"
                                          type="text"
                                          name="kelas"
                                          defaultValue={mahasiswa?.kelas}
                                          onChange={handleChangeMahasiswa}
                                       />
                                    </Chakra.FormControl>
                                    <Chakra.FormControl>
                                       <Chakra.FormLabel htmlFor="jurusan">
                                          Jurusan
                                       </Chakra.FormLabel>
                                       <Chakra.Select
                                          onChange={handleChangeMahasiswa}
                                          name="jurusan"
                                          defaultValue={
                                             mahasiswa !== null &&
                                             mahasiswa?.jurusan
                                          }>
                                          <option disabled>
                                             {mahasiswa?.jurusan}
                                          </option>
                                          {jurusan.data !== null &&
                                             jurusan.data?.map((jr) => (
                                                <option
                                                   value={jr.name}
                                                   key={jr.id}>
                                                   {jr.name}
                                                </option>
                                             ))}
                                       </Chakra.Select>
                                    </Chakra.FormControl>
                                 </Chakra.HStack>
                                 <Chakra.HStack w="full">
                                    <Chakra.FormControl>
                                       <Chakra.FormLabel htmlFor="tahun">
                                          tahun angkatan
                                       </Chakra.FormLabel>
                                       <Chakra.Input
                                          placeholder="tahun angkatan"
                                          name="tahun"
                                          id="tahun"
                                          defaultValue={mahasiswa?.tahun}
                                          onChange={handleChangeMahasiswa}
                                       />
                                    </Chakra.FormControl>
                                    <Chakra.FormControl>
                                       <Chakra.FormLabel htmlFor="email">
                                          Email
                                       </Chakra.FormLabel>
                                       <Chakra.Input
                                          placeholder="email"
                                          type="email"
                                          name="email"
                                          defaultValue={mahasiswa?.email}
                                          onChange={handleChangeMahasiswa}
                                       />
                                    </Chakra.FormControl>
                                 </Chakra.HStack>
                                 <Chakra.FormControl>
                                    <Chakra.FormLabel htmlFor="born">
                                       Tgl lahir
                                    </Chakra.FormLabel>
                                    <Chakra.Input
                                       placeholder="Blora, 17 Agustus 1999"
                                       type="text"
                                       name="born"
                                       defaultValue={mahasiswa?.born}
                                       onChange={handleChangeMahasiswa}
                                    />
                                 </Chakra.FormControl>
                                 <Chakra.HStack w="full">
                                    <Chakra.FormControl>
                                       <Chakra.FormLabel htmlFor="provinsi-mhs">
                                          Provinsi
                                       </Chakra.FormLabel>
                                       <Chakra.Input
                                          placeholder="provinsi"
                                          type="text"
                                          id="provinsi-mhs"
                                          name="provinsi"
                                          defaultValue={mahasiswa?.provinsi}
                                          onChange={handleChangeMahasiswa}
                                       />
                                    </Chakra.FormControl>
                                    <Chakra.FormControl>
                                       <Chakra.FormLabel htmlFor="kota-mhs">
                                          Kota
                                       </Chakra.FormLabel>
                                       <Chakra.Input
                                          placeholder="kota"
                                          type="text"
                                          name="kota"
                                          id="kota-mhs"
                                          defaultValue={mahasiswa?.kota}
                                          onChange={handleChangeMahasiswa}
                                       />
                                    </Chakra.FormControl>
                                 </Chakra.HStack>
                                 <Chakra.FormControl>
                                    <Chakra.FormLabel htmlFor="alamat-mhs">
                                       Alamat
                                    </Chakra.FormLabel>
                                    <Chakra.Textarea
                                       type="text"
                                       required
                                       name="alamat"
                                       placeholder="alamat lengkap"
                                       id="alamat-mhs"
                                       defaultValue={mahasiswa?.alamat}
                                       onChange={handleChangeMahasiswa}
                                    />
                                 </Chakra.FormControl>
                              </Chakra.VStack>
                              {/* form input wali mahasiswa */}
                              {waliMahasiswa !== null ? (
                                 <Chakra.VStack w={{ base: "200%", md: "50%" }}>
                                    {/* form input mahasiswa */}
                                    <Chakra.Heading fontSize={20} my={3}>
                                       Data Wali Mahasiswa
                                    </Chakra.Heading>
                                    <Chakra.HStack w="full">
                                       <Chakra.FormControl>
                                          <Chakra.FormLabel htmlFor="name-wali">
                                             Nama
                                          </Chakra.FormLabel>
                                          <Chakra.Input
                                             placeholder="nama wali"
                                             type="text"
                                             name="name"
                                             id="name-wali"
                                             defaultValue={waliMahasiswa?.name}
                                             onChange={
                                                handleChangeWaliMahasiswa
                                             }
                                          />
                                       </Chakra.FormControl>
                                       <Chakra.FormControl>
                                          <Chakra.FormLabel htmlFor="phone-wali">
                                             No.Handphone
                                          </Chakra.FormLabel>
                                          <Chakra.Input
                                             placeholder="phone wali"
                                             type="text"
                                             name="phone"
                                             id="phone-wali"
                                             defaultValue={waliMahasiswa?.phone}
                                             onChange={
                                                handleChangeWaliMahasiswa
                                             }
                                          />
                                       </Chakra.FormControl>
                                    </Chakra.HStack>
                                    <Chakra.FormControl>
                                       <Chakra.FormLabel htmlFor="alamat-wali">
                                          Alamat wali
                                       </Chakra.FormLabel>
                                       <Chakra.Textarea
                                          type="text"
                                          placeholder="alamat lengkap"
                                          required
                                          name="alamat"
                                          id="alamat-wali"
                                          defaultValue={waliMahasiswa?.alamat}
                                          onChange={handleChangeWaliMahasiswa}
                                       />
                                    </Chakra.FormControl>
                                    <Chakra.HStack w="full">
                                       <Chakra.FormControl>
                                          <Chakra.FormLabel htmlFor="provinsi-wali">
                                             Provinsi
                                          </Chakra.FormLabel>
                                          <Chakra.Input
                                             placeholder="provinsi"
                                             type="text"
                                             name="provinsi"
                                             id="provinsi-wali"
                                             defaultValue={
                                                waliMahasiswa?.provinsi
                                             }
                                             onChange={
                                                handleChangeWaliMahasiswa
                                             }
                                          />
                                       </Chakra.FormControl>
                                       <Chakra.FormControl>
                                          <Chakra.FormLabel htmlFor="kota-wali">
                                             Kota
                                          </Chakra.FormLabel>
                                          <Chakra.Input
                                             placeholder="kota"
                                             type="text"
                                             name="kota"
                                             id="kota-wali"
                                             defaultValue={waliMahasiswa?.kota}
                                             onChange={
                                                handleChangeWaliMahasiswa
                                             }
                                          />
                                       </Chakra.FormControl>
                                    </Chakra.HStack>
                                 </Chakra.VStack>
                              ) : (
                                 <Chakra.Stack
                                    align="center"
                                    dsiplay="flex"
                                    justify="center">
                                    <Chakra.Heading
                                       alignSelf="center"
                                       justifySelf="center"
                                       fontSize="20"
                                       color="blackAlpha.700">
                                       Data Ortu belum tersedia
                                    </Chakra.Heading>
                                 </Chakra.Stack>
                              )}
                           </Chakra.Stack>
                           <Chakra.Button
                              isLoading={isLoading}
                              loadingText="Loading..."
                              type="submit"
                              colorScheme="yellow"
                              minW="140px"
                              gap="3"
                              alignSelf="flex-end">
                              <Chakra.Icon as={AiOutlineEdit} />
                              Update
                           </Chakra.Button>
                        </Chakra.Stack>
                     </form>
                  </Chakra.VStack>
               )}
               {activeContent === navigates[1] && (
                  <HasilStudiMahasiswa data={hasilStudi} />
               )}
            </>
         )}
      </ContentLayout>
   );
};

export default DetailMahasiswa;
