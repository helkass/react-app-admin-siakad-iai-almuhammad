import * as Chakra from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFetch } from "../../helpers";
import { useEffect } from "react";
import { TableLoader } from "../../components";
import { ImLink } from "react-icons/im";
import { GoDownload } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";
import { triggerBase64Download } from "react-base64-downloader";

const LaporanPembayaran = () => {
   const { fetchIsLoading, getDatas, data } = useFetch();

   const handleDownload = (item) => {
      triggerBase64Download(item.file, `bukti_pembayaran_${item.nim}`);
   };

   useEffect(() => {
      getDatas("/bukti");
   }, []);
   return (
      <Chakra.Stack spacing="4">
         <Chakra.TableContainer>
            {fetchIsLoading ? (
               <TableLoader />
            ) : (
               <Chakra.Table variant="striped">
                  <Chakra.Thead>
                     <Chakra.Tr>
                        <Chakra.Th>No.</Chakra.Th>
                        <Chakra.Th>NIM</Chakra.Th>
                        <Chakra.Th>Catatan</Chakra.Th>
                        <Chakra.Th>Download</Chakra.Th>
                        <Chakra.Th>Detail</Chakra.Th>
                        <Chakra.Th>Hapus</Chakra.Th>
                     </Chakra.Tr>
                  </Chakra.Thead>
                  <Chakra.Tbody>
                     {data?.map((item, i) => (
                        <Chakra.Tr key={item.id}>
                           <Chakra.Td>{i + 1}</Chakra.Td>
                           <Chakra.Td>{item.nim}</Chakra.Td>
                           <Chakra.Td>{item.catatan}</Chakra.Td>
                           <Chakra.Td>
                              <Chakra.Button
                                 onClick={() => handleDownload(item)}
                                 colorScheme="yellow"
                                 size="sm">
                                 <Chakra.Icon as={GoDownload} />
                              </Chakra.Button>
                           </Chakra.Td>
                           <Chakra.Td>
                              <Link to={item.pembayaran}>
                                 <Chakra.Button size="sm">
                                    <Chakra.Icon as={ImLink} />
                                 </Chakra.Button>
                              </Link>
                           </Chakra.Td>
                           <Chakra.Td>
                              <Chakra.Button size="sm" colorScheme="red">
                                 <Chakra.Icon as={AiFillDelete} />
                              </Chakra.Button>
                           </Chakra.Td>
                        </Chakra.Tr>
                     ))}
                  </Chakra.Tbody>
               </Chakra.Table>
            )}
         </Chakra.TableContainer>
      </Chakra.Stack>
   );
};

export default LaporanPembayaran;
