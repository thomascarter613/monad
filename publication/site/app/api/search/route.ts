import { createSearchAPI } from 'fumadocs-core/search/server';
import { searchableSources } from '@/lib/source';

const indexes = searchableSources.flatMap(({ key, source }) =>
  source.getPages().map((page) => ({
    title: page.data.title,
    description: page.data.description,
    url: page.url,
    id: page.url,
    structuredData: page.data.structuredData,
    tag: key,
  })),
);

export const { GET } = createSearchAPI('advanced', {
  indexes,
});
