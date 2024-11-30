type ToolType = 'github' | 'resource';
type ToolUsage = 'free' | 'paid' | 'freemium';
type ContentStatus = 'draft' | 'published';
type ResourceType = 'tutorial' | 'guide' | 'best-practice';

interface BaseToolFields {
  id: string;
  slug: string;
  name: string;
  description: string;
  websiteUrl: string;
  logoUrl?: string;
  ogImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  contentStatus: ContentStatus;
  lastContentSync: Date;
  isActive: boolean;
  usage: ToolUsage;
  categories: string[];
}

interface GithubTool extends BaseToolFields {
  type: 'github';
  githubData: {
    repoUrl: string;
    stars: number;
    forks: number;
    weeklyGrowth: number;
    license: string;
    lastUpdated: Date;
  };
}

interface ResourceTool extends BaseToolFields {
  type: 'resource';
  monthlyTraffic: number;
  resources: {
    id: string;
    slug: string;
    type: ResourceType;
    title: string;
    content: string;
    estimatedReadTime: number;
    publishedAt: Date;
  }[];
}

type Tool = GithubTool | ResourceTool;