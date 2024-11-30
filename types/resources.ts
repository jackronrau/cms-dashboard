export interface Resource {
  id: string;
  slug: string;
  toolId?: string;
  type: 'tutorial' | 'guide' | 'best-practice';
  title: string;
  content: string;
  estimatedReadTime: number;
  publishedAt?: Date;
  lastValidatedAt?: Date;
  contentBlockId?: string;
  isContentBlock: boolean;
}

export interface ContentBlock {
  id: string;
  toolId: string;
  sourceId: string;
  type: string;
  version?: string;
  status: 'draft' | 'published' | 'archived';
  content: string;
  order: number;
  updatedAt: Date;
}

export interface ContentSource {
  id: string;
  toolId: string;
  type: 'official' | 'github' | 'community' | 'manual';
  url: string;
  updateFrequency: 'daily' | 'weekly' | 'manual';
  lastSyncAt?: Date;
  isActive: boolean;
}