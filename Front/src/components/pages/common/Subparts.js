import styled from "styled-components";
import { Link } from "react-router-dom";

function Container({...props}){
    return(
        <Contai {...props}> {props.children}</Contai>
    )   
}
const Contai = styled.div`
    border: ${props => props.border };
    margin: 20px ;
    display:flex ;
    justify-content: center ;
    align-items: center ;
    background: ${props => props.background };
    border-radius: 10px;
    width:${props => props.width } ;
    height:${props => props.height } ;

`;
function Heade({...props}){
    return(
        <Headers>{props.children} </Headers>
    )

}
const Headers = styled.span`
    margin: 50px;
    width: 147px;
    height: 50px;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
`;
 

function Button({...props}){
    return(
        <Butto {...props}></Butto>
    )

}
const Butto = styled.button`
        color: #FFFFFF ;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer; 
        border-style: none;
        font-family: 'Oswald';
        width: ${props=> props.width};
        height: ${props=> props.heigt};
        background: #1877F2;
        border-radius: 5px;
        font-weight: 700;
        font-size: 21px;
        line-height: 26px;
        opacity: ${(props) => !props.bolean ? 1 : 0.5 };
        transition: background 50ms linear ;
        margin: 5px;
        :active{
            background-color: ${props => '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')} ;
            transform: translatey(4px);
        }
  
`;

function Linkers({...props}){
    return(
      <Linke> <Link {...props}>{props.children} </Link> </Linke>
    )    
}

const Linke = styled.div`
    margin: 10px ;
    width: 100% ;
    text-align: center ;
    a{
    font-family:'Lato' ;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF ;

    }
`;

function Text({...props}){
    return(
        <Tex {...props} >{props.children}</Tex>
    )
}
const Tex = styled.div`
    font-family: 'Raleway' ;
    display: flex;
    height: 15px;
    font-style: normal;
    font-weight:${props=> props.weight ? props.weight: 400 };
    font-size: ${props=> props.font };
    line-height: 25px;
    color: ${props=> props.color };
`;


function Input({...others}){
    return(
        <Inp {...others}/> 
    )
}
const Inp = styled.input`
        cursor: pointer;
        font-family: 'Oswald' ;
        -webkit-box-shadow: ${(props) => !props.background ? "0 0 0 50px white inset" : "0 0 0 50px #79aff2 inset" }  ;
        padding: 20px;
        width: 100%;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        height: 58px;
        color:${(props) => !props.background ? "#000000" : "#D4D4D4" };
        font-weight: 700;
        line-height: 27px;
        margin: 5px ;
        ::placeholder{
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 25px;
        color: #000000 ;
        opacity: 0.5;
        }
        :focus, select:focus {
        
        border: 1 none;
        outline: 0;
        }    

`;

export { Container, Button ,Text , Input, Linkers, Heade }
