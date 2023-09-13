import { Prisma, PrismaClient } from '@prisma/client';

export class Orm {
  private static instance: Orm;
  private db: PrismaClient;
  private constructor() {
    this.db = new PrismaClient();
  }
  public static getInstance(): Orm {
    if (!Orm.instance) {
      Orm.instance = new Orm();
    }
    return Orm.instance;
  }
  public async destroy() {
    await this.db.$disconnect();
  }

  public async handleError(e: Error) {
    console.error(e);
    await this.db.$disconnect();
    process.exit(1);
  }
  public get user(): Prisma.UserDelegate {
    return this.db.user;
  }
  public get post(): Prisma.PostDelegate {
    return this.db.post;
  }
  public get board(): Prisma.BoardDelegate {
    return this.db.board;
  }
}
