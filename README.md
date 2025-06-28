# 🧠 주린이놀이터 – 가상 주식 시뮬레이션 플랫폼

> **주식 초보자들을 위한 투자 시뮬레이션 웹앱**
> 시간 이동(과거/미래) 기반의 주식 거래, 가상 대회, 튜토리얼을 제공하는 서비스입니다.

---

## 🚀 프로젝트 특징

- ✅ Next.js 13+ **App Router** 구조 기반
- ✅ **TypeScript 미사용**, 전면 `.js`, `.jsx` 기반
- ✅ 폴더 단위 라우팅 구조 (기본 `/app`)
- ✅ `features`, `hooks`, `store` 기반 도메인 분리
- ✅ 커스텀 API 래퍼, 상태 관리 Store, 공용 UI 컴포넌트 설계 완료

---

## 📁 폴더 구조

```
src/
├── app/                      # App Router 라우팅 진입점
│   ├── page.js               # 메인 페이지 (/)
│   ├── contest/              # /contest 경로
│   │   ├── page.jsx
│   │   ├── create.jsx
│   │   └── [contestId].jsx
│   │── api/                      # axios 래퍼 및 API 함수
│   │   └── stock/           
│   │        └── route.js     ← ⚠️ `stock.ts` → `stock.js` 로 변경 필요
│   ├── login/                # /login, /login/signup
│   ├── rank/                 # /rank
│   ├── stock/                # /stock, /stock/[id]
│   ├── trade/
│   └── tutorial/
│
│
├── components/               # UI 컴포넌트
│   ├── Common/               # Button, Input 등
│   ├── Contest/, Layout/, ...
│
├── constants/                # 고정 상수
│   └── index.ts              ← ⚠️ TypeScript → JS 변경 필요
│
├── features/                 # 각 도메인별 비즈니스 로직 (서비스 계층 등)
│   ├── contest/, stock/, ...
│
├── hooks/                    # 커스텀 훅
│   ├── useContest.ts         ← ⚠️ `.ts` 확장자 → `.js` 로 바꿔야 함
│   └── ...
│
├── store/                    # Zustand 기반 상태 관리
│   └── contestStore.ts       ← ⚠️ 마찬가지로 `.ts` → `.js` 전환 예정
│
├── styles/                   # CSS 파일 (e.g., globals.css)
└── utils/                    # API 공통 래퍼 등 유틸
```

---

## ⚠️ 작업 시 주의사항

### ✅ TypeScript 제거

- `.ts`, `.tsx` → 모두 `.js`, `.jsx`로 변경해야 합니다.
- `hooks`, `store`, `api`, `features` 폴더의 모든 `.ts` 파일은 JS로 마이그레이션 필요
- `types/` 폴더는 더 이상 사용하지 않습니다. 인터페이스 정의는 필요한 곳에 JS 주석 또는 JSDoc으로 작성합니다.

```ts
// ❌ before (TypeScript)
export interface Stock {
  id: string;
  name: string;
}

// ✅ after (JS)
/// @typedef {{ id: string, name: string }} Stock
```

---

## 🛠 실행 방법

```bash
npm install
npm run dev
```

> 실행 후 [http://localhost:3000](http://localhost:3000) 접속

---

## ✅ 라우팅 예시

| 경로                   | 파일 위치                         |
| ---------------------- | --------------------------------- |
| `/`                    | `src/app/page.js`                 |
| `/contest`             | `src/app/contest/page.jsx`        |
| `/contest/create`      | `src/app/contest/create.jsx`      |
| `/contest/[contestId]` | `src/app/contest/[contestId].jsx` |
| `/login/signup`        | `src/app/login/signup.jsx`        |
| `/rank`                | `src/app/rank/page.jsx`           |
| `/stock/TSLA`          | `src/app/stock/[stockId].jsx`     |

---

## ✅ 예시 컴포넌트 (JS 기준)

```jsx
// src/components/Common/Button.jsx
export default function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
```
