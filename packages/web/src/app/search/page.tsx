import { prisma } from "@/common/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Search } from "@/app/search"
import { notFound } from "next/navigation"

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams

  if (!q) {
    notFound()
  }

  const chapters = await prisma.chapter.findMany({
    where: {
      AND: q.split(/\s+/).map((word) => ({ content: { contains: word } })),
    },
    include: {
      novel: true,
    },
  })

  function getNearbyText(content: string, q: string) {
    const tag = q.split(/\s+/)[0]
    const index = content.indexOf(tag)
    const start = Math.max(0, index - 20)
    const end = Math.min(content.length, index + 20)
    return (
      <>
        <span className="text-muted-foreground">...{content.slice(start, index)}</span>
        <span className="text-destructive">{tag}</span>
        <span className="text-muted-foreground">{content.slice(index + tag.length, end)}...</span>
      </>
    )
  }

  return (
    <main className="flex flex-col gap-6 m-6 lg:max-w-2xl lg:mx-auto">
      <Search initialQuery={q} />
      <p>検索結果: {chapters.length}件</p>
      {chapters.map((chapter) => (
        <Link key={`${chapter.novelId}-${chapter.id}`} href={`/${chapter.novelId}/${chapter.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>
                {chapter.novel.title} - 第{chapter.id}話
              </CardTitle>
              <CardDescription>{chapter.title}</CardDescription>
            </CardHeader>
            <CardContent>{getNearbyText(chapter.content, q ?? "")}</CardContent>
          </Card>
        </Link>
      ))}
    </main>
  )
}
