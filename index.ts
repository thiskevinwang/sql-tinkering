import { Client } from "pg";
import { createDb, migrate } from "postgres-migrations";

import {
  getOrCreateUser,
  IGetOrCreateUserParams,
  insertComment,
  IInsertCommentParams,
} from "./sql/example.queries";

const host = "localhost";
const port = 8080;
const user = "postgres";
const password = "mysecretpassword";
const database = "postgres";

const client = new Client({
  host,
  port,
  user,
  password,
  database,
});

const outerFifty = Array(50)
  .fill(null)
  .map(() => Array(50).fill(null));

async function main() {
  await client.connect();
  await createDb(database, { client });
  await migrate({ client }, "./migrations");

  try {
    await client.query("BEGIN");

    let params: IGetOrCreateUserParams = {
      id: "a5f5d36a-6677-41c2-85b8-7578b4d98972",
      username: "test_user",
    };
    const [user] = await getOrCreateUser.run(params, client);
    console.log(`🤖 User:`, user.id);
    console.log("📝 Generating comments...");

    console.time("⏰ Generating comments took");

    const outerPromises = outerFifty.map((innerFity, outerIndex) => {
      const innerPromises = innerFity.map((_, innerIndex) => {
        let params = {
          body: `${outerIndex}__${innerIndex}`,
          userId: user.id,
        } as IInsertCommentParams;

        return insertComment.run(params, client);
      });
      return Promise.allSettled(innerPromises);
    });
    await Promise.allSettled(outerPromises);
    console.timeEnd("⏰ Generating comments took");

    await client.query("COMMIT");
  } catch (e) {
    console.log(`Error: `, e);
    console.log(`❌ ROLLBACK`);
    await client.query("ROLLBACK");
  } finally {
    await client.end();
  }
}
main();
