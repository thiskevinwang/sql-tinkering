/* @name getOrCreateUser */
WITH temp AS (
  INSERT INTO users (id, username)
  SELECT :id, :username
  WHERE NOT EXISTS (
    SELECT * FROM users
    WHERE id = :id)
  RETURNING *
)
SELECT *
FROM temp
UNION
SELECT * FROM users
WHERE id = :id;

/* @name insertComment */
INSERT INTO comments (body, user_id)
VALUES (:body, :userId);