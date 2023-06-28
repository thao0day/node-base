// import { readFileSync } from 'fs';
// import * as yaml from 'js-yaml';
// import { join } from 'path';
// import { ConfigModule } from '@nestjs/config';
// ConfigModule.forRoot({
//   isGlobal: true,
// });

// const YAML_CONFIG = process.env.CONFIG_PATH
//   ? join(process.cwd(), '../', process.env.CONFIG_PATH || '', 'user.yaml')
//   : join(__dirname, 'user.yaml');

export default () => {
  return {
    grpc: {
      host: process.env.USER_SVC_GRPC_HOST || '0.0.0.0',
      port: parseInt(process.env.USER_SVC_GRPC_PORT, 10) || 50053,
    },
    db: {
      type: process.env.USER_SVC_DB_TYPE as any,
      host: process.env.USER_SVC_DB_HOST,
      port: parseInt(process.env.USER_SVC_DB_PORT, 10) || 5432,
      database: process.env.USER_SVC_DB_DATABASE,
      username: process.env.USER_SVC_DB_NAME,
      password: process.env.USER_SVC_DB_PASSWORD,
      ssl: process.env.USER_SVC_DB_SSL === 'true',
      synchronize: process.env.USER_SVC_DB_SYNCHRONIZE === 'true',
      logging: process.env.USER_SVC_DB_LOGGING === 'true', // ['error', 'warn']
      autoLoadEntities: true,
    },
  };
};
