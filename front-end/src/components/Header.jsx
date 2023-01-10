import React from 'react';
import styled from "styled-components";
import Logo from "./Logo.jsx";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  padding: 0 4rem;
  button {
    padding: .5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: .2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;

const Header = (props) => {
    const { login } = props;
    const navigate = useNavigate();
    const buttonAction = () => {
        navigate(login ? "/login" : "/signup");
    };

    return (
        <HeaderContainer className="flex a-center j-between">
            <Logo/>
            <button onClick={buttonAction}>{login ? "Log In" : "Sign Up"}</button>

        </HeaderContainer>
    );
};

export default Header;
