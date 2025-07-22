import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { vi } from 'vitest';

export const prismaMock = (id: number) =>
  ({
    post: {
      findUnique: vi.fn().mockResolvedValue({
        id,
        title: 'Sample Post Title',
        body: 'Sample post body content',
        userId: 1,
        image: 'sample.jpg',
        comments: [
          {
            id: 1,
            body: 'First comment',
            updatedAt: new Date(),
          },
          {
            id: 2,
            body: 'Second comment',
            updatedAt: new Date(),
          },
        ],
        user: {
          id: 1,
          avatar: 'http://example.com/avatar.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          email: 'test@gmail.com',
          username: 'testuser',
        },
      }),
    },
  }) as unknown as PrismaService;
