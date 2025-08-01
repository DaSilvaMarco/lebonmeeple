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
import { SignupDto, SigninDto, UpdateDto } from './dtos';
import { IsOwner } from '@decorator/is-owner.decorator';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user/signup')
  signup(@Body() signupDto: SignupDto) {
    return this.userService.signup(signupDto);
  }

  @Post('user/signin')
  signin(@Body() signinDto: SigninDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateDto) {
    return this.userService.update(id, updateDto);
  }
}
