import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EXIF from "exif-js";
import TextField from "@mui/material/TextField";
import { GiTreeBranch } from "react-icons/gi";
import { MdAddPhotoAlternate } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import create_contract from '../contract/create_contract';

import "../styles/CreateContract.css";

const CreateContract = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState(localStorage.getItem("address"));

  const navigate = useNavigate();
  useEffect(() => {
    const address = localStorage.getItem("address");

    if (address == undefined) {
      navigate("/");
    }
  }, []);

  const [file, setFile] = useState(null);

  function handleFileUpload(event) {
    const file = event.target.files[0];

    EXIF.getData(file, function () {
      const lat = EXIF.getTag(this, "GPSLatitude");
      const latRef = EXIF.getTag(this, "GPSLatitudeRef");
      const lng = EXIF.getTag(this, "GPSLongitude");
      const lngRef = EXIF.getTag(this, "GPSLongitudeRef");

      if (lat && latRef && lng && lngRef) {
        const latitude = convertDMSToDD(lat, latRef);
        const longitude = convertDMSToDD(lng, lngRef);

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      } else {
        console.log("No GPS data found in the photo.");
      }
    });

    setFile(file);
  }

  function convertDMSToDD(coord, ref) {
    const [degrees, minutes, seconds] = coord;
    let dd = degrees + minutes / 60 + seconds / 3600;

    if (ref === "S" || ref === "W") {
      dd = -dd;
    }

    return dd;
  }

  return (
    <div className="create-outer">
      <div className="uploaded-img1">
        {!file && (
          <>
            <label for="firstimg" className="imglabel">
              <GiTreeBranch></GiTreeBranch>
            </label>
            <label for="firstimg" className="imglabel2">
              <GrFormAdd></GrFormAdd>
            </label>
            <input
              id="firstimg"
              className="uploaded-img1-1"
              type="file"
              onChange={handleFileUpload}
              name=""
            />
            <p style={{"color":"grey"}}>Turn on the location while capturing</p>
          </>
        )}
        {file && (
          <img className="uploaded-img2" src={URL.createObjectURL(file)} />
        )}
      </div>
      <button className="logout-btn" onClick={() => {
        localStorage.removeItem("address");
        navigate("/");
      }}>
        Disconnect
      </button>

      <div className="contents">
        <div className="inputs">
          <TextField
            disabled
            className="inputs1"
            id="outlined-disabled"
            label="Wallet Address"
            value={address}
          />
        </div>
        <div className="inputs">
          <TextField
            required
            className="inputs1"
            id="outlined-required"
            label="Latitude"
            value={latitude}
            onChange={(event) => {
              setLatitude(event.target.value);
            }}
          />
        </div>
        <div className="inputs">
          <TextField
            required
            className="inputs1"
            label="Longitude"
            value={longitude}
            onChange={(event) => {
              setLongitude(event.target.value);
            }}
          />
        </div>
        <button className="register-btn" onClick={()=>{
            create_contract("11.004556","76.961632");
        }}>register</button>
      </div>
    </div>
  );
};

export default CreateContract;
