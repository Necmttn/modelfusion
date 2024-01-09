import { MathJsTool } from "@modelfusion/mathjs-tool";
import { jsonToolCallPrompt, ollama, useTool } from "modelfusion";

async function main() {
  const { tool, args, toolCall, result } = await useTool(
    ollama
      .CompletionTextGenerator({
        model: "mistral",
        promptTemplate: ollama.prompt.Mistral,
        raw: true, // required when using custom prompt template
        format: "json",
        temperature: 0,
        stopSequences: ["\n\n"], // prevent infinite generation
      })
      .withInstructionPrompt()
      .asToolCallGenerationModel(jsonToolCallPrompt.text()),

    new MathJsTool({ name: "calculator" }),
    "What's fourteen times twelve?"
  );

  console.log(`Tool call`, toolCall);
  console.log(`Tool: ${tool}`);
  console.log(`Arguments: ${JSON.stringify(args)}`);
  console.log(`Result: ${result}`);
}

main().catch(console.error);
