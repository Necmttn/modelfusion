import dotenv from "dotenv";
import { generateText, openai } from "modelfusion";
import { FileCache } from "modelfusion/node";

dotenv.config();

async function main() {
  const cache = new FileCache();

  const text1 = await generateText({
    model: openai
      .ChatTextGenerator({ model: "gpt-3.5-turbo", temperature: 1 })
      .withTextPrompt(),
    prompt: "Write a short story about a robot learning to love",
    logging: "basic-text",
    cache,
  });

  console.log({ text1 });

  const text2 = await generateText({
    model: openai
      .ChatTextGenerator({ model: "gpt-3.5-turbo", temperature: 1 })
      .withTextPrompt(),
    prompt: "Write a short story about a robot learning to love",
    logging: "basic-text",
    cache,
  });

  console.log({ text2 }); // same text
}

main().catch(console.error);
