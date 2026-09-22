const fs = require('fs');
let data = fs.readFileSync('src/data/mockData.ts', 'utf8');

const newSkills = `
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
  { id: 's_graphql', label: 'GraphQL', type: 'skill' }`;

data = data.replace(/export const skills: GraphNode\[\] = \[([\s\S]*?)\];/, 'export const skills: GraphNode[] = [$1' + ',\n' + newSkills + '\n];');

const newCareers = `
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
  { id: 'c_techwriter', label: 'Technical Writer', type: 'career' }`;

data = data.replace(/export const careers: GraphNode\[\] = \[([\s\S]*?)\];/, 'export const careers: GraphNode[] = [$1' + ',\n' + newCareers + '\n];');

const newEdges = `
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
  { source: 's_swift', target: 'c_mobile', weight: 9 }`;

data = data.replace(/export const edges: GraphEdge\[\] = \[([\s\S]*?)\];/, 'export const edges: GraphEdge[] = [$1' + ',\n' + newEdges + '\n];');

fs.writeFileSync('src/data/mockData.ts', data);
