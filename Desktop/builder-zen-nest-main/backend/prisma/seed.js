import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: passwordHash,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  const products = [
    { name: 'Starter Plan', description: 'Basic access', priceCents: 9900, imageUrl: null },
    { name: 'Pro Plan', description: 'Advanced features', priceCents: 19900, imageUrl: null },
    { name: 'Enterprise Plan', description: 'Full suite', priceCents: 49900, imageUrl: null },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { name: p.name },
      update: { description: p.description, priceCents: p.priceCents, imageUrl: p.imageUrl },
      create: p,
    });
  }

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });





