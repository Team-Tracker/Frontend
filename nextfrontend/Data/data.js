const teams = [
    {
      teamid: 1,
      teamName: 'Team Alpha',
      leaderName: 'John Doe',
      description: 'This is a highly skilled team working on AI solutions.'
    },
    {
      teamid: 2,
      teamName: 'Team Beta',
      leaderName: 'Jane Smith',
      description: 'This team focuses on backend development for scalable applications.'
    },
    {
      teamid: 3,
      teamName: 'Team Gamma',
      leaderName: 'Jane Smith',
      description: 'This team focuses on backend development for scalable applications.'
    },
    {
      teamid: 4,
      teamName: 'Team Delta',
      leaderName: 'Jane Smith',
      description: 'This team focuses on backend development for scalable applications.'
    },
    {
      teamid: 5,
      teamName: 'Team Epsilon',
      leaderName: 'Jane Smith',
      description: 'This team focuses on backend development for scalable applications.'
    },
    {
      teamid: 6,
      teamName: 'Team Hockn',
      leaderName: 'Jane Smith',
      description: 'This team focuses on backend development for scalable applications.'
    },
    // Add more teams here
  ];

export const projects = [
  {
    projectId: 1,
    projectName: 'AI Chatbot Development',
    description: 'Developing an intelligent chatbot for customer support using NLP and machine learning.',
    members: ['John Doe', 'Sarah Connor', 'Paul Adams'],
    owner: 'John Doe',
    teamId: 1
  },
  {
    projectId: 2,
    projectName: 'Backend Scalability',
    description: 'Enhancing the scalability and performance of the company’s backend systems.',
    members: ['Jane Smith', 'Mike Lee', 'Annie Wang'],
    owner: 'Jane Smith',
    teamId: 2
  },
  {
    projectId: 3,
    projectName: 'Cloud Integration',
    description: 'Integrating cloud services to support seamless data storage and management.',
    members: ['Jane Smith', 'Lucas Green', 'Dana White'],
    owner: 'Jane Smith',
    teamId: 3
  },
  {
    projectId: 4,
    projectName: 'AI-Powered Analytics',
    description: 'Building a data analytics platform powered by AI for real-time insights.',
    members: ['John Doe', 'Jessica Allen', 'Mark Taylor'],
    owner: 'John Doe',
    teamId: 1
  },
  {
    projectId: 5,
    projectName: 'User Authentication System',
    description: 'Developing a secure user authentication and authorization system.',
    members: ['Jane Smith', 'Zoe Carter', 'David Kim'],
    owner: 'Jane Smith',
    teamId: 4
  },
  {
    projectId: 6,
    projectName: 'Mobile App Development',
    description: 'Building a cross-platform mobile app for e-commerce solutions.',
    members: ['Jane Smith', 'Tom Hardy', 'Eva Roberts'],
    owner: 'Jane Smith',
    teamId: 5
  },
  {
    projectId: 7,
    projectName: 'DevOps Automation',
    description: 'Automating DevOps processes to improve deployment efficiency.',
    members: ['Jane Smith', 'Natalie Cooper', 'Sam Fisher'],
    owner: 'Jane Smith',
    teamId: 6
  },
  {
    projectId: 8,
    projectName: 'Natural Language Processing Research',
    description: 'Researching advanced NLP techniques for improving machine understanding of human language.',
    members: ['John Doe', 'Sophia Martin', 'Kyle Richards'],
    owner: 'John Doe',
    teamId: 1
  },
  {
    projectId: 9,
    projectName: 'Web API Security',
    description: 'Ensuring security for APIs exposed by the company’s web applications.',
    members: ['Jane Smith', 'Daniel Craig', 'Olivia Wilde'],
    owner: 'Jane Smith',
    teamId: 2
  },
  {
    projectId: 10,
    projectName: 'Data Migration to Cloud',
    description: 'Managing the migration of legacy data systems to the cloud for better efficiency.',
    members: ['Jane Smith', 'Chris Pratt', 'Mia Wong'],
    owner: 'Jane Smith',
    teamId: 5
  }
]

export const chats = [

]

export const tasks = [
  {
    id: 1, state: 1, creator: "Hockn", assigned: "McMahon", title: "ScrumDemo", content: "Configure Next.js application :)",
    id: 2, state: 1, creator: "Hockn", assigned: "Kurt", title: "ScrumDemo", content: "Configure Next.js and tailwind ",
    id: 3, state: 1, creator: "Toni", assigned: "Mr.Perfect", title: "ScrumDemo", content: "Create sidebar navigation menu",
    id: 4, state: 1, creator: "Toni", assigned: "Toni", title: "ScrumDemo", content: "Create page footer",
    id: 5, state: 1, creator: "Hockn", assigned: "Marcel Krei", title: "ScrumDemo", content: "Create page navigation menu",
    id: 6, state: 1, creator: "Hockn", assigned: "Alex", title: "ScrumDemo", content: "Create page layout",
  },
]

export default teams;