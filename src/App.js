//import Register from "./pages/Register";
//import Login from "./pages/Login";
import Navbar from "./compenents/Navbar";
// import Home from "./pages/Home";
import RoomPage from "./pages/Room";

function App() {
  return (
    <div className="App">
      {/* <div class="h-screen bg-gradient-to-b from-gray-900 to-gray-800">
          <Login />
      </div> */}
        <Navbar />
        <RoomPage />
        {/* <Home /> */}
    </div>
  );
}

export default App;
