import { Module } from '@nestjs/common';
import { UserModule } from "@biz/user/user.module";

@Module({
    imports: [
        UserModule
    ],
})
export class ApiModule {}