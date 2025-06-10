# Image Search MCP

This MCP (Model Context Protocol) allows you to integrate an image search directly into your code editor's chat. By configuring this MCP, you can use natural language prompts within your editor's chat interface to search for images and receive results directly, streamlining your development workflow.

This project is an implementation of a Model Context Protocol (MCP) server that allows users to search for images based on text prompts using the Unsplash API. It enables AI models to find and retrieve relevant images for any given search query.

## Features
- Search for images using natural language prompts
- Returns up to 5 relevant images per search
- Built as an MCP server using `@modelcontextprotocol/sdk`
- Code inspection is possible using the `@modelcontextprotocol/inspector`
- Easy integration with any MCP-compatible client

## How it Works
The MCP server exposes a tool called `search_image`. When you provide a text prompt, the server:
1. Sends the search query to the Unsplash API
2. Retrieves up to 5 relevant images
3. Returns the image URLs in a structured response

## Image API Used
This project uses the [Unsplash API](https://unsplash.com/developers) to fetch high-quality, freely-usable images. The API provides access to a vast collection of professional photographs that can be used for various purposes.

## Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Unsplash API access key (register at [Unsplash Developers](https://unsplash.com/developers))

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mcp-image-search
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your Unsplash API key:
   ```
   UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   ```

## Code Inspection
You can inspect the MCP implementation using the inspector tool:

```bash
npx -y @modelcontextprotocol/inspector npx -y tsx src/index.ts
```

This command launches the MCP Inspector, allowing you to interactively explore the server and its available tools.

## Dependencies
- `@modelcontextprotocol/sdk` (for MCP server implementation)
- `zod` (for schema validation)
- `node-fetch` (for making HTTP requests)
- `dotenv` (for environment variable management)
- `tsx` (for running TypeScript files directly)

## Usage
To start the MCP server, run:

```bash
npm start
```

Or directly with tsx:

```bash
npx tsx src/index.ts
```

## Configuration in the Code Editor or Client

To connect your code editor or client to the Image Search MCP, configure the `mcp_config.json` file as follows:

```json
{
  "mcpServers": {
    "Image Search": {
      "command": "npx",
      "args": [
        "tsx",
        "/path/to/your/project/mcp-image-search/src/index.ts"
      ]
    }
  }
}
```

Replace `/path/to/your/project/mcp-image-search/` with the actual path to your project directory.

## Example Usage

Once connected through an MCP client, you can search for images by providing a text prompt:

```
search_image("sunset over mountains")
```

## License
This project is open source and available under the [MIT License](LICENSE).

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## Support
For support, please open an issue in the project's issue tracker.

---

## Adapting to Other Image Sources
You can modify the `/search_image` endpoint in `src/index.ts` to use any public image API (e.g., Pexels, Pixabay, Bing, etc.).

- [Pexels API](https://www.pexels.com/api/)
- [Pixabay API](https://pixabay.com/api/docs/)
- [Bing Image Search](https://www.microsoft.com/en-us/bing/apis/bing-image-search-api)

Just make sure to update the authentication logic and response parsing according to the chosen API.
