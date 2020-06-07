import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from '../typeorm-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from 'src/users/users.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
