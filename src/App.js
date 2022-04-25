import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
//socket.io -client
import { io } from "socket.io-client";
import Main from "./components/Main";

const socket = io("http://localhost:4000", { autoConnect: false });
function App() {
  return <Main socket={socket}></Main>;
}

export default App;
