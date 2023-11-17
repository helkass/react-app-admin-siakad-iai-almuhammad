import { useState } from "react";
import ReactQuill from "react-quill";
import { useFetch } from "../../helpers";
import * as base64Converter from "../../utils/base64Converter";
import { toastConfig } from "../../constant/app";
import * as Chakra from "@chakra-ui/react";
import { ContentLayout } from "../../components";

/**
 * for berita editor
 */

export default function Editor(props) {
   const [editorHtml, setEditorHtml] = useState("");
   const [formData, setFormdata] = useState({});
   const [isLoading, setLoading] = useState(false);
   const [file, setFile] = useState(null);

   const toast = Chakra.useToast({ title: "Berita Status", ...toastConfig });

   const { postData } = useFetch();

   function handleChange(html) {
      setEditorHtml(html);
   }

   const handleChangeForm = (e) => {
      setFormdata({ ...formData, [e.target.name]: e.target.value });
   };

   function handleUpload() {
      setLoading(true);
      base64Converter.getBase64(file, async (err, result) => {
         if (err.status) {
            toast({
               description: err.message,
               status: "error",
            });
         } else {
            await postData(
               "/berita",
               {
                  article: editorHtml,
                  image: result,
                  ...formData,
               },
               {
                  "content-Type": "application/json",
               }
            )
               .then((res) => {
                  if (res.status === 200) {
                     toast({
                        description: "berhasil menambahkan berita",
                        status: "success",
                     });
                  }
               })
               .catch((err) => {
                  toast({
                     description: err.response.data.error,
                     status: "error",
                  });
               });
         }
         setLoading(false);
      });
   }

   return (
      <ContentLayout title="upload berita">
         <Chakra.Stack spacing="4">
            <Chakra.FormControl isRequired>
               <Chakra.FormLabel htmlFor="title">title</Chakra.FormLabel>
               <Chakra.Input
                  type="text"
                  name="title"
                  onChange={handleChangeForm}
               />
            </Chakra.FormControl>
            <Chakra.FormControl>
               <Chakra.FormLabel htmlFor="description">
                  description
               </Chakra.FormLabel>
               <Chakra.Input
                  type="text"
                  name="description"
                  onChange={handleChangeForm}
               />
            </Chakra.FormControl>
            <Chakra.FormControl>
               <Chakra.FormLabel htmlFor="image">banner image</Chakra.FormLabel>
               <Chakra.Input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  name="image"
                  onChange={(e) => setFile(e.target.files[0])}
               />
               <Chakra.FormHelperText>
                  max size 2MB and ext includes .jpg .jpeg .png
               </Chakra.FormHelperText>
            </Chakra.FormControl>
            <ReactQuill
               theme={"snow"}
               onChange={handleChange}
               value={editorHtml}
               modules={Editor.modules}
               formats={Editor.formats}
               placeholder={props.placeholder}
            />
            <Chakra.Button
               colorScheme="linkedin"
               alignSelf="end"
               loadingText="loading..."
               isDisabled={isLoading}
               onClick={handleUpload}
               isLoading={isLoading}>
               Upload
            </Chakra.Button>
         </Chakra.Stack>
      </ContentLayout>
   );
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
   toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
         { list: "ordered" },
         { list: "bullet" },
         { indent: "-1" },
         { indent: "+1" },
      ],
      ["link"],
      ["clean"],
   ],
   clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
   },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
   "header",
   "font",
   "size",
   "bold",
   "italic",
   "underline",
   "strike",
   "blockquote",
   "list",
   "bullet",
   "indent",
   "link",
];
