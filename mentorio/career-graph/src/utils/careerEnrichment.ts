export const getCareerTasks = (label: string): string[] => {
  const normalized = label.toLowerCase();
  
  if (normalized.includes('frontend')) {
    return [
      'Build and style interactive user interfaces',
      'Optimize web applications for maximum speed and scalability',
      'Collaborate with designers to implement UI/UX designs',
      'Write responsive, accessible, and cross-browser compatible code'
    ];
  }
  if (normalized.includes('backend')) {
    return [
      'Design and maintain server-side application logic',
      'Integrate data storage solutions and databases',
      'Build secure, robust, and scalable APIs',
      'Optimize server performance and handle application scaling'
    ];
  }
  if (normalized.includes('data eng') || normalized.includes('warehouse')) {
    return [
      'Design and build data pipelines and architecture',
      'Wrangle and clean massive datasets',
      'Implement ETL (Extract, Transform, Load) processes',
      'Optimize database performance and reliability'
    ];
  }
  if (normalized.includes('software') || normalized.includes('developer') || normalized.includes('full stack')) {
    return [
      'Write clean, maintainable, and efficient code',
      'Design software architectures and system workflows',
      'Debug, test, and troubleshoot application issues',
      'Collaborate in agile sprints with cross-functional teams'
    ];
  }
  
  if (normalized.includes('data scientist') || normalized.includes('machine learning') || normalized.includes('ai') || normalized.includes('quant')) {
    return [
      'Analyze complex datasets to extract actionable insights',
      'Build and train predictive machine learning models',
      'Communicate findings using data visualization tools',
      'Automate data-driven decision making processes'
    ];
  }

  if (normalized.includes('design') || normalized.includes('ux') || normalized.includes('ui') || normalized.includes('art dir')) {
    return [
      'Conduct user research and usability testing',
      'Create wireframes, prototypes, and user flows',
      'Design visually appealing user interfaces',
      'Advocate for user-centric design principles'
    ];
  }
  
  if (normalized.includes('manager') || normalized.includes('analyst') || normalized.includes('scrum')) {
    return [
      'Define product vision and strategic roadmaps',
      'Analyze market trends and business requirements',
      'Coordinate with engineering, design, and marketing teams',
      'Track project metrics and ensure timely delivery'
    ];
  }
  
  if (normalized.includes('security') || normalized.includes('cyber') || normalized.includes('pentester')) {
    return [
      'Monitor networks for security breaches',
      'Perform vulnerability testing and risk analyses',
      'Develop security standards and best practices',
      'Respond to and mitigate cyber security incidents'
    ];
  }

  if (normalized.includes('cloud') || normalized.includes('devops') || normalized.includes('sre') || normalized.includes('sysadmin')) {
    return [
      'Design and manage scalable cloud infrastructure',
      'Automate CI/CD deployment pipelines',
      'Monitor system health and ensure high availability',
      'Implement infrastructure as code (IaC) solutions'
    ];
  }

  if (normalized.includes('qa') || normalized.includes('sdet') || normalized.includes('test')) {
    return [
      'Design and execute comprehensive test plans',
      'Develop automated testing scripts and frameworks',
      'Identify, document, and track software defects',
      'Ensure software releases meet quality standards'
    ];
  }

  if (normalized.includes('sales') || normalized.includes('customer') || normalized.includes('account')) {
    return [
      'Manage client relationships and ensure customer satisfaction',
      'Deliver technical presentations and product demos',
      'Identify new business opportunities and close sales',
      'Gather customer feedback to improve product offerings'
    ];
  }

  if (normalized.includes('nurse') || normalized.includes('health') || normalized.includes('pharmacist')) {
    return [
      'Provide direct patient care and administer treatments',
      'Maintain accurate medical records and documentation',
      'Educate patients and families on health management',
      'Collaborate with physicians and healthcare teams'
    ];
  }

  if (normalized.includes('accountant') || normalized.includes('finance') || normalized.includes('economist')) {
    return [
      'Analyze financial data and prepare accurate reports',
      'Ensure compliance with accounting standards (GAAP)',
      'Provide strategic financial planning and forecasting',
      'Evaluate economic trends and market risks'
    ];
  }

  if (normalized.includes('hr ') || normalized.includes('recruiter') || normalized.includes('human resources')) {
    return [
      'Manage end-to-end talent acquisition and recruitment',
      'Oversee employee relations and conflict resolution',
      'Administer payroll, benefits, and performance reviews',
      'Develop company culture and compliance policies'
    ];
  }

  if (normalized.includes('teacher') || normalized.includes('educator') || normalized.includes('trainer') || normalized.includes('instructional')) {
    return [
      'Develop and deliver engaging educational curriculum',
      'Assess student progress and provide constructive feedback',
      'Manage classroom environments and facilitate discussions',
      'Design effective e-learning modules and training materials'
    ];
  }

  if (normalized.includes('legal') || normalized.includes('compliance') || normalized.includes('paralegal')) {
    return [
      'Conduct extensive legal research and documentation',
      'Draft, review, and negotiate business contracts',
      'Ensure organizational compliance with laws and regulations',
      'Support attorneys during trials and corporate proceedings'
    ];
  }

  if (normalized.includes('video') || normalized.includes('copywriter') || normalized.includes('public relations')) {
    return [
      'Create compelling content and storytelling materials',
      'Edit and produce high-quality multimedia assets',
      'Manage brand reputation and public communications',
      'Collaborate with marketing teams on creative campaigns'
    ];
  }

  // Fallback
  return [
    'Collaborate with cross-functional teams to achieve project goals',
    'Continuously learn and adapt to industry trends',
    'Solve complex domain-specific problems',
    'Communicate progress and results to stakeholders'
  ];
};

export const getLearningResources = (skillLabel: string) => {
  const query = encodeURIComponent(skillLabel);
  return {
    coursera: `https://www.coursera.org/search?query=${query}`,
    udemy: `https://www.udemy.com/courses/search/?q=${query}`,
    youtube: `https://www.youtube.com/results?search_query=${query}+tutorial+for+beginners`
  };
};
