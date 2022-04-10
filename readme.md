# Pollar

![image](https://user-images.githubusercontent.com/52435869/162627758-e2ab8462-08c7-46fc-bdd6-1cbd725899e8.png)

**Poll Whatever, Anywhere 폴라! 몰라? 골라!**

> 투표를 만들어 고민을 나누고,<br>
> 투표를 하면서 의견을 나눠주세요.

<br>
저희 Pollar Service는
텍스트, 사진등 다양한 형태로 사람들이 참여할 수 있고 
여러가지 관심사 또는 같은 관심사의 다양한 주제에 대해서도 투표를 진행할 수 있습니다.<br>
그리고 자신이 참여한 투표에 익명 여부를 만들어서 팔로워 몰래 은밀한 투표도 가능합니다.

<br>
<br>

## 프로젝트 목차

---

- [폴라(Pollar)](#pollar)

  - [프로젝트 목차](#프로젝트-목차)
  - [프로젝트 소개](#프로젝트-소개)
    - [일정 및 역할](#일정-및-역할)
    - [개발환경](#개발-환경)
  - [프로젝트 파일 구조](#파일-구조)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [프로젝트 산출물](#산출물)
  - [프로젝트 결과물](#결과물)

  <br>

## 프로젝트 소개

---

### 일정 및 역할

1. 일정 : 2021.01.10 ~ 2022.02.18 ( 총 6주 )
   - Sub 1 : 2022.01.10 ~ 2022.01.14
   - Sub 2 : 2022.01.17 ~ 2022.01.28
   - Sub 3 : 2022.01.31 ~ 2022.02.18
2. 인원 ( 6인 )
   - 김동규 : 팀장, 백엔드
   - 김한주 : 백엔드, 배포, UCC
   - 서우림 : 프론트엔드, 디자인
   - 신지우 : 프론트엔드, 디자인
   - 이재영 : 백엔드, readme작성
   - 정홍진 : 백엔드, 발표

<br>

### 개발 환경

1. 이슈관리 : Jira
2. 형상관리 : GitLab
3. 커뮤니케이션 : Notion, Webex, Google docs
4. 툴
   - IDE
     - InteliJ IDEA : 2021.3.1
     - VS Code : 1.64.2
   - UI/UX : Figma
   - Database : MySQL 8.0
   - Server
     - AWS EC2
     - AWS S3
   - DevOps
     - Docker
     - Jenkins
5. 버전 정보
   - JAVA : 1.8.0_192 ( Zulu 8.33.0.1-win64 )
   - Spring Boot : 2.6.3
     - swagger : 2.9.2
     - jwt : 0.9.1
     - lombok
     - JPA
     - QueryDSL
   - HTML , CSS, JavaScript
   - Mui : 5.4.0
   - React : 17.0.2 , Recoil : 0.6.1
   - Node.js : 16.13.1
   - npm : 8.1.2

<br>

## 파일 구조

---

### Backend

```
com
    └─ssafy
        └─pollar
            ├─aop
            ├─configuration
            ├─controller
            ├─domain
            │  └─entity
            ├─jwt
            │  └─service
            ├─model
            │  ├─dto
            │  ├─repository
            │  └─service
            └─util

```

### Frontend

```
frontend
  ├─node_modules
  ├─public
  └─src
      ├─assets
      │  ├─images
      │  ├─styles
      │  └─theme
      │      └─overrides
      ├─atoms
      ├─components
      │  ├─common
      │  ├─createpoll
      │  ├─detailpoll
      │  ├─error
      │  ├─footer
      │  ├─home
      │  ├─login
      │  ├─navbar
      │  ├─notification
      │  ├─polls
      │  ├─profile
      │  ├─settings
      │  ├─signup
      │  ├─trending
      │  └─user
      ├─hooks
      ├─layouts
      ├─pages
      ├─services
      │  └─api
      ├─utils
      └─_mocks_
```

<br>

## 산출물

---

- 각종 프로젝트 관련 문서 : [Notion](https://pollarweb.notion.site/POLLAR-Project-home-8138db0ecc934463adf7c34da139424b)
- [회의록](https://pollarweb.notion.site/5d9df08ca20f4bd89f6b378de5a79751?v=c747f7e4186b4b4994573244be467a91)
- [컨벤션 룰](https://pollarweb.notion.site/Conventions-5013f221db7e4bddb7bf7107ab5d9e90)
- [Google Docs](https://docs.google.com/spreadsheets/d/1Mw2ir8Xy3iZZOpWtMYe0M0fPFZBMTfMXU5ZG9BhdeBY/edit?usp=sharing)
  - 요구사항 명세서
  - 기능 정의서
  - 관심분야 정리
  - api 문서
- [ERDiagram](./docs/erd.md)
- [와이어 프레임](./docs/와이어프레임.md)
- [화면구조도](./docs/화면구조도.md)
- [서비스 아키텍쳐 및 배포 방법](./docs/배포.md)

- 협업툴 사용현황
  - [GitLab](./docs/git사용.md)
  - [Jira](./docs/jira사용.md)

## 결과물

---

- 발표자료
  - [아이디어톤](./ppt/공통PJT_서울4반_A407_아이디어톤.pdf)
  - [최종발표](./ppt/공통PJT_서울4반_A407_최종발표.pdf)
- [포팅메뉴얼](./exec/공통PJT_서울4반_A407_포팅메뉴얼.pdf)
