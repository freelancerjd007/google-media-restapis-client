import React, { useState, useEffect } from "react";
import { getMyGooglePhotosList } from "./photosApi";
import { storeTokenData, newExpirationDate, createGoogleAuthLink } from "utils";

function App() {
  useEffect(() => {
    handleTokenFromQueryParams();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [photos, setPhotos] = useState([]);

  const handleTokenFromQueryParams = () => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");
    const expirationDate = newExpirationDate();
    if (accessToken && refreshToken) {
      storeTokenData(accessToken, refreshToken, expirationDate);
      setIsLoggedIn(true);
    }
  };

  const signOut = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
  };

  const handleGetPhotos = async () => {
    const data = await getMyGooglePhotosList();
    console.log("data", data);
    setPhotos(data?.mediaItems);
  };

  return (
    <div className="App">
      <h1>Google</h1>
      {!isLoggedIn ? (
        <button onClick={createGoogleAuthLink}>Login</button>
      ) : (
        <>
          <button onClick={handleGetPhotos}>Get Google Photos</button>
          <button onClick={signOut}>Sign Out</button>
        </>
      )}
      {photos.length > 0 && (
        <div className="photos">
          {photos.map((img, index) => {
            console.log(img);
            return <img key={index} src={img.productUrl} alt={img.filename} />;
          })}
        </div>
      )}
      <img
        src="https://photos.google.com/lr/photo/ADsXT-wd-B2xvGm-A8sSwLi8PbKmAYUamNYS1um7TJFY5UBAlpCATp6mtI4Moq83Hums2r6q-neVUMU6lg02thBkUaXOexjZBA"
        alt=""
      />
    </div>
  );
}

export default App;
