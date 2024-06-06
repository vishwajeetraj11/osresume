import React, { forwardRef } from 'react';

const JakePaulTemplate = forwardRef(({ extrasData, personalData, educationData, experienceData }, ref) => (
  <div
    id="jake-paul-template"
    className="resume-a4 bg-white flex justify-between overflow-hidden"
    ref={ref}
    style={{ fontFamily: "'Computer Modern Serif', serif", fontSize: '11pt', fontWeight: 500 }}
  >
    <div className="w-full">
      <div className="flex justify-center mb-4  flex-col text-center  pt-12 bg-top-color">
        <h1 className="text-4xl font-bold" style={{ letterSpacing: '0px' }}>
          {personalData?.name}
        </h1>
        <p className="font-bold" style={{ letterSpacing: '0px' }}>
          {personalData?.designation}
        </p>
        <p className="text-gray-600" style={{ letterSpacing: '1px' }}>
          {personalData?.email} | {personalData.phoneNumber} | <a href={`https://github.com/${personalData?.github}`}>Github</a> |
          <a href={`https://linkedin.com/in/${personalData?.linkedin}`}> LinkedIn</a>
        </p>
      </div>
      <div className="px-10">
        <h2 class="mb-4 border-b-2 text-xl font-semibold">Education</h2>
        {educationData.map((edu, i) => (
          <div class="mb-6">
            <h3 class="text-lg font-semibold">{edu?.institution}</h3>
            <p class="italic">{edu?.major}</p>
            <div class="flex justify-between">
              <p>{edu.country}</p>
              <p>{`${edu?.startedAt?.split(' ')[1]} - ${edu?.endedAt?.split(' ')[1]}`}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-10 mt-10">
        <h2 class="mb-4 border-b-2 text-xl font-semibold">Experience</h2>
        {experienceData.map((exp, i) => (
          <div class="mb-6">
            <h3 class="text-lg font-semibold">{exp?.company}</h3>
            <p class="italic">{exp?.designation}</p>
            <div class="flex justify-between">
              <p>{exp.country}</p>
              <p>{`${exp.startedAt} - ${exp.endedAt} | ${exp.country} | ${exp.years} ${exp.years === '1' ? 'year' : 'years'}`}</p>
            </div>
            {exp.description !== 'Sample Description' ? (
              <ul className="list-disc mt-2">
                {exp.description.split('\n').map(p => (
                  <li>{p}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      {/* Projects */}

      {/* <div className="px-10 mx-auto">
        <h2 class="mb-4 border-b-2 text-xl font-semibold">Projects</h2>

        <div class="mb-6">
          <h3 class="text-lg font-semibold">Gityltics | Python, Flask, React, PostgreSQL, Docker</h3>
          <div class="flex justify-between">
            <p>June 2020 – Present</p>
          </div>
          <ul class="mt-2 list-inside list-disc text-gray-700">
            <li>Developed a full-stack web application using Flask serving as REST API with React as the frontend.</li>
            <li>Implemented GitHub OAuth to get data from user’s repositories.</li>
            <li>Visualized GitHub data to show collaboration.</li>
            <li>Used Celery and Redis for asynchronous tasks.</li>
          </ul>
        </div>
      </div> */}


      
      {extrasData.map(item => (
        <div key={item.id} className="px-10 mx-auto">
          <h2 class="mb-4 border-b-2 pb-1 text-2xl font-semibold">{item.title}</h2>
          {item.type === 'NEW_LINE' ? (
            item.items.map((e, index) => (
              <ul class="list-inside list-disc text-gray-700" key={index}>
                <li>{e}</li>
              </ul>
            ))
          ) : (
            <Paragraph className="text-t2-sm leading-6">
              {item.items.map((e, i) => (i === item.items.length - 1 ? `${e}` : `${e}, `))}
            </Paragraph>
          )}
        </div>
      ))}
      {/* <section class="mb-10 px-10 mx-auto">
        <h2 class="mb-4 border-b-2 pb-1 text-2xl font-semibold">Technical Skills</h2>
        <ul class="list-inside list-disc text-gray-700">
          <li>Languages: Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R</li>
          <li>Frameworks: React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI</li>
          <li>Developer Tools: Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse</li>
          <li>Libraries: pandas, NumPy, Matplotlib</li>
        </ul>
      </section> */}
    </div>
  </div>
));

export default JakePaulTemplate;

const Title = ({ children, classes }) => (
  <h4 className={`uppercase font-bold text-t2-lg text-t2-primary mb-6 ${classes}`} style={{ letterSpacing: '3px' }}>
    {children}
  </h4>
);

const Paragraph = ({ children, classes }) => (
  <p className={`font-regular text-t2-md text-t2-paragraph mb-1 ${classes || ''}`}>{children}</p>
);

const Description = ({ children, index, classes }) => (
  <div className={`flex flex-row ${classes || ''}`}>
    <div className="flex flex-col mr-4 items-center">
      <span className="bg-t2-secondary py-2 px-2.5 mb-1 text-t2-primary font-bold text-t2-md leading-4 h-8 w-8 flex items-center justify-center">
        {index + 1}
      </span>
      <span className="bg-t2-primary h-full w-0.5" />
    </div>
    <div>{children}</div>
  </div>
);
