import { GetStaticProps } from "next";
import styled from "styled-components";
//import ArticleList from "../components/ArticleList";
import CardList from "../components/CardList";
import { server } from "../config";
import { IndexPageProps } from "../Interfaces";

const Hero = styled.div`
  height: 30vh;
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

export default function Home({ data }: IndexPageProps) {
  //console.log(data);
  return (
    <>
      <Hero>
        <Heading>NEXT</Heading>
      </Hero>
      <CardList data={data} />
    </>
  );
}

//getStaticProps
// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch(
//     "https://jsonplaceholder.typicode.com/posts?_limit=8"
//   );
//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// };

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${server}/api/articles`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
