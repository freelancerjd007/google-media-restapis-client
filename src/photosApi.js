import { getToken } from "utils";

export const getMyGooglePhotosList = async () => {
  try {
    const token = await getToken();
    console.log("getting google photos with token", token);
    const request = await fetch(
      `${process.env.REACT_APP_GOOGLE_PHOTOS_REST_API_BASE_URL}/v1/mediaItems`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await request.json();
    console.log("got google photos", data);
    return data;
  } catch (error) {
    console.log("getMyGooglePhotosList catch block error", error);
    return error.message;
  }
};
