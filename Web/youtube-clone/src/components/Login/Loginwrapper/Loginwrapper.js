import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginwrapper.css";
import Userfield from "../Userfield/Userfield";
import "bootstrap-icons/font/bootstrap-icons.css";
import AppContext from "../../../AppContext";

export default function Loginwrapper() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("handling submit..");
    console.log("userlist: ", userList);
    const user = userList.find((user) => user.username === username);
    if (user) {
      if (user.password === password) {
        setCurrentUser(user);
        console.log("setcurr user: ", user);
      } else {
        alert("Incorrect password.");
      }
    } else {
      alert("Username does not exist.");
    }
  };

  // since state updates are brtched, navigate only after the current user is set
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // just creating the admin here until the db is up and running
  useEffect(() => {
    createFakeUser();
  }, []);
  const createFakeUser = () => {
    const fakeUser = {
      id: 89,
      username: "admin",
      password: "admin",
      firstName: "Test",
      middleName: "",
      lastName: "User",
      birthDate: "1990-01-01",
      photo: "",
    };

    setUserList((prevUsers) => {
      if (!prevUsers.some((user) => user.username === fakeUser.username)) {
        return [...prevUsers, fakeUser];
      }
      return prevUsers;
    });
  }; // end creation here

  return (
    <div className="login-wrapper">
      <div className="input-group">
        <i className="bi bi-person-circle"></i>
        <Userfield label="Username" settext={setUsername} />
      </div>
      <div className="input-group">
        <i className="bi bi-lock"></i>
        <Userfield label="Password" settext={setPassword} />
      </div>
      <div className="login-footer">
        <p>Don't have an account?</p>
        <button id="register-button" onClick={() => navigate("/signup")}>
          <p>Register</p>
        </button>
      </div>
      <button className="confirm-button" onClick={handleSubmit}>
        Confirm
      </button>
    </div>
  );
}
