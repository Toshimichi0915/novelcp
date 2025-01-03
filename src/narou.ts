import { JSDOM } from "jsdom";

export interface NarouNovel {
  id: string,
  title: string,
  chapterCount: number | null,
}

export async function getFavoriteNovels(userId: string): Promise<NarouNovel[]> {
  let page = 1;
  let maxPage = 0;
  const novels: NarouNovel[] = [];

  do {
    const response = await fetch(`https://xmypage.syosetu.com/mypagefavnovelmain18/list/xid/${userId}/?p=${page}`, {
      headers: {
        Cookie: "over18=yes",
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch favorite novels, userId: ${userId}`);
    }

    const { document } = new JSDOM(await response.text()).window;

    if (maxPage === 0) {
      const itemCount = document.querySelector(".c-panel__headline-allcount")?.textContent;
      if (!itemCount) {
        throw new Error(`Failed to find favorite novel count, userId: ${userId}`);
      }
      maxPage = Math.ceil(parseInt(itemCount.replace(/\D/g, "")) / 20);
    }

    for (const item of document.querySelectorAll(".c-novel-list__item")) {
      const id = item.querySelector(".c-novel-list__title")?.getAttribute("href")?.match(/\/(.{7})\/$/)?.[1];
      if (!id) {
        throw new Error(`Failed to find favorite novel id, userId: ${userId}, page: ${page}`);
      }

      const title = item.querySelector(".c-novel-list__title")?.textContent?.trim();
      if (!title) {
        throw new Error(`Failed to find favorite novel title, userId: ${userId}, page: ${page}`);
      }

      // Regular novel or short story
      const chapterCount = parseInt(item.querySelector(".c-novel-list__number")?.textContent?.replace(/\D/g, "") ?? "0") || null;
      novels.push({ id: id, title, chapterCount });
    }
  } while (page++ < maxPage);

  return novels;
}

export interface NarouChapter {
  id: number | null,
  title: string,
  content: string,
  novelId: string,
}

export async function getChapter(novelId: string, chapter: number | null): Promise<NarouChapter> {
  const response = await fetch(`https://novel18.syosetu.com/${novelId}/${chapter ?? ""}/`, {
    headers: {
      Cookie: "over18=yes",
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch chapter, novelId: ${novelId}, chapter: ${chapter}`);
  }

  const { document } = new JSDOM(await response.text()).window;

  const title = document.querySelector(".p-novel__title")?.textContent?.trim();
  if (!title) {
    throw new Error(`Failed to find chapter title, novelId: ${novelId}, chapter: ${chapter}`);
  }

  const content = [ ...document.querySelectorAll(".p-novel__text > p") ].map((p) => p.textContent?.trim()).join("\n");
  if (content.length === 0) {
    throw new Error(`Failed to find chapter content, novelId: ${novelId}, chapter: ${chapter}`);
  }

  return {
    id: chapter,
    title,
    content,
    novelId,
  };
}
