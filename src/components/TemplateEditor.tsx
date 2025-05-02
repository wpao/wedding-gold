// import React, { useState } from "react";
// // import axios from "axios";
// import axiosInstance from "@/lib/axios";

// type Template = {
//   idPeople: string;
//   idTemplate: string;
//   namaPria: string;
//   namaWanita: string;
//   wa: string;
//   email: string;
// };

// const defaultData: Template = {
//   idPeople: "",
//   idTemplate: "wedding-roxy223003", // default template
//   namaPria: "",
//   namaWanita: "",
//   wa: "",
//   email: "",
// };

// const TemplateEditor: React.FC = () => {
//   const [idInput, setIdInput] = useState("");
//   const [data, setData] = useState<Template>(defaultData);
//   const [mode, setMode] = useState<"tambah" | "edit">("tambah");

//   const handleCari = async () => {
//     try {
//       const res = await axiosInstance.get<Template>(
//         `/templates/${idInput}/?idTemplate=wedding-roxy223003`
//       );
//       setData(res.data);
//       setMode("edit");
//     } catch (error) {
//       // Data tidak ditemukan, pakai default
//       setData({ ...defaultData, idPeople: idInput });
//       setMode("tambah");
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSimpan = async () => {
//     try {
//       if (mode === "edit") {
//         await axiosInstance.put(`/templates/${data.idPeople}`, data);
//         alert("Data berhasil diupdate");
//       } else {
//         await axiosInstance.post("/templates", data);
//         alert("Data berhasil ditambahkan");
//       }
//     } catch (error) {
//       console.error("Gagal simpan:", error);
//       alert("Terjadi kesalahan");
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto space-y-6">
//       {/* Form 1: Cari berdasarkan idPeople */}
//       <div className="border p-4 rounded shadow">
//         <h2 className="text-lg font-bold mb-2">Form 1 - Cari ID</h2>
//         <input
//           type="text"
//           placeholder="Masukkan idPeople"
//           value={idInput}
//           onChange={(e) => setIdInput(e.target.value)}
//           className="border px-3 py-2 rounded w-full mb-2"
//         />
//         <button
//           onClick={handleCari}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Cari
//         </button>
//       </div>

//       {/* Form 2: Tampil / Edit */}
//       <div className="border p-4 rounded shadow">
//         <h2 className="text-lg font-bold mb-2">
//           Form 2 - {mode === "edit" ? "Edit Data" : "Tambah Baru"}
//         </h2>
//         <input
//           type="text"
//           name="namaPria"
//           placeholder="Nama Pria"
//           value={data.namaPria}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded mb-2"
//         />
//         <input
//           type="text"
//           name="namaWanita"
//           placeholder="Nama Wanita"
//           value={data.namaWanita}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded mb-2"
//         />
//         <input
//           type="text"
//           name="wa"
//           placeholder="Nomor WhatsApp"
//           value={data.wa}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded mb-2"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={data.email}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded mb-4"
//         />
//         <button
//           onClick={handleSimpan}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Simpan
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TemplateEditor;

// ==================================================================
import React, { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "@/lib/axios";

type Template = {
  idPeople: string;
  idTemplate: string;
  namaPria: string;
  namaWanita: string;
  wa: string;
  email: string;
};

const defaultData: Template = {
  idPeople: "",
  idTemplate: "wedding-roxy223003", // default template
  namaPria: "",
  namaWanita: "",
  wa: "",
  email: "",
};

const TemplateEditor: React.FC = () => {
  const [idInput, setIdInput] = useState("");
  const [data, setData] = useState<Template>(defaultData);
  const [mode, setMode] = useState<"tambah" | "edit">("tambah");

  const handleCari = async (idPeople: string, idTemplate?: string) => {
    try {
      const res = await axiosInstance.get<Template>(
        `/templates/${idPeople}?idTemplate=${idTemplate}`
      );
      setData(res.data);
      setMode("edit");
    } catch (error) {
      // Data tidak ditemukan, pakai default
      setData({ ...defaultData, idPeople });
      setMode("tambah");
    }
    // try {
    //   const res = await axiosInstance.get<Template>(
    //     `/templates/${idPeople}?idTemplate=${
    //       idTemplate || defaultData.idTemplate
    //     }`
    //   );
    //   setData(res.data);
    //   setMode("edit");
    // } catch (error) {
    //   // Data tidak ditemukan, pakai default
    //   setData({ ...defaultData, idPeople });
    //   setMode("tambah");
    // }
  };

  useEffect(() => {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    if (pathParts.length === 2) {
      const [idPeople, idTemplate] = pathParts;
      setIdInput(idPeople);
      handleCari(idPeople, idTemplate);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSimpan = async () => {
    try {
      if (mode === "edit") {
        await axiosInstance.put(`/templates/${data.idPeople}`, data);
        alert("Data berhasil diupdate");
      } else {
        await axiosInstance.post("/templates", data);
        alert("Data berhasil ditambahkan");
      }
    } catch (error) {
      console.error("Gagal simpan:", error);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      {/* Form 1: Cari berdasarkan idPeople */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Form 1 - Cari ID</h2>
        <input
          type="text"
          placeholder="Masukkan idPeople"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-2"
        />
        <button
          onClick={() => handleCari(idInput)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Cari
        </button>
      </div>

      {/* Form 2: Tampil / Edit */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">
          Form 2 - {mode === "edit" ? "Edit Data" : "Tambah Baru"}
        </h2>
        <input
          type="text"
          name="namaPria"
          placeholder="Nama Pria"
          value={data.namaPria}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-2"
        />
        <input
          type="text"
          name="namaWanita"
          placeholder="Nama Wanita"
          value={data.namaWanita}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-2"
        />
        <input
          type="text"
          name="wa"
          placeholder="Nomor WhatsApp"
          value={data.wa}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <button
          onClick={handleSimpan}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default TemplateEditor;
