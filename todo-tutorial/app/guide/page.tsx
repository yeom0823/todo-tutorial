import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "사용법 | todo",
}

const SECTIONS: { title: string; items: React.ReactNode[] }[] = [
  {
    title: "할 일 추가",
    items: [
      <>
        입력칸에 할 일을 적고 <Kbd>Enter</Kbd>를 누르면 목록에 추가됩니다.
      </>,
      "빈 칸이나 공백만 있는 내용은 추가되지 않습니다.",
      "새 할 일을 추가하면 필터가 자동으로 '전체'로 바뀝니다.",
    ],
  },
  {
    title: "완료 표시",
    items: [
      "할 일 왼쪽의 체크박스를 누르면 완료로 표시되고 줄이 그어집니다.",
      "한 번 더 누르면 다시 진행중으로 돌아갑니다.",
    ],
  },
  {
    title: "수정",
    items: [
      "할 일 글자를 더블클릭하면 수정할 수 있습니다.",
      <>
        <Kbd>Enter</Kbd>를 누르거나 다른 곳을 클릭하면 저장되고,{" "}
        <Kbd>Esc</Kbd>를 누르면 취소됩니다.
      </>,
      "내용을 모두 지우고 저장하면 원래 내용이 그대로 남습니다.",
    ],
  },
  {
    title: "삭제",
    items: [
      "할 일 오른쪽의 휴지통 버튼을 누르면 바로 삭제됩니다.",
      "완료한 일이 있으면 목록 아래에 '완료한 일 지우기' 버튼이 나타나며, 완료한 일을 한꺼번에 지울 수 있습니다.",
    ],
  },
  {
    title: "필터",
    items: [
      "'전체', '진행중', '완료' 탭으로 보고 싶은 할 일만 골라 볼 수 있습니다.",
    ],
  },
  {
    title: "저장",
    items: [
      "할 일은 지금 쓰는 브라우저에 자동으로 저장되어 새로고침해도 남아 있습니다.",
      "다른 브라우저나 기기에서는 보이지 않습니다.",
    ],
  },
]

export default function GuidePage() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col gap-6 p-6 pt-16">
      <div className="flex flex-col gap-2">
        <Button asChild variant="ghost" size="sm" className="self-start">
          <Link href="/">
            <ArrowLeftIcon />
            할 일로 돌아가기
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">사용법</h1>
      </div>
      {SECTIONS.map(({ title, items }) => (
        <section key={title} className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-muted-foreground">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
      {children}
    </kbd>
  )
}
