import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current logged in user' })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Get single user details' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update single user' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete single user' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
