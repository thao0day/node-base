// import { readFileSync } from 'fs';
// import * as yaml from 'js-yaml';
// import { join } from 'path';
// import { ConfigModule } from '@nestjs/config';

// ConfigModule.forRoot({
//   isGlobal: true,
// });

// const YAML_CONFIG = process.env.CONFIG_PATH
//   ? join(process.cwd(), '../', process.env.CONFIG_PATH || '', 'api.yaml')
//   : join(__dirname, 'api.yaml');

export default () => {
  return {
    http: {
      host: process.env.API_HTTP_HOST || '0.0.0.0',
      port: parseInt(process.env.API_HTTP_PORT, 10) || 3000,
    },
    services: {
      user: {
        host: process.env.USER_SVC_GRPC_HOST || '0.0.0.0',
        port: parseInt(process.env.USER_SVC_GRPC_PORT, 10) || 50053,
      },
    },
  };
};

// return yaml.load(readFileSync(YAML_CONFIG, 'utf8')) as Record<string, any>;
