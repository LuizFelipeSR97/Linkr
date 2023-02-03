import styled from "styled-components";
import { useEffect, useState } from "react";
import { getLinksFilteredByHashtag } from "../../services/linkr";

import Header from "../common/Header";
import TimelineLinks from "../common/TimelineLinks";
import { useParams } from "react-router-dom";
import Trendings from "../common/Trendings";

export default function Hashtag() {
  const [links, setLinks] = useState(null);
  const { hashtag } = useParams();
  const token = JSON.parse(localStorage.getItem("linkr"));

  useEffect(() => {
    getLinksFilteredByHashtag(hashtag, token.token)
      .then((res) => {
        setLinks(res.data);
      })
      .catch((e) => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, []);

  return (
    <Screen>
      <Header />

      <PageTitle># {hashtag}</PageTitle>

      <Content>
        <Posts>
          {links !== null
            ? links.map((link, index) => (
                <TimelineLinks
                  key={index}
                  links={link}
                  boolean={link.boolean ? link.boolean : false}
                />
              ))
            : "Loading..."}
        </Posts>

        <Trendings />
      </Content>
    </Screen>
  );
}

const Screen = styled.div``;

const PageTitle = styled.div`
  width: 925px;
  height: 160px;
  padding: 130px 0 15px 0;

  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 45px;
  color: #ffffff;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Content = styled.div`
  margin-top: 35px;

  display: flex;
  justify-content: space-between;
`;
const Posts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
