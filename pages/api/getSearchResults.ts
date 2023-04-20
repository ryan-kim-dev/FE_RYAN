import { getSearchResults } from '@/cms/notionClient';
import { parseDatabaseItems } from '@/utils/parseDatabaseItem';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;

  if (!query) throw new Error('query parameter is required');

  const searchQuery = query.toString();
  const searchResults = await getSearchResults(searchQuery);

  const parsedSearchResults = parseDatabaseItems(searchResults);
  console.log('parsedSearchResults', parsedSearchResults);

  res.status(200).json(parsedSearchResults);
}
