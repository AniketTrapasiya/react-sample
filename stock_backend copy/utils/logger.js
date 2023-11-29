const { createLogger, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const transport = new DailyRotateFile({
    filename: './logs/all-logs-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    json: false,
    zippedArchive: true,
    maxSize: 5242880,
    maxFiles: 5,
});
const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.printf((info) => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        }),
    ),
    transports: [transport],
});

module.exports = { logger };
