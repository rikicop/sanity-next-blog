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
      height: 220px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(95%);
      }
    }
    .card-info {
      .card-title {
        margin: 1rem;
      }
      .card-excerpt {
        padding: 0 1rem;
      }
    }
  }
  .btn-wrapper {
    display: flex;
    justify-content: left;
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

export default function Home({ posts: posts, authors: authors }: any) {
  const router = useRouter();
  const [mappedPosts, setMappedPosts] = useState([]);
  const [mappedAuthors, setMappedAuthors] = useState([]);

  console.log("mappedPosts: ", mappedPosts);
  console.log("mappedAuthors: ", mappedAuthors);

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

  useEffect(() => {
    if (authors.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: "pxz77rs4",
        dataset: "production",
      });
      setMappedAuthors(
        authors.map((p: any) => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.personalImage).width(500).height(250),
          };
        })
      );
    } else {
      setMappedPosts([]);
    }
  }, [authors, posts, mappedAuthors]);

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
                  <div className="card-info">
                    <h3 className="card-title">{p.title}</h3>
                    <p className="card-excerpt">{p?.excerpt}</p>
                  </div>
                </div>
                {authors.map((a: any, index: any) => (
                  <div key={index}>
                    <h3>{a.name}</h3>
                    <img src={a.personalImage} alt={a.name} />
                  </div>
                ))}

                {/*   {authors
                  .filter((a: any) => a._id === p.author._ref)
                  .map((a: any, index: any) => (
                    <div key={index}>
                      {a.name}
                      <img src={a.personalImage} alt={a.name} />
                    </div>
                  ))} */}
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
  const queryAuthor = encodeURIComponent('*[ _type == "author"]');
  const url = `https://pxz77rs4.api.sanity.io/v1/data/query/production?query=${query}`;
  const urlAuthor = `https://pxz77rs4.api.sanity.io/v1/data/query/production?query=${queryAuthor}`;
  const result = await fetch(url).then((res) => res.json());
  const resultAuthor = await fetch(urlAuthor).then((res) => res.json());

  if (
    !result.result ||
    !result.result.length ||
    !resultAuthor.result ||
    !resultAuthor.result.length
  ) {
    return {
      props: {
        posts: [],
        authors: [],
      },
    };
  } else {
    return {
      props: {
        posts: result.result,
        authors: resultAuthor.result,
      },
    };
  }
};
