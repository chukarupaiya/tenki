import { React, useEffect, useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { connectWallet } from "./interact";

const Login = () => {
  const navigate = useNavigate();
  const [walletAddr, setWalletAddr] = useState("");
  useEffect(() => {
    const address = localStorage.getItem("address");

    if (address != undefined) {
      navigate("/create");
    }
  }, []);

  return (
    <div className="outer-login">
      <div className="home-left">
        <h1>Tenki</h1>
        <p>Securing your harvest and Planting the seeds for a sustainable future: Climate-smart crop insurance powered by blockchain</p>
      </div>
      <div className="home-right">
        <button
          className="connect-btn"
          onClick={async () => {
            const temp = await connectWallet();
            setWalletAddr(temp.address);
            console.log(temp.address);
            localStorage.setItem("address", temp.address);
            navigate("/create");
          }}
        >
          connect
        </button>
      </div>
    </div>
  );
};

export default Login;
