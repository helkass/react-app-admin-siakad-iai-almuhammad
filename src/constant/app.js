import {
   PiSquaresFourBold,
   PiStudentFill,
   PiChalkboardTeacherFill,
} from "react-icons/pi";
import { IoMdListBox } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import { FaGears, FaMoneyBillWave } from "react-icons/fa6";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { TbFileReport } from "react-icons/tb";

export const sidebarLinks = [
   {
      title: "Beranda",
      link: "/beranda",
      Icon: PiSquaresFourBold,
   },
   {
      title: "Mahasiswa",
      link: "/mahasiswa",
      Icon: PiStudentFill,
   },
   {
      title: "Dosen",
      link: "/dosen",
      Icon: PiChalkboardTeacherFill,
   },
   {
      title: "Studi",
      link: "/studi",
      Icon: IoMdListBox,
   },
   {
      title: "Transkrip",
      link: "/transkrip",
      Icon: TbFileReport,
   },
   {
      title: "Ruangan",
      link: "/ruangan",
      Icon: MdOutlineMeetingRoom,
   },
   {
      title: "Berita",
      link: "/berita",
      Icon: IoNewspaper,
   },
   {
      title: "Pembayaran",
      link: "/pembayaran",
      Icon: FaMoneyBillWave,
   },
   {
      title: "Setting",
      link: "/setting",
      Icon: FaGears,
   },
];

export const headerOptions = {
   admin_key_siakad: JSON.parse(localStorage.getItem("admin_key_siakad")),
   api_key_siakad: JSON.parse(localStorage.getItem("api_key_siakad")),
};

// toast chakra config global module
export const toastConfig = {
   duration: 4000,
   isClosable: true,
};
