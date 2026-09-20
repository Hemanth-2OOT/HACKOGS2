import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { extractProfileFromResume, extractRequirementsFromJD } from '../api/llmExtractor';
import * as pdfjsLib from 'pdfjs-dist';

// Vite specific worker import for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const UploadAnalyzer = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'resume';
  
  const { apiKey, setApiKey, extractedProfile, setExtractedProfile, setExtractedJD } = useApp();
  const navigate = useNavigate();
  
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }
    return fullText;
  };

  const handleFileProcess = async (file: File) => {
    setIsProcessing(true);
    setStatusText('Extracting raw text from PDF...');
    
    try {
      let extractedText = '';
      if (file.type === 'application/pdf') {
        extractedText = await extractTextFromPDF(file);
      } else {
        extractedText = await file.text(); // fallback for raw txt
      }
      
      if (!extractedText.trim()) {
        throw new Error('Failed to extract any text from the document.');
      }
      
      setStatusText(apiKey === 'mock' ? 'Running AI Engine (Mock Mode)...' : 'Analyzing document with OpenAI (This may take a few seconds)...');
      
      if (type === 'resume') {
        const profile = await extractProfileFromResume(extractedText, apiKey);
        setExtractedProfile(profile);
        navigate('/review-profile');
      } else {
        setStatusText('Cross-referencing JD against your profile...');
        const existingSkills = extractedProfile ? extractedProfile.skills.map(s => s.name) : [];
        const jd = await extractRequirementsFromJD(extractedText, apiKey, existingSkills);
        setExtractedJD(jd);
        navigate('/gap-analysis');
      }
    } catch (e: any) {
      console.error(e);
      alert(e.message || 'Error extracting data. Did you set a valid API key or upload a corrupted PDF?');
      setIsProcessing(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', marginTop: '4rem' }}>
      <h1>{type === 'resume' ? 'Upload Your Resume' : 'Analyze a Job Description'}</h1>
      <p className="text-muted">
        {type === 'resume' 
          ? 'Upload your resume (PDF) to instantly extract your skills, education, and projects into the knowledge graph.' 
          : 'Upload a Job Description (PDF) to map its requirements against your existing profile and identify skill gaps.'}
      </p>

      <div style={{ margin: '2rem 0', padding: '1rem', background: 'var(--surface-hover)', borderRadius: 'var(--radius-md)' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>OpenAI API Key (Required for LLM Extraction)</label>
        <input 
          type="password" 
          placeholder="sk-..." 
          value={apiKey} 
          onChange={(e) => setApiKey(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--surface)' }}
        />
        <p style={{ fontSize: '12px', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
          For hackathon demo purposes, type <strong>mock</strong> to bypass the API and load demo data instantly.
        </p>
      </div>

      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? 'var(--primary)' : 'var(--border)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '4rem 2rem',
          textAlign: 'center',
          cursor: 'pointer',
          background: isDragging ? 'var(--surface-hover)' : 'var(--surface)',
          transition: 'all 0.2s ease'
        }}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="application/pdf"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileProcess(e.target.files[0]);
            }
          }}
        />
        
        {isProcessing ? (
          <div style={{ animation: 'pulse 2s infinite' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--primary)', marginBottom: '1rem', animation: 'spin 3s linear infinite' }}>autorenew</span>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>{statusText}</h3>
            <div style={{ width: '100%', height: '4px', background: 'var(--surface-hover)', borderRadius: '2px', marginTop: '1rem', overflow: 'hidden' }}>
              <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', animation: 'slideRight 1.5s infinite ease-in-out' }}></div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '56px', color: isDragging ? 'var(--primary)' : 'var(--text-muted)', marginBottom: '1rem', transition: 'color 0.3s' }}>{type === 'resume' ? 'description' : 'work'}</span>
            <h3 style={{ marginBottom: '0.5rem' }}>{isDragging ? 'Drop it here!' : 'Drag & Drop your PDF here'}</h3>
            <p className="text-muted">or <span style={{ color: 'var(--primary)', textDecoration: 'underline' }}>browse files</span> to upload</p>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};
