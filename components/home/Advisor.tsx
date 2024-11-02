'use client'

import React, { useRef } from 'react'
import GridLayout from '../GridLayout'
import styles from './advisor.module.scss'
import Image from 'next/image'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

import advisors from '@/app/constants/advisors'

gsap.registerPlugin(ScrollTrigger);

const Advisor = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if(!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll('div');
    gsap.from(elements, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reset',
      },
    });
  }, []);

  return (
    <GridLayout>
      <div className="flex w-full justify-center items-center pb-10" ref={titleRef}>
        <div className="w-full bg-gradient-to-r from-[#0b0b09] to-[#ffffff42] h-[2px]"></div>
        <h1
          className="text-base text-nowrap mx-3"
          aria-label="Backed by the best"
        >
          ADVISORS FROM FORTUNE 500 GLOBAL COMPANIES
        </h1>
        <div className="w-full bg-gradient-to-r to-[#0b0b09] from-[#ffffff42] h-[2px]"></div>
      </div>
      <div className={`${styles.advisor__grid__container}`}  ref={containerRef}>
        {
            advisors.map((item, index) => (
                <div key={index}>
                    <Image src={item.image} alt="Advisors" width={200} height={100}/>
                </div>
            ))
        }
      </div>
    </GridLayout>
  )
}

export default Advisor