export class CreateUserDto {
  firstName: string;
  secondName: string;
  password: string;
  birthDate: string;
  email: string;
  phone?: string;
  telegramLink?: string;
  status?: string;
  avaUrl?: string;
  bannerUrl?: string;
}
