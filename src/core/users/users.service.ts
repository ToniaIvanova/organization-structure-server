import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  GetUsersResponseDto,
  AddUserRequestDto,
  AddUserResponseDto,
  AddHeadRequestDto,
  AddHeadResponseDto,
  DeleteUserResponseDto,
} from './users.dto';

import { User } from '../entities/user.entity';
import 'dotenv/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private isCircularReference(
    manager: User,
    subordinate: User,
    allUsers: User[],
  ): boolean {
    if (!manager || !subordinate) {
      return false;
    }

    let currentManager = manager;
    while (currentManager) {
      if (currentManager.id === subordinate.id) {
        return true; // Circular reference detected
      }
      if (currentManager.manager) {
        currentManager = allUsers.find(
          ({ id }) => id === currentManager.manager.id,
        );
      } else {
        currentManager = null;
      }
    }

    return false;
  }

  async getUsers(): Promise<GetUsersResponseDto> {
    return this.usersRepository.find({
      relations: { manager: true, subordinates: true },
    });
  }

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: { manager: true, subordinates: true },
    });
  }

  async addUser(body: AddUserRequestDto): Promise<AddUserResponseDto> {
    try {
      return this.usersRepository.save(body);
    } catch (error: unknown) {
      throw new BadRequestException({
        message: error,
      });
    }
  }

  async addHead({
    managerId,
    subordinateId,
  }: AddHeadRequestDto): Promise<AddHeadResponseDto> {
    if (managerId === subordinateId) {
      throw new BadRequestException({
        message: "User can't be the manager for themselves",
      });
    }

    const allUsers = await this.getUsers();

    const subordinate = allUsers.find(({ id }) => id === subordinateId);

    const manager = allUsers.find(({ id }) => id === managerId);

    if (!subordinate || !manager) {
      throw new BadRequestException({ message: "User doesn't exist" });
    }

    if (this.isCircularReference(manager, subordinate, allUsers)) {
      throw new BadRequestException({
        message: 'Circular reference detected. Manager assignment not allowed',
      });
    }

    await this.usersRepository.update({ id: subordinateId }, { manager });

    return {};
  }

  async deleteUser(userId: string): Promise<DeleteUserResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new BadRequestException({ message: "User doesn't exist" });
    }
    await this.usersRepository.delete(userId);
    return {};
  }
}
