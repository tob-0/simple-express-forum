import { Prisma } from '@prisma/client';
import { Orm } from '../persistence/orm';

export class UserService {
  private static instance: UserService;
  private orm: Orm;
  private constructor() {
    this.orm = Orm.getInstance();
  }
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public findAll(args?: Prisma.UserFindManyArgs) {
    return this.orm.user.findMany(args);
  }

  public findOneById(id: number) {
    return this.orm.user.findUniqueOrThrow({ where: { id } });
  }
  public delete(id: number) {
    return this.orm.user.delete({ where: { id } });
  }
  public update(id: number, data: Prisma.UserUpdateInput) {
    return this.orm.user.update({ where: { id }, data });
  }
  public create(name: string, email: string) {
    return this.orm.user.create({
      data: {
        email,
        name,
      },
    });
  }
}
