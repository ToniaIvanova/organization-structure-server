import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [],
})
export class CoreModule {}
