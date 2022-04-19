import { articles } from "../../../data";

export default function handler({ query: { id } }, res) {
  const filtered = articles.filter((art) => art.id === id);
  if (filtered.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res.status(404).json({ message: `Article with ${id} not found` });
  }
}
