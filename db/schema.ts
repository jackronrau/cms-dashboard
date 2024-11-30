import {
  sqliteTable,
  text,
  integer,
  real,
  index,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

/* 
const listItem = [
  {
    id: "1",
    slug: "nextjs",
    type: "github",
    name: "Next.js",
    description: "The React Framework for Production. Build full-stack web applications with modern features and optimal performance.",
    websiteUrl: "https://nextjs.org",
    logoUrl: "https://nextjs.org/static/favicon/favicon-32x32.png",
    metaTitle: "Next.js - The React Framework for Production",
    metaDescription: "Build full-stack React applications with Next.js. Features server-side rendering, static site generation, and more.",
    ogImage: "https://nextjs.org/og.png",
    canonicalUrl: "https://nextjs.org",
    ranking: 9.8,
    contentStatus: "published",
    lastContentSync: new Date("2024-03-20"),
    lastUpdated: new Date("2024-03-20"),
    categories: ["development-tools"],
    usage: "free",
    githubData: {
      repoUrl: "https://github.com/vercel/next.js",
      stars: 115000,
      forks: 24800,
      weeklyGrowth: 2.5
    }
  },
  {
    id: "2",
    slug: "ahrefs",
    type: "resource",
    name: "Ahrefs",
    description: "Ahrefs is a powerful SEO tool that helps you analyze your website's performance and improve your rankings.",
    websiteUrl: "https://ahrefs.com",
    logoUrl: "https://ahrefs.com/favicon.ico",
    metaTitle: "Ahrefs - SEO Tool for Marketers",
    metaDescription: "Ahrefs is a powerful SEO tool that helps you analyze your website's performance and improve your rankings.",
    ogImage: "https://ahrefs.com/og.png",
    canonicalUrl: "https://ahrefs.com",
    monthlyTraffic: 80000,
    ranking: 9.5,
    contentStatus: "published",
    lastContentSync: new Date("2024-03-19"),
    lastUpdated: new Date("2024-03-19"),
    categories: ["marketing", "seo"],
    usage: "paid",
  }
]

*/
/**
 * 工具表 - 存储所有工具的核心信息
 * 包含基础信息、SEO相关字段和统计数据
 */
export const tools = sqliteTable(
  "tools",
  {
    // 基础字段
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    slug: text("slug").notNull().unique(), // URL友好的唯一标识符
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true), // 控制工具是否显示

    // 基础信息
    name: text("name").notNull(), // 工具名称
    description: text("description").notNull(), // 工具描述
    websiteUrl: text("website_url"), // 官方网站链接
    logoUrl: text("logo_url"), // logo图片链接
    type: text("type").notNull(), // 'github', 'resource'
    usage: text("usage").notNull(), // 'free', 'paid', 'self-hosted'

    // SEO优化字段
    metaTitle: text("meta_title"), // SEO标题，为空时使用name
    metaDescription: text("meta_description"), // SEO描述，为空时使用description
    ogImage: text("og_image"), // Open Graph图片链接
    canonicalUrl: text("canonical_url"), // 规范链接
    alternateUrls: text("alternate_urls"), // JSON格式存储多语言替代URL

    // 统计数据
    monthlyTraffic: integer("view_count").default(0), // 页面访问量, 只有非github类型才有
    ranking: real("ranking"), // 综合排名分数
    // 内容管理相关字段
    contentStatus: text("content_status"), // 'draft', 'published'
    lastContentSync: integer("last_content_sync", { mode: "timestamp" }),
    defaultContentSource: text("default_content_source").references(
      () => contentSources.id
    ),
  },
  (table) => ({
    slugIdx: index("slug_idx").on(table.slug), // 用于slug查询优化
    rankingIdx: index("ranking_idx").on(table.ranking), // 用于排序优化
    typeIdx: index("type_idx").on(table.type), // 添加类型索引
  })
);

/**
 * 内容源配置表 - 管理工具内容的不同数据来源
 */
export const contentSources = sqliteTable("content_sources", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  toolId: text("tool_id")
    .notNull()
    .references(() => tools.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // 'official', 'github', 'community', 'manual'
  url: text("url").notNull(),
  updateFrequency: text("update_frequency").notNull(), // 'daily', 'weekly', 'manual'
  lastSyncAt: integer("last_sync_at", { mode: "timestamp" }),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
});

/**
 * 内容块配置表 - 存储和组织工具的内容片段
 */
export const contentBlocks = sqliteTable("content_blocks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  toolId: text("tool_id")
    .notNull()
    .references(() => tools.id, { onDelete: "cascade" }),
  sourceId: text("source_id")
    .notNull()
    .references(() => contentSources.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // 'overview', 'installation', 'examples', 'tips'
  version: text("version"), // 内容版本号
  status: text("status"), // 'draft', 'published', 'archived'
  content: text("content"),
  order: integer("order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

/**
 * 同步日志表 - 记录内容同步的历史和状态
 */
export const syncLogs = sqliteTable("sync_logs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  sourceId: text("source_id")
    .notNull()
    .references(() => contentSources.id, { onDelete: "cascade" }),
  status: text("status").notNull(), // 'success', 'error'
  message: text("message"),
  syncedAt: integer("synced_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

/**
 * GitHub数据表 - 存储工具关联的GitHub仓库信息
 * 用于展示开源项目的实时数据
 */
export const githubData = sqliteTable("github_data", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  toolId: text("tool_id")
    .notNull()
    .references(() => tools.id, { onDelete: "cascade" }), // 关联到tools表
  repoUrl: text("repo_url").notNull(), // GitHub仓库地址
  stars: integer("stars").notNull().default(0), // star数量
  forks: integer("forks").notNull().default(0), // fork数量
  license: text("license"), // 开源协议
  weeklyGrowth: real("weekly_growth"), // 周增长率
  lastUpdated: integer("last_updated", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`), // 数据最后更新时间
});

/**
 * 分类表 - 工具分类体系
 * 支持多级分类结构
 */
export const categories = sqliteTable("categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  parentId: text("parent_id").references(() => categories.id), // 父分类ID，支持多级分类
  slug: text("slug").notNull().unique(), // URL友好的唯一标识符
  name: text("name").notNull(), // 分类名称
  description: text("description"), // 分类描述
  displayOrder: integer("display_order").notNull().default(0), // 显示顺序
  metaTitle: text("meta_title"), // SEO标题
  metaDescription: text("meta_description"), // SEO描述
});

/**
 * 工具-分类关联表
 * 实现工具和分类的多对多关系
 */
export const toolsToCategories = sqliteTable(
  "tools_to_categories",
  {
    toolId: text("tool_id")
      .notNull()
      .references(() => tools.id, { onDelete: "cascade" }),
    categoryId: text("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.toolId, table.categoryId] }),
  })
);

/**
 * 集合表 - 特定主题的工具集合
 * 用于组织和展示相关工具集合
 */
export const collections = sqliteTable("collections", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(), // URL友好的唯一标识符
  name: text("name").notNull(), // 集合名称
  description: text("description"), // 集合描述
  isFeatured: integer("is_featured", { mode: "boolean" })
    .notNull()
    .default(false), // 是否为特色集合
  displayOrder: integer("display_order").notNull().default(0), // 显示顺序
  metaTitle: text("meta_title"), // SEO标题
  metaDescription: text("meta_description"), // SEO描述
  ogImage: text("og_image"), // Open Graph图片
});

/**
 * 工具-集合关联表
 * 实现工具和集合的多对多关系，支持排序
 */
export const toolsToCollections = sqliteTable(
  "tools_to_collections",
  {
    toolId: text("tool_id")
      .notNull()
      .references(() => tools.id, { onDelete: "cascade" }),
    collectionId: text("collection_id")
      .notNull()
      .references(() => collections.id, { onDelete: "cascade" }),
    displayOrder: integer("display_order").notNull().default(0),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.toolId, table.collectionId] }),
  })
);

/**
 * 多语言翻译表
 * 支持所有实体的多语言内容
 */
export const translations = sqliteTable(
  "translations",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    entityType: text("entity_type").notNull(), // 实体类型：'tool', 'category', 'collection'
    entityId: text("entity_id").notNull(), // 关联的实体ID
    languageCode: text("language_code").notNull(), // 语言代码 (e.g., 'en', 'zh')
    content: text("content").notNull(), // JSON格式的翻译内容
  },
  (table) => ({
    entityIdx: index("entity_idx").on(
      table.entityType,
      table.entityId,
      table.languageCode
    ),
  })
);

/**
 * 资源表 - 存储教程、文档等内容
 * 可以独立存在或关联到特定工具
 */
export const resources = sqliteTable("resources", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(), // URL友好的唯一标识符
  toolId: text("tool_id").references(() => tools.id, { onDelete: "set null" }), // 关联工具（可选）
  type: text("type").notNull(), // 资源类型：'tutorial', 'guide', 'best-practice'
  title: text("title").notNull(), // 资源标题
  content: text("content").notNull(), // 资源内容
  metaTitle: text("meta_title"), // SEO标题
  metaDescription: text("meta_description"), // SEO描述
  publishedAt: integer("published_at", { mode: "timestamp" }), // 发布时间
  contentBlockId: text("content_block_id").references(() => contentBlocks.id),
  isContentBlock: integer("is_content_block", { mode: "boolean" })
    .notNull()
    .default(false),
  estimatedReadTime: integer("estimated_read_time"), // 预计阅读时间(分钟)
  lastValidatedAt: integer("last_validated_at", { mode: "timestamp" }), // 内容最后验证时间
});

/**
 * 标签表 - 灵活的工具标记系统
 */
export const tags = sqliteTable("tags", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(), // URL友好的唯一标识符
  name: text("name").notNull(), // 标签名称
});

/**
 * 工具-标签关联表
 * 实现工具和标签的多对多关系
 */
export const toolsToTags = sqliteTable(
  "tools_to_tags",
  {
    toolId: text("tool_id")
      .notNull()
      .references(() => tools.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.toolId, table.tagId] }),
  })
);

/**
 * URL重定向表
 * 管理URL重定向，支持SEO优化
 */
export const redirects = sqliteTable("redirects", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  fromPath: text("from_path").notNull().unique(), // 原始路径
  toPath: text("to_path").notNull(), // 目标路径
  statusCode: integer("status_code").notNull().default(301), // HTTP状态码：301永久，302临时
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true), // 重定向是否生效
});

/**
 * 统计分析表
 * 记录工具使用趋势和GitHub数据历史
 */
export const analytics = sqliteTable("analytics", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  toolId: text("tool_id")
    .notNull()
    .references(() => tools.id, { onDelete: "cascade" }),
  date: integer("date", { mode: "timestamp" }).notNull(), // 统计日期
  monthlyTraffic: integer("views").default(0), // 当月访问量
  githubStars: integer("github_stars"), // GitHub star历史记录
  githubForks: integer("github_forks"), // GitHub fork历史记录
});
