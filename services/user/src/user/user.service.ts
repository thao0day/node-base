import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequestDto } from './user.dto';
import { CreateUserResponse } from './user.pb';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async createUser(
    payload: CreateUserRequestDto,
  ): Promise<CreateUserResponse> {
    const user: User = new User();

    user.name = payload.name;
    user.email = payload.email;

    await this.repository.save(user);

    return {
      id: user.id,
      error: null,
      status: HttpStatus.OK,
    };
  }
}
