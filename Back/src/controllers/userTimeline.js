import connection from "../database/postgres.js";
import * as userRepository from "../repositories/userRepository.js";

async function getPostsFilteredByUser(req, res) {
  const userId = req.params.id;

  const myUser = res.localItens;

  const { rows } = await connection.query(
    `
         SELECT
            COUNT(likes."linkId") AS "likes",
            links.id,
            links.url,
            links.text,
            links."createDate",
            users."userName",
            users."pictureUrl",
            users.id AS "userId"
        FROM links
            JOIN users
                ON links."userId" = users.id
            LEFT JOIN likes
                ON links.id = likes."linkId"
            WHERE users.id = $1
                GROUP BY
                links.id,
                links.url,
                links.text,
                links."createDate",
                users."userName",
                users."pictureUrl",
                users.id
            ORDER BY "createDate" DESC
            LIMIT 20;`,
    [userId]
  );

  const links = await userRepository.linksUser({ id: myUser.userId });

  const link2 = await userRepository.linksUser({});

  for (let index = 0; index < rows.length; index++) {
    rows[index]["likeUser"] = [];
    for (let i = 0; i < links.length; i++) {
      if (rows[index].id === links[i].linkId) {
        rows[index]["boolean"] = true;
      }
    }
  }
  return res.send(rows);
}

async function getUserInfo(req, res) {
  const userId = req.params.id;

  const myUser = res.localItens;

  const userInfo = await connection.query(
    `SELECT "userName" FROM users WHERE "id" = $1;`,
    [userId]
  );

  userInfo.rows[0]["id"] = myUser.userId;

  return res.send(userInfo.rows);
}

export { getPostsFilteredByUser, getUserInfo };
