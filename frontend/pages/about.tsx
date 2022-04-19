import styled from "styled-components";
import Meta from "../components/Meta";

const Hero = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

const Heading = styled.h1`
  color: #000;
  font-size: 10rem;
  font-weight: 900;
`;

export default function About() {
  return (
    <>
      <Hero>
        <Meta title="about" />
        <Heading>ABOUT</Heading>
      </Hero>
    </>
  );
}
