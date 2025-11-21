export interface ResponseUserDto {
  id: number;
  firstName: string;
  secondName: string;
  telegramLink: string;
  status: string;
  email: string;
  avaUrl: string;
  bannerUrl: string;

  phone?: string | null;
  birthDate?: string | null;

  tweetsIds: number[];
  followingIds: number[];
  followerIds: number[];
}
