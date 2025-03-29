import { prisma } from "@/common/db"
import { Search } from "@/app/search"
import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchToggle } from "@/app/search/search-toggle"

export async function NovelSearch({ query }: { query: string }) {
  const novels = await prisma.novel.findMany({
    where: {
      AND: query.split(/\s+/).map((word) => ({
        OR: [{ title: { contains: word } }, { chapter: { some: { content: { contains: word } } } }],
      })),
    },
    include: {
      chapter: {
        omit: { content: true },
      },
    },
  })

  return (
    <main className="flex flex-col gap-6 m-6 lg:max-w-2xl lg:mx-auto">
      <Search initialQuery={query} />
      <div className="flex justify-between">
        <p>検索結果: {novels.length}件</p>
        <SearchToggle />
      </div>
      {novels.map((novel) => (
        <Link key={novel.id} href={`/${novel.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{novel.title}</CardTitle>
              <CardDescription>{novel.short ? "短編" : `連載 - 全${novel.chapter.length}話`}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </main>
  )
}
