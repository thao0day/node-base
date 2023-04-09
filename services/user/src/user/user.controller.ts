import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserResponse, USER_SERVICE_NAME } from './user.pb';
import { CreateUserRequestDto } from './user.dto';

@Controller()
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @GrpcMethod(USER_SERVICE_NAME, 'CreateUser')
  private createUser(
    payload: CreateUserRequestDto,
  ): Promise<CreateUserResponse> {
    return this.service.createUser(payload);
  }
}
