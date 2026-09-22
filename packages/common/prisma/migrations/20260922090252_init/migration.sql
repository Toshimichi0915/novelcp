-- CreateTable
CREATE TABLE "novels" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "short" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "novels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapters" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "preface" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "afterword" TEXT NOT NULL,
    "novel_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id","novel_id")
);

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_novel_id_fkey" FOREIGN KEY ("novel_id") REFERENCES "novels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

