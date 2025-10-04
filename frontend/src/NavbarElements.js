// components/Navbar/navbarElements.js
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// === Animations ===
const slideDown = keyframes`
  0% { transform: translateY(-100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

// === Navbar Container ===
export const Nav = styled.nav`
  background: #2c0213ff;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 12;
  position: relative;
`;

// === Navbar Links ===
export const NavLink = styled(Link)`
  color: #ffffff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  transition: color 0.3s ease;

  &:hover {
    color: #ffbb33;
  }

  &.active {
    color: #ffbb33;
    font-weight: 700;
  }
`;

// === Hamburger Icon ===
export const Bars = styled(FaBars)`
  display: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.8rem;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

// === Desktop Menu ===
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// === Button Container ===
export const NavBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// === Navbar Buttons / Links ===
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #ffffff;
  padding: 10px 20px;
  color: #2c0213ff;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ffbb33;
    color: #000;
  }
`;

// === Mobile Menu ===
export const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #2c0213ff;
  position: absolute;
  top: 85px;
  left: 0;
  width: 100%;
  animation: ${slideDown} 0.3s ease forwards;
  padding: 20px 0;
  z-index: 11;

  ${NavLink}, ${NavBtnLink} {
    margin: 10px 0;
    font-size: 18px;
    text-align: center;
  }
`;
