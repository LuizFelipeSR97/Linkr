import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import UserContext from "../../../parts/UserContext";
import { SlPaperPlane } from 'react-icons/sl'
import { getComments, postComment } from "../../services/linkr";
import Comment from "./Comment";

export default function({linkId, linkUserName, commentCount, setCommentCount}) {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        getComments(linkId).then((res) => {
            setAllComments(res.data);
        }).catch(() => {
            alert(
                "An error occured while trying to fetch the comments, please refresh the page"
              );
        })
    }, [allComments]);

    function shareComment(e) {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('linkr'));
        const postAuth = { headers: { "Authorization": "Bearer " + token.token} };

        setLoading(false);
        if (comment != "") {
            const userId = user.id;
            const commentObj = {
                linkId: linkId,
                userId: userId,
                comment: comment
            }
            postComment(commentObj, postAuth).then(() => {
                setCommentCount(commentCount + 1);
            }).catch((error) => {
                alert("Houve um erro ao publicar seu comentario");
            });
            setLoading(true);
        }
    };

    return (
        <CommentBoxScreen>
            {allComments.map((comments) => (
                <Comment commentObj={comments} linkUserName={linkUserName} />
            ))}
            <div>
                <img src={user.pictureUrl} alt="idoso nervoso" className="miniProfileIcon" ></img>
                <input
                    className="commentInput"
                    placeholder="write a comment..."
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    disabled={(loading) ? "" : "disabled"}
                />
                <SlPaperPlane className="commentIcon" onClick={shareComment}/>
            </div>
        </CommentBoxScreen>
    )
};

const CommentBoxScreen = styled.div`
    min-height: 90px;
    width: 600px;
    background-color: #1e1e1e;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    padding: 25px;
    position: relative;
    top: -18px;
    left: 0;
    border-top: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 14px;
>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.miniProfileIcon {
    height: 40px;
    width: 40px;
    margin-right: 17px;
    border-radius: 50%;
}
.commentInput {
    width: 463px;
    height: 40px;
    background-color: #252525;
    border-radius: 8px;
    color: #575757;
    padding: 0 15px 0 15px;
}
.commentIcon {
    margin-left: 10px;
    width: 20px;
    height: 20px;
    color: #f3f3f3;
}
.authorName {
    font-weight: 700;
    color: #f3f3f3;
}
.authorComment {
    color: #acacac;
    margin-top: 5px;
}
.authorClass {
    color: #565656;
}
.separationBar {
    margin: 20px 0 20px 0;
    width: 550px;
    border: 1px solid #353535;
}
`;