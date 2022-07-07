const config: {
  NODE_ENV: string;
  PORT: number;
  JWT_SECRET: string;
  MONGO_URI: string;
  RABBITMQ_URI: string;
  REDIS_URI: string;
  SENDGRID_API_KEY: string;
  SENDGRID_SENDER: string;
} = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  RABBITMQ_URI: process.env.RABBITMQ_URI,
  REDIS_URI: process.env.REDIS_URI,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_SENDER: process.env.SENDGRID_SENDER,
};

export default config;
