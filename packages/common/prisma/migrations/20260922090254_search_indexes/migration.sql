-- GIN trigram indexes so LIKE '%word%' / ILIKE use indexes instead of seq scans.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS chapters_content_trgm ON chapters USING gin (content gin_trgm_ops);
CREATE INDEX IF NOT EXISTS chapters_title_trgm ON chapters USING gin (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS novels_title_trgm ON novels USING gin (title gin_trgm_ops);
