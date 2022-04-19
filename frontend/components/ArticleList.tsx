import { IndexPageProps } from "../Interfaces";
import styles from "../styles/Article.module.css";
import ArticleItem from "./ArticleItem";

const ArticleList = ({ data }: IndexPageProps) => {
  return (
    <div className={styles.grid}>
      {data.map((article) => (
        <ArticleItem data={article} />
      ))}
    </div>
  );
};

export default ArticleList;
