import DailyRotateFile from 'winston-daily-rotate-file';
import { format } from 'winston';
import { Console } from 'winston/lib/winston/transports';
import { utilities } from 'nest-winston';

export const consoleTransports = new Console({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.ms(),
    utilities.format.nestLike('Winston'),
  ),
});

export function createRotateTransport(level: string, fileName: string) {
  return new DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${fileName}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: format.combine(format.timestamp(), format.simple()),
  });
}
