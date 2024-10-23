'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { fetchPages } from '../lib/notion'
import { DatabaseObjectResponse, PageObjectResponse, PartialDatabaseObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const Blogs = () => {

  const router = useRouter();

  const [posts, setPosts] = useState<PageObjectResponse[]>([]);

  useEffect(() => {
    const fetchAllPosts = async() => {
        const reponse = await fetch('/api/notion/blogs');

            const data = await reponse.json();

            console.log(data, "dkfjvnjk")

            if(data) {
                // console.log(data[0]?.properties.coverimage.files[0].file.url)
                setPosts(data);
            }
            console.log(data);
    }

    fetchAllPosts();
  },[])

  if(!posts) return <div>Loading...</div>
    
  return (
    <div className='h-screen w-screen p-10 grid grid-cols-1 grid-rows-3 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {
            posts.map((post, index) => {
                return(
                <div key={index} className='border border-[#242422] h-[22rem] max-w-max rounded-xl flex flex-col justify-center items-center gap-3 overflow-hidden w-[25rem] cursor-pointer' onClick={() => {
                    const slug = post?.properties.slug;
                    if (slug && 'rich_text' in slug) {
                        router.push(`/blogs/${slug.rich_text[0].plain_text}`);
                    }
                }}>
                    <div className='w-full flex justify-center items-center'>
                        {post?.properties.coverimage.type === 'files' && (
                            <Image src={post.properties.coverimage.files[0].file.url} alt="Parineeta" width={500} height={500} />
                        )}
                    </div>
                    <div className='w-full py-2'>
                        {/* <div>
                            <p>Company</p>
                        </div> */}
                        <div className='p-3'>
                            <div className='text-xl font-bold mb-6'>
                                <p>{post?.properties.Name ? post.properties.Name.title[0].plain_text : 'Untitled'}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='text-gray-600'>Parineeta</p>
                                <p className='text-gray-600'>Oct 19,2024 | 7minutes</p>
                            </div>
                        </div>

                    </div>
                </div>
            )})
        }
    </div>
  )
}

export default Blogs
