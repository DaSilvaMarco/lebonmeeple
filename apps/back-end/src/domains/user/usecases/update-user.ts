import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { UpdateUserDto } from '../dtos/update-user-dto';

export const updateUser = async (
  id: number,
  updateDto: UpdateUserDto,
  prismaService: PrismaService,
) => {
  const { username, email, avatar } = updateDto;

  const user = await prismaService.user.update({
    where: { id },
    data: { username, email, avatar: avatar === null ? '' : avatar },
  });

  return {
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  };
};
