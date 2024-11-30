## 完整工作流程

1. 内容管理流程
   内容管理流程创建工具
   ↓
   配置内容源（官方文档/GitHub 等）
   ↓
   触发内容同步
   ↓
   解析为内容块
   ↓
   组织展示内容
2. 同步更新流程
   定期检查内容源
   ↓
   执行同步任务
   ↓
   更新内容块
   ↓
   记录同步日志
3. 内容展示流程
   访问工具页面
   ↓
   获取所有内容块
   ↓
   按类型和顺序组织
   ↓
   渲染页面
4. 核心数据流图

```mermaid
flowchart TD
    subgraph Client
        UI[用户界面]
        Cache[客户端缓存]
    end

    subgraph Server
        API[API路由]
        Actions[Server Actions]
        DB[(SQLite数据库)]
    end

    subgraph External
        GitHub[GitHub API]
        RSS[RSS源]
    end

    UI <--> Cache
    UI <--> API
    UI <--> Actions
    API <--> DB
    Actions <--> DB
    API <--> External
    Actions <--> External
```

5. 页面与数据库关系

- 工具页面 (/tools)

```mermaid
erDiagram
   tools ||--o{ contentBlocks : "内容块"
   tools ||--o{ githubData : "GitHub数据"
   tools }|--|| categories : "分类"
   tools }|--|| collections : "集合"

   TOOLS-PAGE {
       列表页 tools
       详情页 tools_contentBlocks
       分类页 tools_categories
       集合页 tools_collections
   }
```

- 资源中心 (/resources)

```mermaid
erDiagram
    resources ||--o{ contentBlocks : "关联内容"
    resources ||--o{ tools : "相关工具"

    RESOURCE-PAGE {
        教程列表 resources
        工具教程 resources_tools
        最佳实践 resources_contentBlocks
    }
```

6. 实施步骤优先级
   第一阶段：核心功能
   [ ] 工具基础 CRUD
   [ ] 分类系统
   [ ] 基础搜索
   第二阶段：内容管理
   [ ] 内容块系统
   [ ] GitHub 集成
   [ ] 资源中心
   第三阶段：高级特性
   [ ] 高级搜索
   [ ] 个性化推荐
   [ ] 数据统计
7. 数据同步流程

```mermaid
sequenceDiagram
    participant Admin
    participant System
    participant GitHub
    participant DB

    Admin->>System: 触发同步
    System->>GitHub: 获取仓库数据
    GitHub-->>System: 返回数据
    System->>System: 数据处理
    System->>DB: 更新数据库
    DB-->>System: 确认更新
    System-->>Admin: 同步完成通知
```

8. 搜索系统设计

```mermaid
flowchart LR
    Input[搜索输入] --> Parser[查询解析]
    Parser --> Filter[过滤器]
    Filter --> DB[(数据库查询)]
    DB --> Cache[结果缓存]
    Cache --> UI[界面展示]
```

9. 缓存策略

```mermaid
flowchart TD
    Request[请求] --> Cache{缓存检查}
    Cache -->|存在| Serve[返回缓存]
    Cache -->|不存在| Fetch[获取数据]
    Fetch --> Store[存储缓存]
    Store --> Serve
```
