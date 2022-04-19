//import styles from "../../styles/Article.module.css";
import styled from "styled-components";
import Link from "next/link";
import { ArticleItemProps } from "../../Interfaces";
import Image from "next/image";

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

const CardItem = ({ data }: ArticleItemProps) => {
  return (
    <CardContainer>
      {/*  <Link href={`/article/${data.id}`}>
        <a>  */}
      <div className="card-body">
        <div className="image-wrapper">
          {/* Los numeros height y width son la resolucion original de la imagen */}
          <Link href={`/article/${data.id}`}>
            <a>
              <Image src={data.picture} alt="receta" height={267} width={400} />
            </a>
          </Link>
        </div>
        <Link href={`/article/${data.id}`}>
          <a>
            {" "}
            <h3 className="card-title">{data.title}</h3>
            <p className="card-excerpt">{data.excerpt}</p>
          </a>
        </Link>
      </div>
      <div className="btn-wrapper">
        <Link href={`/article/${data.id}`}>
          <a>
            <button className="card-btn">Ver Receta</button>
          </a>
        </Link>
      </div>
    </CardContainer>
  );
};

export default CardItem;
