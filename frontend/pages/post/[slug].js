import styled from "styled-components";
import imageUrlBuilder from "@sanity/image-url";
import SanityBlockContent from "@sanity/block-content-to-react";
import { useState, useEffect } from "react";

const Section = styled.section`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
  overflow: hidden;
  position: relative;
  max-width: calc(100vw - 50px);

  .title {
    align-self: center;
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .date {
    font-size: 0.8rem;
    margin: 0.5rem;
    align-self: flex-start;
  }

  .mainImage {
    width: 100%;
  }
  .body {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    line-height: 1.5;
    img {
      margin-top: 20px;
    }
    em {
      color: red;
    }
  }
  .video-responsive {
    overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
    height: 0;
    Iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

const Post = ({ title, body, image }) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: "pxz77rs4",
      dataset: "production",
    });

    setImageUrl(imgBuilder.image(image));
  }, [image]);

  return (
    <Section>
      <h1 className="title">{title}</h1>
      {imageUrl && <img className="mainImage" src={imageUrl} alt={title} />}
      <div className="body">
        <SanityBlockContent
          blocks={body}
          imageOptions={{
            w: 320,
            h: 240,
            fit: "max",
            mt: "20px",
          }}
          projectId="pxz77rs4"
          dataset="production"
        ></SanityBlockContent>
      </div>
    </Section>
  );
};

export const getServerSideProps = async (ctx) => {
  const pageSlug = ctx.query.slug;

  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

  const query = encodeURIComponent(
    `*[ _type == "post" && slug.current == "${pageSlug}" ]`
  );
  const url = `https://pxz77rs4.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());
  const post = result.result[0];

  if (!post) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        body: post.body,
        title: post.title,
        image: post.mainImage,
      },
    };
  }
};

export default Post;
