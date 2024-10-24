'use client'

import Image from 'next/image'
// import { useRouter } from 'next/navigation'
import { fetchPages } from '../lib/notion'
import { DatabaseObjectResponse, PageObjectResponse, PartialDatabaseObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';

export default function Blogs () {

//   const router = useRouter();

  const [posts, setPosts] = useState<PageObjectResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

//   const response = await fetch('http://localhost:3000/api/notion/blogs')

//   const data = await response.json();

//   console.log(data, "dfvjknkj")

  useEffect(() => {
    const fetchAllPosts = async() => {
        setLoading(true)
        const reponse = await fetch('/api/notion/blogs');

            const data = await reponse.json();

            console.log(data, "dkfjvnjk")

            if(data) {
                // console.log(data[0]?.properties.coverimage.files[0].file.url)
                setPosts(data);
            }
            console.log(data);
            setLoading(false)
    }

    fetchAllPosts();
  },[])


  return (
    <div className='h-screen w-screen p-10 grid grid-cols-1 grid-rows-3 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {
            loading ? <div className='w-screen h-screen flex justify-center items-center'>
                    <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        />
            </div> : (
                    posts.map((post : PageObjectResponse, index : number) => {
                const slug = post?.properties.slug as { type: 'rich_text'; rich_text: { plain_text: string }[] };
                return(
                    <Link href={`http://localhost:3000/blogs/${slug.rich_text[0].plain_text}`} key={index}>
                        <div key={index} className='border border-[#242422] h-[22rem] max-w-max rounded-xl flex flex-col justify-center items-center gap-3 overflow-hidden w-[25rem] cursor-pointer'>
                            <div className='w-full flex justify-center items-center'>
                                (
                                    <Image src={post?.cover?.type=== 'file' ? post?.cover.file.url : ''} alt="Parineeta" width={500} height={500} />
                                )
                            </div>
                            <div className='w-full py-2'>
                                {/* <div>
                                    <p>Company</p>
                                </div> */}
                                <div className='p-3'>
                                    <div className='text-xl font-bold mb-6'>
                                        <p>{(post?.properties.Name as any)?.title ? (post.properties.Name as any).title[0].plain_text : 'Untitled'}</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-gray-600'>Parineeta</p>
                                        <p className='text-gray-600'>Oct 19,2024 | 7minutes</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Link>
                        )})
                        )
        }
    </div>
  )
}