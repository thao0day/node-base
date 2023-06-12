import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateUserRequest, UserById } from './user.pb';

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

export class FindOneRequestDto implements UserById {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;
}
