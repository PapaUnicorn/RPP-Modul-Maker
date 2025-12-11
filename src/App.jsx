import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultPreview from './components/ResultPreview';
import { generatePrompt } from './utils/promptGenerator';
import { saveAs } from 'file-saver';

function App() {
  const [formData, setFormData] = useState({
    teacherName: '',
    institution: '',
    curriculum: 'Kurikulum Merdeka',
    level: 'SMA',
    phase: 'E',
    grade: 'X SMA',
    subject: '',
    topic: '',
    meetings: 1,
    duration: 45,
    model: 'Problem-Based Learning',
    dimensions: []
  });

  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value) => {
    setFormData(prev => {
      const newDimensions = prev.dimensions.includes(value)
        ? prev.dimensions.filter(d => d !== value)
        : [...prev.dimensions, value];
      return { ...prev, dimensions: newDimensions };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate UX delay
    setTimeout(() => {
      try {
        const content = generatePrompt(formData);
        setGeneratedContent(content);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 600);
  };

  const handleExport = () => {
    if (generatedContent) {
      const blob = new Blob([generatedContent], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `Prompt_Modul_Ajar_${formData.subject.replace(/\s+/g, '_')}.txt`);
    }
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
    }
  };

  return (
    <div className="container">
      <div>
        <h1 className="header-title">RPP AI Prompt Generator</h1>
        <InputForm
          formData={formData}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>

      <div>
        {(generatedContent || isLoading || error) && (
          <div style={{ height: '100%', paddingTop: '80px' }}>
            {isLoading && (
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                <div className="loader"></div>
                <p>Constructing your prompt...</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>This may take up to 30 seconds</p>
              </div>
            )}

            {error && (
              <div className="glass-panel" style={{ padding: '2rem', borderColor: '#fca5a5' }}>
                <h3 style={{ color: '#fca5a5' }}>Error</h3>
                <p>{error}</p>
              </div>
            )}

            {generatedContent && (
              <ResultPreview
                content={generatedContent}
                onExport={handleExport}
                onCopy={handleCopy}
              />
            )}
          </div>
        )}

        {!generatedContent && !isLoading && !error && (
          <div className="glass-panel" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', marginTop: '80px' }}>
            <p>Fill out the form to generate your AI prompt.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
