import { ContentLayout } from "../../../components";
import * as Chakra from "@chakra-ui/react";
import { useFetch } from "../../../helpers";
import { useEffect, useState } from "react";
import { toastConfig } from "../../../constant/app";

// menambahkan pembayaran
const UploadPembayaran = () => {
   const tahun = useFetch();
   const [changeValue, setChangeValue] = useState({});
   const [isLoading, setLoading] = useState(false);
   const toast = Chakra.useToast({
      title: "pembayaran status",
      ...toastConfig,
   });
   // main form function
   const { postData } = useFetch();

   const handleChange = (e) => {
      setChangeValue({ ...changeValue, [e.target.name]: e.target.value });
   };

   function handleSubmit(e) {
      e.preventDefault();
      setLoading(true);
      postData("/pembayaran", changeValue)
         .then((res) => {
            if (res.status === 200) {
               e.target.reset();
               toast({
                  description: "pembayaran berhasil dibuat",
                  status: "success",
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
      tahun.getDatas("/tahun");
   }, []);
   return (
      <ContentLayout title="Tambah Pembayaran">
         <form onSubmit={handleSubmit}>
            <Chakra.VStack spacing="4">
               <Chakra.FormControl isRequired>
                  <Chakra.FormLabel>jumlah</Chakra.FormLabel>
                  <Chakra.HStack gap="3">
                     <Chakra.Text size="sm" color="blackAlpha.600">
                        Rp.
                     </Chakra.Text>
                     <Chakra.Input
                        onChange={handleChange}
                        type="number"
                        name="jumlah"
                        placeholder="200000"
                     />
                  </Chakra.HStack>
                  <Chakra.FormHelperText color="blackAlpha.600">
                     tidak memakai titik (.)
                  </Chakra.FormHelperText>
               </Chakra.FormControl>
               <Chakra.FormControl isRequired>
                  <Chakra.FormLabel>Semester</Chakra.FormLabel>
                  <Chakra.Select
                     onChange={handleChange}
                     name="semester"
                     defaultValue="pilih semester">
                     <option disabled value="pilih semester">
                        pilih semester
                     </option>
                     <option value="ganjil">Ganjil</option>
                     <option value="genap">Genap</option>
                  </Chakra.Select>
               </Chakra.FormControl>
               {tahun.fetchIsLoading ? (
                  <Chakra.Skeleton h="10" />
               ) : (
                  tahun.data !== null && (
                     <Chakra.FormControl isRequired>
                        <Chakra.FormLabel>Tahun</Chakra.FormLabel>
                        <Chakra.Select
                           onChange={handleChange}
                           type="number"
                           name="tahun"
                           defaultValue="pilih tahun akademik">
                           <option disabled value="pilih tahun akademik">
                              pilih tahun akademik
                           </option>
                           {tahun.data.map((th) => (
                              <option value={th.id} key={th.id}>
                                 {th.tahun_mulai}/{th.tahun_akhir}
                              </option>
                           ))}
                        </Chakra.Select>
                     </Chakra.FormControl>
                  )
               )}
               <Chakra.Button
                  type="submit"
                  colorScheme="linkedin"
                  isLoading={isLoading}
                  loadingText="loading..."
                  alignSelf="end"
                  isDisabled={isLoading}>
                  Tambah
               </Chakra.Button>
            </Chakra.VStack>
         </form>
      </ContentLayout>
   );
};

export default UploadPembayaran;
