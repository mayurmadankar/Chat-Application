import "../list/list.css";
import ChatList from "./chatList/ChatList";
import UserInfo from "./userInfo/userInfo";

const List = () => {
  return (
    <div className="list">
      <UserInfo />
      <ChatList />
    </div>
  );
};
export default List;
