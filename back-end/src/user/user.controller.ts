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
import { UserService } from './user.service';
import { SignupDto } from './dtos/SignupDto';
import { SigninDto } from './dtos/SigninDto';
import { UpdateDto } from './dtos/UpdateDto';
import { AuthGuard } from '@nestjs/passport';
import { IsOwner } from './decorator/is-owner.decorator';
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.userService.signup(signupDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.userService.signin(signinDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get('me')
  getMe(@Req() request: Request) {
    return this.userService.getMe(request);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get('get/:id')
  get(@Param('id', ParseIntPipe) postId: number) {
    return this.userService.get(postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @IsOwner()
  @Patch('patch/:id')
  patchUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateDto: UpdateDto,
  ) {
    return this.userService.update(userId, updateDto);
  }
}
