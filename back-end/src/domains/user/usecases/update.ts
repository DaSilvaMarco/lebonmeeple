import { UpdateDto } from '../dtos/update';
import { PrismaService } from 'src/prisma/prisma.service';

export const updateUser = async (
  id: number,
  updateDto: UpdateDto,
  prismaService: PrismaService
) => {
  const { username, email, avatar } = updateDto;

  const user = await prismaService.user.update({
    where: { id },
    data: { username, email, avatar },
  });

  return {
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  };
};
