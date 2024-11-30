<summary>
# 项目功能概述
## 1. 核心功能模块

### 1.1 工具发现与展示 (/tools)

- 工具列表展示与搜索
- 分类与标签筛选系统
- 工具详情页
  - 功能特性介绍
  - 使用场景说明
  - 相关工具推荐
  - 用户评价系统

### 1.2 工具集合 (/collections)

- 预设主题集合
  - 设计工具集
  - 开发工具包
  - 内容创作套件
  - 营销工具栈
- 场景化集合
  - 全栈开发工具集
  - AI 开发助手集
  - 技术栈相关工具集

### 1.3 资源中心 (/resources)

- 教程指南系统
- 工具对比分析
- 最佳实践指南
- 实际应用案例

### 1.4 探索页面 (/explore)

- 热门分类导航
- 趋势工具展示
- 最新更新内容

### 1.5 社区功能 (/community)

- 工具提交系统

## 2. 管理后台功能 (/admin)

### 2.1 内容管理

- 工具管理
  - 工具列表维护
  - 工具信息编辑
- 同步管理
  - 手动触发同步
  - GitHub 资源同步

## 3. 技术特性

### 3.1 搜索系统

- 全局搜索功能
- 高级筛选器
- 实时搜索结果

### 3.2 用户界面

- 响应式设计
- 移动端适配
- 无限滚动加载
- 加载状态处理

### 3.3 数据管理

- 服务端数据获取
- 数据同步机制
- 缓存策略

### 3.4 性能优化

- 动态路由
- 组件懒加载
- 服务端渲染

## 4. 扩展功能

### 4.1 内容聚合

- GitHub 项目整合
- 技术文档聚合
- 社区资源集成

### 4.2 个性化推荐

- 基于用户行为的推荐
- 相关工具推荐
- 个性化内容展示

### 4.3 数据分析

- 工具使用统计
- 用户行为分析
- 趋势数据追踪

</summary>
<site_map>
📁 Website Root (/)
├── 🏠 Home
│ ├── 🔍 Global Search
│ ├── 🔥 Featured Tools & Collections
│ │ ├── Trending This Week
│ │ ├── New Arrivals
│ │ └── Editor's Choice
│ └── 📊 Category Showcase
│
├── 🛠️ Tools (/tools)
│ ├── All Tools (with filters)
│ │ ├── Category Filter
│ │ ├── Tag Filter
│ │ └── Sort Options
│ │
│ ├── Collections (/collections)
│ │ ├── Design Essentials
│ │ ├── Developer Toolkit
│ │ ├── Content Creator Suite
│ │ └── Marketing Stack
│ │
│ └── Tool Details (/tools/[slug])
│ ├── Overview & Features
│ ├── Use Cases
│ ├── Related Tools
│ └── Reviews
│
├── 📈 Explore (/explore)
│ ├── Popular Categories
│ ├── Trending Tools
│ └── Latest Updates
│
├── 💡 Resources (/resources)
│ ├── Guides & Tutorials
│ ├── Tool Comparisons
│ ├── Best Practices
│ └── Use Cases
│
├── 👥 Community (/community)
│ └── Submit Tool
│
└── ℹ️ About (/about)
├── About Us
├── FAQ
└── Updates
└── 🔧 Admin (/admin)
└── Content/
├── Tools/ # 工具管理
│ ├── List # 工具列表
│ └── Edit # 配置数据源和模板
│
└── Sync/ # 同步管理
└── Manual # 手动触发同步
</site_map>

<project_structure>

# Project Structure

src/
├── app/ # Next.js application routes
│ ├── (marketing)/ # Marketing related pages
│ │ ├── page.tsx # Landing page
│ │ ├── about/ # About pages
│ │ └── layout.tsx # Marketing layout
│ │
│ ├── (main)/ # Main application pages
│ │ ├── tools/ # Tool discovery
│ │ │ ├── page.tsx # Tool listing
│ │ │ ├── [slug]/ # Dynamic tool pages
│ │ │ │ └── page.tsx # Tool detail
│ │ │ └── loading.tsx # Loading state
│ │ │
│ │ ├── collections/ # Curated collections
│ │ │ ├── page.tsx # Collections listing
│ │ │ └── [slug]/ # Dynamic collection pages
│ │ │ └── page.tsx # Collection detail
│ │ │
│ │ ├── explore/ # Discovery content
│ │ │ └── page.tsx # Exploration hub
│ │ │
│ │ ├── resources/ # Educational content
│ │ │ ├── page.tsx # Resource center
│ │ │ └── [slug]/ # Dynamic resource pages
│ │ │ └── page.tsx # Resource detail
│ │ │
│ │ ├── community/ # Community features
│ │ │ ├── page.tsx # Community hub
│ │ │ └── submit/ # Tool submission
│ │ │
│ │ └── layout.tsx # Main layout
│ │
│ ├── admin/ # Admin panel
│ │ └── content/ # Content management
│ │ ├── tools/ # Tool management
│ │ │ ├── page.tsx # Tool list
│ │ │ └── [id]/
│ │ │ └── edit/
│ │ │ └── page.tsx # Tool edit
│ │ │
│ │ └── sync/ # Sync management
│ │ └── page.tsx # Manual sync
│ │
│ └── api/ # Backend API routes
│
├── components/
│ ├── admin/ # Admin components
│ │ ├── tools/
│ │ │ ├── tool-form.tsx # Tool edit form
│ │ │ └── tool-list.tsx # Tool list component
│ │ │
│ │ └── sync/
│ │ └── sync-button.tsx # Sync trigger button
│ │
│ ├── layout/ # Core layout components
│ │ ├── main-nav.tsx # Primary navigation
│ │ ├── mobile-nav.tsx # Mobile navigation
│ │ ├── footer.tsx # Site footer
│ │ └── header.tsx # Site header
│ │
│ ├── tools/ # Tool components
│ │ ├── tool-card.tsx # Tool preview card
│ │ ├── tool-grid.tsx # Tool grid layout
│ │ ├── tool-filters.tsx # Tool filters
│ │ └── tool-search.tsx # Tool search
│ │
│ ├── collections/ # Collection components
│ │ ├── collection-card.tsx # Collection preview
│ │ └── collection-grid.tsx # Collection grid
│ │
│ ├── shared/ # Shared components
│ │ ├── search/
│ │ │ ├── global-search.tsx # Global search
│ │ │ └── search-results.tsx # Search results
│ │ │
│ │ ├── filters/
│ │ │ ├── category-filter.tsx # Category filter
│ │ │ ├── tag-filter.tsx # Tag filter
│ │ │ └── sort-options.tsx # Sort controls
│ │ │
│ │ └── ui/
│ │ ├── section-header.tsx # Section header
│ │ ├── card.tsx # Base card
│ │ └── grid.tsx # Base grid
│ │
│ └── features/ # Feature components
│ ├── trending-section.tsx # Trending section
│ ├── category-showcase.tsx # Category showcase
│ └── featured-tools.tsx # Featured tools
│
├── lib/ # Core libraries
│ └── sync/ # Sync utilities
│ ├── github.ts # GitHub fetching
│ └── content.ts # Content processing
│
├── hooks/ # Custom React hooks
│ ├── use-tool-filters.ts # Filter logic
│ ├── use-search.ts # Search logic
│ └── use-infinite-scroll.ts # Infinite scroll
│
├── utils/ # Utility functions
│ ├── api-utils.ts # API helpers
│ ├── search-utils.ts # Search helpers
│ └── filter-utils.ts # Filter helpers
│
├── queries/ # Data fetching
│ ├── tools.ts # Tool queries
│ ├── collections.ts # Collection queries
│ └── resources.ts # Resource queries
│
├── actions/ # Server actions
│ ├── tool-actions.ts # Tool actions
│ ├── search-actions.ts # Search actions
│ └── filter-actions.ts # Filter actions
│
└── config/ # Configuration
├── site.ts # Site config
├── categories.ts # Categories
└── navigation.ts # Navigation

</project_structure>
