import styled from "styled-components";

export const Body = styled.main`
  background-image: url("/images/background.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-family: "Raleway", sans-serif;
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  max-width: 450px;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 95vw;
    height: ${(props) => (props.isSignUp ? "95vh" : "90vh")};
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 321px) {
    width: 90vw;
    height: ${(props) => (props.isSignUp ? "95vh" : "90vh")};
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 90vw;
    height: ${(props) => (props.isSignUp ? "95vh" : "90vh")};
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: ${(props) => (props.isSignUp ? "85vh" : "80vh")};
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
  }
`;

export const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

export const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: ${(props) => (props.isSignUp ? "32%" : "20%")};
  width: 100%;
`;

export const AuthenticationType = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Authentication = styled.button`
  text-decoration: ${(props) =>
    props.authenticationType === props.children && "underline"};
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  color: white;
  margin: 10px;
  letter-spacing: 3px;
  @media only screen and (min-width: 411px) {
    font-size: 1.5rem;
  }
`;

export const ButtonContainer = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginWith = styled.h5``;

export const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: ${(props) => (props.isSignUp ? "0" : " 1.5rem 0 1rem 0")};
  backdrop-filter: blur(25px);
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 1rem 0 2rem 0;
  width: 80%;
  @media only screen and (min-width: 450px) {
    margin: 1rem 0;

`;

export const ForgotPassword = styled.button`
  cursor: pointer;
  background: transparent;
  border: 0;
  color: white;
  font-size: 1.5rem;
  margin: 15px 0;
  text-transform: uppercase
`;

export const StyledButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
`;

export const StyledIcon = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  background: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  color: white;
  cursor: pointer;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  margin: ${(props) => (props.isSignUp ? "10px 0" : "auto")};
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }

  @media only screen and (max-width: 450px) {
    width: 90%;
  }
`;
