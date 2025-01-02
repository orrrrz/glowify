# Glowify - Your Web Reading Assistant

English | [中文版](README_zh-CN.md) | [日本語版](README_ja.md) | [Español](README_es.md)

## Updates (2025.01.02)

- Glowify is available on Google Web Store, you can install it [here](https://chromewebstore.google.com/detail/glowify-your-reading-assi/cponpggghojjgjglfpcagclobgcghjig?authuser=0&hl=en).

## Introduction
Glowify is a Chrome extension powered by LLM technology that enhances your online reading experience by translating, explaining, and commenting on the text you select and its surrounding context.

## Features
- **Contextual Translation:** Effortlessly translate selected text into your preferred language for a more accessible reading experience.

- **Instant Explanations:** Receive immediate explanations for any highlighted text to enhance your understanding.

- **Highlight & Annotate:** Seamlessly highlight text on any webpage and add comments. Your annotations are persistent and will remain intact even after a page reload (requires a Notion database but it's optional).

## Installation

### 1. Install from google web store.
   You can install it directory from [Google Web Store](https://chromewebstore.google.com/detail/glowify-your-reading-assi/cponpggghojjgjglfpcagclobgcghjig?authuser=0&hl=en).

### 2. Install from source code.

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/orrrrz/glowify.git
   ```

   Or you can just download the zip file from [here](https://github.com/orrrrz/glowify/blob/master/release/glowify-v1.0.2.zip)

2. **Open Chrome Extensions Page:**
   Navigate to `chrome://extensions` in your Chrome browser.

3. **Enable Developer Mode:**
   Toggle the "Developer mode" switch located in the top right corner.

4. **Load Unpacked Extension:**
   Click on the "Load unpacked" button and select the cloned repository folder.

## Getting Started

### Basic Usage

When glowify is properly installed, you should see a glowify icon in your browser toolbar. Before it can be useful, you need open the options page and finish basic setups, the most important one is LLM api key. If you want sync your highlights to Notion, you also need to setup Notion database and token. See the next section for more details.

Then, just select some text and the glowify toolbar will show up. You can then choose the action you want to perform.

You can also open the side panel from the context menu, where you can view, hide/show or delete all your highlights.

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

