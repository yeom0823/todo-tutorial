"use client"

import { useRef, useState, useSyncExternalStore } from "react"
import {
  CheckCheckIcon,
  ListTodoIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTodos, type Todo } from "@/hooks/use-todos"
import { cn } from "@/lib/utils"

type Filter = "all" | "active" | "completed"

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행중" },
  { value: "completed", label: "완료" },
]

// localStorage 지원 여부는 바뀌지 않으므로 구독할 이벤트가 없다
const subscribeNothing = () => () => {}

export function TodoApp() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted } =
    useTodos()
  const [draft, setDraft] = useState("")
  const [filter, setFilter] = useState<Filter>("all")

  const totalCount = todos.length
  const completedCount = todos.filter((todo) => todo.completed).length
  const remainingCount = totalCount - completedCount
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  const visibleTodos = todos.filter((todo) =>
    filter === "all"
      ? true
      : filter === "active"
        ? !todo.completed
        : todo.completed
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 한글 조합 중 Enter는 무시 (중복 추가 방지)
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return
    const text = draft.trim()
    if (!text) return
    addTodo(text)
    setDraft("")
    // 새 항목이 필터에 가려지지 않도록 전체 보기로 돌아간다
    setFilter("all")
  }

  const canSave = useSyncExternalStore(
    subscribeNothing,
    () => "localStorage" in window,
    // 서버는 브라우저 기능을 알 수 없으므로 대부분의 경우인 "저장됨"으로 그린다.
    // hydration이 끝난 뒤 실제 브라우저 값으로 다시 그려 불일치 에러를 막는다
    () => true
  )

  return (
    <div className="flex flex-col gap-5">
      <section
        aria-label="진행 상황"
        className="rounded-2xl bg-primary p-5 text-primary-foreground shadow-lg shadow-primary/20"
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm opacity-85">
              {totalCount === 0
                ? "오늘 할 일을 추가해 보세요"
                : remainingCount === 0
                  ? "모두 끝냈어요! 수고했어요"
                  : `남은 할 일 ${remainingCount}개`}
            </p>
            <p className="mt-1 text-3xl font-bold tabular-nums">
              {completedCount}
              <span className="text-lg font-medium opacity-70">
                {" "}
                / {totalCount}
              </span>
            </p>
          </div>
          <p className="text-sm font-semibold tabular-nums opacity-90">
            {progress}%
          </p>
        </div>
        <div
          role="progressbar"
          aria-label="완료율"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="mt-4 h-2 overflow-hidden rounded-full bg-primary-foreground/25"
        >
          <div
            className="h-full rounded-full bg-primary-foreground transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      <div className="relative">
        <PlusIcon
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="할 일을 입력하고 Enter"
          aria-label="새 할 일"
          autoFocus
          className="h-12 rounded-xl bg-card pl-10 text-base shadow-sm"
        />
      </div>

      <div className="flex min-h-8 items-center justify-between gap-3">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
          <TabsList aria-label="필터">
            {FILTERS.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {completedCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCompleted}
            className="text-muted-foreground hover:text-destructive"
          >
            완료한 일 지우기 ({completedCount})
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        {visibleTodos.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              {totalCount === 0 ? (
                <ListTodoIcon aria-hidden className="size-6" />
              ) : (
                <CheckCheckIcon aria-hidden className="size-6" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {totalCount === 0
                ? "할 일이 없습니다"
                : "해당하는 할 일이 없습니다"}
            </p>
          </div>
        ) : (
          <ul className="divide-y">
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => toggleTodo(todo.id)}
                onDelete={() => deleteTodo(todo.id)}
                onEdit={(text) => editTodo(todo.id, text)}
              />
            ))}
          </ul>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {canSave
          ? "할 일은 이 브라우저에 저장됩니다 · 더블클릭으로 수정"
          : "이 브라우저에서는 할 일이 저장되지 않습니다"}
      </p>
    </div>
  )
}

function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
  onEdit: (text: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(todo.text)
  // 편집 종료 후 언마운트 시 발생하는 blur가 다시 저장하지 않도록 막는다
  const editingRef = useRef(false)

  const startEdit = () => {
    setValue(todo.text)
    editingRef.current = true
    setEditing(true)
  }

  const finish = () => {
    editingRef.current = false
    setEditing(false)
  }

  const commit = () => {
    if (!editingRef.current) return
    const text = value.trim()
    // 빈 값이면 원래 텍스트 유지
    if (text && text !== todo.text) onEdit(text)
    finish()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === "Enter") commit()
    if (e.key === "Escape") finish()
  }

  return (
    <li className="group flex min-h-14 items-center gap-3 px-4 transition-colors hover:bg-muted/40">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={onToggle}
        aria-label={`${todo.text} 완료`}
        className="size-5 rounded-full"
      />
      {editing ? (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
          aria-label="할 일 수정"
          autoFocus
          className="h-9 flex-1"
        />
      ) : (
        <span
          onDoubleClick={startEdit}
          className={cn(
            "flex-1 cursor-text py-3 text-[15px] break-all transition-colors select-none",
            todo.completed &&
              "text-muted-foreground line-through decoration-muted-foreground/60"
          )}
        >
          {todo.text}
        </span>
      )}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onDelete}
        aria-label={`${todo.text} 삭제`}
        className="text-muted-foreground opacity-60 group-hover:opacity-100 hover:text-destructive focus-visible:opacity-100"
      >
        <Trash2Icon />
      </Button>
    </li>
  )
}
