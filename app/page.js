"use client";
import Header from '@/components/Header'
import Feed from '@/components/Feed'
import Head from 'next/head'
import Image from 'next/image'
import Modal from '@/components/Modal';

export default function Home() {
  return (
      <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
       {/*Header*/}
       <Header />

       {/*Feed*/}
       <Feed />

       {/*Modal*/}
       <Modal />
      </div>
  )
}
