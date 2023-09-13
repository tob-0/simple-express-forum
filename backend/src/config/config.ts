import dotenv from 'dotenv';
import { Validator } from '../validation/validator';

dotenv.config();

const createConfig = (envFile: NodeJS.ProcessEnv) => {
  const port = Validator.validate(process.env.PORT).numeric();
  if (!port.success)
    throw Error('Port number must be specified in the .env file');

  const jwtSecret = envFile.JWT_SECRET;
  if (jwtSecret === undefined) throw Error('JWT_SECRET is missing');

  return {
    common: {
      port: port.data,
    },
    auth: {
      jwtSecret,
    },
  };
};

export default createConfig(process.env);
