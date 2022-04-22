import imageUrlBuilder from "@sanity/image-url";
import { useState, useEffect } from "react";
//import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import CardList from "../components/CardList";

export default function Home({ posts: posts }: any) {
  //const router = useRouter();
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
        <div>
          {mappedPosts.length ? (
            <CardList data={mappedPosts} />
          ) : (
            <>No Posts Yet</>
          )}
        </div>
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
