import * as userRepository from '../repositories/userRepository.js'

export async function validLike(req,res, next){
        
    try {
            res.localItens = {userId:res.localItens.userId, linkId: req.body.id   };
            
            next()

    } catch (error) {

        res.sendStatus(400)

    }
}

export async function validDeslike(req, res, next){
    
    try {   
           
            res.localItens = {userId:res.localItens.userId ,linkId:req.body.linkId}
            
            next()
        
    } catch (error) {
        res.sendStatus(400)
    }
}