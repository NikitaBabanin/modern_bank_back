import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AbstractConfigService } from './abstract-config.service';

@Injectable()
export class TypeOrmConfigService
  extends AbstractConfigService
  implements TypeOrmOptionsFactory
{
  constructor(configService: ConfigService) {
    super(configService);
  }

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    this.ensureValues([
      'POSTGRES_HOST',
      'POSTGRES_PORT',
      'POSTGRES_USER',
      'POSTGRES_DB',
      'POSTGRES_PASSWORD',
    ]);

    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DB'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrations: ['dist/**/migrations/*{.ts,.js}'],
      synchronize: false,
      migrationsRun: true,
      ssl: false,
      logging: ['error', 'warn'],
    };
  }
}
