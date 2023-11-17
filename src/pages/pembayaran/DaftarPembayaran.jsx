import * as Chakra from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFetch } from "../../helpers";
import { useEffect } from "react";
import { TableLoader } from "../../components";
import { ImLink } from "react-icons/im";

const DaftarPembayaran = () => {
   const { fetchIsLoading, getDatas, data } = useFetch();

   useEffect(() => {
      getDatas("/pembayaran");
   }, []);
   return (
      <Chakra.Stack spacing="4">
         <Link to="upload">
            <Chakra.Button colorScheme="linkedin" float="right">
               Tambah Pembayaran
            </Chakra.Button>
         </Link>
         <Chakra.TableContainer>
            {fetchIsLoading ? (
               <TableLoader />
            ) : (
               <Chakra.Table variant="striped">
                  <Chakra.Thead>
                     <Chakra.Tr>
                        <Chakra.Th>No.</Chakra.Th>
                        <Chakra.Th>jumlah</Chakra.Th>
                        <Chakra.Th>semester</Chakra.Th>
                        <Chakra.Th>tahun</Chakra.Th>
                        <Chakra.Th>Detail</Chakra.Th>
                     </Chakra.Tr>
                  </Chakra.Thead>
                  <Chakra.Tbody>
                     {data?.map((item, i) => (
                        <Chakra.Tr key={item.id}>
                           <Chakra.Td>{i + 1}</Chakra.Td>
                           <Chakra.Td>{item.jumlah}</Chakra.Td>
                           <Chakra.Td>{item.semester}</Chakra.Td>
                           <Chakra.Td>
                              {item.tahun_akademik.tahun_mulai}/
                              {item.tahun_akademik.tahun_akhir}
                           </Chakra.Td>
                           <Chakra.Td>
                              <Link to={item.id}>
                                 <Chakra.Button size="sm">
                                    <Chakra.Icon as={ImLink} />
                                 </Chakra.Button>
                              </Link>
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

export default DaftarPembayaran;
