import * as userRepository from '../repositories/userRepository.js'
import * as schemas from '../schemas/schemas.js'

export function validShares(req,res, next){
        
    const valid = schemas.sharePostSchema.validate(req.body,{abortEarly: false})

    if (valid.error) {

        const error = valid.error.details.map(details => details.message);
    
        return res.status(422).send(error);
    };

    res.localItens['repostUserId']= req.body.userId
    res.localItens['linkId']= req.body.linkId
    next()
}
