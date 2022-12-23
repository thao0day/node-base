import { Controller, Get } from '@nestjs/common';
import { UserService } from '@biz/user/user.service';
import { User } from "@biz/user/user.entity";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
