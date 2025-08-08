import { type PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { type UpdateDto } from '../dtos/update';

export const updateUser = async (
  id: number,
  updateDto: UpdateDto,
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
