import React, { Fragment, useRef, useEffect} from 'react';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChatInput from './ChatInput';
import { useSelector } from 'react-redux';
import {selectRoomId} from '../features/appSlice';
import {useCollection, useDocument} from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';
import styled from 'styled-components';

const Chat = () => {
  
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails, loading] = useDocument( roomId &&
         db.collection('rooms').doc(roomId));
  const [roomMessages] = useCollection( roomId &&
  db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc'));
  
  console.log('Get Details');
  console.log('Get Messages', roomMessages); 

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
    behavior: "smooth"})
  }, [roomId, loading])
  
  return (<ChatContainer>
           {roomDetails && roomMessages && (
            <Fragment>
              <Header>
                <HeaderLeft>
                  <h4><strong>{roomDetails?.data().name} </strong></h4>
                  <StarOutlineIcon/>
                </HeaderLeft>
                <HeaderRight>
                  <p><InfoOutlinedIcon/> Details</p>
                </HeaderRight>
              </Header>
            
              <ChatMessages>
                {
                  roomMessages?.docs.map( doc => {
                    const {message, timestamp, user,userImage} = doc.data();
                    return (
                      <Message 
                       key={doc.id}
                       message={message}
                       timestamp={timestamp}
                       user={user}
                       userImage={userImage}
                      />
                    )})
                }
              <ChatBottom ref={chatRef}/>
              </ChatMessages>
              
              <ChatInput
               chatRef={chatRef}
               channelName={roomDetails?.data().name} 
               channelId={roomId}
              />
            </Fragment>
           )}
          </ChatContainer>)
}

export default Chat

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  `;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p .MuiSvgIcon-root {
      margin-right: 5px;
      font-size: 16px;
    }
`;

const ChatMessages = styled.div`
`;

const ChatBottom = styled.div`
    padding-bottom: 200px;
`