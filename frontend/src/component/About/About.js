import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";


const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/gdhub";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/abhishek27/image/upload/v1649335621/sampleImages/avtr_jxdccq.jpg"
              alt="Founder"
            />
            <Typography>Graphic Designers Hub</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @Abhishek Kidye @Rohan Mandavkar @Pushkar Sabe. To make the designers 
              open  to world so that they are easily available to the customers.
              <div style={{font:"cursive", color:"red"}}> 
                <b>Feel Free To Contact Us To Get Yourself Featured On this Website </b><br/>
                <b> Mail us at</b>
                <a className="mailBtn" href="mailto:gdhub2022@gmail.com">
                <Button>Contact: wlone687i@gmail.com</Button> </a>
              </div>
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Visit Us At</Typography>
            <a
              href="https://www.youtube.com/"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/_abhi_0808_" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
