import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Art.css";
import FormData from "form-data";
const { REACT_APP_BEARER_TOKEN } = process.env;

let imageText = "";
function ArtPosts() {
  const [selectedFile, setSelectedFile] = useState("");

  const onFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);

    function read(callback) {
      var file = event.target.files[0];
      var reader = new FileReader();

      reader.onload = function () {
        //  const content = event.target.result;
        callback(reader.result);
        // console.log(reader.result);
      };

      reader.readAsText(file);
    }
    read((text) => {
      imageText = text;
      console.log("hi", text);
    });
  };

  const onUploadClick = async (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID REACT_APP_BEARER_TOKEN`);

    var formdata = new FormData();
    formdata.append("image", imageText);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://api.imgur.com/3/image", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  // let art = await axios.post("http://localhost:3001/upload");
  // let data = new FormData();
  // data.append("uploaded_img", selectedFile);
  // let art = await axios.post("http://localhost:3001/art", {
  //   method: "POST",
  //   body: data,
  // });

  return (
    <div className="artDetails">
      <h2>FAN ART!</h2>
      <div className="artUpload">
        <form
          action="http://localhost:3001/upload"
          encType="multipart/form-data"
          method="POST"
        >
          <label for="pic">Choose a profile picture:</label>
          <input
            type="file"
            name="pic"
            accept="image/png, image/jpeg"
            onChange={onFileSelect}
          />
          <input
            type="button"
            value="Upload file"
            name="pic"
            onClick={onUploadClick}
          />
        </form>
      </div>
      <img src="http://localhost:3001/upload/" alt="artwork"></img>
    </div>
  );
}
export default ArtPosts;
