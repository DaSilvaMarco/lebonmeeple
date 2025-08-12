import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { seedData } from './seed-data';

const prisma = new PrismaClient();

async function main() {
  faker.seed(123);

  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // ...existing code...

  // Création des utilisateurs
  const specificUser = await prisma.user.create({
    data: {
      username: 'Coquinho',
      email: 'tdasilva.marco@gmail.com',
      password: await bcrypt.hash('pouetpouet', 10),
      avatar: faker.image.avatar(),
      roles: ['USER', 'ADMIN'],
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
        roles: ['USER'],
      },
    });
    users.push(user);
  }

  // Création des posts à partir de seedData
  const posts: Awaited<ReturnType<typeof prisma.post.create>>[] = [];
  for (const article of seedData) {
    const user = faker.helpers.arrayElement(users);
    const post = await prisma.post.create({
      data: {
        title: article.title,
        body: article.body,
        image: article.image,
        userId: user.id,
      },
    });
    posts.push(post);
  }

  // Ajout de commentaires aléatoires pour chaque post
  for (const post of posts) {
    const nbComments = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < nbComments; i++) {
      const user = faker.helpers.arrayElement(users);
      await prisma.comment.create({
        data: {
          body: faker.lorem.sentences(2),
          postId: post.id,
          userId: user.id,
        },
      });
    }
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
