import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTrending } from "../../services/linkr";

export default function Trendings() {
  const [trendings, setTrendings] = useState(null);
  const token = JSON.parse(localStorage.getItem("linkr"));

  useEffect(() => {
    getTrending(token.token)
      .then((res) => {
        setTrendings(res.data);
      })
      .catch((e) => {
      });
  }, []);

  return (
    <Screen>
      <section>
        <Title>trending</Title>
      </section>

      <section>
        {trendings !== null
          ? trendings.map((item, index) => (
              // <Link to={`/hashtag/${item.tag}`}>
              //   <Hashtag key={index}># {item.tag}</Hashtag>
              // </Link>
              <a href={`/hashtag/${item.tag}`}>
                <Hashtag key={index}># {item.tag}</Hashtag>
              </a>
            ))
          : ""}
      </section>
    </Screen>
  );
}

const Screen = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 16px;
  background-color: #171717;

  display: flex;
  flex-direction: column;
  gap: 10px;

  section {
    padding: 10px;
  }
  section:nth-child(1) {
    border-bottom: 1px solid white;
  }
  section:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  a {
    font-weight: 700;
    color: rgb(255, 255, 255);
    cursor: pointer;
    text-decoration: none;
  }
  a:hover {
    color: rgb(180, 180, 180);
  }
`;

const Title = styled.p`
  font-size: 23px;
  color: white;
  font-weight: 700;
  font-family: sans-serif;
`;

const Hashtag = styled.p`
  font-size: 15px;
  color: rgb(255, 255, 255);
  font-family: sans-serif;

  :hover {
    color: rgb(180, 180, 180);
  }
`;
