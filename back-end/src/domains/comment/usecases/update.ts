import { Request } from "express";
import { UpdateCommentDto } from "../dtos";
import { PrismaService } from "src/prisma/prisma.service";

export const updateComment = async (id: number, updateCommentDto: UpdateCommentDto, prismaService: PrismaService)=> {
  const { body } = updateCommentDto;

  return await prismaService.comment.update({
    where: { id },
    data: {
      body,
    },
  });
};