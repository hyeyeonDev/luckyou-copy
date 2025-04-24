# be/Dockerfile
# OpenJDK 베이스 이미지 사용
FROM openjdk:17-jdk-slim

# 작업 디렉토리 설정
WORKDIR /app

# JAR 파일 복사 (빌드 후 생성된 JAR 파일 경로 확인 필요)
COPY build/libs/luckYou.jar app.jar

# 컨테이너 실행 시 JAR 실행
CMD ["java", "-jar", "app.jar"]

# 포트 노출 (스프링 부트 기본 포트는 8080)
EXPOSE 8080