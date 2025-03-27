"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Search({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  function showResult() {
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={showResult} className="flex gap-6">
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="検索内容を入力" />
      <Button type="submit">検索</Button>
    </form>
  )
}
