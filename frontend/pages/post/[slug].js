import styled from "styled-components";
import imageUrlBuilder from "@sanity/image-url";
import SanityBlockContent from "@sanity/block-content-to-react";
import { useState, useEffect } from "react";
import { Form } from "../../components/Form";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";

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

const formContainer = {
  display: "flex",
  justifyContent: "center",
};

const commentsContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignItems: "left",
  marginTop: "1rem",
  marginRight: "5%",
  marginBottom: "1rem",
  marginLeft: "5%",
  padding: "1rem",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const Post = ({ post }) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: "pxz77rs4",
      dataset: "production",
    });

    setImageUrl(imgBuilder.image(post.coverImage));
  }, [post.coverImage]);

  console.log("image: ", post.coverImage);
  console.log("imageUrl: ", imageUrl);

  const fecha = new Date(post.publishedAt).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Section>
      <h1 className="title">{post.title}</h1>
      {imageUrl && (
        <img className="mainImage" src={imageUrl} alt={post.title} />
      )}

      <h5 className="date">{post.fecha}</h5>
      <div className="body">
        <SanityBlockContent
          blocks={post.body}
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
      <div style={formContainer}>
        <Form _id={post._id} />
      </div>
      {/* {JSON.stringify(post.comments)} */}
      <div style={commentsContainer}>
        <h3>Comentarios</h3>
        <hr
          style={{
            border: "0",
            background: "#333",
            height: "1px",
            backgroundImage: "linear-gradient(to right, #ccc, #333, #ccc)",
          }}
        />
        {post.comments.map((comment, index) => (
          <div key={index}>
            <h3>{comment.name}</h3>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);
  return {
    props: {
      preview,
      post: data?.post || null,
      morePosts: data?.morePosts || null,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths:
      allPosts?.map((post) => ({
        params: {
          slug: post.slug,
        },
      })) || [],
    fallback: true,
  };
}

export default Post;
