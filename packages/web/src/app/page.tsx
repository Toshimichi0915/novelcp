import { prisma } from "@/common/db"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Search } from "@/app/search"

export default async function Page() {
  const novels = await prisma.novel.findMany({
    include: {
      chapter: {
        omit: { content: true },
      },
    },
  })

  return (
    <main className="flex flex-col gap-6 m-6 lg:max-w-2xl lg:mx-auto">
      <Search />
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
