import * as userRepository from '../repositories/userRepository.js' 

export async function deletLike(req,res){
    try {

        const {userId ,linkId} = res.localItens

        await userRepository.deleteLike({userId: userId ,linkId:linkId })
    
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
        
    }
} 

export async function like(req,res){
    try {

        const {userId ,linkId} = res.localItens;

        await userRepository.insert({ localItens:`likes("linkId","userId")` , iten:[linkId, userId] })
        
        res.sendStatus(200);
   
    } catch (error) {
        res.sendStatus(400)
        
    }
}