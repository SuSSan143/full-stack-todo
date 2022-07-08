import styled from "styled-components";
import { AnimatedInput } from "./AnimatedInput";

export const Main = styled.main`
  background-image: ${({ islighttheme }) =>
    islighttheme
      ? `url('/images/bg-mobile-light.jpg')`
      : `url('/images/bg-mobile-dark.jpg')`};
  background-repeat: no-repeat;
  background-size: contain;
  background-color: ${({ islighttheme }) =>
    !islighttheme ? "hsl(235, 21%, 11%)" : "hsl(236, 33%, 92%)"};
  padding: 0.8rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  @media screen and (min-width: 500px) and (max-width: 1440px) {
    background-image: ${({ islighttheme }) =>
      islighttheme
        ? `url('/images/bg-desktop-light.jpg')`
        : `url('/images/bg-desktop-dark.jpg')`};
    justify-content: center;
    background-size: auto;
  }
  @media screen and (min-width: 1440px) {
    background-image: ${({ islighttheme }) =>
      islighttheme
        ? `url('/images/bg-desktop-light.jpg')`
        : `url('/images/bg-desktop-dark.jpg')`};
    justify-content: center;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: stretch;
  @media screen and (min-width: 500px) {
    width: 385px;
  }
`;

export const Heading = styled.h1`
  text-transform: uppercase;
  letter-spacing: 8px;
  color: hsl(0, 0%, 98%);
  font-weight: 600;
  margin: 2rem 0;
`;

export const ButtonContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconButton = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
`;

export const TodoContainer = styled.div`
  width: 400px;
  padding: 10px;
  @media screen and (max-width: 401px) {
    width: 100%;
    padding: 0%;
  }
`;

export const NoItemImage = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const Input = styled(AnimatedInput)`
  width: stretch;
  background-color: ${({ islighttheme }) =>
    islighttheme === "true" ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)"};
  color: ${({ islighttheme }) =>
    islighttheme === "true" ? "hsl(235, 24%, 19%)" : "hsl(0, 0%, 98%)"};
  border: 0;
  font-size: 1rem;
  padding: 1rem 10px;
  border-radius: 5px;
  font-family: "Josefin Sans", sans-serif;
`;

export const AddButton = styled.input`
  position: absolute;
  right: 0;
  border: 0;
  background: transparent;
  font-family: "Josefin Sans", sans-serif;
  z-index: 2;
  cursor: pointer;
  font-size: 1rem;
  padding: 15px 10px;
`;

export const TodoItemContainer = styled.div`
  background-color: ${({ islighttheme }) =>
    islighttheme ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)"};
  margin: 15px 0;
  border-radius: 7px;
`;

export const TodoItems = styled.div`
  height: 260px;
  overflow-y: ${({ isScrollBarVisible }) =>
    isScrollBarVisible ? "scroll" : "hidden"};

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #000000;
  }
`;

export const TodoItem = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid hsl(233, 14%, 35%);
  padding: 12px 10px;
  position: relative;

  &:hover {
    button {
      visibility: visible;
    }
  }

  &:active {
    button {
      visibility: visible;
    }
  }
`;

export const Text = styled.label`
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ islighttheme, isCompleted }) =>
    islighttheme
      ? !isCompleted
        ? "hsl(235, 19%, 35%)"
        : "hsl(233, 11%, 84%)"
      : !isCompleted
      ? "hsl(234, 39%, 85%)"
      : "hsl(234, 11%, 52%)"};
  font-family: "Josefin Sans", sans-serif;
  font-weight: 700;
  position: absolute;
  left: 40px;
  font-size: 18px;
  text-decoration: ${({ isCompleted }) => (isCompleted ? "line-through" : "")};
`;

export const DeleteItemButton = styled.button`
  visibility: hidden;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

export const TodoFooter = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 10px;
`;

export const TodoFooterText = styled.span`
  color: hsl(233, 14%, 35%);
`;

export const TodoFooterButton = styled.button`
  color: hsl(233, 14%, 35%);
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 700;
  &:hover {
    color: hsl(234, 11%, 52%);
  }
`;

export const TodoFilterContainer = styled.div`
  background-color: ${({ islighttheme }) =>
    islighttheme ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)"};
  border-radius: 5px;
  padding: 10px 45px;
  width: stretch;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 400px) {
    width: 385px;
  }
`;

export const TodoFilterButton = styled.button`
  cursor: pointer;
  border: 0;
  font-size: 1rem;
  font-weight: 700;
  background: transparent;
  font-family: "Josefin Sans", sans-serif;

  color: ${({ currentStatus, children }) =>
    currentStatus === children ? "hsl(220, 98%, 61%)" : "hsl(233,14%,35%)"};
  &:hover {
    color: ${({ currentStatus, children }) =>
      currentStatus === children ? "hsl(220, 98%, 61%)" : "hsl(234, 11%, 52%)"};
  }
`;
