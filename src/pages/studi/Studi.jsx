import { Button, HStack } from "@chakra-ui/react";
import { ContentLayout } from "../../components";
import { useState } from "react";
import Penjadwalan from "./penjadwalan/Penjadwalan";
import MataKuliah from "./mataKuliah/MataKuliah";
import TahunAkademik from "./tahunAkademik/TahunAkademik";
import WaktuPenjadwalan from "./waktu/WaktuPenjadwalan";
import Jurusan from "./jurusan/Jurusan";
import Fakultas from "./fakultas/Fakultas";
import Kelas from "./kelas/Kelas";

const navigates = [
   "mata kuliah",
   "penjadwalan",
   "tahun periode",
   "waktu penjadwalan",
   "fakultas",
   "jurusan",
   "kelas",
];

const Studi = () => {
   const [activeContent, setActiveContent] = useState(navigates[1]);
   return (
      <ContentLayout title="Studi Mahasiswa">
         {/* navigates */}
         <HStack overflowX="hidden">
            <HStack overflowX="auto" gap="6" py="3">
               {navigates.map((item, i) => (
                  <Button
                     variant="unstyled"
                     textTransform="capitalize"
                     minW="min-content"
                     key={i}
                     onClick={() => setActiveContent(item.toLowerCase())}
                     sx={{
                        borderBottom: "2px solid",
                        borderColor:
                           item === activeContent
                              ? "primary.900"
                              : "transparent",
                        borderRadius: "0",
                     }}>
                     {item}
                  </Button>
               ))}
            </HStack>
         </HStack>
         {/* penjadwalan component */}
         {activeContent === navigates[0] && <MataKuliah />}
         {activeContent === navigates[1] && <Penjadwalan />}
         {activeContent === navigates[2] && <TahunAkademik />}
         {activeContent === navigates[3] && <WaktuPenjadwalan />}
         {activeContent === navigates[4] && <Fakultas />}
         {activeContent === navigates[5] && <Jurusan />}
         {activeContent === navigates[6] && <Kelas />}
      </ContentLayout>
   );
};

export default Studi;
