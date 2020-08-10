import React, { useState, useEffect } from "react";
import shallow from "zustand/shallow";

import { useChatStore, useReset } from "./chat.store";

import "./styles.css";

export default function App() {
  let [showMount, setMount] = useState(true);
  let { addUser, getMessages, sendMessage } = useChatStore(
    state => ({
      addUser: state.addUser,
      getMessages: state.getMessages,
      sendMessage: state.sendMessage
    }),
    shallow
  );

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <React.Fragment>
      <div className="chatWindow">
        <UserList />
        <MessageList />
        {showMount && <TestMount />}
      </div>
      <button
        onClick={() => {
          sendMessage("bla bal " + Math.random());
        }}
      >
        add Messages
      </button>
      <button onClick={addUser}>add User</button>
      <button
        onClick={() => {
          setMount(!showMount);
        }}
      >
        reSet
      </button>
    </React.Fragment>
  );
}

function TestMount() {
  useReset();
  return "null";
}

function UserList() {
  let users = useChatStore(function selector(state) {
    return state.users;
  });

  return (
    <ul className="userList">
      {users.map(user => {
        return (
          <li key={user.id} className="user">
            {user.name}
          </li>
        );
      })}
    </ul>
  );
}

function MessageList() {
  let messages = useChatStore(function selector(state) {
    return state.messages;
  });
  return (
    <ul className="messageList">
      {messages.map(message => {
        return (
          <li key={message.id} className="message">
            {message.text}
          </li>
        );
      })}
    </ul>
  );
}
