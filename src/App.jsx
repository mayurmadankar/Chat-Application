import { useState } from "react";
import Chat from "./components/chat/chat";
import Details from "./components/details/Details";
import List from "./components/list/List";
import Login from "./components/Login/Login";
import Notification from "./components/notification/Notification";

const App = () => {
  const [user, setUser] = useState(false);

  return (
    <div className="container">
      {user ? (
        <>
          <List />
          <Chat />
          <Details />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
