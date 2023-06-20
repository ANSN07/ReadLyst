export interface Book {
  id?: string;
  status: string;
  author: Array<string>;
  title: string;
  isbn: string;
  pageCount: string;
  favourite?: boolean;
}
