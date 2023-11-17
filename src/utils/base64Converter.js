export const onChange = (e) => {
   const files = e.target.files;
   const file = files[0];
   getBase64(file);
};

export const onLoad = (fileString) => {
   console.log(fileString);
};

export const getBase64 = (file, cb) => {
   let reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = (res) => {
      let err = { status: false, message: "done" };

      if (res.total > 2000000) {
         err = { status: true, message: "file must be less than 2mb" };
         cb(err, reader.result);
      }
      cb(err, reader.result);
   };
};
