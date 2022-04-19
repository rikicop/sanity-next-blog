import { IndexPageProps } from "../Interfaces";
//import styles from "../styles/Card.module.css";
import CardItem from "../components/CardItem.tsx";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 16rem));
  gap: 2rem;
  justify-content: center;
`;

const CardList = ({ data }: IndexPageProps) => {
  return (
    <Wrapper>
      {data.map((article, index) => (
        <CardItem data={article} key={index} />
      ))}
    </Wrapper>
  );
};

export default CardList;
