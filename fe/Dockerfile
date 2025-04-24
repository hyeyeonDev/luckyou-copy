# fe/Dockerfile
# Node.js 베이스 이미지 사용
FROM node:22

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# Next.js 빌드
RUN npm run build

# 컨테이너 실행 시 Next.js 시작
CMD ["npm", "start"]

# 포트 노출 (Next.js 기본 포트는 3000)
EXPOSE 3000