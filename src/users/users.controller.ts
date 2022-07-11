import { Controller, Post, Body, Get, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './schema/user.schema';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly sendGridService: SendgridService,
  ) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
    description: 'return a new user',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
