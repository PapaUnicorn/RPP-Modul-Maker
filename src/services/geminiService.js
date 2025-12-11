import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateRPP = async (apiKey, data) => {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
      Bertindaklah sebagai ahli pendidikan dan kurikulum yang profesional.
      Buatkan sebuah dokumen Modul Ajar/RPP yang mendalam dan komprehensif berdasarkan data berikut:
      
      INFORMASI PENDIDIK:
      - Nama Guru: ${data.teacherName}
      - Institusi: ${data.institution}
      
      INFORMASI AKADEMIK:
      - Kurikulum: ${data.curriculum}
      - Jenjang: ${data.level}
      - Fase: ${data.phase}
      - Kelas: ${data.grade}
      - Mata Pelajaran: ${data.subject}
      
      DETAIL PEMBELAJARAN:
      - Materi Pokok: ${data.topic}
      - Jumlah Pertemuan: ${data.meetings}
      - Durasi per Pertemuan: ${data.duration} menit
      - Model Pembelajaran: ${data.model}
      - Dimensi Profil Lulusan: ${data.dimensions.join(', ')}
      
      STRUKTUR DOKUMEN YANG WAJIB DIIKUTI:
      A. Informasi Umum (Buat dalam format Markdown Table)
      B. Komponen Inti 
         - Tujuan Pembelajaran
         - Indikator Ketercapaian Tujuan Pembelajaran
         - Pemahaman Bermakna
         - Pertanyaan Pemantik
         - Kegiatan Pembelajaran (Rinci untuk ${data.meetings} pertemuan)
           (Buka dengan Kegiatan Pendahuluan, Inti, dan Penutup untuk setiap pertemuan beserta alokasi waktu)
      C. Lampiran
         - Asesmen (Formatif dan Sumatif)
         - Rubrik Penilaian
         - LKPD (Lembar Kerja Peserta Didik) Lengkap
      
      Gaya bahasa formal, instruksional, dan mudah dibaca.
      Visualisasi menggunakan format Markdown yang rapi (headings, bold, lists, tables).
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        if (error.message.includes("429") || error.message.includes("Quota exceeded")) {
            throw new Error("Quota exceeded (Too many requests). Please wait for about 20-30 seconds and try again.");
        }
        throw new Error(`Failed to generate content. Error: ${error.message || error}`);
    }
};
