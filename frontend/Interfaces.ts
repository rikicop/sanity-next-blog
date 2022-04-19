export interface IndexPageProps {
  data: {
    userId: number;
    id: number;
    title: string;
    body: string;
    excerpt: string;
  }[];
}

export interface ArticleProps {
  article: {
    userId: number;
    author: string;
    id: number;
    title: string;
    picture?: string | any;
    youtubeID?: string | any;
    body: string;
    excerpt: string;
    date: string;
  };
}

export interface ArticleItemProps {
  data: {
    id: number;
    title: string;
    picture?: string | any;
    body: string;
    excerpt: string;
  };
}
