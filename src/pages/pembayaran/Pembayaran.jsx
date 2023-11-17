import { useState } from "react";
import { ContentLayout } from "../../components";
import { Button, HStack } from "@chakra-ui/react";
import DaftarPembayaran from "./DaftarPembayaran";
import LaporanPembayaran from "./LaporanPembayaran";

const navigates = ["pembayaran", "laporan"];

const Pembayaran = () => {
   const [activeContent, setActiveContent] = useState(navigates[0]);
   return (
      <ContentLayout title="Daftar Pembayaran">
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
         {/* render content */}
         {activeContent === navigates[0] && <DaftarPembayaran />}
         {activeContent === navigates[1] && <LaporanPembayaran />}
      </ContentLayout>
   );
};

export default Pembayaran;
