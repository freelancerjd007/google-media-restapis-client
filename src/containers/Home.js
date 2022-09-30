import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createAuthLink } from "apis/googleAuthApis";
import { getMediaItems } from "apis/googlePhotosApi";

export const Home = (props) => {
  const { createAuthLink, authLinkData, getMediaItems, mediaItemsData } = props;

  console.log(mediaItemsData);

  useEffect(() => {
    if (authLinkData.url) {
      window.location.href = authLinkData.url;
    }
  }, [authLinkData.url]);
  return (
    <div className="homeContainer">
      <h1>Google</h1>
      <button onClick={() => getMediaItems()} className="getGooglePhotosBtn">
        Get My Google Photos {mediaItemsData.loading ? "Loading..." : ""}
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
  googleAuthData: { authLinkData },
  googlePhotosData: { mediaItemsData },
}) => ({
  authLinkData,
  mediaItemsData,
});

const mapDispatchToProps = {
  createAuthLink,
  getMediaItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
