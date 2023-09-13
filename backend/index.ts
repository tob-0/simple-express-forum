import { App } from './src/app';
import { Orm } from './src/persistence/orm';
import { userRouter } from './src/routes/user';

const orm = Orm.getInstance();
const app = App.getInstance();

async function main() {
  app.registerRouter('/users', userRouter);
  app.serve();
}

main()
  .then(() => orm.destroy())
  .catch((e) => orm.handleError(e));
