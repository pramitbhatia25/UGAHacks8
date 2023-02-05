import './App.scss';
import {Routes, Route} from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import Contact from './components/Contact';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import LeaderBoard from './components/LeaderBoard';
import DashBoard from './components/Dashboard';
import Chat from './components/Chat';

function App() {
  return (
  <div>

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element= {<Home/>} />
        <Route path="home" element= {<Home/>} />
        <Route path="signIn" element= {<SignIn/>} />
        <Route path="signUp" element= {<SignUp/>} />
        <Route path="contact" element= {<Contact/>} />
        <Route path="world/leaderboard" element= {<LeaderBoard/>} />
      </Route>
    <Route path="/user/dashboard" element= {<DashBoard/>} />
    <Route path="/user/chat" element= {<Chat/>} />
    </Routes>
  </div>
  );
}

export default App;
