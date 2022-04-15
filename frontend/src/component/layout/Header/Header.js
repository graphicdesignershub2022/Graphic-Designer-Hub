import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";

const options= {
        burgerColor : "#eb4034" ,
        burgerColorHover : "a62d24" ,
        logo,
        logoWidth:"20vmax",
        navColor1:"rgba(0,0,0,0.8)",
        // navColor1="grey",
        logoHoverSize : "10px",
        logoHoverColor:"#eb4034",
        link1Text : "Home",
        link2Text : "Designers",
        link3Text : "Designer Login",
        link4Text : "About",
        link1Url : "/",
        link2Url : "/designers",
        link3Url : "/designerLogin",
        link4Url :"/about",
        link1Size : "1.3vmax",
        link1Color : "white",
        nav1justifyContent : "flex-end",
        nav2justifyContent : "flex-end",
        nav3justifyContent :"flex-start",
        nav4justifyContent :"flex-start",
        link1ColorHover :"#eb4034",
        link1Margin : "1vmax",
        profileIconUrl :"/login",
        profileIconColor : "grey",
        searchIconColor :"grey",
        cartIconColor : "grey",
        profileIconColorHover : "#eb4034",
        searchIconColorHover : "#eb4034",
        cartIconColorHover : "#eb4034",
        cartIconMargin : "1vmax"
}
const Header = () => {
    return <ReactNavbar {...options} />;
};

export default Header;