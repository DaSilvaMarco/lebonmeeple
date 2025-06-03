import { PrismaService } from 'src/prisma/prisma.service';

export const deletePost = async (
  id: number,
  prismaService: PrismaService,
) => {
  await prismaService.post.delete({ where: { id } });
  return 'Post deleted !';
};
