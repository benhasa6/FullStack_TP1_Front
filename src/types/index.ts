export interface Category {
  _id: string;
  name: string;
  creationDate: string;
  isRoot: boolean;
  children: Category[];
  parent: Category | null;
}