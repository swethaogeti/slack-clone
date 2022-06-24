import React from "react";
import styled from "styled-components";
import { Avatar, Button } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-confing";
import { signOut } from "firebase/auth";
const Header = () => {
  const [user] = useAuthState(auth);
  console.log(user?.photoURL);
  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar src={user?.photoURL} />
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder="search for codeHub"></input>
      </HeaderSearch>
      <HeaderRight>
        <Button onClick={() => signOut(auth)}> Logout</Button>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
const HeaderContainer = styled.div`
  display: flex;
  background-color: var(--primary-color);
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 0.3;

  > .MuiSvgIcon-root {
    color: white;
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  display: flex;
  align-items: center;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  color: grey;
  border: 1px solid grey;
  padding: 5px 0;
  min-width: 30vw;

  > input {
    background-color: transparent;
    outline: 0;
    border: none;
    color: white;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > .MuiSvgIcon-root {
    color: white;
    padding-right: 20px;
  }

  > button {
    color: white;
  }
`;
