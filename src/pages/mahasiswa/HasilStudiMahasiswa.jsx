import * as Chakra from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useFetch } from "../../helpers";

/**
 * @param {array} hasil_studi db data
 */
const HasilStudiMahasiswa = ({ data }) => {
   const [semester, setSemester] = useState(null);
   const [tahun, setTahun] = useState(null);

   const year = useFetch();

   useEffect(() => {
      year.getDatas("/tahun");
   }, []);

   return (
      <Chakra.VStack spacing="4">
         <Chakra.HStack gap="4">
            <Chakra.Select
               name="semester"
               onChange={(e) => setSemester(e.target.value)}
               defaultValue="pilih semester">
               <option value="pilih semester" disabled>
                  pilih semester
               </option>
               <option value="ganjil">Ganjil</option>
               <option value="genap">Genap</option>
            </Chakra.Select>
            {year.data !== null && (
               <Chakra.Select
                  onChange={(e) => setTahun(e.target.value)}
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
         </Chakra.HStack>
         <Chakra.TableContainer>
            <Chakra.Table variant="striped">
               <Chakra.Thead>
                  <Chakra.Tr>
                     <Chakra.Th>No.</Chakra.Th>
                     <Chakra.Th>Mata kuliah</Chakra.Th>
                     <Chakra.Th>Angka</Chakra.Th>
                     <Chakra.Th>huruf</Chakra.Th>
                     <Chakra.Th>indeks</Chakra.Th>
                     <Chakra.Th>sks*indeks</Chakra.Th>
                  </Chakra.Tr>
               </Chakra.Thead>
               <Chakra.Tbody>
                  {data !== null &&
                     data
                        .filter(
                           (item) =>
                              item.semester === semester && item.tahun === tahun
                        )
                        .map((result, idx) => (
                           <Chakra.Tr key={result.id}>
                              <Chakra.Td>{idx + 1}</Chakra.Td>
                              <Chakra.Td>{result.mata_kuliah}</Chakra.Td>
                              <Chakra.Td>{result.angka}</Chakra.Td>
                              <Chakra.Td>{result.huruf}</Chakra.Td>
                              <Chakra.Td>{result.indeks}</Chakra.Td>
                              <Chakra.Td>{result.total}</Chakra.Td>
                           </Chakra.Tr>
                        ))}
               </Chakra.Tbody>
            </Chakra.Table>
         </Chakra.TableContainer>
      </Chakra.VStack>
   );
};

export default HasilStudiMahasiswa;
