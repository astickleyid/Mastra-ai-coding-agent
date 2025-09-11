import { z } from 'zod';

export function createTool<T extends z.ZodType, U extends z.ZodType>(tool: {
  id: string;
  description: string;
  inputSchema: T;
  outputSchema: U;
  execute: (args: { context: z.infer<T> }) => Promise<z.infer<U>>;
}): any {
  return tool;
}
