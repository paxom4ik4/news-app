export default interface INewsItem {
  isHidenByAuthor: boolean;
  title: string;
  subtitle: string;
  text: string;
  imgUrl: string;
  isDeleted: boolean;
  group: string;
  isActive: boolean;
  id: number;
  publishedDate: string;
  publishedDateNumber: string;
  author: string;
}
