import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from './user/user.module';
import configuration from '../config/configuation';

const config = configuration();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.db.type,
      host: config.db.host,
      port: config.db.port,
      database: config.db.database,
      username: config.db.username,
      password: config.db.password,
      entities: ['dist/**/*.entity.{ts,js}'],
      ssl: config.db.ssl,
      synchronize: config.db.synchronize, // never true in production!
    }),
    // UserModule,
  ],
})
export class AppModule {}
