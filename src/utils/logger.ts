import winston from 'winston';

// winston format
const { combine, timestamp, printf, colorize } = winston.format;

// Define log format
const logFormat = printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

const env = process.env.NODE_ENV || 'development';
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: combine(
    colorize(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [new winston.transports.Console({ silent: env == 'test' })],
});

export default logger;
