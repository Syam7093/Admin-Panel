import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import UserList from './components/modules/user/UserList';
import OfferList from './components/modules/offer/OfferList';
import Navigation from './components/modules/navigation/Navigation';
import UpdateUser from './components/modules/user/UpdateUser';
import AddUser from './components/modules/user/AddUser';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <div className="container">
     <Navigation/>
     <div className="content">
     <Routes>
      <Route path="/" element={<UserList/>}></Route>
      <Route path="/offer" element={<OfferList/>}></Route>
      <Route path="/userupdate" element={<UpdateUser/>}></Route>
      <Route path="/useradd" element={<AddUser/>}></Route>



      
     </Routes>
     </div>
     </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
