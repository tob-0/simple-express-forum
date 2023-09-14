import { Prisma } from '@prisma/client';
import { Orm } from '../persistence/orm';

export class UserService {
  private static instance: UserService;
  private orm: typeof Orm.prototype.user;
  private constructor() {
    this.orm = Orm.getInstance().user;
  }
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public findAll(args?: Prisma.UserFindManyArgs) {
    return this.orm.findMany(args);
  }

  public findOneById(id: number) {
    return this.orm.findUniqueOrThrow({ where: { id } });
  }
  public findOneByEmail(email: string) {
    return this.orm.findUnique({ where: { email } });
  }
  public delete(id: number) {
    return this.orm.delete({ where: { id } });
  }
  public update(id: number, data: Prisma.UserUpdateInput) {
    return this.orm.update({ where: { id }, data });
  }
  public create(name: string, email: string, password: string) {
    return this.orm.create({
      data: {
        email,
        name,
        password,
      },
    });
  }
}
