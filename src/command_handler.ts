import { setUser } from "./config";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    throw new Error(`error: ${cmdName} requires a username`);
  }

  setUser(args[0]);
  console.log(`username set to ${args[0]}`);
}

export async function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
  registry[cmdName] = handler;
};

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
  const handler = registry[cmdName];
  if (!handler) {
    throw new Error(`error: ${cmdName} is unknown`);
  }

  handler(cmdName, ...args);
};

