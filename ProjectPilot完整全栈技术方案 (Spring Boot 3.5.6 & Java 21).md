## 🤖 Assistant

好的，这是一份为 **ProjectPilot** 项目量身定制的、基于 **Spring Boot 3.5.6** 和 **Java 21** 的完整全栈技术方案与实施路线图。该方案兼顾了技术的先进性、稳定性与生产环境的可靠性。

---

### **ProjectPilot: 完整全栈技术方案 (Spring Boot 3.5.6 & Java 21)**

#### **一、项目愿景与核心功能**

* **愿景 (Vision):** 打造一款智能、直观、可视化的项目规划工具，利用AI将用户目标自动拆解为可执行的任务流程图。
* **核心功能 (Core Features):**
 1. **用户系统:** 注册、登录、JWT认证、项目管理。
 2. **AI智能生成:** 集成DeepSeek API，输入目标，一键生成任务树（节点与边）。
 3. **可视化编辑器:** 基于React Flow的画布，支持拖拽、编辑、删除节点与依赖关系。
 4. **实时持久化:** 自动或手动将图数据保存至数据库。
 5. **项目导出:** 将任务计划导出为Markdown或JSON格式。

#### **二、系统架构**

采用经典且高效的前后端分离架构(SPA + RESTful API)。

```
      [Web Browser]
          |
          | (HTTPS / RESTful API)
          |
+---------------------------+
|        后端 API            |    [Spring Boot 3.5.6 + Java 21]
|  +---------------------+  |    |    +-----------------+
|  |    REST Controllers |<----->|    |  DeepSeek API   |
|  +---------------------+  |    |    +-----------------+
|  |   Business Service  |  |    |
|  +---------------------+  |    |    +-----------------+
|  |   Data Repository   |<----->|    |   PostgreSQL    |
|  +---------------------+  |    |    |     Database    |
|  | Spring Security (JWT)|  |    |    +-----------------+
|  +---------------------+  |    |
+---------------------------+

          |
          | (HTTPS / RESTful API)
          |
+---------------------------+
|        前端 SPA            |    [React 18 + Vite]
|  +---------------------+  |
|  |     React Flow      |  |    - 可视化图编辑器
|  |      (Canvas)       |  |
|  +---------------------+  |
|  |   Component Library |  |    - Ant Design UI组件
|  |     (Antd)          |  |
|  +---------------------+  |
|  |   State & Routing   |  |    - Context API, React Router
|  +---------------------+  |
+---------------------------+
```

#### **三、技术栈详述**

| 层级 | 技术选型 | 版本 | 选择理由 |
| :--- | :--- | :--- | :--- |
| **前端** | React | 18+ | 主流、生态丰富、高性能UI库。 |
| | Vite | 5.x | 极速的构建与开发工具，体验远超Webpack。 |
| | React Flow | 11.x | 专业、强大且灵活的可视化图形库。 |
| | Ant Design | 5.x | 企业级UI组件库，开箱即用，设计优雅。 |
| | Axios | 1.x | 基于Promise的HTTP客户端，用于API调用。 |
| **后端** | **Java** | **21 (LTS)** | **最新的长期支持版，提供虚拟线程等革命性特性，稳定可靠。** |
| | **Spring Boot** | **3.5.6** | **快速开发框架，对Java 21支持完善，企业级标准。** |
| | Spring Security | 6.5+ | 提供强大的认证和授权机制。 |
| | Spring Data JPA | 3.5+ | 简化数据库操作，使用Hibernate作为ORM。 |
| | PostgreSQL | 16.x | 强大的开源关系数据库，支持JSONB存储图数据。 |
| | JJWT | 0.12.5 | 用于创建和解析JWT令牌。 |
| **开发与运维** | Docker | | 容器化部署，保证环境一致性。 |
| | Docker Compose | | 服务编排，一键启动所有依赖。 |
| | Gradle | 8.14.3 | Java项目依赖管理和构建工具。 |
| | NGINX | | 反向代理服务器，用于部署前端静态资源。 |

#### **四、后端详细设计与实现**

**1. 数据库设计 (PostgreSQL)**
```sql
-- 用户表
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 项目表
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 项目数据表 (使用JSONB高效存储图结构)
CREATE TABLE project_data (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL UNIQUE REFERENCES projects(id) ON DELETE CASCADE,
    nodes JSONB NOT NULL DEFAULT '[]'::jsonb,
    edges JSONB NOT NULL DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**2. 项目结构 (`backend/`)**
```
src/main/java/com/projectpilot/
├── config/
│   ├── SecurityConfig.java      // Spring Security配置
│   ├── WebConfig.java           // CORS配置
│   └── WebClientConfig.java     // 配置HTTP客户端
├── controller/
│   ├── AuthController.java      // (POST /api/auth/login)
│   ├── ProjectController.java   // (GET/POST/PUT /api/projects)
│   └── AIController.java        // (POST /api/ai/generate)
├── model/
│   ├── entity/                  // JPA实体类 (User, Project...)
│   ├── dto/                     // 数据传输对象 (请求/响应)
│   └── response/                // 统一的API响应封装
├── repository/                  // JPA数据访问接口
│   ├── UserRepository.java
│   └── ProjectRepository.java
├── service/                     // 核心业务逻辑
│   ├── UserService.java
│   ├── ProjectService.java
│   └── DeepSeekService.java     // **AI集成核心服务**
└── security/
    ├── JwtAuthenticationFilter.java // JWT校验过滤器
    ├── JwtService.java          // JWT工具类
    └── UserDetailsServiceImpl.java
```

**3. 核心服务: `DeepSeekService.java` (利用Java 21特性)**
```java
@Service
@RequiredArgsConstructor
public class DeepSeekService {

    private final WebClient webClient;

    // 使用Java 21的记录类(Record)定义不可变的请求/响应DTO
    public record DeepSeekRequest(String model, List<Message> messages) {
        public record Message(String role, String content) {}
    }

    public record DeepSeekResponse(List<Choice> choices) {
        public record Choice(Message message) {
            public record Message(String content) {}
        }
    }

    // 核心方法：调用AI。由于使用WebClient，其底层可基于虚拟线程，高效处理IO阻塞。
    public String generatePlan(String userGoal) {
        // 1. 构建Prompt
        String systemPrompt = "你是一个项目管理专家，请将用户的目标拆解为任务...";
        DeepSeekRequest request = new DeepSeekRequest(
            "deepseek-chat",
            List.of(
                new DeepSeekRequest.Message("system", systemPrompt),
                new DeepSeekRequest.Message("user", userGoal)
            )
        );

        // 2. 发起异步HTTP请求，并阻塞等待结果（在虚拟线程上，阻塞是低成本的）
        DeepSeekResponse response = webClient.post()
            .uri("/chat/completions")
            .bodyValue(request)
            .retrieve()
            .bodyToMono(DeepSeekResponse.class) // 响应式编程与虚拟线程完美结合
            .block(); // 阻塞当前虚拟线程，而非平台线程

        // 3. 解析并返回结果
        return response.choices().get(0).message().content();
    }
}
```

**4. REST API 端点**
* `POST /api/auth/register` - 用户注册
* `POST /api/auth/login` - 用户登录 (返回JWT)
* `GET /api/projects` - 获取用户的项目列表
* `POST /api/projects` - 创建新项目
* `GET /api/projects/{id}` - 获取特定项目的详细数据（节点和边）
* `PUT /api/projects/{id}` - 更新项目数据（保存画布）
* `POST /api/ai/generate` - **核心：接收目标，调用AI，返回任务树**

#### **五、前端详细设计与实现**

**1. 项目结构 (`frontend/`)**
```
src/
├── components/
│   ├── layout/           // 布局组件 (Header, Sidebar)
│   ├── common/           // 通用组件 (Modal, Button)
│   └── flow/             // 封装的React Flow组件
├── pages/
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx // 项目列表
│   └── EditorPage.jsx    // **核心编辑器页面**
├── contexts/
│   └── AuthContext.jsx   // 全局用户状态管理
├── hooks/
│   ├── useAuth.jsx       // 认证相关逻辑
│   └── useProject.jsx    // 项目数据获取与保存
├── services/             // API调用模块
│   ├── api.js           // Axios实例配置(基URL, JWT拦截器)
│   ├── auth.js
│   └── project.js
├── utils/                // 工具函数
└── styles/               // 全局样式
```

**2. 核心交互流程: 生成与保存任务树**
1. 用户在 `EditorPage` 输入目标，点击“生成”。
2. 调用 `services/project.js` 中的 `generateWithAI(goal)` 函数。
3. 该函数通过Axios向 `POST /api/ai/generate` 发送请求，请求头自动附加JWT。
4. 前端显示加载状态。
5. 后端处理请求，调用DeepSeek API，返回结果。
6. 前端将AI返回的JSON数据转换为React Flow的 `nodes` 和 `edges`。
7. 画布自动渲染生成的任务流程图。
8. 用户进行编辑，编辑后可手动保存或触发自动保存（防抖处理）。
9. 保存时调用 `services/project.js` 中的 `saveProject(projectId, {nodes, edges})` 函数。
10. 该函数向 `PUT /api/projects/{projectId}` 发送 `nodes` 和 `edges` 数据。

#### **六、部署方案 (Dockerized Deployment)**

**1. Dockerfile for Backend**
```dockerfile
# 使用官方的Java 21基础镜像
FROM eclipse-temurin:21-jre-alpine
# 设置工作目录
WORKDIR /app
# 将构建好的Jar包复制到容器中
COPY target/projectpilot-backend-0.0.1-SNAPSHOT.jar app.jar
# 暴露端口
EXPOSE 8080
# 启动应用
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**2. Dockerfile for Frontend**
```dockerfile
# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build

# 生产环境阶段
FROM nginx:alpine
# 将构建好的静态文件复制到Nginx的默认服务目录
COPY --from=builder /app/dist /usr/share/nginx/html
# 复制自定义的Nginx配置（可选，用于配置API代理等）
# COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**3. `docker-compose.yml` (一键部署)**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: projectpilot
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/projectpilot
      SPRING_DATASOURCE_USERNAME: admin
      SPRING_DATASOURCE_PASSWORD: secret
      DEEPSEEK_API_KEY: ${DEEPSEEK_API_KEY} # 从环境变量文件读取
    ports:
      - "8080:8080"
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

#### **七、开发与发布路线图**

**Phase 1: 基础搭建与核心MVP (1-2周)**
- [x] 初始化前后端项目，配置基础依赖。
- [ ] 实现数据库设计、用户注册登录（JWT）。
- [ ] 完成后端DeepSeek API集成 (`DeepSeekService`)。
- [ ] 实现前端画布基础渲染与AI生成按钮联调。

**Phase 2: 功能完善与体验优化 (1-2周)**
- [ ] 实现画布完整交互（增、删、改、拖拽、连线）。
- [ ] 实现项目数据的实时保存与加载功能。
- [ ] 优化UI/UX，完善项目列表和编辑器界面。

**Phase 3: 部署上线与测试 (1周)**
- [ ] 编写Dockerfile和docker-compose.yml文件。
- [ ] 进行端到端测试和性能测试。
- [ ] 部署到云服务器（如AWS EC2, DigitalOcean）并上线。

---

此方案为您提供了一个从技术选型、架构设计、核心代码示例到部署上线的完整、可执行的蓝图。**Spring Boot 3.5.6 + Java 21 LTS** 的组合确保了后端服务的**高性能**（虚拟线程）、**高开发效率**（Spring Boot）和**生产级稳定性**（LTS），是启动ProjectPilot项目的绝佳选择。
