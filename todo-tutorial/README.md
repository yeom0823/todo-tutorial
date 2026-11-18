# Todo Tutorial

[Claude Code Playbook](https://docs.claude-hunt.com) 강의에서 작은 할 일 앱을 직접 만들어 보며 Claude Code 쓰는 법을 배우는 연습용 저장소입니다.

## 관련 링크

- 강의 본문: https://docs.claude-hunt.com
- 수강생 결과물 공유: https://claude-hunt.com

## 기술 스택

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4
- shadcn/ui (radix-maia 스타일, taupe 베이스)
- TypeScript / ESLint / Prettier
- 패키지 매니저: bun 1.3.6

## 시작하기

### 1. 준비물 설치

| 도구    | 필요한 버전 | 확인 명령         |
| ------- | ----------- | ----------------- |
| Git     | 아무 버전   | `git --version`   |
| Node.js | 20.9 이상   | `node --version`  |
| Bun     | 1.3.6 이상  | `bun --version`   |

- Node.js: https://nodejs.org 에서 LTS 버전을 설치합니다. `bun dev`, `bun run build` 는 내부적으로 Node.js로 Next.js를 실행하므로 Bun만 있어서는 안 됩니다.
- Bun: 운영체제에 맞는 명령으로 설치한 뒤 **터미널을 새로 열어야** `bun` 명령이 잡힙니다.

  ```powershell
  # Windows (PowerShell)
  powershell -c "irm bun.sh/install.ps1 | iex"
  ```

  ```bash
  # macOS / Linux
  curl -fsSL https://bun.sh/install | bash
  ```

### 2. 저장소 받기

```bash
git clone https://github.com/yeom0823/todo-tutorial.git
cd todo-tutorial/todo-tutorial
```

> 앱은 저장소 루트가 아니라 **`todo-tutorial/` 하위 폴더**에 있습니다. 그래서 `cd` 를 두 번(`todo-tutorial/todo-tutorial`) 해야 합니다. 아래 명령은 모두 이 폴더(`package.json` 이 있는 곳)에서 실행하세요.

### 3. 의존성 설치

```bash
bun install
```

### 4. 개발 서버 실행

```bash
bun dev
```

터미널에 `Ready` 가 뜨면 브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다. "오늘의 할 일" 화면이 보이면 성공입니다. 서버는 `Ctrl+C` 로 끕니다.

3000번 포트를 다른 프로그램이 쓰고 있으면 Next.js가 3001 같은 다른 포트로 띄우니, 터미널에 찍힌 `Local:` 주소를 확인하세요.

### 5. (선택) 제대로 설치됐는지 검사

```bash
bun run test       # Vitest 테스트
bun run lint       # ESLint
bun run typecheck  # tsc --noEmit
```

> `bun test` 가 아니라 **`bun run test`** 입니다. `bun test` 는 Bun 자체 테스트 러너를 실행해서 이 프로젝트의 Vitest 테스트가 제대로 돌지 않습니다.

## 자주 쓰는 스크립트

```bash
bun dev             # 개발 서버 (http://localhost:3000)
bun run build       # 프로덕션 빌드
bun run start       # 빌드 결과 실행 (먼저 bun run build 필요)
bun run test        # 테스트 한 번 실행
bun run test:watch  # 파일이 바뀔 때마다 테스트 다시 실행
bun run lint        # ESLint
bun run typecheck   # tsc --noEmit
bun run format      # Prettier 포맷팅
```

## 레슨별 시작 브랜치

레슨마다 시작 시점의 코드를 `lesson/<레슨 이름>` 브랜치로 제공합니다. 레슨 본문이 안내하는 브랜치로 바꾼 뒤 따라가세요.

```shell
git checkout lesson/claude-md
```

## 컴포넌트 추가

shadcn/ui 컴포넌트는 다음과 같이 추가합니다.

```bash
bunx --bun shadcn@latest add button
```

`components/ui` 디렉토리에 컴포넌트가 추가됩니다.

## 컴포넌트 사용

```tsx
import { Button } from "@/components/ui/button";
```
