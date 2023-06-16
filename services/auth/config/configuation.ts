import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot({
  isGlobal: true,
});

const YAML_CONFIG = process.env.CONFIG_PATH
  ? join(process.cwd(), '../', process.env.CONFIG_PATH || '', 'api.yaml')
  : join(__dirname, 'auth.yaml');

export default () => {
  return yaml.load(readFileSync(YAML_CONFIG, 'utf8')) as Record<string, any>;
};
