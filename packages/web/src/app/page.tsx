import { prisma } from "@/common/db"

export default async function Page() {
  const novels = await prisma.novel.findMany()
  return (
    <main>
      {novels.map((novel) => (
        <p key={novel.id}>{novel.title}</p>
      ))}
    </main>
  )
}
