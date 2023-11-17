import { useParams } from "react-router-dom";
import { ContentLayout } from "../../../components";
import * as Chakra from "@chakra-ui/react";
import { useEffect } from "react";
import { useFetch } from "../../../helpers";

const DetailPembayaran = () => {
   // take params specified id pembayaran for fetch the data
   const params = useParams();
   const { getDatas, fetchIsLoading, data, postData } = useFetch();

   useEffect(() => {
      getDatas(`/pembayaran/${params.id}`);
   }, []);
   return (
      <ContentLayout title="detail pembayaran">
         <Chakra.VStack></Chakra.VStack>
      </ContentLayout>
   );
};

export default DetailPembayaran;
