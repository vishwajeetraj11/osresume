import { Button } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Faq } from '../components/landing/Faq';
import { BuyMeACoffee } from '../components/SVGs';
import { features } from '../shared/contants';

export default function Home() {
  // const desktop = useMediaQuery('(min-width:1024px)');
  return (
    <>
      <Head>
        <title>OS Resume | Oversimplifying Resume building experience.</title>
        <meta property="og:title" content="OS Resume: Oversimplified Resume Builder" />
        <meta
          property="og:description"
          content="The best free online resume builder that’ll land you interviews. Create a professional resume in minutes. Download or print your resume for free."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OS Resume" />
        <meta property="og:url" content="https://osresume.vercel.com/" />
      </Head>

      {/* Landing Section */}
      <section className="min-h-screen p-10 lg:p-30 landing-container opacity-100 transition-all flex flex-col lg:block justify-center lg:justify-start items-center lg:items-start">
        {' '}
        <div className="flex flex-col lg:flex-row justify-center mb-4 md:mb-3">
          <h1 className="text-2xl lg:text-4xl text-left lg:text-center text-white font-semibold mr-3">Oversimplifying Resume</h1>
          <h1 className="text-2xl lg:text-4xl text-left lg:text-center text-white font-semibold">Building Process</h1>
        </div>
        <h1 className="text-lg text-center text-white font-medium mb-6">Create your professional resume in 15 minutes</h1>
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
      </section>

      {/* Features Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 lg:px-10 py-24 mx-auto">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-20">How it works!</h1>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            {features.map(feature => (
              <div key={feature.id} className="p-4 md:w-1/3 flex">
                <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4 flex-shrink-0">
                  {feature.Icon}
                </div>
                <div className="flex-grow pl-6">
                  <h2 className="text-gray-900 text-lg title-font font-medium mb-2">{feature.title}</h2>
                  <p className="leading-relaxed text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Building Now Section */}
      <section className="landing-container">
        <div className="container px-5 lg:px-10 py-24 min-h-screen flex flex-col justify-center mx-auto w-10/12 sm:w-8/12 lg:w-5/12">
          <h2 className="text-center font-bold  text-2xl sm:text-3xl text-white">
            User-friendly. Professional. Effective. Try OS Resume today!
          </h2>
          <p className="mt-6 font-medium text-gray-50">
            How long does it take to write a resume? Hours? Days? With OS Resume you can be done in minutes. Create a convincing and
            effective resume in several clicks. Choose a design, fill in your details and ideas. Fast and simple.
          </p>
          <div className="flex justify-center mt-6">
            <Link href="/templates">
              <a className="px-6 py-4 text-md bg-primary text-white rounded shadow-sm" href="/templates">
                Start Building Now!
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Resume Editor Demo Youtube Video  */}
      <section className="flex flex-col items-center justify-center p-3 lg:p-10">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-10 lg:mb-20">Resume Editor Demo</h1>
        <iframe
          width="70%"
          height="500px"
          src="https://www.youtube.com/embed/plFUCIFGOVc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="hidden lg:block"
        />
        <iframe
          width="90%"
          height="315px"
          src="https://www.youtube.com/embed/plFUCIFGOVc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="block lg:hidden"
        />
      </section>

      {/* FAQS */}
      <Faq />

      {/* Links */}
      <div className="px-6 py-6 bg-gray-700 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center w-10/12 lg:w-9/12 mx-auto mb-10 lg:mb-20">
        <div className="xl:w-0 xl:flex-1">
          <h2 className="text-2xl leading-8 font-bold tracking-tight text-white sm:text-3xl sm:leading-9">
            Check out the Github Repository
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-6 text-gray-200">
            The project is Open Source. Feel free to have a look around the repository. If you find OS Resume useful consider suporting me
            with a coffee or a star on the repository.
          </p>
        </div>
        <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
          <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <a target="_blank" href="https://github.com/vishwajeetraj11/osresume" rel="noreferrer">
              <Button className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white  transition duration-150 ease-in-out mb-4">
                <GitHubIcon /> <p className="ml-4">Github</p>
              </Button>
            </a>

            <a target="_blank" href="https://www.buymeacoffee.com/vishwajeetraj11" rel="noreferrer">
              <Button className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white  transition duration-150 ease-in-out">
                <BuyMeACoffee height={50} />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer  sm:p-3 md:p-4 lg:-5 mx-10 flex flex-row justify-between">
        <p className="">&copy; OS Resume 2021</p>
        <p className="">Next.js + Clerk </p>
      </div>
    </>
  );
}
