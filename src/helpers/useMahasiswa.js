import { useState } from "react";
import { apiClient } from "../api/apiClient";

export const useMahasiswa = () => {
   const [mahasiswaIsLoading, setLoading] = useState(false);
   const [mahasiswaIsError, setError] = useState(false);
   const [mahasiswa, setMahasiswa] = useState(null);
   const [waliMahasiswa, setWaliMahasiswa] = useState(null);
   const [tagihan, setTagihan] = useState(null);
   const [transkrip, setTranskrip] = useState(null);
   const [hasilStudi, setHasilStudi] = useState(null);

   const getMahasiswa = async (pathUrl) => {
      const path = pathUrl == undefined || pathUrl == null ? "/" : pathUrl;

      setLoading(true);
      await apiClient
         .get(`/mahasiswa${path}`, {
            headers: {
               api_key_siakad: JSON.parse(
                  localStorage.getItem("api_key_siakad")
               ),
               admin_key_siakad: JSON.parse(
                  localStorage.getItem("admin_key_siakad")
               ),
            },
         })
         .then((res) => {
            setMahasiswa(res.data.data);
            setWaliMahasiswa(res.data.data?.walimahasiswa);
            setTagihan(res.data.data?.tagihan_mahasiswa);
            setTranskrip(res.data.data?.transkrip);
            setHasilStudi(res.data.data?.hasil_studi);
         })
         .catch(() => {
            setError(true);
         })
         .finally(() => setLoading(false));
   };

   return {
      getMahasiswa,
      mahasiswaIsLoading,
      mahasiswaIsError,
      mahasiswa,
      waliMahasiswa,
      tagihan,
      transkrip,
      hasilStudi,
   };
};
