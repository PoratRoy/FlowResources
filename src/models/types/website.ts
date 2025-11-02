export type Website = {
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
  image?: string;
  color?: string;
  pricing: Pricing;
  websiteType: string;
  category: string;
  usage?: Usage;
};

export type Pricing = 'free' | 'trial' | 'credits' | 'cost';

export type Usage = 'new' | 'often' | 'recommend' | 'not_in_use';