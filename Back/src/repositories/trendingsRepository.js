import connection from "../database/postgres.js";

async function getTrendings() {
  return connection.query(
    "SELECT id, tag FROM trendings ORDER BY count DESC LIMIT 10;"
  );
}

async function filterPostsByHashtag(hashtag) {
  return connection.query(
    `
    SELECT
      COUNT(likes."linkId") AS "likes",
        links.id,
        links.url,
        links.text,
        links."createDate",
        users."userName",
        users."pictureUrl",
        users.id AS "userId",
        trendings.tag
      FROM links
        JOIN users
          ON links."userId" = users.id
        LEFT JOIN likes
          ON links.id = likes."linkId"
        JOIN "trendingLinks" AS tl ON links.id=tl."linkId"
        JOIN trendings on tl."trendingId"=trendings.id
      WHERE trendings.tag = $1
      GROUP BY
        links.id,
        links.url,
        links.text,
        links."createDate",
        users."userName",
        users."pictureUrl",
        users.id,
        tl.id,
        trendings.id
      ORDER BY "createDate" 
      DESC
      LIMIT 20;`,
    [hashtag]
  );
}

async function insertHashtag(hashtag) {
  return connection.query("INSERT INTO trendings(tag) VALUES($1);", [hashtag]);
}

async function incrementHashtag(id) {
  const newDate = new Date();
  return connection.query(
    `UPDATE trendings SET count=count+1, "createDate"=$2 WHERE id=$1;`,
    [id, newDate]
  );
}

async function decrementHashtag(id) {
  return connection.query("UPDATE trendings SET count=count-1 WHERE id=$1;", [
    id,
  ]);
}

async function verifyHashtag(hashtag) {
  return connection.query("SELECT id FROM trendings WHERE tag=$1;", [hashtag]);
}

async function relationateLinkWithHashtag(linkId, trendingId) {
  return connection.query(
    `INSERT INTO "trendingLinks"("linkId", "trendingId") VALUES($1, $2);`,
    [linkId, trendingId]
  );
}

async function getHashtagId(hashtag) {
  return connection.query(`SELECT id, tag FROM trendings WHERE tag=$1;`, [
    hashtag,
  ]);
}

const trendingsRepository = {
  getTrendings,
  filterPostsByHashtag,
  insertHashtag,
  incrementHashtag,
  decrementHashtag,
  verifyHashtag,
  relationateLinkWithHashtag,
  getHashtagId,
};

export default trendingsRepository;
