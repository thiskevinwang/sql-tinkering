/** Types generated for queries found in "sql/example.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetOrCreateUser' parameters type */
export interface IGetOrCreateUserParams {
  id: string | null | void;
  username: string | null | void;
}

/** 'GetOrCreateUser' return type */
export interface IGetOrCreateUserResult {
  id: string | null;
  username: string | null;
}

/** 'GetOrCreateUser' query type */
export interface IGetOrCreateUserQuery {
  params: IGetOrCreateUserParams;
  result: IGetOrCreateUserResult;
}

const getOrCreateUserIR: any = {"name":"getOrCreateUser","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":88,"b":89,"line":4,"col":10},{"a":163,"b":164,"line":7,"col":16},{"a":240,"b":241,"line":14,"col":12}]}},{"name":"username","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":93,"b":100,"line":4,"col":15}]}}],"usedParamSet":{"id":true,"username":true},"statement":{"body":"WITH temp AS (\n  INSERT INTO users (id, username)\n  SELECT :id, :username\n  WHERE NOT EXISTS (\n    SELECT * FROM users\n    WHERE id = :id)\n  RETURNING *\n)\nSELECT *\nFROM temp\nUNION\nSELECT * FROM users\nWHERE id = :id","loc":{"a":28,"b":241,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * WITH temp AS (
 *   INSERT INTO users (id, username)
 *   SELECT :id, :username
 *   WHERE NOT EXISTS (
 *     SELECT * FROM users
 *     WHERE id = :id)
 *   RETURNING *
 * )
 * SELECT *
 * FROM temp
 * UNION
 * SELECT * FROM users
 * WHERE id = :id
 * ```
 */
export const getOrCreateUser = new PreparedQuery<IGetOrCreateUserParams,IGetOrCreateUserResult>(getOrCreateUserIR);


/** 'InsertComment' parameters type */
export interface IInsertCommentParams {
  body: string | null | void;
  userId: string | null | void;
}

/** 'InsertComment' return type */
export type IInsertCommentResult = void;

/** 'InsertComment' query type */
export interface IInsertCommentQuery {
  params: IInsertCommentParams;
  result: IInsertCommentResult;
}

const insertCommentIR: any = {"name":"insertComment","params":[{"name":"body","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":317,"b":320,"line":18,"col":9}]}},{"name":"userId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":324,"b":329,"line":18,"col":16}]}}],"usedParamSet":{"body":true,"userId":true},"statement":{"body":"INSERT INTO comments (body, user_id)\nVALUES (:body, :userId)","loc":{"a":271,"b":330,"line":17,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO comments (body, user_id)
 * VALUES (:body, :userId)
 * ```
 */
export const insertComment = new PreparedQuery<IInsertCommentParams,IInsertCommentResult>(insertCommentIR);


