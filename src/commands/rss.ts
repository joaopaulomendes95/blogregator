import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link?: string;
    description?: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link?: string;
  description?: string;
  pubDate?: string;
};

export async function handlerFetchFeed(urlFeed: string) {
  const response = await fetch("https://www.wagslane.dev/index.xml", {
    headers: {
      "User-Agent": "gator"
    }
  });

  const xml = await response.text();
  const parser = new XMLParser();
  const parsed = parser.parse(xml);

  const channel = parsed.rss?.channel;
  if (!channel) {
    throw new Error("Invalid RSS feed format: missing <channel>")
  }

  const itemsArray = Array.isArray(channel.item) ? channel.item : [channel.item];

  const feed: RSSFeed = {
    channel: {
      title: channel.title,
      description: channel.description,
      link: channel.link,
      item: itemsArray.map((item: any) => ({
        title: item.title,
        pubDate: item.pubDate,
        description: item.description
      }))
    }
  };

  console.log(JSON.stringify(feed, null, 2));
}

