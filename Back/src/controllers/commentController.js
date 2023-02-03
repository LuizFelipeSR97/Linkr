import connection from "../database/postgres.js";
import * as userRepository from "../repositories/userRepository.js";

async function getCommentsCount(req, res) {
    const linkId = req.params.id;
    try {
        const commentsCount = await connection.query(`
            SELECT
                COUNT(id) AS comments
            FROM comments
            WHERE "linkId" = $1;
            `, [linkId]
        );
        res.status(200).send(commentsCount.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getComments(req, res) {
    const linkId = req.params.id;
    try {
        const comments = await connection.query(`
        SELECT 
            comments.comment AS comment,
            users."userName" AS "userName",
            users."pictureUrl" AS "pictureUrl"
        FROM comments
        JOIN users
            ON  comments."userId" = users.id
        WHERE comments."linkId" = $1
        ORDER BY comments."createDate" ASC;
        `, [linkId]
    );
    res.status(200).send(comments.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function postComment(req, res) {
    const linkId = req.body.linkId;
    const userId = req.body.userId;
    const comment = req.body.comment;
   

    const { auth } = req.headers;
    const token = auth?.replace("Bearer ", "");

    const rows = await userRepository.getItem({
        table: "sessions",
        categori: "token",
        iten: `'${token}'`,
    });

    if (!rows) {
        return res.status(401).send("Sessão não encontrada, favor relogar.");
    };

    try {
        await connection.query(`
            INSERT INTO comments ("linkId", "userId", comment)
            VALUES ($1, $2, $3);
            `, [linkId, userId, comment]
        );
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { postComment, getCommentsCount, getComments };