export default function Comment(commentObj) {
    const comment = commentObj.commentObj.comment;
    const userName = commentObj.commentObj.userName;
    const pictureUrl = commentObj.commentObj.pictureUrl;

    return (
        <>
            <div>
                <img src={pictureUrl} alt="idoso nervoso" className="miniProfileIcon" ></img>
                <div>
                    <span className="authorName">{userName}</span>
                    {(userName === commentObj.linkUserName) ? <span className="authorClass"> • Post`s author</span>
                        : ""}
                        <h3 className="authorComment">{comment}</h3>
                </div>
            </div>
            <span className="separationBar"/>
        </>
    )
};