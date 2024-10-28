import { IsNotEmpty, IsString } from 'class-validator';

//말그대로 DTO로 사용하면 됨.
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}
