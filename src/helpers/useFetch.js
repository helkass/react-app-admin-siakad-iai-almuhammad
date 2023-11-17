import { useState } from "react";
import { apiClient } from "../api/apiClient";

export const useFetch = () => {
   const [fetchIsLoading, setLoading] = useState(false);
   const [fetchIsError, setError] = useState(false);
   const [fetchIsSuccess, setSuccess] = useState(false);
   const [data, setData] = useState(null);

   const postData = async (url, body, config) => {
      return apiClient.post(url, body, {
         headers: {
            ...config,
            api_key_siakad: JSON.parse(localStorage.getItem("api_key_siakad")),
            admin_key_siakad: JSON.parse(
               localStorage.getItem("admin_key_siakad")
            ),
         },
      });
   };

   const getDatas = async (url, params) => {
      setLoading(true);
      await apiClient
         .get(url, {
            params: params,
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
            setData(res.data.data);
         })
         .catch((err) => {
            setError(true);
         })
         .finally(() => setLoading(false));
   };

   // content-type constants of json body
   const updateData = async (url, body) => {
      setLoading(true);
      return apiClient.put(url, body, {
         headers: {
            "content-Type": "application/json",
            api_key_siakad: JSON.parse(localStorage.getItem("api_key_siakad")),
            admin_key_siakad: JSON.parse(
               localStorage.getItem("admin_key_siakad")
            ),
         },
      });
   };

   const deleteData = async (url) => {
      return apiClient.delete(url, {
         headers: {
            api_key_siakad: JSON.parse(localStorage.getItem("api_key_siakad")),
            admin_key_siakad: JSON.parse(
               localStorage.getItem("admin_key_siakad")
            ),
         },
      });
   };

   return {
      fetchIsLoading,
      fetchIsError,
      fetchIsSuccess,
      postData,
      getDatas,
      data,
      updateData,
      deleteData,
   };
};
