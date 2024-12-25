# Glowify

## Updates 

- 2024.12.25 Glowify 1.0.0 is submitted to Chrome Web Store, waiting for approval.

## Introduction
Glowify is a Chrome extension that boosts your online reading experience by annotating, explaining, and translating text on a webpage.

## Features

- **Annotate:** Highlight and comment on text on any webpage. It's persistent and will not be lost after page reload (Notion database required).
- **Explain:** Get instant explanations for highlighted text.
- **Lookup:** Lookup the contextualized meaning of highlighted words.
- **Translate:** Translate highlighted text to your preferred language.


## Installation

Since glowify is not available on Chrome Web Store yet, please follow steps below to install Glowify in your Chromium-based browser:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/orrrrz/glowify.git
   ```

   Or you can just download the zip file from [here](https://github.com/orrrrz/glowify/blob/master/release/glowify-v1.0.0.zip)

2. **Open Chrome Extensions Page:**
   Navigate to `chrome://extensions` in your Chrome browser.

3. **Enable Developer Mode:**
   Toggle the "Developer mode" switch located in the top right corner.

4. **Load Unpacked Extension:**
   Click on the "Load unpacked" button and select the cloned repository folder.

## Getting Started

### Basic Usage

When glowify is properly installed, you should see a glowify icon in your browser toolbar. Before it can be useful, you need open the options page and finish basic setups, such as LLM api key, notion api key and database id, etc. See the next section for notion setup.

Then, just select some text and the glowify toolbar will show up. You can then choose the action you want to perform.

You can also open the side panel from the context menu, where you can view all your highlights.

### Sync with Notion

1. **Create Notion Integration:**
   - Visit [Notion Integrations](https://www.notion.so/my-integrations).
   - Click on "Create new integration" and obtain your API key.

2. **Set Up Notion Database:**
   - **Option 1:** Manually create a database with the following properties:
     - `excerpt` (Title)
     - `pageUrl` (URL)
     - `highlightId` (Rich Text)
     - `pageTitle` (Rich Text)
     - `comment` (Rich Text)
     - `created` (Date)
     - `updated` (Date)
     - `startContainer` (Rich Text)
     - `startOffset` (Rich Text)
     - `endContainer` (Rich Text)
     - `endOffset` (Rich Text)
     - `occurrence` (Rich Text)
   - **Option 2:** [Recommended] Clone the [Glowify Notion Database Template](https://www.notion.so/ce34483fe9d048a380d850d682fae25d?v=fff36e411feb814b8b80000c46bb500a).

3. **Configure Glowify:**
   - Navigate to the Glowify options page.
   - Enter your Notion Database ID and API key.
   - Click "Save" to finalize the setup.

## Support

If you encounter any issues or have questions, feel free to open an issue on GitHub or drop me an email at [lcm.hust@gmail.com](mailto:lcm.hust@gmail.com).

## License

This project is licensed under the [MIT License](LICENSE).


# Glowify （中文版）

## 更新

- 2024.12.25 Glowify 1.0.0 已提交至 Chrome 网上应用店，等待审核。

## 介绍
Glowify 是一个 Chrome 扩展程序，通过注释、解释和翻译网页上的文本来提升您的在线阅读体验。

## 功能

- **注释：** 在任何网页上高亮和评论文本。它是持久的，页面重新加载后不会丢失（需要 Notion 数据库）。
- **解释：** 获取高亮文本的即时解释。
- **查找：** 查找高亮单词的上下文含义。
- **翻译：** 将高亮文本翻译成您喜欢的语言。

## 安装

由于 Glowify 目前尚未在 Chrome 网上应用店上架，请按照以下步骤在您的基于 Chromium 的浏览器中安装 Glowify：

1. **克隆仓库：**
   ```bash
   git clone https://github.com/orrrrz/glowify.git
   ```

   或者您可以从 [这里](https://github.com/orrrrz/glowify/blob/master/release/glowify-v1.0.0.zip) 下载 zip 文件。

2. **打开 Chrome 扩展页面：**
   在您的 Chrome 浏览器中导航到 `chrome://extensions`。

3. **启用开发者模式：**
   切换右上角的“开发者模式”开关。

4. **加载未打包的扩展：**
   点击“加载已解压的扩展”按钮，选择克隆的仓库文件夹。

## 开始使用

### 基本用法

当 Glowify 正确安装后，您应该在浏览器工具栏中看到 Glowify 图标。在它可以发挥作用之前，您需要打开选项页面并完成基本设置，例如 LLM API 密钥、Notion API 密钥和数据库 ID 等。请参见下一节的 Notion 设置。

然后，只需选择一些文本，Glowify 工具栏就会出现。您可以选择要执行的操作。

您还可以从上下文菜单中打开侧边面板，在那里查看所有高亮内容。

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
     - `startContainer`（富文本）
     - `startOffset`（富文本）
     - `endContainer`（富文本）
     - `endOffset`（富文本）
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


# Glowify （日本语）

## 更新 

- 2024.12.25 Glowify 1.0.0 が Chrome ウェブストアに提出され、承認待ちです。

## イントロダクション
Glowify は、ウェブページ上のテキストを注釈、説明、翻訳することでオンライン読書体験を向上させる Chrome 拡張機能です。

## 機能

- **注釈：** 任意のウェブページ上のテキストをハイライトし、コメントを追加します。これは持続的で、ページを再読み込みしても失われません（Notion データベースが必要です）。
- **説明：** ハイライトされたテキストの即時説明を取得します。
- **調査：** ハイライトされた単語の文脈に基づく意味を調べます。
- **翻訳：** ハイライトされたテキストをお好みの言語に翻訳します。

## インストール

Glowify はまだ Chrome ウェブストアで入手できないため、以下の手順に従って Chromium ベースのブラウザに Glowify をインストールしてください：

1. **リポジトリをクローンする：**
   ```bash
   git clone https://github.com/orrrrz/glowify.git
   ```

   または、[こちら](https://github.com/orrrrz/glowify/blob/master/release/glowify-v1.0.0.zip) から ZIP ファイルをダウンロードできます。

2. **Chrome 拡張ページを開く：**
   Chrome ブラウザで `chrome://extensions` に移動します。

3. **開発者モードを有効にする：**
   右上隅にある「開発者モード」スイッチを切り替えます。

4. **未パッケージの拡張機能を読み込む：**
   「未パッケージの拡張機能を読み込む」ボタンをクリックし、クローンしたリポジトリフォルダを選択します。

## 始め方

### 基本的な使い方

Glowify が正しくインストールされると、ブラウザのツールバーに Glowify アイコンが表示されます。役立つようにするには、オプションページを開いて LLM API キー、Notion API キー、データベース ID などの基本設定を完了する必要があります。次のセクションで Notion の設定を参照してください。

その後、テキストを選択すると、Glowify ツールバーが表示されます。実行したいアクションを選択できます。

また、コンテキストメニューからサイドパネルを開くこともでき、すべてのハイライトを表示できます。

### Notion と同期する

1. **Notion インテグレーションを作成する：**
   - [Notion インテグレーション](https://www.notion.so/my-integrations) にアクセスします。
   - 「新しいインテグレーションを作成」をクリックし、API キーを取得します。

2. **Notion データベースを設定する：**
   - **オプション 1：** 次のプロパティを持つデータベースを手動で作成します：
     - `excerpt`（タイトル）
     - `pageUrl`（URL）
     - `highlightId`（リッチテキスト）
     - `pageTitle`（リッチテキスト）
     - `comment`（リッチテキスト）
     - `created`（日付）
     - `updated`（日付）
     - `startContainer`（リッチテキスト）
     - `startOffset`（リッチテキスト）
     - `endContainer`（リッチテキスト）
     - `endOffset`（リッチテキスト）
     - `occurrence`（リッチテキスト）
   - **オプション 2：** [推奨] [Glowify Notion データベーステンプレート](https://www.notion.so/ce34483fe9d048a380d850d682fae25d?v=fff36e411feb814b8b80000c46bb500a) をクローンします。

3. **Glowify を設定する：**
   - Glowify オプションページに移動します。
   - Notion データベース ID と API キーを入力します。
   - 「保存」をクリックして設定を完了します。

## サポート

問題が発生したり質問がある場合は、GitHub で問題を開くか、[lcm.hust@gmail.com](mailto:lcm.hust@gmail.com) にメールを送ってください。

## ライセンス

このプロジェクトは [MIT ライセンス](LICENSE) の下でライセンスされています。

# Glowify （日本語版）

## 更新

- 2024.12.25 Glowify 1.0.0 が Chrome ウェブストアに提出され、承認待ちです。

## イントロダクション
Glowify は、ウェブページ上のテキストを注釈、説明、翻訳することでオンライン読書体験を向上させる Chrome 拡張機能です。

## 機能

- **注釈：** 任意のウェブページ上のテキストをハイライトし、コメントを追加します。これは持続的で、ページを再読み込みしても失われません（Notion データベースが必要です）。
- **説明：** ハイライトされたテキストの即時説明を取得します。
- **調査：** ハイライトされた単語の文脈に基づく意味を調べます。
- **翻訳：** ハイライトされたテキストをお好みの言語に翻訳します。

## インストール

Glowify はまだ Chrome ウェブストアで入手できないため、以下の手順に従って Chromium ベースのブラウザに Glowify をインストールしてください：

1. **リポジトリをクローンする：**
   ```bash
   git clone https://github.com/orrrrz/glowify.git
   ```

   または、[こちら](https://github.com/orrrrz/glowify/blob/master/release/glowify-v1.0.0.zip) から ZIP ファイルをダウンロードできます。

2. **Chrome 拡張ページを開く：**
   Chrome ブラウザで `chrome://extensions` に移動します。

3. **開発者モードを有効にする：**
   右上隅にある「開発者モード」スイッチを切り替えます。

4. **未パッケージの拡張機能を読み込む：**
   「未パッケージの拡張機能を読み込む」ボタンをクリックし、クローンしたリポジトリフォルダを選択します。

## 始め方

### 基本的な使い方

Glowify が正しくインストールされると、ブラウザのツールバーに Glowify アイコンが表示されます。役立つようにするには、オプションページを開いて LLM API キー、Notion API キー、データベース ID などの基本設定を完了する必要があります。次のセクションで Notion の設定を参照してください。

その後、テキストを選択すると、Glowify ツールバーが表示されます。実行したいアクションを選択できます。

また、コンテキストメニューからサイドパネルを開くこともでき、すべてのハイライトを表示できます。

### Notion と同期する

1. **Notion インテグレーションを作成する：**
   - [Notion インテグレーション](https://www.notion.so/my-integrations) にアクセスします。
   - 「新しいインテグレーションを作成」をクリックし、API キーを取得します。

2. **Notion データベースを設定する：**
   - **オプション 1：** 次のプロパティを持つデータベースを手動で作成します：
     - `excerpt`（タイトル）
     - `pageUrl`（URL）
     - `highlightId`（リッチテキスト）
     - `pageTitle`（リッチテキスト）
     - `comment`（リッチテキスト）
     - `created`（日付）
     - `updated`（日付）
     - `startContainer`（リッチテキスト）
     - `startOffset`（リッチテキスト）
     - `endContainer`（リッチテキスト）
     - `endOffset`（リッチテキスト）
     - `occurrence`（リッチテキスト）
   - **オプション 2：** [推奨] [Glowify Notion データベーステンプレート](https://www.notion.so/ce34483fe9d048a380d850d682fae25d?v=fff36e411feb814b8b80000c46bb500a) をクローンします。

3. **Glowify を設定する：**
   - Glowify オプションページに移動します。
   - Notion データベース ID と API キーを入力します。
   - 「保存」をクリックして設定を完了します。

## サポート

問題が発生したり質問がある場合は、GitHub で問題を開くか、[lcm.hust@gmail.com](mailto:lcm.hust@gmail.com) にメールを送ってください。

## ライセンス

このプロジェクトは [MIT ライセンス](LICENSE) の下でライセンスされています。