import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minSymbols: 1
  })
  password: string;
}