import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { SignupDto } from './dtos/SignupDto';
import { SigninDto } from './dtos/SigninDto';
import { UpdateDto } from './dtos/UpdateDto';
@ApiTags('Auth')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.userService.create(signupDto);
  }

  @Get('get/:id')
  get(@Param('id', ParseIntPipe) postId: number) {
    return this.userService.get(postId);
  }

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.userService.login(signinDto);
  }

  @ApiBearerAuth()
  @Patch('patch/:id')
  patchUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateDto: UpdateDto,
  ) {
    return this.userService.update(userId, updateDto);
  }
}
