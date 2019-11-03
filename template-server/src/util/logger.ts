import winston from 'winston';

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [new winston.transports.Console({ level: 'error' })],
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (!['production', 'local', 'test'].includes(process.env.NODE_ENV)) {
  logger.add(
    new winston.transports.File({
      filename: 'graphql.log',
      dirname: '/var/log',
      level: 'info',
      maxsize: 5 * 1024 * 1024, // 5M
    }),
  );
}

logger.stream = {
  // @ts-ignore
  write: (message: string) => {
    logger.info(message);
  },
};

export default logger;
