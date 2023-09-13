import { Prisma } from '@prisma/client';
import { Orm } from '../persistence/orm';

export class BoardService {
  private static instance: BoardService;
  private orm: typeof Orm.prototype.board;
  private constructor() {
    this.orm = Orm.getInstance().board;
  }
  public static getInstance(): BoardService {
    if (!BoardService.instance) {
      BoardService.instance = new BoardService();
    }
    return BoardService.instance;
  }

  public findAll(args?: Prisma.BoardFindManyArgs) {
    return this.orm.findMany(args);
  }

  public findOneById(id: number) {
    return this.orm.findUniqueOrThrow({ where: { id } });
  }
  public delete(id: number) {
    return this.orm.delete({ where: { id } });
  }
  public update(id: number, data: Prisma.BoardUpdateInput) {
    return this.orm.update({ where: { id }, data });
  }
  public create(title: string, description?: string) {
    return this.orm.create({
      data: {
        title,
        description,
      },
    });
  }
}
