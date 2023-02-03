import connection from "../database/postgres.js";

export async function insert({localItens , iten}){
    const lock=[];

    for (let index = 0; index < iten.length; index++) {
        lock.push(`$${index+1}`)
    }

    try {
        
        const {rows} = await connection.query(`INSERT INTO ${localItens} VALUES (${lock.toString()}) RETURNING id ;`, iten )
        return rows
        
    } catch (error) {
        return error;
    
      }
}

export async function getItemFollow({userId, following }){
  try {
            const {rows} = await connection.query(`SELECT * FROM followers WHERE followers."userId"= $1 AND followers.following= $2;`,[userId,following ])
            
            return rows;
        
    } catch (error) {
      return error;
    }
}


export async function getItem({table , categori, iten}){
  try {
            const {rows} = await connection.query(`SELECT * FROM ${table} WHERE ${categori}=${iten} ;`)
            
            return rows;
        
    } catch (error) {
      return error;
    }
}

export async function getList({localItens ,value}){

  try {
    
    const {rows} = await connection.query(`SELECT * FROM $1 = $2 ;`, [localItens, value])

    return rows;
    
  } catch (error) {
  
    return error;    
  
  }
}

export async function updateIten({table ,colun ,value, id}){

    try {
      
      const {rows} = await connection.query(`UPDATE ${table} SET "${colun}" = ${value} WHERE id = ${id};`)
  
      return rows;
      
    } catch (error) {
      return error;    
    }
  }

  export async function deleteShare({id ,userId}){

    try {
      
      const {rows} = await connection.query(`DELETE FROM shares WHERE id= $1 AND "userId"=$2 ;`, [ id, userId ])
      
      return rows;
      
    } catch (error) {
      
      return error;    
    }
  }



  export async function deleteFollow({userId ,following}){

    try {
      
      const {rows} = await connection.query(`DELETE FROM followers WHERE "userId"= $1 AND following=$2 ;`, [ userId, following ])
      
      return rows;
      
    } catch (error) {
      
      return error;    
    }
  }



export async function deleteLike({userId ,linkId}){

    try {
      
      const {rows} = await connection.query(`DELETE FROM likes WHERE "linkId"=$1 AND "userId"= $2;`, [linkId, userId ])
      
      return rows;
      
    } catch (error) {
      
      return error;    
    }
  }

export async function linksUser({id}){

    try {
      if(id){
      const {rows} = await connection.query(`
        SELECT
        users."userName",
          likes."userId",
          likes."linkId",
          links."createDate",
          COUNT(likes."userId") AS "likes"
        FROM likes
          JOIN links
            ON links.id = likes."linkId"
          LEFT JOIN users
            ON likes."userId" = users.id
            WHERE users.id = $1
            GROUP BY likes."userId", likes."linkId", links."createDate",users."userName"
        ORDER BY "createDate" DESC
        LIMIT 20; `, [id])
  
      return rows;
    }
    const {rows} = await connection.query(`
    SELECT
    COUNT(likes.id) AS "likes",
    users."userName",
    links.id,
    links."createDate"
  FROM links
    LEFT JOIN likes
      ON links.id = likes."linkId"
    LEFT JOIN users
      ON users.id = likes."userId"
      
      
      GROUP BY
          users."userName",

        links."createDate",
        links.id
  
  ORDER BY links."createDate" DESC
  LIMIT 20
 ;`)


        return rows
  
    } catch (error) {
      return error;    
    }
  }

export async function localizePost({user , id}){

try {


    
    const {rows} = await connection.query(
    `SELECT
      likes."userId",
      likes."linkId",
      COUNT(likes)
      FROM likes
      JOIN links
          ON links.id = likes."linkId"
      JOIN users
          ON likes."userId" = users.id
          WHERE users."id" = $1 AND links."id" = $2 
          GROUP BY likes."userId", likes."linkId"
        ;`,[user, id]
        )
    return rows;
    
} catch (error) {
    return error;    
}
}

