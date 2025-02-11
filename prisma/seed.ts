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

  // Crear registros de signos vitales
  const vitalSign1 = await prisma.vitalSigns.create({
    data: {
      userId: user.userId,
      BPM: 60,
      temp: 24.619,
      timestamp: new Date('2025-02-11T03:11:32.400Z'),
    },
  });

  const vitalSign2 = await prisma.vitalSigns.create({
    data: {
      userId: user2.userId,
      BPM: 72,
      temp: 36.5,
      timestamp: new Date(),
    },
  });

  console.log('Seed data created successfully');
  console.log({
    adminRole,
    userRole,
    user,
    user2,
    device1,
    device2,
    vitalSign1,
    vitalSign2,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
