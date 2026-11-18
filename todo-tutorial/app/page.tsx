import Link from "next/link"

import { TodoApp } from "@/components/todo-app"

export default function Page() {
  return (
    <div className="min-h-svh bg-gradient-to-b from-primary/10 via-background to-background">
      <main className="mx-auto flex w-full max-w-md flex-col gap-6 p-6 pt-14 pb-16">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">오늘의 할 일</h1>
          <Link
            href="/guide"
            className="rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground shadow-xs transition-colors hover:text-foreground"
          >
            사용법
          </Link>
        </div>
        <TodoApp />
      </main>
    </div>
  )
}
