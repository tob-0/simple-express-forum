import { App } from './src/app';
import { Orm } from './src/persistence/orm';
import { authRouter } from './src/routes/auth';
import { boardRouter } from './src/routes/board';
import { postRouter } from './src/routes/post';
import { userRouter } from './src/routes/user';

const orm = Orm.getInstance();
const app = App.getInstance();

async function main() {
  app.registerRouter('/users', userRouter);
  app.registerRouter('/posts', postRouter);
  app.registerRouter('/boards', boardRouter);
  app.registerRouter('/auth', authRouter);
  app.serve();
}

main()
  .then(() => orm.destroy())
  .catch((e) => orm.handleError(e));
