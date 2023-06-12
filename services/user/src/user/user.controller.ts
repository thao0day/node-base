import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserResponse, USER_SERVICE_NAME, User } from './user.pb';
import { CreateUserRequestDto, FindOneRequestDto } from './user.dto';

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

  @GrpcMethod(USER_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindOneRequestDto): Promise<User> {
    return this.service.getUser(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'FindMany')
  private findMany(payload: Observable<FindOneRequestDto>): Observable<User> {
    return this.service.findMany(payload);
  }
}
