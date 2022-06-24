import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InboxIcon from "@material-ui/icons/Inbox";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleIcon from "@material-ui/icons/People";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";
import { auth, db } from "../firebase-confing";
import { useCollection } from "react-firebase-hooks/firestore";
import SidebarOption from "./SidebarOption";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
const Sidebar = () => {
  const roomCollectionRef = collection(db, "rooms");
  const [channels, loading, error] = useCollection(roomCollectionRef);
  const [user] = useAuthState(auth);
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>REACT FAM</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>

      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Chanels browser" />
      <SidebarOption Icon={PeopleIcon} title="People & groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels"></SidebarOption>
      <hr />
      <SidebarOption
        Icon={AddIcon}
        title="Add channel"
        addChannelOption
      ></SidebarOption>
      {channels?.docs.map((doc) => (
        <SidebarOption
          id={doc.id}
          key={doc.id}
          title={doc.data().name}
        ></SidebarOption>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: var(--primary-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  overflow-y: scroll;
  > hr {
    margin: 10px 0;
    border: 1px solid grey;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #494949;
  padding: 10px;

  > .MuiSvgIcon-root {
    padding: 8px;
    background-color: white;
    color: var(--primary-color);
    font-size: 18px;
    border-radius: 100px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 3px;
    margin-right: 2px;
    color: green;
  }
`;
