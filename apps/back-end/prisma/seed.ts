import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  faker.seed(123);

  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const landscapeImages = [
    'https://picsum.photos/600/300?random=1',
    'https://picsum.photos/600/300?random=2',
    'https://picsum.photos/600/300?random=3',
    'https://picsum.photos/600/300?random=4',
    'https://picsum.photos/600/300?random=5',
    'https://picsum.photos/600/300?random=6',
    'https://picsum.photos/600/300?random=7',
    'https://picsum.photos/600/300?random=8',
    'https://picsum.photos/600/300?random=9',
    'https://picsum.photos/600/300?random=10',
  ];

  const specificUser = await prisma.user.create({
    data: {
      username: 'Coquinho',
      email: 'tdasilva.marco@gmail.com',
      password: await bcrypt.hash('pouetpouet', 10),
      avatar: faker.image.avatar(),
    },
  });

  const users = [specificUser];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 12 }),
        avatar: faker.image.avatar(),
      },
    });
    users.push(user);
  }

  const posts = [];
  for (let i = 0; i < 10; i++) {
    const user = faker.helpers.arrayElement(users);

    const post = await prisma.post.create({
      data: {
        title: faker.lorem.sentence(6),
        body: faker.lorem.paragraphs(2),
        image: faker.helpers.arrayElement(landscapeImages),
        userId: user.id,
      },
    });
    posts.push(post);
  }

  for (let i = 0; i < 20; i++) {
    const user = faker.helpers.arrayElement(users);
    const post = faker.helpers.arrayElement(posts);

    await prisma.comment.create({
      data: {
        body: faker.lorem.sentences(2),
        postId: post.id,
        userId: user.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error('ERROR : ', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
