export type NodeType = 'skill' | 'interest' | 'career' | 'preference';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  description?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
  is_prerequisite?: boolean;
}

export const preferences: GraphNode[] = [
  { id: 'p_creativity', label: 'Creativity', type: 'preference', description: 'Opportunities to express imagination and originality' },
  { id: 'p_highgrowth', label: 'High Growth', type: 'preference', description: 'Fast-paced environment with rapid career advancement' },
  { id: 'p_jobstability', label: 'Job Stability', type: 'preference', description: 'Consistent, predictable work with strong job security' },
  { id: 'p_problemsolving', label: 'Problem Solving', type: 'preference', description: 'Tackling complex challenges and finding solutions' },
  { id: 'p_workingwithpeople', label: 'Working With People', type: 'preference', description: 'Collaborating, mentoring, or directly serving others' },
  { id: 'p_technology', label: 'Technology', type: 'preference', description: 'Working with cutting-edge tools and software' },
  { id: 'p_leadership', label: 'Leadership', type: 'preference', description: 'Guiding teams and making strategic decisions' },
  { id: 'p_research', label: 'Research', type: 'preference', description: 'Discovering new information and deep analysis' },
  { id: 'p_innovation', label: 'Innovation', type: 'preference', description: 'Pioneering new methods, products, or ideas' },
  { id: 'p_wlb', label: 'Work-Life Balance', type: 'preference', description: 'Maintaining healthy boundaries between work and personal life' }
];

export const skills: GraphNode[] = [
  // Programming
  { id: 's_python', label: 'Python', type: 'skill' },
  { id: 's_java', label: 'Java', type: 'skill' },
  { id: 's_js', label: 'JavaScript', type: 'skill' },
  { id: 's_ts', label: 'TypeScript', type: 'skill' },
  { id: 's_c', label: 'C Language', type: 'skill' },
  { id: 's_cpp', label: 'C++', type: 'skill' },
  { id: 's_csharp', label: 'C#', type: 'skill' },
  { id: 's_kotlin', label: 'Kotlin', type: 'skill' },
  { id: 's_html', label: 'HTML/CSS', type: 'skill' },
  
  // Data
  { id: 's_stats', label: 'Statistical Analysis', type: 'skill' },
  { id: 's_dataviz', label: 'Data Visualization', type: 'skill' },
  { id: 's_dataclean', label: 'Data Cleaning', type: 'skill' },
  { id: 's_eda', label: 'Exploratory Data Analysis', type: 'skill' },
  { id: 's_datamodeling', label: 'Data Modeling', type: 'skill' },
  { id: 's_sql', label: 'SQL', type: 'skill' },
  { id: 's_excel', label: 'Excel', type: 'skill' },
  { id: 's_powerbi', label: 'Power BI', type: 'skill' },
  { id: 's_tableau', label: 'Tableau', type: 'skill' },
  
  // AI / ML
  { id: 's_ml', label: 'Machine Learning', type: 'skill' },
  { id: 's_dl', label: 'Deep Learning', type: 'skill' },
  { id: 's_nlp', label: 'Natural Language Processing', type: 'skill' },
  { id: 's_cv', label: 'Computer Vision', type: 'skill' },
  { id: 's_tensorflow', label: 'TensorFlow', type: 'skill' },
  { id: 's_pytorch', label: 'PyTorch', type: 'skill' },
  { id: 's_modeleval', label: 'Model Evaluation', type: 'skill' },
  
  // Cloud / Infra
  { id: 's_aws', label: 'AWS', type: 'skill' },
  { id: 's_azure', label: 'Azure', type: 'skill' },
  { id: 's_gcp', label: 'Google Cloud', type: 'skill' },
  { id: 's_docker', label: 'Docker', type: 'skill' },
  { id: 's_kubernetes', label: 'Kubernetes', type: 'skill' },
  { id: 's_linux', label: 'Linux', type: 'skill' },
  { id: 's_cicd', label: 'CI/CD', type: 'skill' },
  { id: 's_iac', label: 'Infrastructure as Code', type: 'skill' },
  
  // Cyber
  { id: 's_netsec', label: 'Network Security', type: 'skill' },
  { id: 's_ethicalhack', label: 'Ethical Hacking', type: 'skill' },
  { id: 's_pentest', label: 'Penetration Testing', type: 'skill' },
  { id: 's_vulnassess', label: 'Vulnerability Assessment', type: 'skill' },
  { id: 's_secmon', label: 'Security Monitoring', type: 'skill' },
  { id: 's_incresp', label: 'Incident Response', type: 'skill' },
  { id: 's_crypto', label: 'Cryptography', type: 'skill' },
  
  // Design
  { id: 's_figma', label: 'Figma', type: 'skill' },
  { id: 's_uidesign', label: 'UI Design', type: 'skill' },
  { id: 's_uxdesign', label: 'UX Design', type: 'skill' },
  { id: 's_userres', label: 'User Research', type: 'skill' },
  { id: 's_wireframe', label: 'Wireframing', type: 'skill' },
  { id: 's_prototype', label: 'Prototyping', type: 'skill' },
  { id: 's_infoarch', label: 'Information Architecture', type: 'skill' },
  
  // Business
  { id: 's_pm', label: 'Project Management', type: 'skill' },
  { id: 's_prodm', label: 'Product Management', type: 'skill' },
  { id: 's_bizanal', label: 'Business Analysis', type: 'skill' },
  { id: 's_leadership', label: 'Leadership', type: 'skill' },
  { id: 's_strategic', label: 'Strategic Thinking', type: 'skill' },
  { id: 's_stakeholder', label: 'Stakeholder Management', type: 'skill' },
  { id: 's_present', label: 'Presentation', type: 'skill' },
  
  // Marketing
  { id: 's_seo', label: 'SEO', type: 'skill' },
  { id: 's_contentmkt', label: 'Content Marketing', type: 'skill' },
  { id: 's_socialmkt', label: 'Social Media Marketing', type: 'skill' },
  { id: 's_marketres', label: 'Market Research', type: 'skill' },
  { id: 's_mktanal', label: 'Marketing Analytics', type: 'skill' },
  { id: 's_copy', label: 'Copywriting', type: 'skill' },
  { id: 's_brand', label: 'Branding', type: 'skill' },
  
  // General / Transferable
  { id: 's_probsolve', label: 'Problem Solving', type: 'skill' },
  { id: 's_critical', label: 'Critical Thinking', type: 'skill' },
  { id: 's_creative', label: 'Creativity', type: 'skill' },
  { id: 's_teamwork', label: 'Teamwork', type: 'skill' },
  { id: 's_comm', label: 'Communication', type: 'skill' },
  { id: 's_timemgt', label: 'Time Management', type: 'skill' },
  { id: 's_adapt', label: 'Adaptability', type: 'skill' }
,

  { id: 's_qa', label: 'QA Testing', type: 'skill' },
  { id: 's_selenium', label: 'Selenium', type: 'skill' },
  { id: 's_cypress', label: 'Cypress', type: 'skill' },
  { id: 's_tdd', label: 'Test Driven Development (TDD)', type: 'skill' },
  { id: 's_network', label: 'Networking', type: 'skill' },
  { id: 's_windows', label: 'Windows Server', type: 'skill' },
  { id: 's_tcpip', label: 'TCP/IP', type: 'skill' },
  { id: 's_hardware', label: 'Hardware Troubleshooting', type: 'skill' },
  { id: 's_publicspeak', label: 'Public Speaking', type: 'skill' },
  { id: 's_clientrel', label: 'Client Relationship', type: 'skill' },
  { id: 's_negotiation', label: 'Negotiation', type: 'skill' },
  { id: 's_b2bsales', label: 'B2B Sales', type: 'skill' },
  { id: 's_crm', label: 'CRM', type: 'skill' },
  { id: 's_blockchain', label: 'Blockchain', type: 'skill' },
  { id: 's_smartcontract', label: 'Smart Contracts', type: 'skill' },
  { id: 's_solidity', label: 'Solidity', type: 'skill' },
  { id: 's_arvr', label: 'AR/VR', type: 'skill' },
  { id: 's_unity', label: 'Unity', type: 'skill' },
  { id: 's_iot', label: 'Internet of Things (IoT)', type: 'skill' },
  { id: 's_robotics', label: 'Robotics', type: 'skill' },
  { id: 's_finmodel', label: 'Financial Modeling', type: 'skill' },
  { id: 's_r', label: 'R Language', type: 'skill' },
  { id: 's_matlab', label: 'MATLAB', type: 'skill' },
  { id: 's_trading', label: 'Trading Algorithms', type: 'skill' },
  { id: 's_go', label: 'Go', type: 'skill' },
  { id: 's_rust', label: 'Rust', type: 'skill' },
  { id: 's_swift', label: 'Swift', type: 'skill' },
  { id: 's_ruby', label: 'Ruby', type: 'skill' },
  { id: 's_php', label: 'PHP', type: 'skill' },
  { id: 's_graphql', label: 'GraphQL', type: 'skill' }
,

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
  { id: 's_compliance', label: 'Regulatory Compliance', type: 'skill' }
];

export const interests: GraphNode[] = [
  { id: 'i_analytical', label: 'Analytical Thinking', type: 'interest' },
  { id: 'i_creative', label: 'Creative Arts', type: 'interest' },
  { id: 'i_techeng', label: 'Technical Engineering', type: 'interest' },
  { id: 'i_social', label: 'Social Interaction', type: 'interest' },
  { id: 'i_business', label: 'Business Management', type: 'interest' },
  { id: 'i_research', label: 'Research & Discovery', type: 'interest' },
  { id: 'i_innovation', label: 'Technology & Innovation', type: 'interest' },
  { id: 'i_entrepreneur', label: 'Entrepreneurship', type: 'interest' },
  { id: 'i_orgplan', label: 'Organization & Planning', type: 'interest' },
  { id: 'i_commmedia', label: 'Communication & Media', type: 'interest' },
  { id: 'i_security', label: 'Security & Risk', type: 'interest' },
  { id: 'i_visual', label: 'Design & Visual Creativity', type: 'interest' },
  { id: 'i_data', label: 'Data & Evidence', type: 'interest' },
  { id: 'i_leadership', label: 'Leadership & Influence', type: 'interest' },
  { id: 'i_teaching', label: 'Helping & Teaching', type: 'interest' }
,

  { id: 'i_healthcare', label: 'Healthcare & Medicine', type: 'interest' },
  { id: 'i_creative', label: 'Art & Creative Expression', type: 'interest' },
  { id: 'i_finance', label: 'Finance & Economics', type: 'interest' },
  { id: 'i_hr', label: 'People & Human Resources', type: 'interest' },
  { id: 'i_education', label: 'Education & Mentoring', type: 'interest' },
  { id: 'i_legal', label: 'Law & Compliance', type: 'interest' }
];

export const careers: GraphNode[] = [
  // Software
  { id: 'c_swe', label: 'Software Engineer', type: 'career' },
  { id: 'c_frontend', label: 'Frontend Developer', type: 'career' },
  { id: 'c_backend', label: 'Backend Developer', type: 'career' },
  { id: 'c_fullstack', label: 'Full Stack Developer', type: 'career' },
  { id: 'c_mobile', label: 'Mobile App Developer', type: 'career' },
  { id: 'c_gamedev', label: 'Game Developer', type: 'career' },
  
  // Data & AI
  { id: 'c_ds', label: 'Data Scientist', type: 'career' },
  { id: 'c_da', label: 'Data Analyst', type: 'career' },
  { id: 'c_mle', label: 'Machine Learning Engineer', type: 'career' },
  { id: 'c_ai', label: 'AI Researcher', type: 'career' },
  { id: 'c_de', label: 'Data Engineer', type: 'career' },
  { id: 'c_bia', label: 'Business Intelligence Analyst', type: 'career' },
  
  // Cloud & Infra
  { id: 'c_cloudarch', label: 'Cloud Architect', type: 'career' },
  { id: 'c_cloudeng', label: 'Cloud Engineer', type: 'career' },
  { id: 'c_devops', label: 'DevOps Engineer', type: 'career' },
  { id: 'c_sysadmin', label: 'Systems Administrator', type: 'career' },
  { id: 'c_sre', label: 'Site Reliability Engineer', type: 'career' },
  
  // Cyber
  { id: 'c_cyberanalyst', label: 'Cybersecurity Analyst', type: 'career' },
  { id: 'c_seceng', label: 'Security Engineer', type: 'career' },
  { id: 'c_pentester', label: 'Penetration Tester', type: 'career' },
  { id: 'c_secops', label: 'Security Operations Analyst', type: 'career' },
  
  // Database
  { id: 'c_dba', label: 'Database Administrator', type: 'career' },
  { id: 'c_dbeng', label: 'Database Engineer', type: 'career' },
  { id: 'c_dwdev', label: 'Data Warehouse Developer', type: 'career' },
  
  // Design
  { id: 'c_ux', label: 'UX Designer', type: 'career' },
  { id: 'c_ui', label: 'UI Designer', type: 'career' },
  { id: 'c_proddes', label: 'Product Designer', type: 'career' },
  { id: 'c_uxres', label: 'UX Researcher', type: 'career' },
  
  // Product & Business
  { id: 'c_prodm', label: 'Product Manager', type: 'career' },
  { id: 'c_bizanal', label: 'Business Analyst', type: 'career' },
  { id: 'c_sysanal', label: 'Systems Analyst', type: 'career' },
  { id: 'c_pm', label: 'Project Manager', type: 'career' },
  { id: 'c_prodops', label: 'Product Operations Specialist', type: 'career' },
  
  // Marketing
  { id: 'c_digmkt', label: 'Digital Marketer', type: 'career' },
  { id: 'c_seo', label: 'SEO Specialist', type: 'career' },
  { id: 'c_content', label: 'Content Strategist', type: 'career' },
  { id: 'c_social', label: 'Social Media Specialist', type: 'career' },
  { id: 'c_mktanal', label: 'Marketing Analyst', type: 'career' }
,

  { id: 'c_qa', label: 'QA Engineer', type: 'career' },
  { id: 'c_sdet', label: 'Software Development Engineer in Test (SDET)', type: 'career' },
  { id: 'c_itsupport', label: 'IT Support Specialist', type: 'career' },
  { id: 'c_networkeng', label: 'Network Engineer', type: 'career' },
  { id: 'c_solutionsarch', label: 'Solutions Architect', type: 'career' },
  { id: 'c_saleseng', label: 'Sales Engineer', type: 'career' },
  { id: 'c_csm', label: 'Customer Success Manager', type: 'career' },
  { id: 'c_blockchaindev', label: 'Blockchain Developer', type: 'career' },
  { id: 'c_arvrdev', label: 'AR/VR Developer', type: 'career' },
  { id: 'c_ioteng', label: 'IoT Engineer', type: 'career' },
  { id: 'c_roboticseng', label: 'Robotics Engineer', type: 'career' },
  { id: 'c_quant', label: 'Quantitative Analyst', type: 'career' },
  { id: 'c_fintechdev', label: 'Fintech Developer', type: 'career' },
  { id: 'c_finanalyst', label: 'Financial Analyst', type: 'career' },
  { id: 'c_techwriter', label: 'Technical Writer', type: 'career' }
,

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
  { id: 'c_complianceofficer', label: 'Compliance Officer', type: 'career' }
];

export const edges: GraphEdge[] = [
  // Data Scientist
  { source: 's_ml', target: 'c_ds', weight: 10 },
  { source: 's_stats', target: 'c_ds', weight: 10, is_prerequisite: true },
  { source: 's_python', target: 'c_ds', weight: 8, is_prerequisite: true },
  { source: 's_sql', target: 'c_ds', weight: 8 },
  { source: 's_eda', target: 'c_ds', weight: 8 },
  { source: 's_dataviz', target: 'c_ds', weight: 6 },
  { source: 's_probsolve', target: 'c_ds', weight: 4 },
  { source: 'i_analytical', target: 'c_ds', weight: 8 },
  { source: 'i_data', target: 'c_ds', weight: 8 },
  { source: 'i_research', target: 'c_ds', weight: 6 },

  // AI Researcher
  { source: 's_ml', target: 'c_ai', weight: 10 },
  { source: 's_dl', target: 'c_ai', weight: 10 },
  { source: 's_python', target: 'c_ai', weight: 8 },
  { source: 's_nlp', target: 'c_ai', weight: 8 },
  { source: 's_cv', target: 'c_ai', weight: 8 },
  { source: 's_stats', target: 'c_ai', weight: 8 },
  { source: 's_probsolve', target: 'c_ai', weight: 4 },
  { source: 'i_analytical', target: 'c_ai', weight: 8 },
  { source: 'i_research', target: 'c_ai', weight: 10 },
  { source: 'i_innovation', target: 'c_ai', weight: 6 },
  
  // Machine Learning Engineer
  { source: 's_ml', target: 'c_mle', weight: 10 },
  { source: 's_python', target: 'c_mle', weight: 10 },
  { source: 's_dl', target: 'c_mle', weight: 8 },
  { source: 's_modeleval', target: 'c_mle', weight: 8 },
  { source: 's_docker', target: 'c_mle', weight: 6 },
  { source: 's_probsolve', target: 'c_mle', weight: 4 },
  { source: 'i_techeng', target: 'c_mle', weight: 8 },
  { source: 'i_innovation', target: 'c_mle', weight: 6 },

  // Software Engineer
  { source: 's_python', target: 'c_swe', weight: 9 },
  { source: 's_java', target: 'c_swe', weight: 9 },
  { source: 's_cpp', target: 'c_swe', weight: 8 },
  { source: 's_probsolve', target: 'c_swe', weight: 6 },
  { source: 's_teamwork', target: 'c_swe', weight: 4 },
  { source: 'i_techeng', target: 'c_swe', weight: 8 },
  
  // Frontend Developer
  { source: 's_js', target: 'c_frontend', weight: 10, is_prerequisite: true },
  { source: 's_ts', target: 'c_frontend', weight: 10 },
  { source: 's_html', target: 'c_frontend', weight: 10 },
  { source: 's_uidesign', target: 'c_frontend', weight: 6 },
  { source: 's_figma', target: 'c_frontend', weight: 4 },
  { source: 's_probsolve', target: 'c_frontend', weight: 4 },
  { source: 'i_techeng', target: 'c_frontend', weight: 8 },
  { source: 'i_visual', target: 'c_frontend', weight: 6 },

  // Backend Developer
  { source: 's_java', target: 'c_backend', weight: 10, is_prerequisite: true },
  { source: 's_python', target: 'c_backend', weight: 10, is_prerequisite: true },
  { source: 's_sql', target: 'c_backend', weight: 10 },
  { source: 's_docker', target: 'c_backend', weight: 6 },
  { source: 's_linux', target: 'c_backend', weight: 6 },
  { source: 's_probsolve', target: 'c_backend', weight: 4 },
  { source: 'i_techeng', target: 'c_backend', weight: 10 },
  
  // UX Designer
  { source: 's_uxdesign', target: 'c_ux', weight: 10, is_prerequisite: true },
  { source: 's_figma', target: 'c_ux', weight: 10, is_prerequisite: true },
  { source: 's_userres', target: 'c_ux', weight: 8 },
  { source: 's_wireframe', target: 'c_ux', weight: 8 },
  { source: 's_prototype', target: 'c_ux', weight: 8 },
  { source: 's_html', target: 'c_ux', weight: 4 },
  { source: 's_comm', target: 'c_ux', weight: 4 },
  { source: 'i_creative', target: 'c_ux', weight: 8 },
  { source: 'i_visual', target: 'c_ux', weight: 8 },
  { source: 'i_social', target: 'c_ux', weight: 6 },

  // UX Researcher
  { source: 's_userres', target: 'c_uxres', weight: 10 },
  { source: 's_stats', target: 'c_uxres', weight: 6 },
  { source: 's_comm', target: 'c_uxres', weight: 6 },
  { source: 's_figma', target: 'c_uxres', weight: 4 },
  { source: 'i_research', target: 'c_uxres', weight: 10 },
  { source: 'i_social', target: 'c_uxres', weight: 8 },
  { source: 'i_analytical', target: 'c_uxres', weight: 6 },

  // Cybersecurity Analyst
  { source: 's_netsec', target: 'c_cyberanalyst', weight: 10 },
  { source: 's_secmon', target: 'c_cyberanalyst', weight: 10 },
  { source: 's_incresp', target: 'c_cyberanalyst', weight: 8 },
  { source: 's_linux', target: 'c_cyberanalyst', weight: 6 },
  { source: 's_python', target: 'c_cyberanalyst', weight: 4 },
  { source: 's_probsolve', target: 'c_cyberanalyst', weight: 4 },
  { source: 'i_security', target: 'c_cyberanalyst', weight: 10 },
  { source: 'i_analytical', target: 'c_cyberanalyst', weight: 8 },
  { source: 'i_techeng', target: 'c_cyberanalyst', weight: 8 },

  // Cloud Architect
  { source: 's_aws', target: 'c_cloudarch', weight: 10 },
  { source: 's_azure', target: 'c_cloudarch', weight: 10 },
  { source: 's_gcp', target: 'c_cloudarch', weight: 8 },
  { source: 's_kubernetes', target: 'c_cloudarch', weight: 8 },
  { source: 's_linux', target: 'c_cloudarch', weight: 6 },
  { source: 's_netsec', target: 'c_cloudarch', weight: 6 },
  { source: 's_strategic', target: 'c_cloudarch', weight: 6 },
  { source: 's_probsolve', target: 'c_cloudarch', weight: 4 },
  { source: 'i_techeng', target: 'c_cloudarch', weight: 10 },
  { source: 'i_orgplan', target: 'c_cloudarch', weight: 6 },
  
  // Digital Marketer
  { source: 's_seo', target: 'c_digmkt', weight: 8 },
  { source: 's_socialmkt', target: 'c_digmkt', weight: 8 },
  { source: 's_contentmkt', target: 'c_digmkt', weight: 8 },
  { source: 's_mktanal', target: 'c_digmkt', weight: 6 },
  { source: 's_copy', target: 'c_digmkt', weight: 6 },
  { source: 's_comm', target: 'c_digmkt', weight: 4 },
  { source: 'i_business', target: 'c_digmkt', weight: 8 },
  { source: 'i_commmedia', target: 'c_digmkt', weight: 8 },
  { source: 'i_creative', target: 'c_digmkt', weight: 6 },
  
  // Product Manager
  { source: 's_prodm', target: 'c_prodm', weight: 10 },
  { source: 's_stakeholder', target: 'c_prodm', weight: 8 },
  { source: 's_strategic', target: 'c_prodm', weight: 8 },
  { source: 's_userres', target: 'c_prodm', weight: 6 },
  { source: 's_leadership', target: 'c_prodm', weight: 6 },
  { source: 's_comm', target: 'c_prodm', weight: 4 },
  { source: 's_probsolve', target: 'c_prodm', weight: 4 },
  { source: 'i_business', target: 'c_prodm', weight: 10 },
  { source: 'i_leadership', target: 'c_prodm', weight: 8 },
  { source: 'i_innovation', target: 'c_prodm', weight: 6 },
  
  // DevOps Engineer
  { source: 's_cicd', target: 'c_devops', weight: 10 },
  { source: 's_docker', target: 'c_devops', weight: 10 },
  { source: 's_kubernetes', target: 'c_devops', weight: 10 },
  { source: 's_aws', target: 'c_devops', weight: 8 },
  { source: 's_linux', target: 'c_devops', weight: 8 },
  { source: 's_iac', target: 'c_devops', weight: 8 },
  { source: 's_python', target: 'c_devops', weight: 6 },
  { source: 's_probsolve', target: 'c_devops', weight: 4 },
  { source: 'i_techeng', target: 'c_devops', weight: 10 },
  { source: 'i_orgplan', target: 'c_devops', weight: 6 },
  
  // SEO Specialist
  { source: 's_seo', target: 'c_seo', weight: 10 },
  { source: 's_contentmkt', target: 'c_seo', weight: 8 },
  { source: 's_mktanal', target: 'c_seo', weight: 8 },
  { source: 's_html', target: 'c_seo', weight: 6 },
  { source: 's_copy', target: 'c_seo', weight: 4 },
  { source: 'i_commmedia', target: 'c_seo', weight: 8 },
  { source: 'i_analytical', target: 'c_seo', weight: 6 },
  
  // Data Engineer
  { source: 's_sql', target: 'c_de', weight: 10, is_prerequisite: true },
  { source: 's_datamodeling', target: 'c_de', weight: 10 },
  { source: 's_python', target: 'c_de', weight: 8 },
  { source: 's_java', target: 'c_de', weight: 6 },
  { source: 's_aws', target: 'c_de', weight: 6 },
  { source: 's_dataclean', target: 'c_de', weight: 6 },
  { source: 'i_data', target: 'c_de', weight: 10 },
  { source: 'i_techeng', target: 'c_de', weight: 8 },

  // Business Analyst
  { source: 's_bizanal', target: 'c_bizanal', weight: 10 },
  { source: 's_sql', target: 'c_bizanal', weight: 6 },
  { source: 's_excel', target: 'c_bizanal', weight: 6 },
  { source: 's_stakeholder', target: 'c_bizanal', weight: 8 },
  { source: 's_comm', target: 'c_bizanal', weight: 6 },
  { source: 's_probsolve', target: 'c_bizanal', weight: 4 },
  { source: 'i_business', target: 'c_bizanal', weight: 10 },
  { source: 'i_analytical', target: 'c_bizanal', weight: 8 },

  // Add dummy connections for remaining careers to prevent isolated nodes
  { source: 's_js', target: 'c_fullstack', weight: 10 },
  { source: 's_python', target: 'c_fullstack', weight: 10 },
  { source: 's_sql', target: 'c_fullstack', weight: 8 },
  { source: 'i_techeng', target: 'c_fullstack', weight: 8 },
  
  { source: 's_kotlin', target: 'c_mobile', weight: 10 },
  { source: 's_java', target: 'c_mobile', weight: 8 },
  { source: 'i_techeng', target: 'c_mobile', weight: 8 },

  { source: 's_cpp', target: 'c_gamedev', weight: 10 },
  { source: 's_csharp', target: 'c_gamedev', weight: 10 },
  { source: 'i_techeng', target: 'c_gamedev', weight: 8 },
  { source: 'i_creative', target: 'c_gamedev', weight: 6 },
  
  { source: 's_sql', target: 'c_da', weight: 10 },
  { source: 's_excel', target: 'c_da', weight: 8 },
  { source: 's_dataviz', target: 'c_da', weight: 8 },
  { source: 's_tableau', target: 'c_da', weight: 6 },
  { source: 'i_data', target: 'c_da', weight: 10 },

  { source: 's_sql', target: 'c_bia', weight: 10 },
  { source: 's_powerbi', target: 'c_bia', weight: 10 },
  { source: 's_tableau', target: 'c_bia', weight: 8 },
  { source: 'i_business', target: 'c_bia', weight: 8 },

  { source: 's_aws', target: 'c_cloudeng', weight: 10 },
  { source: 's_linux', target: 'c_cloudeng', weight: 8 },
  { source: 'i_techeng', target: 'c_cloudeng', weight: 8 },
  
  { source: 's_linux', target: 'c_sysadmin', weight: 10 },
  { source: 's_netsec', target: 'c_sysadmin', weight: 6 },
  { source: 'i_techeng', target: 'c_sysadmin', weight: 8 },
  
  { source: 's_linux', target: 'c_sre', weight: 10 },
  { source: 's_python', target: 'c_sre', weight: 8 },
  { source: 's_docker', target: 'c_sre', weight: 6 },
  { source: 'i_techeng', target: 'c_sre', weight: 8 },
  
  { source: 's_netsec', target: 'c_seceng', weight: 10 },
  { source: 's_crypto', target: 'c_seceng', weight: 8 },
  { source: 'i_security', target: 'c_seceng', weight: 10 },
  
  { source: 's_pentest', target: 'c_pentester', weight: 10 },
  { source: 's_ethicalhack', target: 'c_pentester', weight: 10 },
  { source: 's_vulnassess', target: 'c_pentester', weight: 8 },
  { source: 'i_security', target: 'c_pentester', weight: 10 },

  { source: 's_secmon', target: 'c_secops', weight: 10 },
  { source: 's_incresp', target: 'c_secops', weight: 10 },
  { source: 'i_security', target: 'c_secops', weight: 10 },
  
  { source: 's_sql', target: 'c_dba', weight: 10 },
  { source: 's_linux', target: 'c_dba', weight: 6 },
  { source: 'i_data', target: 'c_dba', weight: 10 },

  { source: 's_sql', target: 'c_dbeng', weight: 10 },
  { source: 's_datamodeling', target: 'c_dbeng', weight: 8 },
  { source: 'i_data', target: 'c_dbeng', weight: 10 },

  { source: 's_sql', target: 'c_dwdev', weight: 10 },
  { source: 's_datamodeling', target: 'c_dwdev', weight: 10 },
  { source: 'i_data', target: 'c_dwdev', weight: 10 },

  { source: 's_uidesign', target: 'c_ui', weight: 10 },
  { source: 's_figma', target: 'c_ui', weight: 10 },
  { source: 'i_visual', target: 'c_ui', weight: 10 },
  
  { source: 's_uxdesign', target: 'c_proddes', weight: 10 },
  { source: 's_prodm', target: 'c_proddes', weight: 8 },
  { source: 'i_creative', target: 'c_proddes', weight: 8 },
  
  { source: 's_bizanal', target: 'c_sysanal', weight: 10 },
  { source: 's_sql', target: 'c_sysanal', weight: 6 },
  { source: 'i_techeng', target: 'c_sysanal', weight: 8 },

  { source: 's_pm', target: 'c_pm', weight: 10 },
  { source: 's_stakeholder', target: 'c_pm', weight: 8 },
  { source: 'i_orgplan', target: 'c_pm', weight: 10 },

  { source: 's_prodm', target: 'c_prodops', weight: 10 },
  { source: 's_stats', target: 'c_prodops', weight: 6 },
  { source: 'i_business', target: 'c_prodops', weight: 8 },
  
  { source: 's_contentmkt', target: 'c_content', weight: 10 },
  { source: 's_copy', target: 'c_content', weight: 10 },
  { source: 'i_commmedia', target: 'c_content', weight: 10 },
  
  { source: 's_socialmkt', target: 'c_social', weight: 10 },
  { source: 's_copy', target: 'c_social', weight: 6 },
  { source: 'i_commmedia', target: 'c_social', weight: 10 },
  
  { source: 's_mktanal', target: 'c_mktanal', weight: 10 },
  { source: 's_excel', target: 'c_mktanal', weight: 8 },
  { source: 'i_business', target: 'c_mktanal', weight: 8 },

  // Add remaining generic traits loosely to random roles so they aren't isolated
  { source: 's_critical', target: 'c_swe', weight: 2 },
  { source: 's_creative', target: 'c_ux', weight: 2 },
  { source: 's_timemgt', target: 'c_pm', weight: 2 },
  { source: 's_adapt', target: 'c_prodm', weight: 2 },
  { source: 'i_teaching', target: 'c_uxres', weight: 2 },
  { source: 'i_entrepreneur', target: 'c_prodm', weight: 2 },
  { source: 's_present', target: 'c_bizanal', weight: 4 },
  { source: 's_brand', target: 'c_digmkt', weight: 8 },
  { source: 'i_social', target: 'c_pm', weight: 4 },

  // Skill-to-Skill edges (Prerequisites / Adjacent for BFS inference)
  { source: 's_js', target: 's_ts', weight: 8 },
  { source: 's_python', target: 's_ml', weight: 8 },
  { source: 's_stats', target: 's_ml', weight: 8 },
  { source: 's_sql', target: 's_datamodeling', weight: 8 },
  { source: 's_figma', target: 's_uidesign', weight: 8 },
  { source: 's_c', target: 's_cpp', weight: 8 },
  { source: 's_c', target: 'c_swe', weight: 6 },
  { source: 's_c', target: 'c_gamedev', weight: 6 },
  { source: 's_figma', target: 's_uxdesign', weight: 8 },
  { source: 's_netsec', target: 's_ethicalhack', weight: 8 },

  // Preference edges
  { source: 'p_creativity', target: 'c_ux', weight: 10 },
  { source: 'p_creativity', target: 'c_proddes', weight: 10 },
  { source: 'p_creativity', target: 'c_frontend', weight: 6 },
  { source: 'p_highgrowth', target: 'c_ds', weight: 8 },
  { source: 'p_highgrowth', target: 'c_ai', weight: 10 },
  { source: 'p_jobstability', target: 'c_dba', weight: 10 },
  { source: 'p_jobstability', target: 'c_sysadmin', weight: 10 },
  { source: 'p_problemsolving', target: 'c_swe', weight: 10 },
  { source: 'p_problemsolving', target: 'c_backend', weight: 10 },
  { source: 'p_workingwithpeople', target: 'c_pm', weight: 10 },
  { source: 'p_workingwithpeople', target: 'c_prodm', weight: 10 },
  { source: 'p_technology', target: 'c_swe', weight: 8 },
  { source: 'p_technology', target: 'c_cloud', weight: 10 },
  { source: 'p_leadership', target: 'c_pm', weight: 10 },
  { source: 'p_leadership', target: 'c_prodops', weight: 8 },
  { source: 'p_research', target: 'c_ai', weight: 10 },
  { source: 'p_research', target: 'c_uxres', weight: 10 },
  { source: 'p_innovation', target: 'c_mle', weight: 10 },
  { source: 'p_innovation', target: 'c_ai', weight: 10 },
  { source: 'p_wlb', target: 'c_qa', weight: 10 },
  { source: 'p_wlb', target: 'c_techwrite', weight: 10 }
,

  { source: 's_qa', target: 'c_qa', weight: 8, is_prerequisite: true },
  { source: 's_selenium', target: 'c_qa', weight: 7 },
  { source: 's_cypress', target: 'c_sdet', weight: 8 },
  { source: 's_tdd', target: 'c_sdet', weight: 7 },
  { source: 's_python', target: 'c_sdet', weight: 6 },
  
  { source: 's_network', target: 'c_networkeng', weight: 9, is_prerequisite: true },
  { source: 's_tcpip', target: 'c_networkeng', weight: 8 },
  { source: 's_linux', target: 'c_networkeng', weight: 7 },
  { source: 's_windows', target: 'c_itsupport', weight: 8 },
  { source: 's_hardware', target: 'c_itsupport', weight: 9, is_prerequisite: true },
  
  { source: 's_aws', target: 'c_solutionsarch', weight: 9, is_prerequisite: true },
  { source: 's_clientrel', target: 'c_solutionsarch', weight: 8 },
  { source: 's_comm', target: 'c_solutionsarch', weight: 7 },
  { source: 's_publicspeak', target: 'c_saleseng', weight: 8 },
  { source: 's_b2bsales', target: 'c_saleseng', weight: 8, is_prerequisite: true },
  { source: 's_negotiation', target: 'c_saleseng', weight: 7 },
  { source: 's_crm', target: 'c_csm', weight: 8, is_prerequisite: true },
  { source: 's_clientrel', target: 'c_csm', weight: 9 },
  
  { source: 's_blockchain', target: 'c_blockchaindev', weight: 9, is_prerequisite: true },
  { source: 's_smartcontract', target: 'c_blockchaindev', weight: 8 },
  { source: 's_solidity', target: 'c_blockchaindev', weight: 9, is_prerequisite: true },
  { source: 's_go', target: 'c_blockchaindev', weight: 6 },
  
  { source: 's_arvr', target: 'c_arvrdev', weight: 9, is_prerequisite: true },
  { source: 's_unity', target: 'c_arvrdev', weight: 8 },
  { source: 's_csharp', target: 'c_arvrdev', weight: 7 },
  { source: 's_cpp', target: 'c_gamedev', weight: 8 },
  { source: 's_unity', target: 'c_gamedev', weight: 9 },
  
  { source: 's_iot', target: 'c_ioteng', weight: 9, is_prerequisite: true },
  { source: 's_hardware', target: 'c_ioteng', weight: 7 },
  { source: 's_c', target: 'c_ioteng', weight: 8 },
  { source: 's_cpp', target: 'c_ioteng', weight: 7 },
  { source: 's_robotics', target: 'c_roboticseng', weight: 9, is_prerequisite: true },
  { source: 's_cpp', target: 'c_roboticseng', weight: 8 },
  { source: 's_python', target: 'c_roboticseng', weight: 7 },
  
  { source: 's_finmodel', target: 'c_finanalyst', weight: 9, is_prerequisite: true },
  { source: 's_excel', target: 'c_finanalyst', weight: 8 },
  { source: 's_r', target: 'c_finanalyst', weight: 6 },
  { source: 's_trading', target: 'c_quant', weight: 9, is_prerequisite: true },
  { source: 's_r', target: 'c_quant', weight: 8 },
  { source: 's_python', target: 'c_quant', weight: 8 },
  { source: 's_stats', target: 'c_quant', weight: 9 },
  { source: 's_matlab', target: 'c_quant', weight: 7 },
  { source: 's_java', target: 'c_fintechdev', weight: 8 },
  { source: 's_csharp', target: 'c_fintechdev', weight: 7 },
  
  { source: 's_comm', target: 'c_techwriter', weight: 9, is_prerequisite: true },
  { source: 's_copy', target: 'c_techwriter', weight: 8 },
  
  { source: 's_rust', target: 'c_backend', weight: 6 },
  { source: 's_go', target: 'c_backend', weight: 7 },
  { source: 's_ruby', target: 'c_fullstack', weight: 6 },
  { source: 's_php', target: 'c_fullstack', weight: 6 },
  { source: 's_graphql', target: 'c_frontend', weight: 7 },
  { source: 's_graphql', target: 'c_backend', weight: 7 },
  { source: 's_swift', target: 'c_mobile', weight: 9 }
,

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
  { source: 's_bizanal', target: 'c_complianceofficer', weight: 6 }
];

export const allNodes: GraphNode[] = [...skills, ...interests, ...careers, ...preferences];
