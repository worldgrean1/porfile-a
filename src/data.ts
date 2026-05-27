import { Project, ProcessStep, SkillCategory } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'digital-motion-commerce',
    title: 'Digital Motion Commerce System',
    category: 'Motion UI & Commerce',
    year: '2026',
    description: 'A scalable interactive platform combining motion UI, real-time data visualization, and immersive user flow design.',
    details: 'This system combines Next.js scalability, GSAP timeline choreography, and custom Tailwind styling to deliver a high-performance commerce gateway. Built to feel like an environment, not a dashboard, it handles dynamic transactions with zero-latency visual confirmation.',
    tech: ['Next.js', 'GSAP', 'TypeScript', 'Tailwind CSS'],
    metrics: [
      { label: 'Render Latency', value: '1.1ms / frame' },
      { label: 'Asset Capacity', value: '2,500 nodes' },
      { label: 'Fluidity Factor', value: '60 FPS stable' }
    ],
    graphicType: 'grid',
    roles: ['Lead Motion Developer', 'Choreography Architect']
  },
  {
    id: 'immersive-simulation-engine',
    title: 'Interactive Simulation Engine',
    category: 'Game Mechanics & Motion',
    year: '2025',
    description: 'A physics-based web simulation showcasing real-time rendering logic and reactive motion systems.',
    details: 'This simulation uses lightweight vector math and GPU-bound transitions to render complex interactive environments. By bypassing heavy 3D frameworks, it achieves superior load times and unmatched motion responsiveness.',
    tech: ['TypeScript', 'GSAP', 'HTML5 Canvas', 'CSS Physics'],
    metrics: [
      { label: 'Physics Loop', value: '0.8ms evaluation' },
      { label: 'UI Frame Rate', value: '60 FPS solid' },
      { label: 'Asset Footprint', value: 'Zero external mesh' }
    ],
    graphicType: 'wave',
    roles: ['Lead Software Engineer', 'Game Developer']
  },
  {
    id: 'interactive-identity-portal',
    title: 'Interactive Identity Portal',
    category: 'Immersive Web Platform',
    year: '2025',
    description: 'A cinematic entrance sequence demonstrating identity validation gates and coordinate telemetry tracking.',
    details: 'Designed as a highly secure, interactive gateway. It utilizes biometrics-style scanning timelines and direct-to-DOM SVG mutations to verify core access and initialize spatial layout shifts.',
    tech: ['React', 'GSAP ScrollTrigger', 'Tailwind', 'SVG Filters'],
    metrics: [
      { label: 'Entrance Speed', value: '1.2s reveal timeline' },
      { label: 'Scroll Tracking', value: '12 active coordinates' },
      { label: 'Interaction Latency', value: 'Zero input lag' }
    ],
    graphicType: 'vectors',
    roles: ['Principal Web Designer', 'Security Architect']
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Concept',
    description: 'Ideas shaped into experience logic.',
    duration: 'Week 1',
    deliverables: ['Experience maps', 'Interactive logic diagrams']
  },
  {
    number: '02',
    title: 'Design',
    description: 'Visual systems and structure.',
    duration: 'Week 2',
    deliverables: ['Typography systems', 'Spatial grid layouts']
  },
  {
    number: '03',
    title: 'Engineering',
    description: 'Scalable and optimized implementation.',
    duration: 'Week 3',
    deliverables: ['Modular component builds', 'Performance matrices']
  },
  {
    number: '04',
    title: 'Motion',
    description: 'Life injected into interface.',
    duration: 'Week 4',
    deliverables: ['GSAP transition systems', 'Scroll synchronization']
  },
  {
    number: '05',
    title: 'Deployment',
    description: 'Experience delivered to users.',
    duration: 'Week 5',
    deliverables: ['Production optimization', 'Telemetry validation']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Software Engineering',
    skills: [
      { name: 'Full-stack development', level: 95 },
      { name: 'Scalable architecture', level: 93 },
      { name: 'API systems', level: 91 },
      { name: 'Performance optimization', level: 96 }
    ]
  },
  {
    title: 'Graphic Design',
    skills: [
      { name: 'Brand identity', level: 94 },
      { name: 'UI/UX systems', level: 95 },
      { name: 'Visual storytelling', level: 92 },
      { name: 'Design systems', level: 94 }
    ]
  },
  {
    title: 'Motion Graphics',
    skills: [
      { name: 'GSAP animation systems', level: 98 },
      { name: 'Cinematic transitions', level: 96 },
      { name: 'UI motion design', level: 95 },
      { name: 'Interactive storytelling', level: 94 }
    ]
  },
  {
    title: 'Game Development',
    skills: [
      { name: 'Interactive mechanics', level: 90 },
      { name: 'Simulation systems', level: 92 },
      { name: 'Physics-based interactions', level: 91 },
      { name: 'Real-time rendering logic', level: 89 }
    ]
  },
  {
    title: 'Immersive Web',
    skills: [
      { name: 'Scroll-based environments', level: 97 },
      { name: 'Parallax systems', level: 96 },
      { name: 'Experience design', level: 95 },
      { name: 'WebGL-style motion logic', level: 93 }
    ]
  }
];
