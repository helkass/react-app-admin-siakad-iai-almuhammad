import * as Chakra from "@chakra-ui/react";
import { ContentLayout, TableLoader } from "../../components";
import { useEffect, useRef, useState } from "react";
import { apiClient } from "../../api/apiClient";
import { FiSearch } from "react-icons/fi";
import { ImLink } from "react-icons/im";
import { Link } from "react-router-dom";

const Mahasiswa = () => {
   const [current, setCurrent] = useState(0);
   const [nextPage, setNextPage] = useState(30);
   const [data, setData] = useState(null);
   const [records, setRecords] = useState([]);
   const [isLoading, setLoading] = useState(false);
   const { isOpen, onOpen, onClose } = Chakra.useDisclosure();
   const btnModalRef = useRef();

   const query = {
      name: "",
      jurusan: "",
      tahun: "",
      kota: "",
      nim: "",
      kelas: "",
      semester: "",
   };

   const params = new URLSearchParams();

   function fetchData() {
      setLoading(true);
      apiClient
         .get("/mahasiswa", {
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

   const handleAdvanceSearch = (e) => {
      e.preventDefault();
      if (query.tahun.length > 0) {
         params.append("tahun", query.tahun);
      }

      if (query.kota.length > 0) {
         params.append("kota", query.kota);
      }
      if (query.jurusan.length > 0) {
         params.append("jurusan", query.jurusan);
      }

      if (query.nim.length > 0) {
         params.append("nim", query.nim);
      }

      if (query.kelas.length > 0) {
         params.append("kelas", query.kelas);
      }

      if (query.semester.length > 0) {
         params.append("semester", query.semester);
      }

      apiClient
         .get("/mahasiswa", {
            params: params,
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
   };

   const handleNextPage = () => {
      setCurrent((prev) => prev + 20);
      setNextPage((prev) => prev + 20);
   };

   const handlePrevPage = () => {
      setCurrent((prev) => prev - 20);
      setNextPage((prev) => prev - 20);
   };
   return (
      <Chakra.Stack>
         <ContentLayout title="Daftar Mahasiswa">
            <Link to="add">
               <Chakra.Button float="right" colorScheme="linkedin">
                  Add Mahasiswa
               </Chakra.Button>
            </Link>
            <Chakra.HStack justify="space-between">
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
               {/* button modal filter drawer */}
               <Chakra.Button ref={btnModalRef} onClick={onOpen}>
                  Filter
               </Chakra.Button>
            </Chakra.HStack>
            {/* modal drawer filter */}
            <Chakra.Drawer
               isOpen={isOpen}
               placement="right"
               onClose={onClose}
               finalFocusRef={btnModalRef}>
               <Chakra.DrawerOverlay />
               <Chakra.DrawerContent>
                  <Chakra.DrawerCloseButton />
                  <Chakra.DrawerHeader mb="5">
                     Filter / Search
                  </Chakra.DrawerHeader>

                  <Chakra.DrawerBody>
                     <form onSubmit={handleAdvanceSearch}>
                        <Chakra.Stack spacing="5">
                           <Chakra.FormControl>
                              <Chakra.FormLabel htmlFor="semester">
                                 semester
                              </Chakra.FormLabel>
                              <Chakra.Input
                                 name="semester"
                                 id="semester"
                                 onChange={(e) =>
                                    (query.semester = e.target.value)
                                 }
                              />
                           </Chakra.FormControl>
                           <Chakra.FormControl>
                              <Chakra.FormLabel htmlFor="tahun">
                                 tahun
                              </Chakra.FormLabel>
                              <Chakra.Input
                                 max={new Date().getFullYear()}
                                 name="tahun"
                                 id="tahun"
                                 onChange={(e) =>
                                    (query.tahun = e.target.value)
                                 }
                              />
                           </Chakra.FormControl>
                           <Chakra.FormControl>
                              <Chakra.FormLabel htmlFor="jurusan">
                                 jurusan
                              </Chakra.FormLabel>
                              <Chakra.Input
                                 name="jurusan"
                                 id="jurusan"
                                 onChange={(e) =>
                                    (query.jurusan = e.target.value)
                                 }
                              />
                           </Chakra.FormControl>
                           <Chakra.FormControl>
                              <Chakra.FormLabel htmlFor="kota">
                                 kota
                              </Chakra.FormLabel>
                              <Chakra.Input
                                 name="kota"
                                 id="kota"
                                 onChange={(e) => (query.kota = e.target.value)}
                              />
                           </Chakra.FormControl>
                           <Chakra.FormControl>
                              <Chakra.FormLabel htmlFor="nim">
                                 nim
                              </Chakra.FormLabel>
                              <Chakra.Input
                                 name="nim"
                                 id="nim"
                                 onChange={(e) => (query.nim = e.target.value)}
                              />
                           </Chakra.FormControl>
                           <Chakra.Button type="submit">Cari</Chakra.Button>
                        </Chakra.Stack>
                     </form>
                  </Chakra.DrawerBody>
               </Chakra.DrawerContent>
            </Chakra.Drawer>
            {/* end drawer form filter */}
            {isLoading ? (
               <TableLoader />
            ) : (
               <Chakra.TableContainer mt="5">
                  <Chakra.Table variant="striped">
                     <Chakra.Thead>
                        <Chakra.Tr>
                           <Chakra.Th>Nama</Chakra.Th>
                           <Chakra.Th>NIM</Chakra.Th>
                           <Chakra.Th>Kelas</Chakra.Th>
                           <Chakra.Th>jurusan</Chakra.Th>
                           <Chakra.Th>semester</Chakra.Th>
                           <Chakra.Th>Tahun</Chakra.Th>
                           <Chakra.Th>Email</Chakra.Th>
                           <Chakra.Th>Phone</Chakra.Th>
                           <Chakra.Th>Detail</Chakra.Th>
                        </Chakra.Tr>
                     </Chakra.Thead>
                     <Chakra.Tbody>
                        {records?.slice(current, nextPage).map((mhs) => (
                           <Chakra.Tr key={mhs.id}>
                              <Chakra.Td>{mhs.name}</Chakra.Td>
                              <Chakra.Td>{mhs.nim}</Chakra.Td>
                              <Chakra.Td>{mhs.kelas}</Chakra.Td>
                              <Chakra.Td>{mhs.jurusan}</Chakra.Td>
                              <Chakra.Td>{mhs.semester}</Chakra.Td>
                              <Chakra.Td>{mhs.tahun}</Chakra.Td>
                              <Chakra.Td>{mhs.email}</Chakra.Td>
                              <Chakra.Td>{mhs.phone}</Chakra.Td>
                              <Chakra.Td>
                                 <Link to={`${mhs.nim}`}>
                                    <Chakra.Button size="sm">
                                       <Chakra.Icon as={ImLink} />
                                    </Chakra.Button>
                                 </Link>
                              </Chakra.Td>
                           </Chakra.Tr>
                        ))}
                     </Chakra.Tbody>
                  </Chakra.Table>
               </Chakra.TableContainer>
            )}
            {/* buttons paggination */}
            <Chakra.HStack fontSize="sm" alignSelf="end" mt="5" mb="12" gap="4">
               <Chakra.Button
                  isDisabled={current <= 20}
                  onClick={handlePrevPage}>
                  Prev
               </Chakra.Button>
               {!isLoading && (
                  <Chakra.Button
                     isDisabled={current > records.length || current < 20}
                     onClick={handleNextPage}>
                     Next
                  </Chakra.Button>
               )}
            </Chakra.HStack>
         </ContentLayout>
      </Chakra.Stack>
   );
};

export default Mahasiswa;
