export type Category =
  | "All"
  | "Development"
  | "Design"
  | "Marketing"
  | "Productivity"
  | "Learning";

export interface Website {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  category: Category;
}