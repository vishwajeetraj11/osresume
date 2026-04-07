import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import React, { forwardRef } from 'react';

const STRONG_SKILL_TITLES = ['Languages', 'Developer Tools', 'Technologies / Frameworks'];

const formatDateRange = (startedAt, endedAt) => {
  if (startedAt && endedAt) return `${startedAt} - ${endedAt}`;
  return startedAt || endedAt || '';
};

const splitBullets = value =>
  `${value || ''}`
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

const simplifyUrl = value => `${value || ''}`.replace(/^https?:\/\//, '').replace(/\/$/, '');

const ContactItem = ({ Icon, children, href }) => {
  const content = (
    <>
      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
      <span>{children}</span>
    </>
  );

  return href ? (
    <a href={href} className="inline-flex items-center gap-1.5">
      {content}
    </a>
  ) : (
    <span className="inline-flex items-center gap-1.5">{content}</span>
  );
};

const SectionHeading = ({ children }) => (
  <div className="mt-4 border-b border-gray-400 pb-0.5">
    <h2 className="font-semibold text-[14px] leading-tight">{children}</h2>
  </div>
);

const BulletList = ({ items, className = '' }) => (
  <ul className={`mt-1 list-disc pl-5 space-y-1 ${className}`}>
    {items.map(item => (
      <li key={item} className="pl-1">
        {item}
      </li>
    ))}
  </ul>
);

const ClassicAts = forwardRef(({ customStyles, extrasData, personalData, educationData, experienceData, projectsData, leadershipData }, ref) => {
  const coursework = extrasData.find(item => item.title === 'Relevant Coursework');
  const technicalSkills = extrasData.filter(item => STRONG_SKILL_TITLES.includes(item.title));
  const headerItems = [
    personalData?.phoneNumber && { Icon: Phone, value: personalData.phoneNumber },
    personalData?.email && { Icon: Mail, value: personalData.email, href: `mailto:${personalData.email}` },
    personalData?.linkedinUrl && { Icon: Linkedin, value: simplifyUrl(personalData.linkedinUrl), href: personalData.linkedinUrl },
    personalData?.githubUrl && { Icon: Github, value: simplifyUrl(personalData.githubUrl), href: personalData.githubUrl },
  ].filter(Boolean);

  return (
    <div
      id="t1"
      ref={ref}
      className="resume-a4 bg-white overflow-hidden px-[34px] py-[22px] text-[10.5px] leading-[1.25] text-black"
      style={{ fontFamily: customStyles?.font || "'Computer Modern Serif', serif" }}
    >
      <div className="h-full border-t-[6px] border-gray-200">
        <header className="pt-5 text-center">
          <p className="text-[34px] font-medium uppercase tracking-[0.08em] leading-none">{personalData?.name}</p>
          {!!personalData?.address && <p className="mt-1 text-[10.5px]">{personalData.address}</p>}
          {!!headerItems.length && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px]">
              {headerItems.map(item => (
                <ContactItem key={`${item.value}-${item.href || 'plain'}`} Icon={item.Icon} href={item.href}>
                  {item.value}
                </ContactItem>
              ))}
            </div>
          )}
        </header>

        {!!educationData.length && (
          <section>
            <SectionHeading>Education</SectionHeading>
            <div className="space-y-2 pt-1.5">
              {educationData.map(edu => (
                <div key={edu.id || edu._id}>
                  <div className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                    <h3 className="font-semibold text-[12px]">{edu.institution}</h3>
                    <p className="font-semibold text-[12px]">{formatDateRange(edu.startedAt, edu.endedAt)}</p>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-4 italic">
                    <p>{edu.major}</p>
                    {!!edu.country && <p>{edu.country}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {!!coursework?.items?.length && (
          <section>
            <SectionHeading>Relevant Coursework</SectionHeading>
            <ul className="grid grid-cols-4 gap-x-6 gap-y-1 pt-1.5 list-disc pl-5">
              {coursework.items.map(item => (
                <li key={item} className="pl-1">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {!!experienceData.length && (
          <section>
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-3 pt-1.5">
              {experienceData.map(exp => {
                const bullets = splitBullets(exp.description);
                return (
                  <div key={exp.id || exp._id}>
                    <div className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                      <h3 className="font-semibold text-[12px]">{exp.company}</h3>
                      <p className="font-semibold text-[12px]">{formatDateRange(exp.startedAt, exp.endedAt)}</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-4 italic">
                      <p>{exp.designation}</p>
                      {!!exp.country && <p>{exp.country}</p>}
                    </div>
                    {!!bullets.length && <BulletList items={bullets} />}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {!!projectsData.length && (
          <section>
            <SectionHeading>Projects</SectionHeading>
            <div className="space-y-3 pt-1.5">
              {projectsData.map(project => {
                const bullets = splitBullets(project.description);
                const title = project.techStack ? `${project.title} | ${project.techStack}` : project.title;
                return (
                  <div key={project.id || project._id}>
                    <div className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                      <h3 className="font-semibold text-[12px]">{title}</h3>
                      <p className="font-semibold text-[12px]">{formatDateRange(project.startedAt, project.endedAt)}</p>
                    </div>
                    {!!bullets.length && <BulletList items={bullets} />}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {!!technicalSkills.length && (
          <section>
            <SectionHeading>Technical Skills</SectionHeading>
            <div className="space-y-0.5 pt-1.5">
              {technicalSkills.map(skillGroup => (
                <p key={skillGroup.title}>
                  <span className="font-semibold">{skillGroup.title}:</span> {skillGroup.items.join(', ')}
                </p>
              ))}
            </div>
          </section>
        )}

        {!!leadershipData.length && (
          <section>
            <SectionHeading>Leadership / Extracurricular</SectionHeading>
            <div className="space-y-3 pt-1.5">
              {leadershipData.map(entry => {
                const bullets = splitBullets(entry.description);
                return (
                  <div key={entry.id || entry._id}>
                    <div className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                      <h3 className="font-semibold text-[12px]">{entry.organization}</h3>
                      <p className="font-semibold text-[12px]">{formatDateRange(entry.startedAt, entry.endedAt)}</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-4 italic">
                      <p>{entry.role}</p>
                      {!!entry.location && <p className="text-right">{entry.location}</p>}
                    </div>
                    {!!bullets.length && <BulletList items={bullets} />}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});

ClassicAts.displayName = 'ClassicAts';

export default ClassicAts;
