import { readConfig } from "../config";
import { createFeed, getFeeds } from "../lib/db/queries/feeds";
import { getUser } from "../lib/db/queries/users";
import { Feed, User } from "../lib/db/schema"

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error(`usage: ${cmdName} <feed_name> <url>`);
  }

  const config = readConfig();
  const user = await getUser(config.currentUserName);

  if (!user) {
    throw new Error(`User ${config.currentUserName} not found`);
  }

  const feedName = args[0];
  const url = args[1];

  const feed = await createFeed(feedName, url, user.id);
  if (!feed) {
    throw new Error("Failed to create feed");
  }

  console.log("Feed created sucessfully:");
  printFeed(feed, user);
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:           ${feed.id}`);
  console.log(`* Created:      ${feed.createdAt}`);
  console.log(`* Updated:      ${feed.updatedAt}`);
  console.log(`* name:         ${feed.name}`);
  console.log(`* URL:          ${feed.url}`);
  console.log(`* User:         ${user.name}`);
}

export async function handlerListFeeds() {
  const result = await getFeeds();
  if (!result) {
    throw new Error("Failed to fetch feeds");
  }

  if (result.length === 0) {
    throw new Error("No feeds to show.");
  }

  for (const row of result) {
    console.log();
    console.log(`* Feed:       ${row.feedName}`);
    console.log(`* URL:        ${row.feedUrl}`);
    console.log(`* Created by: ${row.userName}`);
    console.log();
  }
}

