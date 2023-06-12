import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequestDto, FindOneRequestDto } from './user.dto';
import { CreateUserResponse } from './user.pb';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  /**
   * Creates a new user in the database based on the given payload.
   * @param payload - The data needed to create the user.
   * @returns A Promise that resolves to a CreateUserResponse object.
   *          This object contains the new user's ID, an error (if any),
   *          and an HTTP status code.
   */
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

  public async getUser(id: FindOneRequestDto): Promise<User> {
    return this.repository.findOne(id);
  }
}
