import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import {
  CreateUserRequest,
  CreateUserResponse,
  USER_SERVICE_NAME,
  UserServiceClient,
} from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('users')
export class UserController implements OnModuleInit {
  private svc: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @Post()
  private async createUser(
    @Body() body: CreateUserRequest,
  ): Promise<Observable<CreateUserResponse>> {
    return this.svc.createUser(body);
  }
}
