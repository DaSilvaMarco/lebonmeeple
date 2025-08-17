import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { postsSeedData } from './posts-seed-data';
import { gamesSeedData } from './games-seed-data';
import { g } from 'vitest/dist/chunks/suite.d.FvehnV49';

const prisma = new PrismaClient();

async function main() {
  faker.seed(123);

  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

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

  console.log(`Users créés : ${users.length}`);

  const usersWithoutMe = users.filter((user) => user.id !== specificUser.id);

  const posts: Awaited<ReturnType<typeof prisma.post.create>>[] = [];

  const categories = [
    'Jeux de société',
    'Jeux de cartes',
    'Jeux de rôle',
    'Jeux de figurines',
    'Autres',
  ];

  for (const article of postsSeedData) {
    const user = faker.helpers.arrayElement(usersWithoutMe);
    const category = faker.helpers.arrayElement(categories);
    const post = await prisma.post.create({
      data: {
        title: article.title,
        body: article.body,
        image: article.image,
        userId: user.id,
        category,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });
    posts.push(post);
  }

  console.log(`Posts créés : ${posts.length}`);

  // Générer des commentaires pour les posts (uniquement postId)
  for (const post of posts) {
    const nbComments = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < nbComments; i++) {
      const user = faker.helpers.arrayElement(usersWithoutMe);
      await prisma.comment.create({
        data: {
          body: faker.lorem.sentences(2),
          postId: post.id,
          gameId: null,
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any,
      });
    }
  }

  const gamesList: Awaited<ReturnType<typeof prisma.game.create>>[] = [];

  for (const game of gamesSeedData) {
    const games = await prisma.game.create({
      data: {
        name: game.name,
        year: game.year,
        rating: game.rating,
        mechanics: game.mechanics,
        image: game.image,
        minPlayers: game.minPlayers,
        maxPlayers: game.maxPlayers,
        duration: game.duration,
        difficulty: game.difficulty,
        description: faker.lorem.paragraphs(2),
      },
    });
    gamesList.push(games);
  }

  console.log(`Jeux créés : ${gamesList.length}`);

  // Générer de nouveaux commentaires pour les jeux (uniquement gameId)
  for (const game of gamesList) {
    const nbNewComments = faker.number.int({ min: 2, max: 4 });
    for (let i = 0; i < nbNewComments; i++) {
      const user = faker.helpers.arrayElement(usersWithoutMe);
      await prisma.comment.create({
        data: {
          body: `Nouveau commentaire : ${faker.lorem.sentences(2)}`,
          postId: null,
          gameId: game.id,
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any,
      });
    }
  }

  // Générer des commentaires pour les jeux (uniquement gameId)
  for (const game of gamesList) {
    const nbComments = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < nbComments; i++) {
      const user = faker.helpers.arrayElement(usersWithoutMe);
      await prisma.comment.create({
        data: {
          body: faker.lorem.sentences(2),
          postId: null,
          gameId: game.id,
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any,
      });
    }
  }
  const nbComments = await prisma.comment.count();
  console.log(`Commentaires créés : ${nbComments}`);
}

main()
  .catch((e) => {
    console.error('ERROR : ', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
