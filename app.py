import streamlit as st
import google.generativeai as genai
from docx import Document
from io import BytesIO

st.set_page_config(page_title="Edunexus RPP Generator", layout="wide")

def generate_rpp(api_key, prompt):
    genai.configure(api_key=api_key)
    # Kita pakai model paling standar 'gemini-pro' agar pasti jalan
    model = genai.GenerativeModel('gemini-pro') 
    response = model.generate_content(prompt)
    return response.text

def create_docx(content):
    doc = Document()
    doc.add_paragraph(content)
    buffer = BytesIO()
    doc.save(buffer)
    buffer.seek(0)
    return buffer

def main():
    st.title("📝 Edunexus RPP Maker")
    
    with st.sidebar:
        api_key = st.text_input("Google API Key", type="password")
        
    col1, col2 = st.columns(2)
    with col1:
        guru = st.text_input("Nama Guru")
        mapel = st.text_input("Mapel")
    with col2:
        topik = st.text_input("Topik")
        kelas = st.text_input("Kelas")
        
    if st.button("Buat RPP"):
        if not api_key:
            st.error("Masukkan API Key dulu")
            return
            
        prompt = f"Buatkan RPP {mapel} topik {topik} untuk kelas {kelas} oleh guru {guru}. Lengkap dengan tujuan, kegiatan, dan asesmen."
        
        try:
            with st.spinner("Sedang membuat..."):
                hasil = generate_rpp(api_key, prompt)
                st.write(hasil)
                
                doc = create_docx(hasil)
                st.download_button("Download Word", doc, "RPP.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        except Exception as e:
            st.error(f"Error: {e}")

if __name__ == "__main__":
    main()