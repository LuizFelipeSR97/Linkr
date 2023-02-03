import * as userRepository from "../repositories/userRepository.js";
import connection from "../database/postgres.js";

async function postLinks(req, res) {
  const link = req.body;
  let text = link.text;
  const userId = res.localItens.userId;

  if (link.text === "" || link.text === undefined) {
    link.text = null;
  }
  try {
    await connection.query(
      `
        INSERT INTO links ("userId", url, text)
        VALUES ($1, $2, $3);
        `,
      [userId, link.url, link.text]
    );

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getLinks(req, res) {
  const user = res.localItens;

  try {
    const { rows } = await connection.query(`
    SELECT
        COUNT(likes) AS "likes",
        links.repost,
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
        LEFT JOIN shares
          ON links.id = shares."linkId"
      LEFT JOIN followers
          ON followers.following = users.id
      WHERE followers."userId" = $1 OR users.id=$2
        GROUP BY
        links.repost,
        links.id,
        links.url,
        links.text,
        links."createDate",
        users."userName",
        users."pictureUrl",
        users.id
    ORDER BY "createDate" DESC
    LIMIT 20;`,[user.userId, user.userId]);

    if(rows.length===0)return res.status(200).send(rows)

    const links = await userRepository.linksUser({ id: user.userId });

    const link2 = await userRepository.linksUser({});

    const link3 = await connection.query(`
    SELECT
    users."userName",
    users."pictureUrl",
    users.id AS "originId",
    links.id,
    links.url,
    links.text,
    links."createDate",
    users."userName" AS "origShar" ,
    i."pictureUrl",
    i.id AS "userId",
    i."userName" ,
    shares.id AS "shareId"
        FROM followers
        JOIN users
            ON users.id = followers.following
        JOIN shares
            ON followers.following = shares."userId"
        LEFT JOIN links
            ON shares."linkId" = links.id
        LEFT JOIN users i
            ON i.id = shares."RepostId" 
        WHERE followers."userId" = $1 OR users.id= $2
    
            ORDER BY "createDate" DESC
            LIMIT 20;

            `,[user.userId,user.userId])


    link2.map((value) => {
      delete value.createDate;
      return value;
    });

    // console.log(links)
    // console.log(link2)
    // console.log(link3.rows)
    // console.log(rows)

    for (let i = 0; i < link3.rows.length; i++) {
      let c = 0;
      for (let r = 0; r < link2.length; r++) {
        if(link3.rows[i].id === link2[r].id){
        c += link2[r].likes !=='0' ? Number(link2[r].likes) : 0
        link3.rows[i].likes = c
        }
      }
    }
   //console.log(link3.rows)

    for (let index = 0; index < rows.length; index++) {
      rows[index]["likeUser"] = [];
      for (let i = 0; i < link3.rows.length; i++) {

        link3.rows[i]["likeUser"] = []  

        if(Date.parse(link3.rows[i].createDate)<=Date.parse(rows[index].createDate) ){
          rows.splice(index,0,link3.rows[i])
        }else{
          rows.splice(index,0,link3.rows[i])
        }
        link3.rows.splice(i,1)
          

      }
      for (let i = 0; i < links.length; i++) {
        if (rows[index].id === links[i].linkId) {
          rows[index]["boolean"] = true;
        }
      }
      let c = 0;
      for (let i = 0; i < link2.length; i++) {
        if (rows[index].id === link2[i].id) {
          c += link2[i].likes !=='0' ? Number(link2[i].likes) : 0
          link2[i].userName !== null ? rows[index].likeUser.push(link2[i].userName): '';
          rows[index].likes = c
        }
          
      }
    }
console.log(rows , link2)

    res.status(200).send(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteLink(req, res) {
  const id = req.params.id;
  const { auth } = req.headers;
  const token = auth?.replace("Bearer ", "");
  try {

  const rows = await userRepository.getItem({
    table: "sessions",
    categori: "token",
    iten: `'${token}'`,
  });

  
  if (!rows) {
    return res.status(401).send("Sessão não encontrada, favor relogar.");
  }
  
  await connection.query(
    `
          DELETE FROM shares
          WHERE "linkId" = $1
          
          `,
    [id]
  );  
  
  await connection.query(
      `
            DELETE FROM links
            WHERE id = $1
            `,
      [id]
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getLastLinkId(req, res) {
  try {
    const id = await connection.query(
      `SELECT id FROM links ORDER BY "createDate" DESC LIMIT 1;`
    );

    return res.status(200).send(id);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function updateLink(req, res) {
  const id = req.params.id;
  const text = req.body.text;

  const { auth } = req.headers;
  const token = auth?.replace("Bearer ", "");

  const rows = await userRepository.getItem({
    table: "sessions",
    categori: "token",
    iten: `'${token}'`,
  });

  if (!rows) {
    return res.status(401).send("Sessão não encontrada, favor relogar.");
  }

  try {
    await connection.query(
      `
      UPDATE links
      SET text = $1
      WHERE id = $2
      `,
      [text, id]
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { postLinks, getLinks, deleteLink, updateLink, getLastLinkId };
