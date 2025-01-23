import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Crear roles
  const adminRole = await prisma.roles.create({
    data: {
      roleName: 'ADMIN',
    },
  });

  const userRole = await prisma.roles.create({
    data: {
      roleName: 'USER',
    },
  });

  // Crear usuario con contraseña encriptada
  const password = 'luis123';
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await prisma.users.create({
    data: {
      name: 'Luis Tinoco',
      email: 'latinoco@sudamericano.edu.ec',
      password: hashedPassword,
      roleId: adminRole.roleId,
    },
  });

  console.log('Seed data created');

  const user2 = await prisma.users.create({
    data: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'hashedPassword',
      roleId: userRole.roleId,
    },
  });

  // Crear dispositivos
  const device1 = await prisma.devices.create({
    data: {
      name: 'Device 1',
      status: 'active',
      userId: user.userId,
    },
  });

  const device2 = await prisma.devices.create({
    data: {
      name: 'Device 2',
      status: 'inactive',
      userId: user2.userId,
    },
  });

  // Crear eventos
  const event1 = await prisma.events.create({
    data: {
      name: 'Event 1',
      date: new Date(),
      userId: user.userId,
    },
  });

  const event2 = await prisma.events.create({
    data: {
      name: 'Event 2',
      date: new Date(),
      userId: user2.userId,
    },
  });

  const variables = { device1, device2, event1, event2 };
  console.log(`Datos de seed ${variables}\n creados exitosamente`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
