import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { collection, doc, serverTimestamp, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase-confing";
import { async } from "@firebase/util";
import { useAuthState } from "react-firebase-hooks/auth";
const ChatInput = ({ channelId, channelName, chatRef }) => {
  //   const inputRef = useRef(null);
  //console.log(inputRef.current.value);
  console.log(channelName);

  const [user] = useAuthState(auth);
  const [input, setInput] = useState(" ");
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!channelId || input === " ") {
      return false;
    }

    const roomDocRef = doc(db, "rooms", channelId);
    const messageRef = collection(roomDocRef, "messages");
    await addDoc(messageRef, {
      // message:inputRef.current.value,
      message: input,
      timestamp: serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });

    setInput("");
    chatRef.current?.value.scrollIntoView({
      behaviour: "smooth",
    });
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        ></input>

        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
    color: black;
  }

  > form > button {
    display: none;
  }
`;
