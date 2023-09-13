import { Prisma } from '@prisma/client';
import { Orm } from '../persistence/orm';

export class PostService {
  private static instance: PostService;
  private orm: typeof Orm.prototype.post;
  private constructor() {
    this.orm = Orm.getInstance().post;
  }
  public static getInstance(): PostService {
    if (!PostService.instance) {
      PostService.instance = new PostService();
    }
    return PostService.instance;
  }

  public findAll(args?: Prisma.PostFindManyArgs) {
    return this.orm.findMany(args);
  }

  public findOneById(id: number) {
    return this.orm.findUniqueOrThrow({ where: { id } });
  }
  public delete(id: number) {
    return this.orm.delete({ where: { id } });
  }
  public update(id: number, data: Prisma.PostUpdateInput) {
    return this.orm.update({ where: { id }, data });
  }
  public create(
    content: string,
    title: string,
    authorId: number,
    boardId: number,
  ) {
    return this.orm.create({
      data: {
        content,
        title,
        authorId,
        boardId,
      },
    });
  }
}
