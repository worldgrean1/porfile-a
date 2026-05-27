export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  details: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  graphicType: 'vectors' | 'wave' | 'grid' | 'orbit';
  roles: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[];
}

