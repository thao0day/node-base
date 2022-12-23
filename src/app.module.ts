import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// @ts-ignore
import * as Joi from "@hapi/joi";
// @ts-ignore
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({
            database: "", driver: undefined, location: "", region: "", resourceArn: "", secretArn: "", type: undefined,
            validationSchema: Joi.object({
                DATABASE_HOST: Joi.required().default('server-mongodb'),
                DATABASE_PORT: Joi.number().default(27017),
            })
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mongodb',
                host: configService.get('DATABASE_HOST'),
                port: +configService.get<number>('DATABASE_PORT'),
                username: configService.get('DATABASE_USER'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE_NAME'),
                autoLoadEntities: true,
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {}