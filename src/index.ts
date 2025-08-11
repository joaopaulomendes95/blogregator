import { CommandsRegistry, handlerLogin, registerCommand, runCommand } from "./command_handler.js";

async function main() {
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin)

  const args = process.argv.slice(2);
  if (args.length === 0) {
    throw new Error(`error: must provide username for login.`)
  }

  const [cmdName, ...cmdArgs] = args;
  try {
    await runCommand(registry, cmdName, ...cmdArgs);
  } catch (err) {
    console.log(`error: ${(err as Error).message}`);
    process.exit(1);
  }

  process.exit(0);
}

main();
