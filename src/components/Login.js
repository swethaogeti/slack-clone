import { async } from "@firebase/util";
import { Button } from "@material-ui/core";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase-confing";

const Login = () => {
  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };
  return (
    <LoginContainer>
      <LoginBox>
        <img
          src="https://cdn.iconscout.com/icon/free/png-256/slack-1425877-1205068.png"
          alt="logo"
        ></img>
        <h1>Sign in to React Fam</h1>
        <p>mars.slack.com</p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginBox = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    height: 100px;
    margin-bottom: 40px;
    object-fit: contain;
  }

  > button {
    margin-top: 50px;
    text-transform: capitalize;
    background-color: #0a8d48 !important;
    color: white;
  }
`;
