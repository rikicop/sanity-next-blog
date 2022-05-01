import imageUrlBuilder from "@sanity/image-url";
import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 16rem));
  gap: 2rem;
  justify-content: center;
`;

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
        height: 100%;
        width: 100%;
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

export default function Home({ posts: posts }: any) {
  const router = useRouter();
  const [mappedPosts, setMappedPosts] = useState([]);

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: "pxz77rs4",
        dataset: "production",
      });

      setMappedPosts(
        posts.map((p: any) => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          };
        })
      );
    } else {
      setMappedPosts([]);
    }
  }, [posts]);

  return (
    <div>
      <div>
        <h1>Bienvenido a mi Blog</h1>
        <h3>Recent Posts:</h3>
        <CardList>
          {mappedPosts.length ? (
            mappedPosts.map((p: any, index: any) => (
              <CardContainer key={index}>
                <div className="card-body">
                  <div
                    className="image-wrapper"
                    onClick={() => router.push(`/post/${p.slug.current}`)}
                  >
                    <img src={p.mainImage} alt={p.title} />
                  </div>
                  <h3 className="card-title">{p.title}</h3>
                  <p className="card-excerpt">{p?.excerpt}</p>
                </div>
                <div
                  className="btn-wrapper"
                  onClick={() => router.push(`/post/${p.slug.current}`)}
                >
                  <button className="card-btn">Ver Artículo</button>
                </div>
              </CardContainer>
            ))
          ) : (
            <>No Posts Yet</>
          )}
        </CardList>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const query = encodeURIComponent('*[ _type == "post" ]');
  const url = `https://pxz77rs4.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
      },
    };
  } else {
    return {
      props: {
        posts: result.result,
      },
    };
  }
};
