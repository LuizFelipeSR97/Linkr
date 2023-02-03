import * as userRepository from '../repositories/userRepository.js' 

export async function followUnfollow(req,res){
    const { id } = req.params;

    const {userId} = res.localItens

    try {
        const rows = await userRepository.getItem({table:"users", categori:"id",iten: id})
        

        if(rows.length===0)res.status(401).send("non-existent user")

        const follow = await userRepository.getItemFollow({userId:userId,following:id})

        if(follow.length===0){ 

            await userRepository.insert({localItens:`followers("userId",following)`, iten:[userId,id] })
        
            return res.sendStatus(200)
        }

        await userRepository.deleteFollow({userId:userId,following:id})

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
    }
}

export async function allFollows(req,res){

    const {userId} = res.localItens
    
    try {
        const rows = await userRepository.getItem({table:"followers" ,categori:`followers."userId"` ,iten:userId})

        res.send(rows).status(200)
    } catch (error) {
        res.sendStatus(400)
    }
}


export async function follows(req,res){
    const { id } = req.params;

    const {userId} = res.localItens

    try {
        const rows = await userRepository.getItemFollow({userId:userId,following:id})
        
        res.send(rows).status(200)
    } catch (error) {
        res.sendStatus(400)
    }
}