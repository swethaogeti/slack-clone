import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { selectRoomId } from "../features/appSlice";
import { useSelector } from "react-redux";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { db } from "../firebase-confing";
import { async } from "@firebase/util";
import Message from "./Message";
const Chat = () => {
  const roomCollectionRef = collection(db, "rooms");
  const roomId = useSelector(selectRoomId);
  console.log(roomId);

  const [roomDetails] = useDocument(roomId && doc(roomCollectionRef, roomId));

  const roomDocRef = roomId && doc(db, "rooms", roomId);
  const messageRef = roomDocRef && collection(roomDocRef, "messages");
  const q = messageRef && query(messageRef, orderBy("timestamp", "asc"));

  const [roomMessages, loading] = useCollection(roomId && q);

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomId, loading]);
  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                {" "}
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon />
                Details
              </p>
            </HeaderRight>
          </Header>

          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();
              console.log(timestamp);
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                ></Message>
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput
            channelId={roomId}
            channelName={roomDetails?.data().name}
            chatRef={chatRef}
          ></ChatInput>
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;
const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    text-transform: lowercase;
  }

  > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 20px;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  > p {
    display: flex;
    align-items: center;
    font-size: 15px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;
const ChatBottom = styled.div`
  padding-bottom: 10%;
`;
