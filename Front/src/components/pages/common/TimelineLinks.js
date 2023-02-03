import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import { SlBubbles } from "react-icons/sl";
import mql from "@microlink/mql";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../../parts/UserContext";
import {
  deletShare,
  postDisLike,
  postLike,
  deleteLink,
  updateLink,
  getCommentsCount,
  postShare,
} from "../../services/linkr";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import CommentsBox from "./CommentsBox";
import { useNavigate } from "react-router-dom";
import {
  insert_style_in_hashtags,
  getHashtags,
} from "../../services/functions";
import parse from "html-react-parser";

export default function TimelineLinks(links) {
  const { user, setUser } = useContext(UserContext);
  const [all, setAll] = useState({ shares: false });

  const navigate = useNavigate();

  // Metadata
  const [metadata, setMetadata] = useState({});

  // Delete
  const [deleteLinkScreen, setDeleteLinkScreen] = useState(
    "whiteBackground hidden"
  );

  // Edit
  const [editBoolean, setEditBoolean] = useState(true);
  const hashtags = getHashtags(links.links.text);
  const text = insert_style_in_hashtags(links.links.text, hashtags);
  const [newText, setNewText] = useState(links.links.text);

  const [likes, setLikes] = useState({ cont: 0 });
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("linkr"));
  let name = [];
  let tippName;

  //Comment
  const [commentBoolean, setCommentBoolean] = useState(true);
  const [commentCount, setCommentCount] = useState(0);

  //Logica para Metadata ---------------------------------------------
  async function getMetadata() {
    const { status, data, response } = await mql(links.links.url);
    setMetadata(data);
  }
  useEffect(() => {
    getMetadata();
  }, []);

  useEffect(() => {
    if (token) setUser({ ...token });
    getMetadata();
    tippiString();
    share();
  }, []);

  function tippiString(sum) {
    name = likes.list
      ? likes.list.filter((value) => {
        return value !== links.links.userName;
      })
      : links.links.likeUser.filter((value) => {
        {
          return value !== links.links.userName;
        }
      });

    tippName = !name[1]
      ? name[0] + " and other x peoples"
      : name[0] + " , " + name[1] + " and other x peoples";
    if (name.length === 1) {
      tippName = name.join(" e ") + " like this";
    }
    if (name.length === 0) {
      tippName = "like this";
    }
    if (likes.list ? !likes.boolean : links.boolean) {
      name = likes.list
        ? likes.list.filter(
          (value, i) => value !== links.links.userName && i < 2
        )
        : links.links.likeUser.filter(
          (value, i) => value !== links.links.userName && i < 2
        );
      tippName = "You , " + name[0] + " , " + name[1] + " and other x peoples";

      if (name.length === 0) {
        tippName = "You liked";
      }
      if (name.length === 1) {
        tippName = "You , " + name[0] + " liked";
      }
    }
    setLikes({
      ...likes,
      name: tippName,
      boolean: likes.list ? !likes.boolean : links.boolean,
      list: links.links.likeUser,
      cont: likes.list ? sum : Number(links.links.likes ? links.links.likes : 0),
    });
  }
  function like() {
    postLike(
      {
        id: links.links.id,
      },
      token.token
    ).catch((value) => console.log(value)).then((e) => links.reloading())

    tippiString(likes.cont + 1);
  }
  function dislike() {
    postDisLike(
      {
        linkId: links.links.id,
      },
      token.token
    ).then((e)=>links.reloading()).catch((value) => console.log(value));
    tippiString(likes.cont - 1);
    
  }

  //Logica pra Deletar um Link---------------------
  function openDeleteScreen() {
    setDeleteLinkScreen("whiteBackground");
  }
  function closeDeleteScreen() {
    setDeleteLinkScreen("whiteBackground hidden");
  }
  function deleteThisLink() {
    setLoading(false);
    const linkId = links.links.id;
    const postAuth = { headers: { Authorization: "Bearer " + token.token } };

    deleteLink(linkId, postAuth)
      .then(() => {
        window.location.reload(false);
      })
      .catch(() => {
        alert("Houve um erro ao deletar seu link");
      });
  }

  //Logica pra Editar um Link---------------------
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setNewText(links.links.text);
        setEditBoolean(true);
      }
    };

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  async function editText(e) {
    const postAuth = { headers: { Authorization: "Bearer " + token.token } };
    const linkId = links.links.id;
    const textEdited = {
      text: newText,
    };

    if (e.key === "Enter") {
      e.preventDefault();
      setLoading(false);

      await updateLink(textEdited, linkId, postAuth)
        .then(() => {
          setLoading(true);
          setEditBoolean(true);
        })
        .catch((err) => {
          setLoading(true);
          alert("Houve um erro ao editar seu link");
        });
    }
  }

  //Logica pra contar os comentarios -------------------------------
  useEffect(() => {
    getCommentsCount(links.links.id)
      .then((res) => {
        setCommentCount(res.data[0].comments);
      })
      .catch();
  }, [commentCount]);

  //Logica pra contar os repost -------------------------------

  function env() {
    setAll({ ...all, shares: !all.shares })
    share(true)

  }

  function delShare() {
    deletShare(
      token.token,
      links.links.shareId
    ).then(() => window.location.reload(false))
    closeDeleteScreen();

  }

  function share(boolean) {

    const link = { ...links.links }
    postShare(
      token.token,
      !all.shares ? { linkId: link.id, userId: 0 } :
        { linkId: link.id, userId: link.userId }

    ).then((i) => {
      setAll({ ...all, sharesCount: i.data.cont });
      closeDeleteScreen();


    }).catch(() => {
      closeDeleteScreen();
    });
    setAll({ ...all, shares: !all.shares })
    if (boolean) window.location.reload()
  }

  //console.log(links.links, " 000000000000 ",likes)
  return (
    <>
      <TimelineLinksStyle>
        <div className={deleteLinkScreen}>
          {!loading ? (
            <div className="deleteBox">
              <h1 className="loading">Loading...</h1>
            </div>
          ) : (
            <div className="deleteBox">
              <h1 className="title">
                {all.shares
                  ? "Do you want to share this link"
                  : "Are you sure you want to delete this post?"}
              </h1>
              <div className="buttons">
                <button className="button white" onClick={closeDeleteScreen}>
                  No, go back
                </button>
                <button
                  className="button blue"
                  onClick={links.links.origShar ? delShare : all.shares ? env : deleteThisLink}
                >
                  {all.shares ? "yes share" : "Yes, delete it"}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="userIconNLikesColumn">
          <img
            onClick={() => navigate(`/user/${links.links.userId}`)}
            src={links.links.pictureUrl}
            alt="idoso nervoso"
            className="profileIcon"
          />
          {links.links.boolean  ? (
            <h3 onClick={links.links.origShar ? "" : dislike}>
              <AiFillHeart className="icon" color="red" />
            </h3>
          ) : (
            <h3 onClick={links.links.origShar ? "" : like}>
              <AiOutlineHeart className="icon" />
            </h3>
          )}
          <Tippy content={likes.name}>
            <h3 className="likes">
              { links.links.likes} likes
            </h3>
          </Tippy>
          <SlBubbles
            className="icon"
            onClick={() => links.links.origShar ? "" : setCommentBoolean(!commentBoolean)}
          />
          <h3 className="likes">{commentCount} comments</h3>

          <AiOutlineShareAlt
            className="icon"
            onClick={() => {
              if (!links.links.origShar) {
                openDeleteScreen();
                setAll({ ...all, shares: true })
              }
            }}
          />
          <h3 className="likes">{all.sharesCount} shares</h3>
        </div>
        <div className="allInforms" >
          <div className="nameNIcons">
            <h2
              className="username"
              onClick={() => navigate(`/user/${links.links.userId}`)}
            >
              {links.links.origShar ? `${links.links.userName} shared by ${links.links.origShar}  ` : links.links.userName}
            </h2>
            {links.links.userId === user.id || links.links.originId === user.id ? (
              <div>
                {links.links.origShar ? "" :
                  <BsPencilSquare
                    className="miniIcon"
                    onClick={() => setEditBoolean(!editBoolean)}
                  />}
                <BiTrash className="miniIcon" onClick={openDeleteScreen} />
              </div>
            ) : (
              ""
            )}
          </div>
          {editBoolean ? (
            <div>{parse(text)}</div>
          ) : (
            <form>
              <textarea
                autoFocus
                onKeyPress={editText}
                className="textArea"
                placeholder="http://..."
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                disabled={loading ? "" : "disabled"}
              />
            </form>
          )}
          <a
            href={links.links.url}
            target="_blank"
            rel="noopener noreferrer"
            className="metadataBox"
          >
            <div className="metadataInfo">
              <h1 className="metadataTitle">{metadata.title}</h1>
              <span className="metadataSpan">{metadata.description}</span>
              <h4 className="metadataUrl">{metadata.url}</h4>
            </div>
            <img src={metadata.image?.url} alt="" className="metadataImage" />
          </a>
        </div>
      </TimelineLinksStyle>
      {commentBoolean ? (
        ""
      ) : (
        <CommentsBox
          linkId={links.links.id}
          linkUserName={links.links.userName}
          commentCount={setCommentCount}
          setCommentCount={setCommentCount}
        />
      )}
    </>
  );
}
const TimelineLinksStyle = styled.div`
  width: 600px;
  border-radius: 16px;
  background-color: #171717;
  color: #ffffff;
  display: flex;
  margin-top: 16px;
  padding: 15px;
  word-wrap: break-word;
  overflow: auto;

  a {
    font-weight: 700;
    color: rgb(255, 255, 255);
    cursor: pointer;
    text-decoration: none;
  }
  a:hover {
    color: rgb(180, 180, 180);
  }
  .whiteBackground {
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background: #333333;
    position: fixed;
    left: 0;
    top: 0;
    overflow: auto;
    z-index: 2;
    background: rgba(255, 255, 255, 0.9);
  }
  .hidden {
    display: none;
  }
  .deleteBox {
    width: 600px;
    height: 260px;
    background: #333333;
    position: absolute;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: calc(50vh - 130px);
    padding: 60px;
    position: sticky;
    top: center;
    left: center;
  }
  .title {
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 34px;
    text-align: center;
    color: #ffffff;
    margin-bottom: 40px;
  }
  .button {
    width: 135;
    height: 40;
    border-radius: 5px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 5px;
    border: none;
    padding: 5px 15px 5px 15px;
  }
  .blue {
    color: #ffffff;
    background-color: #1877f2;
  }
  .white {
    color: #1877f2;
    background-color: #ffffff;
  }
  .userIconNLikesColumn {
    width: 50px;
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .profileIcon {
    height: 50px;
    width: 50px;
    margin-bottom: 20px;
    border-radius: 50%;
    cursor: pointer;
  }
  .icon {
    height: 25px;
    width: 25px;
    margin-top: 8px;
    cursor: pointer;
  }
  .miniIcon {
    margin-left: 10px;
    height: 15px;
    width: 15px;
    cursor: pointer;
  }
  .likes {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 9px;
    margin-top: 5px;
  }
  .username {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 20px;
    margin-bottom: 7px;
  }
  .text {
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 7px;
  }
  .metadataBox {
    width: 500px;
    height: 155px;
    margin-top: 15px;
    margin-bottom: 15px;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
  }
  .metadataInfo {
    display: inline-block;
    padding: 15px;
  }
  .metadataTitle {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #cecece;
    padding-bottom: 15px;
  }
  .metadataSpan {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 11px;
    color: #9b9595;
  }
  .metadataUrl {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 11px;
    color: #cecece;
    word-break: break-all;
    padding-top: 15px;
  }
  .metadataImage {
    width: 155px;
    height: 155px;
    border-radius: 0px 12px 13px 0px;
    margin-left: 10px;
  }
  .nameNIcons {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .loading {
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 30px;
    color: #ffffff;
  }
  .textArea {
    width: 500px;
    border-radius: 7px;
    padding: 5px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #4c4c4c;
  }
  @media (max-width: 1000px) {
        border-radius: 0px ;
        width: 100% ;
        padding:20px ;
        .allInforms{
          
          width: 100%;
        }
        .metadataBox{
          width: 100%;

        }
        .metadataInfo{
          width: 80% ;
        }
        .textArea{
          width: 100%
          
        }

  }
`;
