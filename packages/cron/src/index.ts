import { getChapter, getFavoriteNovels } from "@/narou"
import { env } from "@/env"
import { prisma } from "@/common/db"

const novels = await getFavoriteNovels(env.NAROU_USER_ID)
const dbNovels = await prisma.novel.findMany({ include: { chapter: true } })

for (const novel of novels) {
  const dbNovel = dbNovels.find(dbNovel => dbNovel.id === novel.id)
  if (!dbNovel || novel.title !== dbNovel.title) {
    await prisma.novel.upsert({
      where: { id: novel.id },
      update: { title: novel.title },
      create: { id: novel.id, title: novel.title, short: novel.chapterCount == null }
    })
  }

  const novelChapterCount = novel.chapterCount ?? 1
  const dbNovelChapterCount = dbNovel?.chapter?.length ?? 0
  if (novelChapterCount > dbNovelChapterCount) {
    for (let i = dbNovelChapterCount; i < novelChapterCount; i++) {
      const chapter = await getChapter(novel.id, novel.chapterCount ? i + 1 : null)
      await prisma.chapter.create({
        data: {
          id: chapter.id ?? 1,
          title: chapter.title,
          content: chapter.content,
          novelId: chapter.novelId
        }
      })
    }
  }
}
