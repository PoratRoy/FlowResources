import { Project } from './types/project';
import { Category } from './types/category';
import { Website } from './types/website';

// Mock Categories
export const mockCategories: Category[] = [
  { id: '1', title: 'Development' },
  { id: '2', title: 'Design' },
  { id: '3', title: 'Marketing' },
  { id: '4', title: 'Productivity' },
  { id: '5', title: 'Learning' },
];

// Mock Websites
export const mockWebsites: Website[] = [
  {
    id: '1',
    title: 'GitHub',
    description: 'GitHub is where over 100 million developers shape the future of software, together.',
    url: 'https://github.com',
    image: 'https://github.githubassets.com/assets/github-logo-55c5b9a1fe3c.png',
    category: '1'
  },
  {
    id: '2',
    title: 'Figma',
    description: 'Figma connects everyone in the design process so teams can deliver better products, faster.',
    url: 'https://www.figma.com',
    image: 'https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png?w=670&h=670&q=75&fit=max&auto=format',
    category: '2'
  },
  {
    id: '3',
    title: 'MDN Web Docs',
    description: 'Resources for developers, by developers.',
    url: 'https://developer.mozilla.org',
    image: 'https://developer.mozilla.org/mdn-social-share.cd6c4a5a.png',
    category: '1'
  },
  {
    id: '4',
    title: 'Google Analytics',
    description: 'Get a deeper understanding of your customers.',
    url: 'https://analytics.google.com',
    image: 'https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg',
    category: '3'
  },
  {
    id: '5',
    title: 'Notion',
    description: 'One workspace. Every team.',
    url: 'https://www.notion.so',
    image: 'https://www.notion.so/cdn-cgi/image/format=auto,width=640,quality=100/front-static/shared/icons/notion-app-icon-3d.png',
    category: '4'
  },
  {
    id: '6',
    title: 'Coursera',
    description: 'Learn without limits.',
    url: 'https://www.coursera.org',
    image: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/media/coursera-rebrand-logo-square.png?auto=format%2Ccompress&dpr=1',
    category: '5'
  },
  {
    id: '7',
    title: 'Stack Overflow',
    description: 'Where developers learn, share, & build careers.',
    url: 'https://stackoverflow.com',
    image: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded',
    category: '1'
  },
  {
    id: '8',
    title: 'Behance',
    description: 'Showcase & discover creative work.',
    url: 'https://www.behance.net',
    image: 'https://a5.behance.net/21e581b7a8a5b5a5fcf5/img/site/apple-touch-icon.png?cb=264615658',
    category: '2'
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Web Development Project',
    categories: [mockCategories[0], mockCategories[1]],
    websites: [mockWebsites[0], mockWebsites[2], mockWebsites[6]]
  },
  {
    id: '2',
    title: 'Design Portfolio',
    categories: [mockCategories[1]],
    websites: [mockWebsites[1], mockWebsites[7]]
  },
  {
    id: '3',
    title: 'Marketing Campaign',
    categories: [mockCategories[2], mockCategories[3]],
    websites: [mockWebsites[3], mockWebsites[4]]
  },
  {
    id: '4',
    title: 'Learning Resources',
    categories: [mockCategories[4], mockCategories[0]],
    websites: [mockWebsites[5], mockWebsites[2]]
  }
];

// Helper function to get websites for a specific project
export const getProjectWebsites = (projectId: string): Website[] => {
  const project = mockProjects.find(p => p.id === projectId);
  return project ? project.websites : [];
};

// Helper function to get categories for a specific project
export const getProjectCategories = (projectId: string): Category[] => {
  const project = mockProjects.find(p => p.id === projectId);
  return project ? project.categories : [];
};
