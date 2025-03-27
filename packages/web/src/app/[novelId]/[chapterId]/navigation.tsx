import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cache } from "react"
import { Chapter, prisma } from "@/common/db"

const getChapterCount = cache(async (novelId: string) => {
  return await prisma.chapter.count({
    where: {
      novelId,
    },
  })
})

export async function Navigation({ chapter }: { chapter: Chapter }) {
  const prevUrl = `/${chapter.novelId}/${Math.max(1, Number(chapter.id) - 1)}`
  const nextUrl = `/${chapter.novelId}/${Math.min(await getChapterCount(chapter.novelId), Number(chapter.id) + 1)}`

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={prevUrl} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`/${chapter.novelId}`}>目次</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={nextUrl} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
