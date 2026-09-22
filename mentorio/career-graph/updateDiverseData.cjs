const fs = require('fs');
let data = fs.readFileSync('src/data/mockData.ts', 'utf8');

const newInterests = `
  { id: 'i_healthcare', label: 'Healthcare & Medicine', type: 'interest' },
  { id: 'i_creative', label: 'Art & Creative Expression', type: 'interest' },
  { id: 'i_finance', label: 'Finance & Economics', type: 'interest' },
  { id: 'i_hr', label: 'People & Human Resources', type: 'interest' },
  { id: 'i_education', label: 'Education & Mentoring', type: 'interest' },
  { id: 'i_legal', label: 'Law & Compliance', type: 'interest' }`;
data = data.replace(/export const interests: GraphNode\[\] = \[([\s\S]*?)\];/, 'export const interests: GraphNode[] = [$1' + ',\n' + newInterests + '\n];');


const newSkills = `
  { id: 's_patientcare', label: 'Patient Care', type: 'skill' },
  { id: 's_medterm', label: 'Medical Terminology', type: 'skill' },
  { id: 's_cpr', label: 'CPR & First Aid', type: 'skill' },
  { id: 's_healthadmin', label: 'Healthcare Administration', type: 'skill' },
  { id: 's_adobe', label: 'Adobe Creative Suite', type: 'skill' },
  { id: 's_videoedit', label: 'Video Editing', type: 'skill' },
  { id: 's_creativewriting', label: 'Creative Writing', type: 'skill' },
  { id: 's_typography', label: 'Typography', type: 'skill' },
  { id: 's_storytelling', label: 'Storytelling', type: 'skill' },
  { id: 's_accounting', label: 'Accounting', type: 'skill' },
  { id: 's_tax', label: 'Tax Preparation', type: 'skill' },
  { id: 's_financialanalysis', label: 'Financial Analysis', type: 'skill' },
  { id: 's_economics', label: 'Economics', type: 'skill' },
  { id: 's_gaap', label: 'GAAP', type: 'skill' },
  { id: 's_recruitment', label: 'Recruitment', type: 'skill' },
  { id: 's_emprelations', label: 'Employee Relations', type: 'skill' },
  { id: 's_supplychain', label: 'Supply Chain Management', type: 'skill' },
  { id: 's_logistics', label: 'Logistics', type: 'skill' },
  { id: 's_eventplan', label: 'Event Planning', type: 'skill' },
  { id: 's_curriculum', label: 'Curriculum Development', type: 'skill' },
  { id: 's_pedagogy', label: 'Pedagogy', type: 'skill' },
  { id: 's_instructional', label: 'Instructional Design', type: 'skill' },
  { id: 's_classroom', label: 'Classroom Management', type: 'skill' },
  { id: 's_legalres', label: 'Legal Research', type: 'skill' },
  { id: 's_contracts', label: 'Contract Drafting', type: 'skill' },
  { id: 's_compliance', label: 'Regulatory Compliance', type: 'skill' }`;
data = data.replace(/export const skills: GraphNode\[\] = \[([\s\S]*?)\];/, 'export const skills: GraphNode[] = [$1' + ',\n' + newSkills + '\n];');

const newCareers = `
  { id: 'c_nurse', label: 'Registered Nurse', type: 'career' },
  { id: 'c_healthadmin', label: 'Healthcare Administrator', type: 'career' },
  { id: 'c_pharmacist', label: 'Pharmacist', type: 'career' },
  { id: 'c_graphicdes', label: 'Graphic Designer', type: 'career' },
  { id: 'c_videoed', label: 'Video Editor', type: 'career' },
  { id: 'c_artdir', label: 'Art Director', type: 'career' },
  { id: 'c_copywriter', label: 'Copywriter', type: 'career' },
  { id: 'c_prspec', label: 'Public Relations Specialist', type: 'career' },
  { id: 'c_accountant', label: 'Accountant', type: 'career' },
  { id: 'c_finadvisor', label: 'Financial Advisor', type: 'career' },
  { id: 'c_investmentbanker', label: 'Investment Banker', type: 'career' },
  { id: 'c_economist', label: 'Economist', type: 'career' },
  { id: 'c_hrmanager', label: 'HR Manager', type: 'career' },
  { id: 'c_techrecruiter', label: 'Technical Recruiter', type: 'career' },
  { id: 'c_opsmanager', label: 'Operations Manager', type: 'career' },
  { id: 'c_supplychainanalyst', label: 'Supply Chain Analyst', type: 'career' },
  { id: 'c_teacher', label: 'Educator / Teacher', type: 'career' },
  { id: 'c_instdes', label: 'Instructional Designer', type: 'career' },
  { id: 'c_corptrainer', label: 'Corporate Trainer', type: 'career' },
  { id: 'c_paralegal', label: 'Paralegal', type: 'career' },
  { id: 'c_complianceofficer', label: 'Compliance Officer', type: 'career' }`;
data = data.replace(/export const careers: GraphNode\[\] = \[([\s\S]*?)\];/, 'export const careers: GraphNode[] = [$1' + ',\n' + newCareers + '\n];');


const newEdges = `
  { source: 'i_healthcare', target: 'c_nurse', weight: 10 },
  { source: 's_patientcare', target: 'c_nurse', weight: 9, is_prerequisite: true },
  { source: 's_medterm', target: 'c_nurse', weight: 8 },
  { source: 's_cpr', target: 'c_nurse', weight: 9, is_prerequisite: true },
  { source: 'i_healthcare', target: 'c_healthadmin', weight: 8 },
  { source: 's_healthadmin', target: 'c_healthadmin', weight: 9, is_prerequisite: true },
  { source: 's_leadership', target: 'c_healthadmin', weight: 7 },
  { source: 'i_healthcare', target: 'c_pharmacist', weight: 9 },
  { source: 's_medterm', target: 'c_pharmacist', weight: 9, is_prerequisite: true },

  { source: 'i_creative', target: 'c_graphicdes', weight: 10 },
  { source: 's_adobe', target: 'c_graphicdes', weight: 9, is_prerequisite: true },
  { source: 's_typography', target: 'c_graphicdes', weight: 8 },
  { source: 'i_creative', target: 'c_videoed', weight: 9 },
  { source: 's_videoedit', target: 'c_videoed', weight: 9, is_prerequisite: true },
  { source: 's_adobe', target: 'c_videoed', weight: 7 },
  { source: 'i_creative', target: 'c_artdir', weight: 9 },
  { source: 's_leadership', target: 'c_artdir', weight: 8 },
  { source: 's_creative', target: 'c_artdir', weight: 9, is_prerequisite: true },
  { source: 'i_creative', target: 'c_copywriter', weight: 8 },
  { source: 's_creativewriting', target: 'c_copywriter', weight: 9, is_prerequisite: true },
  { source: 's_copy', target: 'c_copywriter', weight: 8 },
  { source: 'i_creative', target: 'c_prspec', weight: 8 },
  { source: 's_comm', target: 'c_prspec', weight: 9, is_prerequisite: true },
  { source: 's_storytelling', target: 'c_prspec', weight: 8 },

  { source: 'i_finance', target: 'c_accountant', weight: 10 },
  { source: 's_accounting', target: 'c_accountant', weight: 9, is_prerequisite: true },
  { source: 's_gaap', target: 'c_accountant', weight: 8 },
  { source: 's_tax', target: 'c_accountant', weight: 7 },
  { source: 'i_finance', target: 'c_finadvisor', weight: 9 },
  { source: 's_financialanalysis', target: 'c_finadvisor', weight: 9, is_prerequisite: true },
  { source: 's_comm', target: 'c_finadvisor', weight: 8 },
  { source: 'i_finance', target: 'c_investmentbanker', weight: 9 },
  { source: 's_financialanalysis', target: 'c_investmentbanker', weight: 9, is_prerequisite: true },
  { source: 's_finmodel', target: 'c_investmentbanker', weight: 8 },
  { source: 'i_finance', target: 'c_economist', weight: 8 },
  { source: 's_economics', target: 'c_economist', weight: 9, is_prerequisite: true },
  { source: 's_stats', target: 'c_economist', weight: 8 },

  { source: 'i_hr', target: 'c_hrmanager', weight: 10 },
  { source: 's_emprelations', target: 'c_hrmanager', weight: 9, is_prerequisite: true },
  { source: 's_recruitment', target: 'c_hrmanager', weight: 7 },
  { source: 'i_hr', target: 'c_techrecruiter', weight: 9 },
  { source: 's_recruitment', target: 'c_techrecruiter', weight: 9, is_prerequisite: true },
  { source: 's_comm', target: 'c_techrecruiter', weight: 7 },
  { source: 'i_business', target: 'c_opsmanager', weight: 9 },
  { source: 's_leadership', target: 'c_opsmanager', weight: 9, is_prerequisite: true },
  { source: 's_supplychain', target: 'c_supplychainanalyst', weight: 9, is_prerequisite: true },
  { source: 's_logistics', target: 'c_supplychainanalyst', weight: 8 },

  { source: 'i_education', target: 'c_teacher', weight: 10 },
  { source: 's_pedagogy', target: 'c_teacher', weight: 9, is_prerequisite: true },
  { source: 's_classroom', target: 'c_teacher', weight: 8 },
  { source: 'i_education', target: 'c_instdes', weight: 8 },
  { source: 's_instructional', target: 'c_instdes', weight: 9, is_prerequisite: true },
  { source: 's_curriculum', target: 'c_instdes', weight: 8 },
  { source: 'i_education', target: 'c_corptrainer', weight: 8 },
  { source: 's_present', target: 'c_corptrainer', weight: 9, is_prerequisite: true },

  { source: 'i_legal', target: 'c_paralegal', weight: 9 },
  { source: 's_legalres', target: 'c_paralegal', weight: 9, is_prerequisite: true },
  { source: 's_contracts', target: 'c_paralegal', weight: 7 },
  { source: 'i_legal', target: 'c_complianceofficer', weight: 9 },
  { source: 's_compliance', target: 'c_complianceofficer', weight: 9, is_prerequisite: true },
  { source: 's_bizanal', target: 'c_complianceofficer', weight: 6 }`;

data = data.replace(/export const edges: GraphEdge\[\] = \[([\s\S]*?)\];/, 'export const edges: GraphEdge[] = [$1' + ',\n' + newEdges + '\n];');

fs.writeFileSync('src/data/mockData.ts', data);
