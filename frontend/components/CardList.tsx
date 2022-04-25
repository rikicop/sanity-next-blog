//import { IndexPageProps } from "../Interfaces";
//import styles from "../styles/Card.module.css";
import CardItem from "./CardItem";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 16rem));
  gap: 2rem;
  justify-content: center;
`;

/* 
Pendiente

export default function Home({ posts }: IndexPageProps) { 
  
*/

const CardList = ({ data }: any) => {
  return (
    <Wrapper>
      {data.map((article: any, index: any) => (
        <CardItem data={article} key={index} />
      ))}
    </Wrapper>
  );
};

export default CardList;
