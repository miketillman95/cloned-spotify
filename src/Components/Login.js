import React from "react";
import styled from "styled-components";

const Login = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

  return (
    <LoginButton>
      <LoginLink href={AUTH_URL}>Login with Spotify </LoginLink>
    </LoginButton>
  );
};

export default Login;

const LoginButton = styled.button`
  background-color: #1db954;
  padding: 1rem;
  border: none;
  border-radius: 8px;
`;

const LoginLink = styled.a`
  color: #ffff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;
