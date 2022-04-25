//import styles from "../../styles/Article.module.css";
import styled from "styled-components";
//import Link from "next/link";
//import { ArticleItemProps } from "../../Interfaces";
//import Image from "next/image";

const CardContainer = styled.div`
  overflow: hidden;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-bottom: 1rem;
  &:hover {
    transform: scale(1.03);
  }
  &:hover .btn-wrapper .card-btn {
    background: #c22222;
    color: #fff;
  }

  .card-body {
    .image-wrapper {
      img {
        object-fit: cover;
        filter: brightness(95%);
      }
    }
    .card-title {
      margin: 1rem;
    }
    .card-excerpt {
      padding: 0 1rem;
    }
  }
  .btn-wrapper {
    display: flex;
    justify-content: center;
    .card-btn {
      padding: 1rem;
      font-family: inherit;
      font-weight: bold;
      font-size: 1rem;
      margin: 1rem;
      border: 2px solid #c22222;
      background: transparent;
      color: #c22222;
      border-radius: 0.3rem;
      transition: 0.5s ease;
      cursor: pointer;
    }
  }
`;

const CardItem = ({ data }: any) => {
  return (
    <CardContainer>
      <h3 className="card-title">{data.title}</h3>
    </CardContainer>
  );
};

export default CardItem;
