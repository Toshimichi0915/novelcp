import { notFound } from "next/navigation"
import { ChapterSearch } from "@/app/search/chapter-search"
import { NovelSearch } from "@/app/search/novel-search"

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string; mode?: string }> }) {
  const { q } = await searchParams
  const { mode } = await searchParams

  if (!q) {
    notFound()
  }

  if (mode === "novel") {
    return <NovelSearch query={q} />
  } else {
    return <ChapterSearch query={q} />
  }
}
