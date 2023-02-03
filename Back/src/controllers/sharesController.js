import * as userRepository from '../repositories/userRepository.js' 

export async function shares(req,res){


    try {

        const {userId ,linkId, repostUserId} = res.localItens

        if(linkId!==0 && repostUserId!==0){

            await userRepository.insert({localItens: `shares("linkId","userId","RepostId")`, iten:[linkId, userId , repostUserId]})
                 
        }

        const cont = await userRepository.getItem({table:"shares", categori:`"linkId"`,iten:linkId })

        const i = cont.length

        res.send({cont:i}).status(200)
    

        
    } catch (error) {
        res.sendStatus(400)
        
    }
} 

export async function deleteShares(req,res){
    
    const {userId} = res.localItens

    const deletId = req.params.id
    
    try {

        const cont = await userRepository.deleteShare({id:deletId , userId:userId })

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
        
    }
}
