"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Switch } from "@/components/ui/switch"

export function SearchToggle() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const mode = searchParams.get("mode")

  function toggleMode(checked: boolean) {
    const newMode = checked ? "chapter" : "novel"
    router.push(`/search?q=${encodeURIComponent(query ?? "")}&mode=${newMode}`)
  }

  return (
    <div className="flex items-center gap-6">
      各話ごとに検索
      <Switch checked={mode !== "novel"} onCheckedChange={toggleMode} />
    </div>
  )
}
