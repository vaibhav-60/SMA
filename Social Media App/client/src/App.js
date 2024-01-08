import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import RequireUser from "./components/RequireUser";
import Profile from "./components/profile/Profile";
import Feed from "./components/feed/Feed";
import Home from "./home/Home";
import UpdateProfile from "./components/updateprofile/UpdateProfile";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import LoggedIn from "./components/LoggedIn";



function App() {

  const isLoading = useSelector((state) => state.AppConfigReducer.isLoading)
  const loadingRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  return (
    <div className="App">



      <LoadingBar height={6} color='#5f9fff' ref={loadingRef} />
      <Routes>

        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
          </Route>
        </Route>
        <Route element={<LoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>


      </Routes>
    </div>
  );
}

export default App;
