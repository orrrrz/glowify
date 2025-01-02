# Glowify - 你的网页阅读助手

[English](README.md) | [日本語](README_ja.md) | [Español](README_es.md)

## 更新 (2025.01.02)

- Glowify 已经上架至Google Web Store, 可 [在此](https://chromewebstore.google.com/detail/glowify-your-reading-assi/cponpggghojjgjglfpcagclobgcghjig?authuser=0&hl=en) 安装。

## 介绍
Glowify 是一个基于 LLM 技术的 Chrome 扩展程序，通过翻译、解释和评论您选择的文本及其周围的上下文来提升您的在线阅读体验。

## 功能
- **上下文翻译：** 轻松将选定文本翻译成您喜欢的语言，以获得更便捷的阅读体验。

- **即时解释：** 为任何高亮文本提供即时解释，以增强您的理解。

- **高亮和注释：** 在任何网页上无缝高亮文本并添加评论。您的注释是持久的，即使在页面重新加载后也会保持不变（需要 Notion 数据库，但这是可选的）。

## 安装

### 1. 从 Google Web Store 安装。
   您可以直接从 [Google Web Store](https://chromewebstore.google.com/detail/glowify-your-reading-assi/cponpggghojjgjglfpcagclobgcghjig?authuser=0&hl=en) 安装。

### 2. 从源代码安装。

1. **克隆仓库：**
   ```bash
   git clone https://github.com/orrrrz/glowify.git
   ```

   或者您可以从 [这里](https://github.com/orrrrz/glowify/blob/master/release/glowify-v1.0.2.zip) 下载 zip 文件。

2. **打开 Chrome 扩展页面：**
   在您的 Chrome 浏览器中导航到 `chrome://extensions`。

3. **启用开发者模式：**
   切换右上角的“开发者模式”开关。

4. **加载未打包的扩展：**
   点击“加载已解压的扩展”按钮，选择克隆的仓库文件夹。

## 开始使用

### 基本用法

当 Glowify 正确安装后，您应该在浏览器工具栏中看到 Glowify 图标。在它可以发挥作用之前，您需要打开选项页面并完成基本设置，最重要的是 LLM API 密钥。如果您想将高亮内容同步到 Notion，您还需要设置 Notion 数据库和令牌。请参见下一节以获取更多详细信息。

然后，只需选择一些文本，Glowify 工具栏就会出现。您可以选择要执行的操作。

您还可以从上下文菜单中打开侧边面板，在那里查看、隐藏/显示或删除所有高亮内容。

### 与 Notion 同步

1. **创建 Notion 集成：**
   - 访问 [Notion 集成](https://www.notion.so/my-integrations)。
   - 点击“创建新集成”并获取您的 API 密钥。

2. **设置 Notion 数据库：**
   - **选项 1：** 手动创建一个具有以下属性的数据库：
     - `excerpt`（标题）
     - `pageUrl`（网址）
     - `highlightId`（富文本）
     - `pageTitle`（富文本）
     - `comment`（富文本）
     - `created`（日期）
     - `updated`（日期）
     - `occurrence`（富文本）
   - **选项 2：** [推荐] 克隆 [Glowify Notion 数据库模板](https://www.notion.so/ce34483fe9d048a380d850d682fae25d?v=fff36e411feb814b8b80000c46bb500a)。

3. **配置 Glowify：**
   - 导航到 Glowify 选项页面。
   - 输入您的 Notion 数据库 ID 和 API 密钥。
   - 点击“保存”以完成设置。

## 支持

如果您遇到任何问题或有疑问，请随时在 GitHub 上打开问题或通过电子邮件与我联系：[lcm.hust@gmail.com](mailto:lcm.hust@gmail.com)。

## 许可证

该项目根据 [MIT 许可证](LICENSE) 进行许可。