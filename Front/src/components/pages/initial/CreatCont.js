import { Button, Input, Linkers } from '../common/Subparts';
import { useNavigate } from 'react-router-dom';
import { postCreat } from '../../services/linkr';
import styled from 'styled-components';
import { useState } from 'react';

export default function CreatCont() {
    const [personalDate, setPersonalDate] = useState({});
    const [boolean, setBoolean] = useState(false);
    const navigat = useNavigate()
    function submitobj(event) {
        event.preventDefault();
        if(boolean) return 
        const { name, email, password, pictureUrl } = personalDate;
        setBoolean(!boolean);
        const i = postCreat({ name: name, email: email, password: password, pictureUrl: pictureUrl });
        i.then(sucess);
        i.catch(err);
    }


    function err(value) {
        setBoolean(boolean)
        return alert(value.response.data === "Conflict" ? "Email já cadastrado" :  value.response.data );
    }
    function sucess() {
        alert("Parabéns, cadastro concluído");
        navigat("/")
        return;
    }

    return (
        <AllContainer>
            <p> 
                <h1>
                    linkr
                    <h2>save, share and discover<br/> the best links on the web</h2>    
                </h1>
            </p>
           
            <form onSubmit={submitobj}>
                <Input type={"email"} background={boolean} placeholder={"E-mail"} onChange={e => setPersonalDate({ ...personalDate, email: e.target.value })} readOnly={boolean} required="required" />
                <Input type={"password"} background={boolean} placeholder={"Password"} onChange={e => setPersonalDate({ ...personalDate, password: e.target.value })} readOnly={boolean} required="required" />
                <Input type={"text"} background={boolean} placeholder={"Username"} onChange={e => setPersonalDate({ ...personalDate, name: e.target.value })} readOnly={boolean} required="required" />
                <Input type={"url"} background={boolean} placeholder={"Picture url"} onChange={e => setPersonalDate({ ...personalDate, pictureUrl: e.target.value })} readOnly={boolean} required="required"/>
                <Button type={"submit"} width={"100%"} bolean={boolean} heigt={"50px"} > Sign Up  </Button> 
                <Linkers to={"/"}> Switch back to Log In</Linkers> 
            </form>
             
        </AllContainer>
    )
}
const AllContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    
    form{
        margin-top: 15px;
        padding: 20px ;
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    
    }
   
    h1{

        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 106px;
        line-height: 117px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
        width: 80% ;
    }

    h2{
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;


    }

    p{
        display: flex ;
        align-items: center ;
        justify-content: center ;
        background-color: #151515 ;
        height: 100% ;
        width:70% ;

    }

    @media(max-width: 1000px) {
        p{
            height: 40% ;
            width: 100%;
            h1{
                font-size: 76px;
                line-height: 84px;
                letter-spacing: 0.05em;
                text-align: center;
            }
            h2{
                font-size: 23px;
                line-height: 34px;
                text-align: center;
            }
        }
        form{
            display: block ;
            height: 60% ;
            width: 100%;
            
        }
    }

    `;