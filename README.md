# Prerequisites

## node.js

```
npm init -y
npm install -D typescript @types/node tsx
```

## tsconfig.json

```
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "esnext",
    "module": "esnext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["./src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## package.json

```
{
...
  "type": "module",
  "scripts": {
    "start": "tsx ./src/index.ts"
  },
...
}

```

## ~/.gatorconfig.json

```
{
  "db_url": "connection_string_goes_here",
  "current_user_name": "username_goes_here"
}

```

## postgres

```
sudo apt update
sudo apt install postgresql postgresql-contrib

psql --version

sudo passwd postgres
sudo service postgresql start

sudo -u postgres psql
```

## gator /postgres

```
CREATE DATABASE gator;

\c gator

ALTER USER postgres PASSWORD 'postgres';

SELECT version();
```

## Drizzle ORM

```
npm i drizzle-orm postgres
npm i -D drizzle-kit
```

## src/lib/db/schema.ts

```
import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull().unique(),
});
```

## drizzle.config.ts

```
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/<path_to_schema>",
  out: "src/<path_to_generated_files>",
  dialect: "postgresql",
  dbCredentials: {
    url: "your_connection_string",
  },
});
```

## connection string

```
postgres://postgres:postgres@localhost:5432/gator?sslmode=disable
```

## package.json

```
{
  "scripts": {
    "generate": "drizzle-kit generate",
    "migrate": "drizzle-kit migrate"
  }
}
```

## drizzle test

```
npm run generate
npm run migrate
```

## fast-xml-parser

```
npm i fast-xml-parser
```
