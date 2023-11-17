export const currencyFormatter = (number) => {
   return new Intl.NumberFormat({
      style: "currency",
      currency: "IDR",
   }).format(number);
};

/**
 *
 * @param {Date} str string
 *
 * @return selasa, 09 Mei : 15:30
 */
export const dateFormatIndo = (str) => {
   const date = new Date(str);
   const bulan = mouthTranslate(date.getMonth());
   const hari = dayTranslate(date.getDay());

   return `${hari}, ${date.getDate()} ${bulan} : ${date.getHours()}:${date.getMinutes()}`;
};

// translate to indo
export const mouthTranslate = (num) => {
   let bulan;
   switch (num) {
      case 0:
         bulan = "Januari";
         break;
      case 1:
         bulan = "Februari";
         break;
      case 2:
         bulan = "Maret";
         break;
      case 3:
         bulan = "April";
         break;
      case 4:
         bulan = "Mei";
         break;
      case 5:
         bulan = "Juni";
         break;
      case 6:
         bulan = "Juli";
         break;
      case 7:
         bulan = "Agustus";
         break;
      case 8:
         bulan = "September";
         break;
      case 9:
         bulan = "Oktober";
         break;
      case 10:
         bulan = "November";
         break;
      case 11:
         bulan = "Desember";
         break;
   }

   return bulan;
};

export const dayTranslate = (num) => {
   let hari;
   switch (num) {
      case 0:
         hari = "Minggu";
         break;
      case 1:
         hari = "Senin";
         break;
      case 2:
         hari = "Selasa";
         break;
      case 3:
         hari = "Rabu";
         break;
      case 4:
         hari = "Kamis";
         break;
      case 5:
         hari = "Jum'at";
         break;
      case 6:
         hari = "Sabtu";
         break;
   }

   return hari;
};
