import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { newExpirationDate } from "utils";

export default function AccessToken() {
  const { token } = useParams();
  const navigate = useNavigate();
  localStorage.setItem("accessToken", token);
  localStorage.setItem("expirationDate", newExpirationDate());
  useEffect(() => {
    navigate("/");
  }, []);
  return <div></div>;
}
