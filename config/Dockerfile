# Dockerfile.node18.20.4-alpine

# Node 18.20.4와 Alpine을 기반으로 하는 이미지 사용
FROM node:18.20.6-alpine

# 작업 디렉토리 생성
WORKDIR /app

RUN npm install -g pm2 pm2-metrics

# 나머지 애플리케이션 파일 복사
COPY . .

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4000/ || exit 1

EXPOSE 4000

# 컨테이너 시작 시 실행할 명령어 (예: npm start)
CMD ["pm2", "start", "ecosystem.config.cjs", "--env", "production"
