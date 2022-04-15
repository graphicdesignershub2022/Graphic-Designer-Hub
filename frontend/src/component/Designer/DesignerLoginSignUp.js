import React, { Fragment, useRef, useState, useEffect } from 'react'
import "./DesignerLoginSignUp.css"
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PhoneIcon from '@material-ui/icons/Phone';
import FaceIcon from "@material-ui/icons/Face";
import HomeIcon from '@material-ui/icons/Home';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, dlogin, registerDesigner } from "../../actions/designerAction";
import {useAlert} from "react-alert";



const DesignerLoginSignUp = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.designer
      );

    const loginTab = useRef(null);  //to access DOM elements we use useRef as directly we cannot access DOM elements
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState(""); //initial state are empty

    const [designer, setDesigner] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        qualification: "",
        experience: "",
        specialization: "",
        skills: "",
    });

    //fetching from designer
    const { name, email, password, phone, address, qualification, experience, specialization, skills } = designer;

    //login submit
    const loginSubmit = (e) => {
        e.preventDefault();
      dispatch(dlogin(loginEmail, loginPassword)); 
    };

    //registerSubmit
    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("phone", phone);
        myForm.set("address", address);
        myForm.set("qualification", qualification);
        myForm.set("experience", experience);
        myForm.set("specialization", specialization);
        myForm.set("skills", skills);
        dispatch(registerDesigner(myForm)); 
    };


    //register Data Change
    const registerDataChange = (e) => {
        setDesigner({ ...designer, [e.target.name]: e.target.value });
    }


    //use Effect
    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (isAuthenticated) {
          history.push("/designeraccount");
        }
      }, [dispatch, error, alert, history, isAuthenticated]);

    //to move our tabs left and right as we shift between login and register
    const switchTabs = (e, tab) => {
        if ( tab === "login" ) {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if ( tab === "register" ) {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
      
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

  return (
    <Fragment>
        {loading ? (<Loader/>
        ):(
            <Fragment>
        <div className='DesignerLoginSignUpConatiner'>
            <div className='DesignerLoginSignUpBox'>
                <div>
                    <div className='D_login_signUp_toggle'>
                        <p onClick={(e) => switchTabs(e,"login")}>LOGIN</p>
                        <p onClick={(e) => switchTabs(e,"register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className='loginForm'ref={loginTab} onSubmit={loginSubmit}>
                    <div className='loginEmail'>
                        <MailOutlineIcon />
                        <input 
                            type="email"
                            placeholder='Email'
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        ></input>
                    </div>
                    <div className='loginPassword'>
                        <LockOpenIcon />
                        <input 
                            type="password"
                            placeholder="Password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/password/dforgot">Forget Password</Link>
                    <input type="submit" value="Login" className="loginBtn" />
                </form>

                <form
                    className='dsignUpForm'
                    ref={registerTab}
                    encType="multipart/form-data"
                    onSubmit={registerSubmit}
                  >
                      <div className="signUpName">
                          <FaceIcon />
                          <input 
                            type="text"
                            placeholder='Name'
                            required
                            name="name"
                            value={name}
                            onChange={registerDataChange}
                        />
                      </div>
                      <div className="signUpEmail">
                          <MailOutlineIcon />
                          <input 
                            type="email"
                            placeholder='Email'
                            required
                            name="email"
                            value={email}
                            onChange={registerDataChange}
                        />
                      </div>
                      <div className="signUpPassword">
                          <FaceIcon />
                          <input 
                            type="password"
                            placeholder='Password'
                            required
                            name="password"
                            value={password}
                            onChange={registerDataChange}
                        />
                      </div>
                      <div className="signUpPhone">
                          <PhoneIcon />
                          <input 
                            type="text"
                            placeholder='Phone'
                            required
                            name="phone"
                            value={phone}
                            onChange={registerDataChange}
                        />
                      </div>
                      <div className="signUpAddress">
                          <HomeIcon />
                          <input 
                            type="text"
                            placeholder='Address'
                            required
                            name="address"
                            value={address}
                            onChange={registerDataChange}
                        />
                      </div>
                      <div className="signUpQualification">
                          <input 
                            type="text"
                            placeholder='Qualification'
                            required
                            name="qualification"
                            value={qualification}
                            onChange={registerDataChange}
                        />
                      </div>
                      <div className="signUpExperience">
                          <input 
                            type="text"
                            placeholder='Experience'
                            required
                            name="experience"
                            value={experience}
                            onChange={registerDataChange}
                        />
                      </div>
                      <div className="signUpSpecialization">
                          <input 
                            type="text"
                            placeholder='Specialization'
                            required
                            name="specialization"
                            value={specialization}
                            onChange={registerDataChange}
                        />
                      </div>
                      <div className="signUpSkills">
                          <input 
                            type="text"
                            placeholder='Skills'
                            required
                            name="skills"
                            value={skills}
                            onChange={registerDataChange}
                        />
                      </div>
                      <input
                        type="submit"
                        value="Register"
                        className='signUpbtn'
                      />
                </form>
            </div>
        </div>
    </Fragment>
        ) }
    </Fragment>
  )
}

export default DesignerLoginSignUp;