import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

.pageTitle {
    width: 925px;
    height: 160px;
    padding: 130px 0 15px 0;

    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 45px;
    color: #ffffff;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    
}
textarea{
    resize: none ;
}
.timelineBody {
    display: flex;
    justify-content: center;
    margin-top: 45px;
    position: absolute;
}
.postsBody {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-right: 25px;
}

@media (max-width: 1000px) {
        width: 100% ;
        .pageTitle {
            width: 100% ;
            padding-left: 20px;
        }
        
  }

`;

export default GlobalStyle;
