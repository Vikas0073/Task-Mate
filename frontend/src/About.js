import React from "react";
import styled from "styled-components";
import community from './community.png'; // adjust path as needed

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const Heading = styled.h1`
  color: #2c0213ff;
  margin-bottom: 20px;
  font-size: 36px;
  text-align: center;
`;

const Paragraph = styled.p`
  max-width: 800px;
  text-align: center;
  font-size: 18px;
  color: #333;
  line-height: 1.6;
`;

const Image = styled.img`
  margin-top: 40px;
  width: 400px;
  max-width: 90%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
`;

const About = () => {
  return (
    <AboutContainer>
      <Heading>About Local Community Helper</Heading>
      <Paragraph>
        Local Community Helper is a platform designed to connect people in need with reliable local helpers. 
        Whether you need assistance with daily chores, maintenance, or specialized services, our app allows 
        users to find trusted workers in their area quickly and easily.  

        Our mission is to simplify community support, create opportunities for local workers, and build a 
        safer, more connected neighborhood. By using Local Community Helper, you can browse workers, check 
        their skills, and even view their profiles with photos and experience details.
      </Paragraph>
     <Image src={community} alt="Community Helpers" />
   </AboutContainer>
  );
};

export default About;
