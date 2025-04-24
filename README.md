# 📌 LuckYou - AI 기반 타로 & 사주 해석

🔮 AI가 분석해주는 맞춤형 타로 & 사주 운세 서비스

![LuckYou 로고](https://github.com/user-attachments/assets/9f9675b6-94cb-4e7f-ad16-57314d33519d)

## 🚀 소개

**LuckYou**는 타로 카드와 사주 명리를 AI와 결합하여 현대적이고 개인화된 운세 경험을 제공하는 웹 애플리케이션입니다.  
사용자의 질문과 상황을 고려한 정밀한 해석을 통해 **단순한 운세 조회를 넘어, 삶의 방향성을 고민할 수 있는 특별한 여정**을 경험할 수 있습니다.

## 🏗 기술 스택

| 분류           | 기술 스택                                              |
| -------------- | ------------------------------------------------------ |
| **Frontend**   | Next.js (TypeScript), Tailwind CSS                     |
| **Backend**    | Spring Boot (Gradle), Spring Security, JPA (Hibernate) |
| **Database**   | Supabase                                               |
| **AI & LLM**   | Grok (운세 해석), Recraft (이미지 생성)                |
| **Deployment** | AWS (EC2, RDS, S3), Docker, Jenkins (CI/CD)            |

## ✨ 주요 기능

✅ **AI 기반 타로 해석** → 질문을 기반으로 정밀한 타로 카드 해석 제공  
✅ **AI 기반 사주 분석** → 생년월일을 입력하면 AI가 명리학적 해석 제공  
✅ **맞춤형 조언** → 단순한 결과 나열이 아닌, 사용자의 상황에 맞춘 해석

## 📸 스크린샷

### 🔑 회원가입 & 로그인

![회원가입](https://github.com/user-attachments/assets/b93c3a51-68b1-4303-ba96-1970847201df)

![로그인](https://github.com/user-attachments/assets/7ac98790-d551-4bff-b80b-e4077fa7feb0)

### 🔮 메인 페이지

![메인 화면](https://github.com/user-attachments/assets/923f039d-41ff-4935-abd0-ef25415a9e0b)

### 🃏 타로 카드 결과

![타로 페이지](https://github.com/user-attachments/assets/d249dd12-e73b-4645-a141-70b56fee5604)
![타로 카드 선택](https://github.com/user-attachments/assets/76dd5623-362b-4da6-8f3c-d6419aabd08d)
![타로 결과](https://github.com/user-attachments/assets/6ac12a1b-ef4b-4f85-a0e6-09ff72466ee7)
![타로 gif](https://github.com/user-attachments/assets/9d084506-c188-443b-851b-33f2bd2d2879)

### 🏮 사주 해석

![사주 페이지](https://github.com/user-attachments/assets/7dd6750c-8906-4ef2-82dc-02467ccb3709)
![사주 정보 입력](https://github.com/user-attachments/assets/098b88a8-a8a1-4d47-a48c-44d5abba12a7)
![사주 결과-1](https://github.com/user-attachments/assets/cd5b40dc-e43c-4257-a086-e0eba6d1d890)  
![사주 결과-2](https://github.com/user-attachments/assets/030266ce-280a-4c50-abd9-fd3faf60f5b2)
![사주 gif](https://github.com/user-attachments/assets/b66fd266-5a90-4735-9f25-e511558a1e38)

### ⏳ 히스토리

![히스토리 영역](https://github.com/user-attachments/assets/36fc7e18-9137-4f7a-ab4d-14b31d2119fa)
![타로 히스토리](https://github.com/user-attachments/assets/dd6cbb90-3381-4ef5-a6ad-bc80b96818e3)
![타로 히스토리 gif](https://github.com/user-attachments/assets/360e82b2-4b69-4bdd-a934-119cdf6bb002)
![사주 히스토리](https://github.com/user-attachments/assets/ea4ab620-b998-4182-a82d-87b6500d9683)
![사주 히스토리 gif](https://github.com/user-attachments/assets/14a278ce-5cf9-4374-b991-ed77554eeae7)

## 🛠 프로젝트 실행 방법

```bash
# 프론트엔드 실행
cd frontend
npm install
npm run dev

# 백엔드 실행
cd backend
./gradlew bootRun
```

## 📌 배포 방식

LuckYou는 **AWS + Docker + Jenkins**를 활용하여 배포되었습니다.

- **AWS:** EC2 (서버), RDS (DB), S3 (이미지 저장)
- **Docker:** 컨테이너화하여 환경 일관성 유지
- **Jenkins:** CI/CD 자동화로 배포 속도 개선

### 🔗 [LuckYou 바로가기](https://luckyou.kro.kr/)
