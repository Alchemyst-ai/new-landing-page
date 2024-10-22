import { Client } from '@notionhq/client';
import { BlockObjectResponse, DatabaseObjectResponse, PageObjectResponse, PartialDatabaseObjectResponse, PartialPageObjectResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import React from 'react';
import 'server-only';
import { NotionRenderer } from '@notion-render/client';
//   console.log(process.env.NOTION_DATABASE_ID)

export const renderer= new NotionRenderer()

export const notion =new Client({
    auth : process.env.NEXT_PUBLIC_NOTION_SECRET
})

export const getPage = async (pageId: string): Promise<PageObjectResponse> => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response as PageObjectResponse;
};

export const getPageContent = async (blockId: string) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};

export const getDatabase = async (databaseId: string): Promise<any[]> => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results as any[];
};

export const fetchPages = React.cache(async() => {
    const response = await notion.databases.query({
        database_id : process.env.NEXT_PUBLIC_NOTION_DATABASE_ID!,
        filter: {
            property: "Status",
            status:{
                equals :"Live"
            }
        }
    })

    return response.results as Array<PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse>
})

export const fetchBySlug = React.cache(async(slug: string) => {
    return notion.databases.query({
        database_id : process.env.NEXT_PUBLIC_NOTION_DATABASE_ID!,
        filter: {
            property: "slug",
            rich_text:{
                equals :slug
            }
        }
    }).then(res => res.results[0] as PageObjectResponse | undefined)
})

export const fetchPageBlocks = async(pageId: string) => {
    return notion.blocks.children.list({
        block_id: pageId
    }).then(res => res.results as BlockObjectResponse[])
}