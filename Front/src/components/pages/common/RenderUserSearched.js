import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function RenderUserSearched({ usersFiltered }) {

  function accessUserPage(id) {
    navigate(`/user/${id}`);
    window.location.reload();
  }

  const navigate = useNavigate();

  return usersFiltered.length === 0 ? (
    <UserNotListed>
      <h2>No users found</h2>
    </UserNotListed>
  ) : (
    usersFiltered.map((user, index) => (
      <UserListed onClick={() => accessUserPage(user.id)}>
        <img src={user.pictureUrl} />
        <h1>{user.userName}
        </h1>
        {usersFiltered[index].following ? (<div className="following"> following </div>) : ''}

      </UserListed>
    ))
  );
}

const UserListed = styled.div`
  width: 530px;
  height: 40px;
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  cursor: pointer;
  .following{
    margin-top: 10px;
    font-size: 19px;
    font-family: "Lato";
    font-weight: 400;
    color: #515151;
    width: 100% ;
    display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  
  }

  img {
    height: 40px;
    width: 40px;
    border-radius: 20px;
  }

  h1 {
    font-size: 19px;
    font-family: "Lato";
    font-weight: 400;
    color: #515151;
    position: absolute;
    margin-top: 10px;
    left: 60px;
  }

  h2 {
    font-size: 19px;
    font-family: "Lato";
    font-weight: 400;
    color: #515151;
    position: absolute;
    left: 20px;
  }
`;

const UserNotListed = styled.div`
  width: 530px;
  height: 40px;
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;

  img {
    height: 40px;
    width: 40px;
    border-radius: 20px;
  }

  h1 {
    font-size: 19px;
    font-family: "Lato";
    font-weight: 400;
    color: #515151;
    position: absolute;
    left: 60px;
  }

  h2 {
    font-size: 19px;
    font-family: "Lato";
    font-weight: 400;
    color: #515151;
    position: absolute;
    left: 20px;
  }
`;
