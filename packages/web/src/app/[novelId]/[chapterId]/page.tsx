import { prisma } from "@/common/db"
import { notFound } from "next/navigation"
import { Navigation } from "@/app/[novelId]/[chapterId]/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default async function Page({ params }: { params: Promise<{ novelId: string; chapterId: string }> }) {
  const { novelId, chapterId } = await params

  const novel = await prisma.novel.findUnique({
    where: { id: novelId },
  })

  if (!novel) {
    notFound()
  }

  const chapter = await prisma.chapter.findUnique({
    where: {
      id_novelId: {
        id: Number(chapterId),
        novelId: novelId,
      },
    },
  })

  if (!chapter) {
    notFound()
  }

  return (
    <main className="flex flex-col gap-6 m-6 lg:max-w-2xl lg:mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">トップページ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${novelId}`}>{novel.title}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{chapter.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Navigation chapter={chapter} />
      <h1 className="text-2xl">
        {chapter.title} - 第{chapter.id}話
      </h1>
      {chapter.content.split("\n").map((line, i) => (
        <p key={i} className="text-xl">
          {line}
        </p>
      ))}
      <Navigation chapter={chapter} />
    </main>
  )
}
