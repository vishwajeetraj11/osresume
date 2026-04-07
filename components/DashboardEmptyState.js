import Link from 'next/link';
import React from 'react';

const steps = [
  {
    num: '01',
    label: 'Pick a template',
    detail: 'Four ATS-friendly layouts, professionally designed.',
  },
  {
    num: '02',
    label: 'Fill in your details',
    detail: 'Experience, education, skills — all in one place.',
  },
  {
    num: '03',
    label: 'Export as PDF',
    detail: 'One click. Properly formatted. No watermarks.',
  },
];

const DashboardEmptyState = () => (
  <div className="col-span-full py-16 flex flex-col">
    <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-5">Getting Started</p>
    <h2 className="text-4xl font-bold text-[#101214] leading-tight mb-3">
      Your first resume
      <br />
      starts here.
    </h2>
    <p className="text-default text-sm mb-12">Build a job-ready resume in under 15 minutes.</p>

    <div className="flex flex-col lg:flex-row gap-10 mb-12 max-w-xl">
      {steps.map(({ num, label, detail }, i) => (
        <React.Fragment key={num}>
          <div className="flex-1">
            <span
              className="block text-5xl font-bold leading-none mb-4"
              style={{ color: '#0d9e84', opacity: 0.22 }}
            >
              {num}
            </span>
            <p className="text-sm font-semibold text-[#101214] mb-1">{label}</p>
            <p className="text-xs text-default leading-relaxed">{detail}</p>
          </div>
          {i < steps.length - 1 && (
            <div className="hidden lg:flex items-center text-xl" style={{ color: '#d1d5db' }}>
              →
            </div>
          )}
        </React.Fragment>
      ))}
    </div>

    <Link href="/templates">
      <span className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-[#12836d] transition-colors duration-150 cursor-pointer">
        Browse Templates
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  </div>
);

export default DashboardEmptyState;
