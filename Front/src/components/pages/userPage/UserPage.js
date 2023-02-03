import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../../parts/UserContext";
import { getLinksFilteredByUser, getUserName, postFollow, getFollow } from "../../services/linkr";
import { useParams } from "react-router-dom";

import Header from "../common/Header";
import Trendings from "../common/Trendings";
import TimelineLinks from "../common/TimelineLinks";

export default function UserPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext)
  const [isUserProfile, setIsUserProfile] = useState(false);
  const [links, setLinks] = useState([]);
  const [username, setUsername] = useState([]);
  const [follow, setFollow] = useState({ boton: true, follower: false });


  const params = useParams();
  const id = Number(params.id);

  const token = JSON.parse(localStorage.getItem("linkr"));

  function isItUserProfile() {
    if (id === user.id) {
      setIsUserProfile(true);
    } else {
      setIsUserProfile(false);
    }
  }

  useEffect(() => {
    isItUserProfile()
    getLinksFilteredByUser(token.token, id)
      .then((res) => {
        setLoading(false);
        setLinks(res.data);
      })
      .catch(() => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });

    getUserName(token.token, id)
      .then((res) => {
        setUsername(res.data[0])
      })
      .catch(() => {
        alert(
          "An error has occured while trying to fetch the posts, please refresh the page"
        );
      });
    getFollow(token.token, id).then(value => { if (value.data.length > 0) return setFollow({ ...follow, follower: true }); })

  }, []);
  function followers() {
    if (follow.boton) {
      setFollow({ ...follow, boton: !follow.follower })
      postFollow(token.token, id).then(() => setFollow({ boton: true, follower: !follow.follower })).catch(() => { setFollow({ boton: true, follower: !follow.follower }); alert("Could not follow this user") })
    }
  }
  return (
    <TimelineScreen>
      <Header />
      <div className="pageTitle"> {username.length === 0 ? "" : username.userName}'s posts </div>

      <Content>
        <Left>
          <div className="all">
            {username.id !== id ? follow.follower ? <div className="follower" onClick={followers} >Unofollow</div> : <div className="follower" onClick={followers}>Follow</div> : ""}
          </div>
          {loading ? (
            <h3 className="noLinks">Loading...</h3>
          ) : (
            [
              links.length === 0 ? (
                <h4 className="noLinks">There are no posts yet</h4>
              ) : (
                links.map((links) => {
                  return (
                    <TimelineLinks
                      links={links}
                      boolean={links.boolean ? links.boolean : false}
                    />)
                }
                )
              ),
            ]
          )}
        </Left>
        <Right>
          <Trendings />
        </Right>
      </Content>
    </TimelineScreen>
  )
}

const TimelineScreen = styled.div`
 
  .all{
    width: 100% ;
    display: flex ;
    justify-content: flex-end ;
    padding: 10px ;

  }
   .follower{
    font-family: 'Oswald', sans-serif;
    font-size: 30px ;
    color: #ffffff;
    cursor: pointer;

  }
  .noLinks {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    color: #ffffff;
  }

  .noLinks{
    margin-top: 50px;
    font-size: 22px;
  }
  @media (max-width: 1000px) {
        justify-content: center ;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 1000px) {
        justify-content: center ;
  }

`;

const Left = styled.div`
  
`;

const Right = styled.div`
@media (max-width: 1000px) {
  display: none ;

  }
`;


