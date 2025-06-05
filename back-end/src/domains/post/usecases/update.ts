import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePostDto } from '../dtos';

export const updatePost = async (
  id: number,
  request: Request,
  updatePostDto: UpdatePostDto,
  prismaService: PrismaService,
): Promise<string> => {
  const userId = request.user['userId'];
  
  await prismaService.post.update({
    where: { id, userId },
    data: { ...updatePostDto },
  });

  return 'Post updated !';
};
