import { eq } from "drizzle-orm";
import { db } from "..";
import { feedFollows, feeds, users } from "../schema";
import { firstOrUndefined } from "./utils";

export async function createFeed(
  name: string,
  url: string,
  userId: string,
) {
  const result = await db
    .insert(feeds)
    .values({
      name: name,
      url: url,
      userId: userId,
    })
    .returning();

  return firstOrUndefined(result);
}

export async function getFeeds() {
  const result = await db.select({
    feedName: feeds.name,
    feedUrl: feeds.url,
    userName: users.name,
  })
    .from(feeds)
    .innerJoin(users, eq(feeds.userId, users.id));
  return result;
}

export async function createFeedFollow(
  userId: string,
  feedId: string,
) {
  const result = await db
    .insert(feedFollows)
    .values({
      feedId: feedId,
      userId: userId,
    })
    .returning();

  return firstOrUndefined(result);
}
