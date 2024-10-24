'use client'

import React, { useEffect, useState } from 'react'

// pages/blog.js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { CircleCheck, Dot, Link2, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { fetchBySlug } from '@/app/lib/notion';

// import { NotionRenderer } from '@notion-render/client';
import { NotionRenderer } from 'react-notion-x'
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
// import { NotionAPI } from 'notion-client'

// const notion = new NotionAPI()

// const renderer = new NotionRenderer()

type BlogParams  = {
  params :{
    slug : string
  }
}

export default function Blog({params} : BlogParams) {

    const slug = params.slug;


    const [data, setData] = useState<{ content: BlockObjectResponse[] } | null>(null);
    // const response = await fetch(`http://localhost:3000/api/notion/blogs/${slug}`)
    // const data = await response.json();

    // const recordMap = await notion.getPage('067dd719a912471ea9a3ac10710e7fdf')

    useEffect(() => {
      const fetchBlogData = async() => {
        const response = await fetch(`/api/notion/blogs/${slug}`);
        const data = await response.json();
        console.log(data, "dfvjknkj")
        if(data) {
          setData(data);
        }
      }

      fetchBlogData();
    },[slug])

    
  return (

    <div>
      <main className="container mx-auto p-6 w-[50%] flex flex-col justify-start items-baseline gap-3">
        {/* <NotionRenderer recordMap={data} fullPage={true} darkMode={false} /> */}
      {data?.content.map((block : BlockObjectResponse, index : number) => {
        switch (block.type) {
          case "heading_1":
            return (
              <h1 key={block.id} className="text-3xl font-bold text-[#ff9933]">
                {block.heading_1.rich_text.map((text) => {
                  if(text.href !== null) {
                    return <Link key={index} href={text.href} target="_blank" rel="noreferrer"><span className='underline'>{text.plain_text}</span></Link>
                  }
                  else if ('text' in text) {
                    return text.plain_text;
                  }
                  return '';
                })}
              </h1>
            );
          case "heading_2":
            return (
              <h2 key={block.id} className="text-3xl font-bold text-[#ff9933]">
                {block.heading_2.rich_text.map((text) => {
                  if(text.href !== null) {
                    return <Link key={index} href={text.href} target="_blank" rel="noreferrer"><span className='underline'>{text.plain_text}</span></Link>
                  }
                  else if ('text' in text) {
                    return text.plain_text;
                  }
                  return '';
                })}
              </h2>
            );
          case "heading_3":
            return (
              <h3 key={block.id} className="text-3xl font-bold text-[#ff9933] pl-20">
                {block.heading_3.rich_text.map((text) => {
                  if(text.href !== null) {
                    return <Link key={index} href={text.href} target="_blank" rel="noreferrer"><span className='underline'>{text.plain_text}</span></Link>
                  }
                  else if ('text' in text) {
                    return text.plain_text;
                  }
                  return '';
                })}
              </h3>
            );
          case "quote":
            return (
              <p key={block.id} className="border-l-4 border-blue-500 pl-4 italic text-lg text-[#ff9933]">
                {block.quote.rich_text.map((text, index) => {
                  if(text.href !== null) {
                    return <Link key={index} href={text.href} target="_blank" rel="noreferrer"><span className='underline'>{text.plain_text}</span></Link>
                  }
                  else if ('text' in text) {
                    return text.plain_text;
                  }
                  return '';
                })}
              </p>
            );
          case "callout" : 
            return (
            <div className="bg-blue-100 border-l-4 border-blue-500 p-4 text-blue-700">
              <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-1h1v1zm0-4h-1v-1h1v1z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h1.5m-1.5 0a9 9 0 1118 0h-1.5M3 12h1.5m0 0V10a9 9 0 018-8.95M3 12v2a9 9 0 018 8.95M21 12h-1.5m1.5 0a9 9 0 01-18 0h1.5" />
                  </svg>
                  <div>
                      <h4 className="font-semibold">Information</h4>
                      <p>This is an informational callout. It can be used to highlight important notes or tips.</p>
                  </div>
              </div>
          </div>
            );
          case "paragraph":
            if(block.paragraph.rich_text.length === 0) return <br />
            return (
              <p key={block.id}>
                {block.paragraph.rich_text.map((text) => {
                  if(text.href !== null) {
                    return <Link key={index} href={text.href} target="_blank" rel="noreferrer"><span className='underline'>{text.plain_text}</span></Link>
                  }
                  else if ('text' in text) {
                    return text.plain_text;
                  }
                  return '';
                })}
              </p>
            );
          case "bulleted_list_item": 
            return (
            <ul key={block.id} style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <Dot />
                {block.bulleted_list_item.rich_text.map((text, idx) => (
                  <li key={idx}>
                    {text.href !== null ? (
                      <Link key={index} href={text.href} target="_blank" rel="noreferrer">
                        <span className='underline'>{text.plain_text}</span>
                      </Link>
                    ) : ('text' in text ? (
                      text.plain_text
                    ) : null)}
                  </li>
                ))}
            </ul>
            );
          case "image":
            return (
              <figure key={block.id} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '2rem',
              }}>
                <Image width={600} height={600} src={block.image.type === 'file' ? block.image.file.url : block.image.external.url} alt="Notion Image" />
              </figure>
            );
          default:
            return null;
        }
      })}
      </main>
    </div>
  );
}