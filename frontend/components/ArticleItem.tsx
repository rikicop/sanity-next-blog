import styles from "../styles/Article.module.css";
import Link from "next/link";
import { ArticleItemProps } from "../Interfaces";

const ArticleItem = ({ data }: ArticleItemProps) => {
  return (
    <Link href={`/article/${data.id}`}>
      <a className={styles.card}>
        <h3>{data.title} &rarr;</h3>
        <p>{data.excerpt}</p>
      </a>
    </Link>
  );
};

export default ArticleItem;
