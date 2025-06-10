import dotenv from "dotenv";
dotenv.config({ path: "/home/yfercep/Documentos/AI/openAPI-MCP/mcp-image-search/.env" });

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import fetch from "node-fetch";

const server = new McpServer({
  name: "image-search",
  version: "1.0.0"
})

server.tool(
  "search_image",
  "Search images on the internet based on a prompt",
  {
    imageSearch: z.object({
      prompt: z.string().describe("Prompt for searching images")
    })
  },
  async ({ imageSearch }: { imageSearch: { prompt: string } }) => {

    const { prompt } = imageSearch;
    const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "";
    if (!UNSPLASH_ACCESS_KEY) {
      console.log("Unsplash API key is not configured");
      return {
        content: [
          {
            type: "text",
            text: "Unsplash API key is not configured"
          }
        ]
      }
    }
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(prompt)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=5`;
    const response = await fetch(url);
    const data = await response.json();
    const images = Array.isArray(data.results) ? data.results.map((img: any) => img.urls.small) : [];
    return {
      content: [
        {
          type: "text",
          text: "Images found:\n- " + images.join('\n- ')
        }
      ]
    }
  }
)

const transport = new StdioServerTransport();
await server.connect(transport);

