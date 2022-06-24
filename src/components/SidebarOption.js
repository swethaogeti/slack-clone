import { addDoc, collection } from "firebase/firestore";
import React from "react";
import styled from "styled-components";
import { db } from "../firebase-confing";
import { useCollection } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";
const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
  const roomCollectionRef = collection(db, "rooms");
  const dispatch = useDispatch();

  const addChannel = async () => {
    const channelName = prompt("please enter the channel name");
    if (channelName) {
      await addDoc(roomCollectionRef, { name: channelName });
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(enterRoom({ roomId: id }));
    }
  };

  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span>
          {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
};

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  padding-left: 2px;
  font-size: 12px;
  align-items: center;

  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 10px;
  }
`;

const SidebarOptionChannel = styled.h3`
  font-weight: 300;
  padding: 6px 0;
`;
