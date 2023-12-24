import { User } from '../entities/user.entity';
import { IsString, Length, IsNotEmpty } from 'class-validator';

export type GetUsersResponseDto = User[];

export class AddUserRequestDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 256)
  name: string;
}

export type AddUserResponseDto = User;

export class AddHeadRequestDto {
  @IsString()
  managerId: string;

  @IsString()
  subordinateId: string;
}

export type AddHeadResponseDto = Record<string, never>;

export type DeleteUserResponseDto = Record<string, never>;
