import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: "my_pgdb",
  username: "postgres",
  password: "postgres",
  host: "localhost",
  port: parseInt('5432', 10),
  dialect: 'postgres',
});

export default sequelize;
