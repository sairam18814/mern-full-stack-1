import Sidebar from "./Sidebar";
import Chat from "./Chat";
import "./App.css";
import React, { useEffect, useState} from "react";
import Pusher from "pusher-js";
import axios from "./axios";


function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync")
      .then(response => {
        setMessages(response.data);
      });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("e3754e4e45675fc81aaf", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">

      <div className="app_body">

        <Sidebar />

        <Chat />

      </div>

    </div>
  );
}

export default App;