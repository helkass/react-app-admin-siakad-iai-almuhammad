import { useFetch } from "../helpers";
import { useState } from "react";

export function upload() {
   const [changeValue, setChangeValue] = useState({});
   const [file, setFile] = useState(null);
   const [dataMany, setDataMany] = useState([]);
   const { fetchIsLoading, postData, fetchIsSuccess } = useFetch();
   const [selectOption, setSelectOption] = useState("satu data");

   // change form input text
   function handleChangeValue(e) {
      setChangeValue(
         (prevValue) =>
            (prevValue = { ...prevValue, [e.target.name]: e.target.value })
      );
   }

   function handleAddOnList() {
      setDataMany((prev) => (prev = [...prev, changeValue]));
   }

   // handle delete todo by param
   function handleDeleteTodo(key, value) {
      setDataMany(dataMany.filter((d) => d[key] !== value));
   }

   function clearTodo() {
      setDataMany([]);
   }

   async function handleAddData(event, pathUrl) {
      event.preventDefault();

      if (selectOption === "satu data") {
         await postData(`/${pathUrl}`, changeValue, {
            "Content-Type": "application/json",
         });
      } else if (selectOption === "banyak data") {
         await postData(`/${pathUrl}/many`, dataMany, {
            "Content-Type": "application/json",
         });
      } else if (selectOption === "upload file csv") {
         await postData(
            `/${pathUrl}/upload/csv`,
            { file },
            {
               "Content-Type": "multipart/form-data",
            }
         );
      }

      event.target.reset();
   }

   return {
      handleChangeValue,
      handleAddData,
      setFile,
      handleAddOnList,
      handleDeleteTodo,
      clearTodo,
      dataMany,
      fetchIsLoading,
      setSelectOption,
      selectOption,
   };
}
