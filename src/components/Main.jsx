import React, { useState, useEffect, useCallback } from "react";
import Login from "./Login";
import Chat from "./Chat";

function Main({ socket }) {
  const [newUser, setNewUser] = useState("");
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleChange = (e) => {
    setNewUser(e.target.value);
  };

  const logNewUser = () => {
    console.log({ username: newUser });
    socket.auth = { username: newUser };
    socket.connect();
  };

  //t
  const checkIfUserExists = useCallback(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      socket.auth = { sessionId: sessionId };
      socket.connect();
    }
  }, [socket]);

  useEffect(() => {
    checkIfUserExists();

    socket.on("connect", () => {
      console.info("connected");
    });

    socket.on("disconnect", () => {
      console.info("disconnected");
    });

    socket.on("users", (users) => {
      console.log(users);
      setUsers(users);
    });

    socket.on("session", ({ sessionId, userId, username }) => {
      socket.auth = { sessionId: sessionId };
      localStorage.setItem("sessionId", sessionId);
      setUser({ userId, username });
    });

    console.log(messages);
  }, [socket, messages]);

  return (
    <main className="content">
      <div className="container mt-3">
        {user.userId && (
          <Chat
            socket={socket}
            user={user}
            users={users}
            setUsers={setUsers}
            messages={messages}
            setMessages={setMessages}
          ></Chat>
        )}

        {/* user not logged in */}
        {!user.userId && (
          <Login
            newUser={newUser}
            handleChange={handleChange}
            logNewUser={logNewUser}
          ></Login>
        )}
      </div>
    </main>
  );
}

export default Main;
