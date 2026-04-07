import { Github } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import React from 'react';
import { BuyMeACoffee } from '../components/SVGs';
import { Faq } from '../components/landing/Faq';
import { features } from '../shared/contants';

const stats = [
  { num: '4', label: 'ATS-friendly templates' },
  { num: '100%', label: 'Free, forever' },
  { num: '0', label: 'Watermarks' },
  { num: 'Open', label: 'Source on GitHub' },
];

const templates = [
  { name: 'Onyx', src: '/templates/Onyx.jpg' },
  { name: 'Trical', src: '/templates/Trical.jpg' },
  { name: 'Jake', src: '/templates/Jake.jpg' },
  { name: 'Classic ATS', src: '/templates/ClassicAts.svg' },
];

export default function Home() {
  const date = new Date();

  const onClick = event => {
    try {
      window.fbq('trackCustom', event);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>OS Resume | Oversimplifying Resume building experience.</title>
        <meta property="og:title" content="OS Resume: Oversimplified Resume Builder" />
        <meta
          property="og:description"
          content="The best free online resume builder that'll land you interviews. Create a professional resume in minutes. Download or print your resume for free."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OS Resume" />
        <meta property="og:url" content="https://osresume.vercel.com/" />
      </Head>

      <Script
        id="meta-pixel"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '253902167786104');
fbq('track', 'PageView');
`,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=253902167786104&ev=PageView&noscript=1"
        />
      </noscript>

      {/* Hero */}
      <section className="min-h-screen flex items-center bg-white">
        <div className="max-w-screen-xl mx-auto w-full px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 py-24 lg:py-0">
          <div className="flex-1 min-w-0">
            <span className="animate-fade-up text-xs font-semibold tracking-widest uppercase text-primary">
              Open Source · Free Forever
            </span>
            <h1 className="animate-fade-up delay-100 mt-5 tracking-tight leading-[1.0]">
              <span className="block text-6xl lg:text-[5.5rem] font-light text-[#101214]">Build your</span>
              <span className="block text-6xl lg:text-[5.5rem] font-bold text-[#101214]">resume.</span>
            </h1>
            <p className="animate-fade-up delay-200 mt-8 text-lg text-[#73808D] leading-relaxed max-w-md">
              Professional templates, intuitive editor, PDF export — everything you need to land your next interview.
            </p>
            <div className="animate-fade-up delay-300 mt-10 flex flex-wrap items-center gap-6">
              <Link
                onClick={() => onClick('start-building-tapped-main')}
                href="/templates"
                className="px-8 py-4 bg-primary text-white text-sm font-medium rounded hover:bg-[#0b8a72] transition-colors duration-150"
              >
                Start Building
              </Link>
              <a
                href="https://github.com/vishwajeetraj11/osresume"
                target="_blank"
                rel="noreferrer"
                onClick={() => onClick('github-hero')}
                className="flex items-center gap-2 text-sm text-[#73808D] hover:text-[#101214] transition-colors duration-150"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>
          <div className="hidden lg:block w-[440px] flex-shrink-0">
            <img
              src="/images/landing-resume.webp"
              alt="Resume preview"
              className="animate-fade-in delay-200 w-full shadow-2xl"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[#101214] py-14">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x lg:divide-white/10">
            {stats.map(({ num, label }, index) => (
              <div
                key={label}
                className="animate-fade-up text-center lg:px-8"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary">{num}</div>
                <div className="mt-2 text-sm text-white/50 tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-28 bg-[#f9fafb]">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary">How it works</p>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-[#101214]">
            Simple. Fast. Effective.
          </h2>
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {features.map((feature, index) => (
              <div key={feature.id}>
                <span
                  className="text-8xl font-bold select-none leading-none block"
                  style={{ color: '#0d9e84', opacity: 0.18 }}
                >
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-[#101214]">{feature.title}</h3>
                <p className="mt-3 text-base text-[#73808D] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editor Demo */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary text-center">See it in action</p>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-[#101214] text-center">Watch the editor</h2>
          <div className="mt-12 overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="560px"
              src="https://www.youtube.com/embed/plFUCIFGOVc"
              title="OS Resume Editor Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="hidden lg:block"
            />
            <iframe
              width="100%"
              height="315px"
              src="https://www.youtube.com/embed/plFUCIFGOVc"
              title="OS Resume Editor Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="block lg:hidden"
            />
          </div>
        </div>
      </section>

      {/* Templates showcase */}
      <section className="py-28 bg-[#f9fafb]">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary">Templates</p>
          <div className="mt-3 flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-14">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#101214]">
              Four templates.<br />All ATS-ready.
            </h2>
            <Link
              href="/templates"
              onClick={() => onClick('browse-templates')}
              className="text-sm font-medium text-primary hover:underline flex-shrink-0"
            >
              Browse all →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {templates.map(({ name, src }) => (
              <Link
                href="/templates"
                key={name}
                onClick={() => onClick('template-preview-tapped')}
                className="group"
              >
                <div className="overflow-hidden shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-200">
                  <img
                    src={src}
                    alt={`${name} template preview`}
                    className="w-full aspect-[210/297] object-cover object-top bg-white"
                    draggable={false}
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-[#73808D] text-center">{name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f9fafb]">
        <Faq />
      </section>

      {/* CTA */}
      <section className="bg-[#101214] py-28 px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Ready to land<br />your next job?
            </h2>
            <p className="mt-4 text-[#73808D]">Free, forever. No credit card required.</p>
          </div>
          <Link
            href="/templates"
            onClick={() => onClick('start-building-tapped-secondary')}
            className="flex-shrink-0 px-10 py-4 bg-primary text-white font-medium rounded hover:bg-[#0b8a72] transition-colors duration-150 whitespace-nowrap"
          >
            Start Building — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#101214] border-t border-white/5 px-6 lg:px-8 py-8">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#73808D]">© OS Resume {date.getFullYear()}</p>
          <div className="flex items-center gap-8">
            <a
              href="https://github.com/vishwajeetraj11/osresume"
              target="_blank"
              rel="noreferrer"
              onClick={() => onClick('github')}
              className="flex items-center gap-2 text-sm text-[#73808D] hover:text-white transition-colors duration-150"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://www.buymeacoffee.com/vishwajeetraj11"
              target="_blank"
              rel="noreferrer"
              onClick={() => onClick('buy-me-a-coffee')}
              className="text-[#73808D] hover:text-white transition-colors duration-150"
            >
              <BuyMeACoffee height={32} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
