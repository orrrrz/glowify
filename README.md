# Glowify

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

If you encounter any issues or have questions, feel free to [open an issue](https://github.com/joshualeung/glowify/issues) on GitHub or drop me an email at [lcm.hust@gmail.com](mailto:lcm.hust@gmail.com).

## License

This project is licensed under the [MIT License](LICENSE).
