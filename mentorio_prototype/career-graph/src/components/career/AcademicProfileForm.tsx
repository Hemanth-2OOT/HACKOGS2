import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import './AcademicProfileForm.css';

interface AcademicProfileFormProps {
  onNext: () => void;
  onSkip: () => void;
}

const STREAMS = ['Science', 'Commerce', 'Arts/Humanities', 'Vocational', 'Other'];
const DEGREES = ['B.Tech / B.E.', 'BCA', 'B.Sc', 'B.Com', 'BBA', 'BA', 'MCA', 'M.Tech', 'MBA', 'Other'];
const SPECIALIZATIONS = ['AI & Machine Learning', 'Data Science', 'Cybersecurity', 'Core CS / IT', 'Electronics', 'Mechanical', 'Civil', 'Business / Management', 'Finance / Accounting', 'Arts / Humanities', 'General / Other'];
const YEARS = ['1', '2', '3', '4', '5'];
const SEMESTERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export const AcademicProfileForm = ({ onNext, onSkip }: AcademicProfileFormProps) => {
  const { academicProfile, setAcademicProfile } = useApp();
  
  const [grade10, setGrade10] = useState(academicProfile?.grade10 || '');
  const [grade12, setGrade12] = useState(academicProfile?.grade12 || '');
  const [stream, setStream] = useState(academicProfile?.stream || '');
  const [degreeStatus, setDegreeStatus] = useState(academicProfile?.degreeStatus || '');
  const [degree, setDegree] = useState(academicProfile?.degree || '');
  const [specialization, setSpecialization] = useState(academicProfile?.specialization || '');
  const [year, setYear] = useState(academicProfile?.year || '');
  const [semester, setSemester] = useState(academicProfile?.semester || '');
  
  const [error, setError] = useState('');

  const validate = () => {
    if (grade10 && (isNaN(Number(grade10)) || Number(grade10) < 0 || Number(grade10) > 100)) return "10th grade must be between 0 and 100.";
    if (grade12 && (isNaN(Number(grade12)) || Number(grade12) < 0 || Number(grade12) > 100)) return "12th grade must be between 0 and 100.";
    
    if (degreeStatus === 'Ongoing') {
      if (!degree) return "Please select a degree program.";
      if (!year || !semester) return "Please select your current year and semester for an ongoing degree.";
      
      // Basic validation for semester vs year
      if (Number(semester) > Number(year) * 2) {
        return "Semester cannot exceed year * 2 (e.g. Year 1 max semester is 2).";
      }
    }
    
    if (degreeStatus === 'Completed' && !degree) return "Please select a degree program.";
    
    return "";
  };

  const handleSaveAndNext = () => {
    const errMsg = validate();
    if (errMsg) {
      setError(errMsg);
      return;
    }
    
    // Only save if at least something is provided, else treat as skip
    if (!grade10 && !grade12 && !stream && !degreeStatus) {
      handleSkip();
      return;
    }

    setAcademicProfile({
      grade10,
      grade12,
      stream,
      degreeStatus,
      degree,
      specialization: (degreeStatus === 'Ongoing' || degreeStatus === 'Completed') ? specialization : '',
      year: degreeStatus === 'Ongoing' ? year : '',
      semester: degreeStatus === 'Ongoing' ? semester : '',
    });
    
    onNext();
  };

  const handleSkip = () => {
    setAcademicProfile(null);
    onSkip();
  };

  return (
    <div className="academic-form">
      <p className="step-subheading">Your academic background helps personalize your career exploration, but it does not define your career potential.</p>
      
      {error && <div className="academic-error">{error}</div>}

      <div className="form-group">
        <label>10th Grade Percentage</label>
        <input 
          type="number" 
          placeholder="e.g. 85" 
          value={grade10} 
          onChange={e => setGrade10(e.target.value)} 
          min="0" max="100"
        />
      </div>

      <div className="form-group">
        <label>12th Grade Percentage</label>
        <input 
          type="number" 
          placeholder="e.g. 82" 
          value={grade12} 
          onChange={e => setGrade12(e.target.value)} 
          min="0" max="100"
        />
      </div>

      <div className="form-group">
        <label>12th Stream</label>
        <select value={stream} onChange={e => setStream(e.target.value)}>
          <option value="">-- Select Stream --</option>
          {STREAMS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Degree Status</label>
        <select value={degreeStatus} onChange={e => setDegreeStatus(e.target.value)}>
          <option value="">-- Select Status --</option>
          <option value="None">None / Not Started</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {(degreeStatus === 'Ongoing' || degreeStatus === 'Completed') && (
        <>
          <div className="form-group animate-in">
            <label>Degree Program</label>
            <select value={degree} onChange={e => setDegree(e.target.value)}>
              <option value="">-- Select Degree --</option>
              {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          
          <div className="form-group animate-in" style={{ marginTop: '16px' }}>
            <label>Specialization / Major</label>
            <select value={specialization} onChange={e => setSpecialization(e.target.value)}>
              <option value="">-- Select Specialization --</option>
              {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </>
      )}

      {degreeStatus === 'Ongoing' && (
        <div className="form-row animate-in">
          <div className="form-group">
            <label>Current Year</label>
            <select value={year} onChange={e => setYear(e.target.value)}>
              <option value="">-- Year --</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Current Semester</label>
            <select value={semester} onChange={e => setSemester(e.target.value)}>
              <option value="">-- Semester --</option>
              {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      )}

      <div className="academic-actions mt-lg">
        <Button variant="outline" onClick={handleSkip}>Skip Academic Profile</Button>
        <Button variant="primary" onClick={handleSaveAndNext}>Save & Continue</Button>
      </div>
    </div>
  );
};
