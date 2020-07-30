BEGIN;

-- #1
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- #2
-- Depends on #1 for uuid_generate_v4()
CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid DEFAULT gen_random_uuid(),
  "username" character varying (25) NOT NULL,
  CONSTRAINT "uq_users_username" UNIQUE ("username"),
  CONSTRAINT "pk_users_id" PRIMARY KEY ("id")
);

-- #3
-- Depends on #1 for uuid_generate_v4()
CREATE TABLE IF NOT EXISTS "comments" (
  "id" uuid DEFAULT gen_random_uuid(),
  "body" character varying (25) NOT NULL,
  "user_id" uuid NOT NULL,
  CONSTRAINT "pk_comments_id" PRIMARY KEY ("id")
);

-- #4
-- Depends on #3 for creating the "comments" table
ALTER TABLE "comments"
  DROP CONSTRAINT IF EXISTS "fk_comments_user_id";

-- #5
-- Depends on #3 for creating the "comments" table
-- Depends on #4 for removing an existing constraint
ALTER TABLE "comments"
  ADD CONSTRAINT "fk_comments_user_id"
  FOREIGN KEY ("user_id")
  REFERENCES "users" (id);

COMMIT;