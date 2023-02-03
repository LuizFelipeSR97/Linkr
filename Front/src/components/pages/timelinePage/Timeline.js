import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { getAllFollow, getLink, getUserValidation } from "../../services/linkr";

import LinkShare from "./LinkShare";
import Header from "../common/Header";
import TimelineLinks from "../common/TimelineLinks";
import Trendings from "../common/Trendings";
import useInterval from "use-interval";
import { AiFillAlert } from "react-icons/ai";
import UserContext from "../../../parts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Timeline() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const [newLinks, setNewLinks] = useState(0);

  const token = JSON.parse(localStorage.getItem("linkr"));
  const navigat = useNavigate()

  useEffect(() => {
      reloading()
  },[])

  useInterval(() => {
    if (token){
    getUserValidation(token.token).then((value) => {
      setUser({ ...user, ...value.data, ...token });
    }).catch(()=>navigat('/'))
  }
    getLink(token.token)
      .then((res) => {
        if (res.data.length>0){
          if (
            links.length===0 || Date.parse(res.data[0].createDate) > Date.parse(links[0].createDate)
          ){
            setNewLinks(
              res.data.length > links.length
                ? res.data.length - links.length
                : links.length - res.data.length
            )};

          }

      })
      .catch((e) => {
          console.log(e)
        alert(
          "An error occured while trying to fetch the posts, please refresh the page 1"
        );
      });
    getAllFollow(token.token, user.id)
      .then(({ data }) => {
        data.length > 0 || links.length > 0
          ? setLoading(false)
          : setLoading(true);
      })
      .catch((e) => console.error(e));
  }, 1500);

  function reloading() {
    getLink(token.token)
      .then((res) => {
        setLoading(res.data.length === 0 ? true : false);
        console.log(res.data)
        setLinks(res.data);
        setNewLinks(0);
      })
    getAllFollow(token.token, user.id)
      .then(({ data }) => {
        data.length > 0 || links.length > 0
          ? setLoading(false)
          : setLoading(true);
      })
      .catch((e) => console.error(e));

  }
  
  return (
    <TimelineScreen>
      <Header />

      <div className="pageTitle"> timeline </div>

      <Content>
        <Left>
          <div className={"alert"}>
            {newLinks > 0 ? (
              <AiFillAlert
                className={"alertItem"}
                onClick={() => {
                  if (
                    window.confirm(
                      newLinks > 0
                        ? `you have ${newLinks} update`
                        : `you have ${newLinks} new updates`
                    )
                  ) {
                    setNewLinks(0);
                    reloading()
                    window.location.reload()
                  }
                }}
              />
            ) : (
              ""
            )}
          </div>
          <LinkShare />

          {loading ? (
            <h3 className="noLinks">
              You don't follow anyone yet. Search for new friends!
            </h3>
          ) : (
            [
              links.length === 0 ? (
                <h3 className="noLinks">No posts found from your friends</h3>
              ) : (
                links.map((links, index) => (
                  <TimelineLinks
                    key={index}
                    links={links}
                    reloading={reloading}
                    boolean={links.boolean ? links.boolean : false}
                  />
                ))
              ),
            ]
          )}
        </Left>
        <Right>
          <Trendings />
        </Right>
      </Content>
    </TimelineScreen>
  );
}

const TimelineScreen = styled.div`
  .noLinks {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    color: #ffffff;  
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
  .alert {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    .alertItem {
      font-size: 20px;
      color: red;
    }
  }

 

`;

const Right = styled.div`
@media (max-width: 1000px) {
  display: none ;
  }

`;
