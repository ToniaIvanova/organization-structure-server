import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  GetUsersResponseDto,
  AddUserRequestDto,
  AddUserResponseDto,
  AddHeadRequestDto,
  AddHeadResponseDto,
  DeleteUserResponseDto,
} from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getUsers(): Promise<GetUsersResponseDto> {
    return this.usersService.getUsers();
  }

  @Post()
  async addUser(@Body() body: AddUserRequestDto): Promise<AddUserResponseDto> {
    return this.usersService.addUser(body);
  }

  @Put('manager')
  async addHead(@Body() body: AddHeadRequestDto): Promise<AddHeadResponseDto> {
    return this.usersService.addHead(body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<DeleteUserResponseDto> {
    return this.usersService.deleteUser(id);
  }
}
