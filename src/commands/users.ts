import { readConfig, setUser } from "../config";
import { createUser, getUser, getUsers, resetUsers } from "../lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name?>`);
  }

  const userName = args[0];
  const existingUser = await getUser(userName);
  if (!existingUser) {
    throw new Error(`User ${userName} not found.`);
  }

  setUser(existingUser.name);
  console.log("User switched sucessfully!");
};

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name?>`);
  }

  const userName = args[0];
  const user = await createUser(userName);
  if (!user) {
    throw new Error(`User ${userName} not found.`);
  }

  setUser(user.name);
  console.log("User created sucessfully!");
};

export async function handlerReset(cmdName: string, ...args: string[]) {
  if (args.length !== 0) {
    throw new Error(`usage: ${cmdName} <name?>`);
  }

  const result = await resetUsers();
  if (!result) {
    throw new Error("Could not reset users");
  }

  console.log("Users reset sucessfully!");
};

export async function handlerGetUsers(cmdName: string, ...args: string[]) {
  if (args.length !== 0) {
    throw new Error(`usage: ${cmdName} <name?>`);
  }

  const users = await getUsers();
  const currentUser = readConfig().currentUserName;
  if (!users) {
    throw new Error("Could not get users");
  }

  for (const user of users) {
    if (user.name === currentUser) {
      console.log(`* ${user.name} (current)`);
      continue;
    }
    console.log(`* ${user.name}`);
  }


  console.log("Users listed sucessfully!");
};
