"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Search({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()
  const searchParams = useSearchParams()

  function showResult(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    params.set("q", query)
    router.push(`/search?${params}`)
  }

  return (
    <form onSubmit={showResult} className="flex gap-6">
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="検索内容を入力" />
      <Button type="submit">検索</Button>
    </form>
  )
}
