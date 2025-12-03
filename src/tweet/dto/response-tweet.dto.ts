export interface ResponseTweetDto {
  id: number;
  userId: number;
  textContent: string;
  createdAt: string;
  image?: string | null;
}
