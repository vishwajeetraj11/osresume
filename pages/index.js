import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const bgImgDivRef = useRef(null);

  useEffect(() => {
    // const bgImgDiv = document.querySelector('.landing-container');
    // const imageUrl = '/images/landing-resume-1.jpg';
    // const img = new Image();
    // img.src = imageUrl;
    // img.onload = () => {
    //   bgImgDiv.style.backgroundImage = `url(${imageUrl})`;
    //   bgImgDiv.classList.add('opacity-100');
    //   // setLoading(false);
    // };
  }, []);

  return (
    <>
      <Head>
        <title>OS Resume | Oversimplifying Resume building experience.</title>
        <meta property="og:title" content="OS Resume: Online Resume Builder" />
        <meta
          property="og:description"
          content="The best free online resume builder that’ll land you interviews. Create a professional resume in minutes. Download or print your resume for free."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OS Resume" />
        <meta property="og:url" content="https://osresume.vercel.com/" />
      </Head>
      <div className="min-h-screen p-10 lg:p-30 landing-container opacity-100 transition-all">
        {' '}
        <div className="flex flex-col lg:flex-row justify-center mb-3">
          <h1 className="text-2xl lg:text-4xl text-left lg:text-center text-white font-semibold mr-3">Oversimplifying Resume</h1>
          <h1 className="text-2xl lg:text-4xl text-left lg:text-center text-white font-semibold">Building Process</h1>
        </div>
        <h1 className="text-lg text-left lg:text-center text-white font-medium mb-6">Create your professional resume in 15 minutes</h1>
        <div className="flex justify-start lg:justify-center mb-6">
          <Link href="/templates">
            <a className="px-6 py-4 text-md bg-primary text-white rounded shadow-sm" href="/templates">
              Start Building
            </a>
          </Link>
        </div>
        <div className="hidden lg:block relative rounded overflow-hidden shadow-sm">
          <img src="/images/landing-resume.png" alt="Lanidng page Resume" />
        </div>
      </div>
    </>
  );
}
