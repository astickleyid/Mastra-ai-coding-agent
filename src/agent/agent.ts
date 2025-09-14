import { LanguageModel, streamText, CoreMessage } from 'ai';
import { Memory } from './memory';

export class Agent {
  private model: LanguageModel;
  private tools: any;
  private systemPrompt: string;
  private memory: Memory;

  constructor(options: {
    model: LanguageModel;
    tools: any;
    system?: string;
    memory: Memory;
  }) {
    this.model = options.model;
    this.tools = options.tools;
    this.systemPrompt = options.system || 'You are a helpful assistant.';
    this.memory = options.memory;
  }

  addMessageToMemory(message: CoreMessage) {
    this.memory.add(message);
  }

  async run(input: string): Promise<any> {
    this.memory.add({ role: 'user', content: input });

    const { textStream } = await streamText({
      model: this.model,
      messages: [
        { role: 'system', content: this.systemPrompt },
        ...this.memory.get(10), // Get the last 10 messages
      ],
    });

    return textStream;
  }
}
