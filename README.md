# AI-TRPG 叙事系统

模块化的AI角色扮演跑团式叙事系统，让玩家在可自定义的世界观中与多个AI控制的NPC自由互动，通过对话和行动影响情节演化，最终自动生成结局判断和小说化文本。

## 项目特点

- **世界书系统**：创建和管理自定义世界观、背景设定和规则
- **角色管理**：设计具有个性、记忆和情绪的NPC角色
- **自由互动**：与多个AI控制的NPC进行对话和行动交互
- **情节演化**：基于玩家行为的故事发展系统
- **结局评估**：根据玩家行为自动生成结局
- **小说生成**：将游戏过程转化为小说形式

## 技术栈

- **前端框架**：React + Vite
- **样式**：Tailwind CSS + DaisyUI
- **状态管理**：Zustand
- **路由**：React Router
- **API通信**：Axios
- **部署**：GitHub Pages

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 部署到GitHub Pages

```bash
# Windows PowerShell
./deploy.ps1
```

## 核心功能

### LLM集成

系统支持多种大语言模型：
- OpenAI (GPT-3.5/4)
- DeepSeek
- Claude
- Gemini
- 本地模型 (Llama, Mistral等)

### Agent系统

每个NPC都是一个独立的Agent，具有：
- 个性特质（基于大五人格模型）
- 记忆系统（长期/短期记忆）
- 情绪状态
- 行为决策能力

### 记忆管理

- **核心记忆**：角色的基本设定和不变信息
- **长期记忆**：重要事件和关系
- **短期记忆**：近期对话和互动
- **情感记忆**：对特定事件或人物的情感反应

### 控制面板

实时调整模型行为：
- 温度（创造性vs精确性）
- 响应长度
- 记忆注入开关
- 创意程度

## 项目结构

```
ai-trpg-system/
├── public/             # 静态资源
├── src/
│   ├── assets/         # 图片和其他资源
│   ├── components/     # 可复用组件
│   ├── hooks/          # 自定义React Hooks
│   ├── pages/          # 页面组件
│   ├── services/       # API服务
│   ├── stores/         # 状态管理
│   ├── utils/          # 工具函数
│   ├── App.jsx         # 应用入口
│   └── main.jsx        # 渲染入口
├── .gitignore          # Git忽略文件
├── index.html          # HTML模板
├── package.json        # 项目依赖
├── README.md           # 项目说明
├── tailwind.config.js  # Tailwind配置
└── vite.config.js      # Vite配置
```

## 许可证

MIT
