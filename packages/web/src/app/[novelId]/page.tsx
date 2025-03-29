import { prisma } from "@/common/db"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Page({ params }: { params: Promise<{ novelId: string }> }) {
  const { novelId } = await params

  const novel = await prisma.novel.findUnique({
    where: { id: novelId },
  })

  if (!novel) {
    notFound()
  }

  const chapters = await prisma.chapter.findMany({
    omit: { content: true },
    where: { novelId },
    orderBy: {
      id: "asc",
    },
  })

  return (
    <main className="flex flex-col gap-6 m-6 lg:max-w-2xl lg:mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">トップページ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{novel.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl">{novel.title}</h1>
      {chapters.map((chapter) => (
        <Link key={chapter.id} href={`/${novelId}/${chapter.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{chapter.title}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </main>
  )
}
