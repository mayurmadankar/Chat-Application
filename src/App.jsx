import Chat from "./components/chat/chat";
import Details from "./components/details/Details";
import List from "./components/list/List";

const App = () => {
  return (
    <div className="container">
      <List />
      <Chat />
      <Details />
    </div>
  );
};

export default App;
