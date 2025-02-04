const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");

// 로그 디렉토리 설정
const logDirectory = path.join(__dirname, "../log");

// Console 로그 설정
const consoleTransport = new DailyRotateFile({
    level: "info",
    dirname: path.join(logDirectory, "console"),
    filename: "console-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true, // 오래된 로그 압축 가능
    maxSize: "20m", // 최대 파일 크기 설정
    maxFiles: "14d", // 14일 지난 파일은 삭제
});

// Error 로그 설정
const errorTransport = new DailyRotateFile({
    level: "error",
    dirname: path.join(logDirectory, "error"),
    filename: "error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
});

// Logger 생성
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // 콘솔 출력
        consoleTransport,
        errorTransport,
    ],
});

module.exports = logger;
