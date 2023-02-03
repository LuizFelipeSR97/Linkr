import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import UserContext from "../parts/UserContext";
import ResetStyled from "../reset/reset";
import GlobalStyle from "../styles/GlobalStyles";

import CreatCont from "./pages/initial/CreatCont";
import Enter from "./pages/initial/Enter";
import Timeline from "./pages/timelinePage/Timeline";
import Hashtag from "./pages/hashtagPage/Hashtag";
import UserPage from "./pages/userPage/UserPage";
import { getUserValidation } from "./services/linkr";

export default function App() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("linkr"));
    if (token)
      getUserValidation(token.token).then((value) => {
        setUser({ ...user, ...value.data, ...token });
      });
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <ResetStyled />
        <GlobalStyle />
        <Wrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Enter />} />
              <Route path="/signup" element={<CreatCont />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/hashtag/:hashtag" element={<Hashtag />} />
              <Route path="/user/:id" element={<UserPage />} />
            </Routes>
          </BrowserRouter>
        </Wrapper>
      </UserContext.Provider>
    </>
  );
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background: #333333;
  position: sticky;
  top: 0;
  overflow: auto;

  
`;
