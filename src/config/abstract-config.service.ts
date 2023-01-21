import { ConfigService } from '@nestjs/config';

export abstract class AbstractConfigService {
  configService: ConfigService;
  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  getValue(key: string, throwOnMissing = true): string {
    const value = this.configService.get(key);
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }
}
