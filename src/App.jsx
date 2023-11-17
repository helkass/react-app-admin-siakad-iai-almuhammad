import { Routes, Route, Navigate } from "react-router-dom";
import * as Pages from "./pages";
import MainLayout from "./components/layout/MainLayout";
function App() {
   return (
      <Routes>
         <Route path="/" element={<Navigate to="/login" replace />} />
         <Route path="login" element={<Pages.Login />} />
         <Route path="*" element={<Pages.NotFoundPage />} />

         {/* main pages */}
         <Route element={<MainLayout />}>
            <Route path="/beranda" element={<Pages.Beranda />} />
            <Route path="/mahasiswa">
               <Route index element={<Pages.Mahasiswa />} />
               <Route path="add" element={<Pages.AddMahasiswa />} />
               <Route path=":id" element={<Pages.DetailMahasiswa />} />
            </Route>
            <Route path="/dosen" element={<Pages.Dosen />} />
            <Route path="/studi">
               <Route index element={<Pages.Studi />} />
               <Route path="rencana">
                  {/* id rencana as a name of kelas */}
                  <Route path=":id" element={<Pages.DetailJadwal />} />
               </Route>
            </Route>
            <Route path="/transkrip" element={<Pages.RencanaStudi />} />
            <Route path="/ruangan" element={<Pages.Ruangan />} />
            <Route path="/berita">
               <Route index element={<Pages.Berita />} />
               <Route path="upload" element={<Pages.UploadBerita />} />
            </Route>
            <Route path="/pembayaran">
               <Route index element={<Pages.Pembayaran />} />
               <Route path=":id" element={<Pages.DetailPembayaran />} />
               <Route path="upload" element={<Pages.UploadPembayaran />} />
            </Route>
            <Route path="/setting" element={<Pages.Setting />} />
         </Route>
      </Routes>
   );
}

export default App;
