import { db } from "..";
import { eq } from "drizzle-orm";
import { feeds, users } from "../schema";
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
      userId,
    })
    .returning();

  return firstOrUndefined(result);
}

export async function getFeeds() {
  return await db
    .select({
      id: feeds.id,
      name: feeds.name,
      url: feeds.url,
      createdAt: feeds.createdAt,
      updatedAt: feeds.updatedAt,
      username: users.name,
    })
    .from(feeds)
    .innerJoin(users, eq(feeds.userId, users.name));
}

