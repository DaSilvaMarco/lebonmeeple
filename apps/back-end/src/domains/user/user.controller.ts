import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { IsOwner } from '@backend/decorator/is-owner-or-admin.decorator';
import { SignupUserDto } from './dtos/signup-user-dto';
import { SigninUserDto } from './dtos/signin-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user/signup')
  signup(@Body() signupDto: SignupUserDto) {
    return this.userService.signup(signupDto);
  }

  @Post('user/signin')
  signin(@Body() signinDto: SigninUserDto) {
    return this.userService.signin(signinDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get('user/me')
  me(@Req() request: Request) {
    return this.userService.me(request);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get('user/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  @IsOwner()
  @Patch('user/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateDto);
  }
}
