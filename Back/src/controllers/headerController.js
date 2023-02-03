
import connection from "../database/postgres.js";
import * as userRepository from '../repositories/userRepository.js'

async function getUsersFilteredByChars(req,res){

    const partOfUsername = req.params.partOfUsername

    const obj = res.localItens

try {
    
    
    const usersFilteredByChars = await connection.query(`SELECT * FROM users WHERE users.id !=$1 AND users."userName" ILIKE $2;`,[ obj.userId,`${partOfUsername}%`]);
    
    const usersFilter = await userRepository.getItem({table:"followers", categori:`"userId"`,iten: `${obj.userId} LIMIT 10` })

    usersFilteredByChars.rows.map((value, index)=>{
        usersFilter.map((i)=>{
            if(i.following===value.id){
                const aux = usersFilteredByChars.rows[index];
                usersFilteredByChars.rows.splice(index,1)
                usersFilteredByChars.rows.splice(0,0,aux)
                value['following']=true
                return
            }
        })

    } )

    res.send(usersFilteredByChars.rows).status(200)
} catch (error) {
    res.sendStatus(400)
}

}

export {getUsersFilteredByChars}
