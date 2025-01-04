import { prisma } from "@/common/db"

export default async function Page() {
  const novels = await prisma.novel.findMany()
  return (
    <div>
      {novels.map((novel) => (
        <div key={novel.id}>
          <h2>{novel.title}</h2>
        </div>
      ))}
    </div>
  )
}
