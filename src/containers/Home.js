import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createAuthLink, getNewAccessToken } from "apis/googleAuthApis";
import { getMediaItems } from "apis/googlePhotosApi";
import { tokenExpired } from "utils";

export const Home = (props) => {
  const {
    createAuthLink,
    authLinkData,
    getMediaItems,
    mediaItemsData,
    getNewAccessToken,
    newAccessToken,
  } = props;

  const handleGetGooglePhotos = () => {
    if (tokenExpired()) {
      getNewAccessToken();
    } else {
      getMediaItems();
    }
  };

  console.log(mediaItemsData);

  useEffect(() => {
    if (newAccessToken.accessToken) {
      getMediaItems();
    }
  }, [newAccessToken.accessToken]);

  useEffect(() => {
    if (authLinkData.url) {
      window.location.href = authLinkData.url;
    }
  }, [authLinkData.url]);
  return (
    <div className="homeContainer">
      <h1>Google</h1>
      <button onClick={handleGetGooglePhotos} className="getGooglePhotosBtn">
        Get My Google Photos{" "}
        {mediaItemsData.loading || newAccessToken.loading ? "Loading..." : ""}
      </button>
      {/* <button onClick={() => createAuthLink()}>
          Login {authLinkData.loading ? "Loading..." : ""}
        </button> */}
      <div className="imageContainer">
        {mediaItemsData?.data?.map((item, index) => {
          return <img key={index} src={item?.baseUrl} alt="" />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  googleAuthData: { authLinkData, newAccessToken },
  googlePhotosData: { mediaItemsData },
}) => ({
  authLinkData,
  mediaItemsData,
  newAccessToken,
});

const mapDispatchToProps = {
  createAuthLink,
  getMediaItems,
  getNewAccessToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
