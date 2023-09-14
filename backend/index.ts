import { App } from './src/app';
import { Orm } from './src/persistence/orm';
import { authRouter } from './src/routes/auth';
import { boardRouter } from './src/routes/board';
import { postRouter } from './src/routes/post';
import { userRouter } from './src/routes/user/user';
import { userProtectedRouter } from './src/routes/user/user-protected';

const orm = Orm.getInstance();
const app = App.getInstance();

async function main() {
  app.registerRouter('/me', userProtectedRouter);
  app.registerRouter('/api/user', userRouter);
  app.registerRouter('/api/post', postRouter);
  app.registerRouter('/api/board', boardRouter);
  app.registerRouter('/api/auth', authRouter);
  app.serve();
}

main()
  .then(() => orm.destroy())
  .catch((e) => orm.handleError(e));
