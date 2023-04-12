import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateUserRequest } from './user.pb';

export class CreateUserRequestDto implements CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  authId: string;
}
