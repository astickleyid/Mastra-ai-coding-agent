import { codingAgent } from './agent/agents/coding-agent';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const query = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

async function main() {
  console.log("Welcome to your personal coding agent sandbox!");
  console.log("Type your requests below, or type 'exit' to quit.");

  while (true) {
    const input = await query('> ');
    if (input.toLowerCase() === 'exit') {
      break;
    }

    const textStream = await codingAgent.run(input);
    for await (const text of textStream) {
      process.stdout.write(text);
    }
  }

  rl.close();
  console.log('Goodbye!');
}

main();
