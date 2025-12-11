import React from 'react';
import { BookOpen, User, School, Calendar, Layers, Clock, CheckSquare } from 'lucide-react';

const InputForm = ({ formData, handleChange, handleCheckboxChange, onSubmit, isLoading }) => {
  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <CheckSquare size={24} /> Configuration
      </h2>

      <form onSubmit={onSubmit}>
        {/* Section A: Informasi Pendidik */}
        <div className="form-section">
          <h3 className="form-label" style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>
            <User size={16} style={{ display: 'inline', marginRight: '8px' }} />
            A. Informasi Pendidik
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Nama Lengkap Guru</label>
              <input
                type="text"
                name="teacherName"
                className="form-input"
                value={formData.teacherName}
                onChange={handleChange}
                required
                placeholder="Ex. Budi Santoso, S.Pd."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Nama Institusi</label>
              <input
                type="text"
                name="institution"
                className="form-input"
                value={formData.institution}
                onChange={handleChange}
                required
                placeholder="Ex. SMA Negeri 1 Jakarta"
              />
            </div>
          </div>
        </div>

        {/* Section B: Informasi Akademik */}
        <div className="form-section" style={{ marginTop: '2rem' }}>
          <h3 className="form-label" style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>
            <School size={16} style={{ display: 'inline', marginRight: '8px' }} />
            B. Informasi Akademik
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Kurikulum</label>
              <select name="curriculum" className="form-select" value={formData.curriculum} onChange={handleChange}>
                <option value="Kurikulum Merdeka">Kurikulum Merdeka</option>
                <option value="Kurikulum Berbasis Cinta">Kurikulum Berbasis Cinta</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Jenjang Pendidikan</label>
              <select name="level" className="form-select" value={formData.level} onChange={handleChange}>
                <option value="PAUD">PAUD</option>
                <option value="TK">TK</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Fase</label>
              <select name="phase" className="form-select" value={formData.phase} onChange={handleChange}>
                {['A', 'B', 'C', 'D', 'E', 'F'].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Kelas</label>
              <select name="grade" className="form-select" value={formData.grade} onChange={handleChange}>
                <option value="1 SD">1 SD</option>
                <option value="2 SD">2 SD</option>
                <option value="3 SD">3 SD</option>
                <option value="4 SD">4 SD</option>
                <option value="5 SD">5 SD</option>
                <option value="6 SD">6 SD</option>
                <option value="7 SMP">7 SMP</option>
                <option value="8 SMP">8 SMP</option>
                <option value="9 SMP">9 SMP</option>
                <option value="X SMA">X SMA</option>
                <option value="XI SMA">XI SMA</option>
                <option value="XII SMA">XII SMA</option>
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Mata Pelajaran</label>
              <input
                type="text"
                name="subject"
                className="form-input"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Ex. Matematika"
              />
            </div>
          </div>
        </div>

        {/* Section C: Detail Pembelajaran */}
        <div className="form-section" style={{ marginTop: '2rem' }}>
          <h3 className="form-label" style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>
            <Layers size={16} style={{ display: 'inline', marginRight: '8px' }} />
            C. Detail Pembelajaran
          </h3>
          <div className="form-group">
            <label className="form-label">Materi Pokok / Judul Modul</label>
            <input
              type="text"
              name="topic"
              className="form-input"
              value={formData.topic}
              onChange={handleChange}
              required
              placeholder="Ex. Aljabar Linear"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Jumlah Pertemuan</label>
              <input
                type="number"
                name="meetings"
                className="form-input"
                value={formData.meetings}
                onChange={handleChange}
                min="1"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Durasi (menit)</label>
              <input
                type="number"
                name="duration"
                className="form-input"
                value={formData.duration}
                onChange={handleChange}
                min="10"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Model Pembelajaran</label>
            <select name="model" className="form-select" value={formData.model} onChange={handleChange}>
              <option value="Project-Based Learning">Project-Based Learning</option>
              <option value="Problem-Based Learning">Problem-Based Learning</option>
              <option value="Problem Solving">Problem Solving</option>
              <option value="Discovery Learning">Discovery Learning</option>
              <option value="Inquiry Learning">Inquiry Learning</option>
              <option value="Contextual Teaching and Learning">Contextual Teaching and Learning</option>
              <option value="Pembelajaran Berdiferensiasi">Pembelajaran Berdiferensiasi</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Dimensi Profil Lulusan</label>
            <div className="checkbox-grid">
              {[
                "Keimanan, Ketaqwaan, dan Akhlak Mulia",
                "Penalaran Kritis",
                "Kolaborasi",
                "Kesehatan",
                "Kewargaan",
                "Kreativitas",
                "Kemandirian",
                "Komunikasi"
              ].map((dim) => (
                <label key={dim} className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={formData.dimensions.includes(dim)}
                    onChange={() => handleCheckboxChange(dim)}
                  />
                  {dim}
                </label>
              ))}
            </div>
          </div>
        </div>



        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate AI Prompt'}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
