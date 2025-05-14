export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location: string;
  email: string;
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  skills: string[];
  projects: Project[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  categories: string[];
  technologies: string[];
  createdAt: string;
}

export type CategoryType = 'Web App' | 'Mobile App' | 'Game' | 'API' | 'AI' | 'Data Visualization' | 'E-commerce' | 'Other';

export const CATEGORIES: CategoryType[] = [
  'Web App',
  'Mobile App',
  'Game',
  'API',
  'AI',
  'Data Visualization',
  'E-commerce',
  'Other'
];

export const TECHNOLOGIES = [
  'React', 'Vue', 'Angular', 'Next.js', 'Svelte',
  'Node.js', 'Express', 'Django', 'Flask', 'Ruby on Rails',
  'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase',
  'TailwindCSS', 'Bootstrap', 'Material UI', 'Chakra UI',
  'AWS', 'Google Cloud', 'Azure', 'Vercel', 'Netlify',
  'Docker', 'Kubernetes', 'GraphQL', 'REST API'
];
