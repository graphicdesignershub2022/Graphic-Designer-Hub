import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from './component/layout/Header/Header.js';
import React from "react";
import WebFont from 'webfontloader';
import Footer from "./component/layout/Footer/Footer.js"
import  Home from "./component/Home/Home.js"
import DesignerDetails from "./component/Designer/DesignerDetails.js"
import Designers from "./component/Designer/Designers.js";
import Search from "./component/Designer/Search.js"
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import About from "./component/About/About";
import DesignerLoginSignUp from './component/Designer/DesignerLoginSignUp';
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails.js"



function App() {


  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect( ()=>{
    WebFont.load({
      google:{
        families: ["Roboto","Droid Sans","Chilamka"]
      },
      
    });

    store.dispatch(loadUser());
    // store.dispatch(loadDesigner());
  }, []);



  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      {/* DESIGNERS ROUTE */}
      <Route exact path="/" component={Home} />

      <Route exact path="/designer/:id" component={DesignerDetails} />

      <Route exact path="/designers" component={Designers} />

      <Route path="/designers/:keyword" component={Designers} />

      <Route exact path="/search" component={Search} />

      {/* USER ROUTES */}
      <Route exact path="/login" component={LoginSignUp} />

      <ProtectedRoute exact path="/account" component={Profile} />

      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />

      <Route exact path="/password/forgot" component={ForgotPassword} />

      <Route exact path="/password/reset/:token" component={ResetPassword} />

      <Route exact path="/about" component={About} />

      {/* DESIGNER ROUTE */}
      <Route exact path="/designerLogin" component={DesignerLoginSignUp} />
      
      {/* Orders */}
      <ProtectedRoute exact path="/orders" component={MyOrders} />

      <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

      <Footer />
    </Router>

  );
}

export default App;
