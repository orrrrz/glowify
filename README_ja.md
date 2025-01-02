# Glowify （日本語版）

[English](README.md) | [中文版](README_zh-CN.md) | [Español](README_es.md)

## 更新 (2025.01.02)

- Glowify が Google ウェブストアで利用可能になりました。こちらからインストールできます：[Google ウェブストア](https://chromewebstore.google.com/detail/glowify-your-reading-assi/cponpggghojjgjglfpcagclobgcghjig?authuser=0&hl=ja)。

## イントロダクション
Glowify は、選択したテキストとその周囲のコンテキストを翻訳、説明、注釈することでオンライン読書体験を向上させる LLM 技術を搭載した Chrome 拡張機能です。

## 機能
- **文脈に基づく翻訳：** 選択したテキストをお好みの言語に簡単に翻訳し、よりアクセスしやすい読書体験を提供します。

- **即時説明：** ハイライトされたテキストに対して即座に説明を受け取り、理解を深めます。

- **ハイライトと注釈：** 任意のウェブページ上のテキストをシームレスにハイライトし、コメントを追加します。注釈は持続的で、ページを再読み込みしても失われません（Notion データベースが必要ですが、オプションです）。

## インストール

### 1. Google ウェブストアからインストール
   こちらから直接インストールできます：[Google ウェブストア](https://chromewebstore.google.com/detail/glowify-your-reading-assi/cponpggghojjgjglfpcagclobgcghjig?authuser=0&hl=ja)。

### 2. ソースコードからインストール

1. **リポジトリをクローンする：**
   ```bash
   git clone https://github.com/orrrrz/glowify.git
   ```

   または、[こちら](https://github.com/orrrrz/glowify/blob/master/release/glowify-v1.0.2.zip) から ZIP ファイルをダウンロードできます。

2. **Chrome 拡張ページを開く：**
   Chrome ブラウザで `chrome://extensions` に移動します。

3. **開発者モードを有効にする：**
   右上隅にある「開発者モード」スイッチを切り替えます。

4. **未パッケージの拡張機能を読み込む：**
   「未パッケージの拡張機能を読み込む」ボタンをクリックし、クローンしたリポジトリフォルダを選択します。

## 始め方

### 基本的な使い方

Glowify が正しくインストールされると、ブラウザのツールバーに Glowify アイコンが表示されます。役立つようにするには、オプションページを開いて基本設定を完了する必要があります。最も重要なのは LLM API キーです。ハイライトを Notion に同期したい場合は、Notion データベースとトークンの設定も必要です。次のセクションで詳細を参照してください。

その後、テキストを選択すると、Glowify ツールバーが表示されます。実行したいアクションを選択できます。

また、コンテキストメニューからサイドパネルを開くこともでき、すべてのハイライトを表示、非表示、または削除できます。

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