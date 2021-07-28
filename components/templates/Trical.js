import React from 'react';

class Trical extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      data: { personalData, experiences, extras, education },
      customStyles,
    } = this.props;

    return (
      <div id="t1" className="resume-a4 bg-white flex justify-between overflow-hidden" style={{ fontFamily: customStyles.font }}>
        <div className="w-full">
          <div className="flex justify-center flex-col relative pt-12">
            <h1 className="pl-20 font-semibold text-t2-xl tracking-widest text-t1-black uppercase" style={{ letterSpacing: '7px' }}>
              {personalData?.name && personalData?.name?.split(' ')[0]}
            </h1>
            <h1 className="pl-20 z-10 font-bold text-t2-2xl text-t2-primary uppercase" style={{ letterSpacing: '12px' }}>
              {personalData?.name && personalData?.name?.split(' ')[1]}
            </h1>
            <h3
              className="pr-20 top-5 font-medium text-t2-md text-t2-primary uppercase absolute w-full bg-t2-secondary text-right"
              style={{ letterSpacing: '5px', top: '6.2rem' }}
            >
              {personalData?.designation}
            </h3>
          </div>
          <div className="flex flex-row justify-between p-20 pt-14">
            <div className="w-8/12">
              {personalData?.objective && (
                <>
                  <Title>Career Objective</Title>
                  <p className="mb-12 text-t2-md">{personalData?.objective}</p>
                </>
              )}
              {!!education.length && <Title>my education</Title>}
              <div className="flex flex-row justify-between mb-12 flex-wrap">
                {education.map((edu, i) => (
                  <Description classes="mb-3" key={edu.id} index={i}>
                    <Paragraph classes="text-t2-sub-heading font-bold">
                      {`${edu?.startedAt?.split(' ')[1]} -${edu?.endedAt?.split(' ')[1]}`}
                    </Paragraph>
                    <Paragraph classes="text-t2-sub-heading font-bold">{edu.major}</Paragraph>
                    <Paragraph>{edu.institution}</Paragraph>
                    <Paragraph>{edu.country}</Paragraph>
                  </Description>
                ))}
              </div>

              {!!experiences.length && <Title classes="mt-8">work experience</Title>}
              <div className="flex flex-col justify-between">
                {experiences.map((exp, i) => (
                  <Description classes="mb-4" key={exp.id} index={i}>
                    <Paragraph>
                      {`${exp.startedAt} -${exp.endedAt} | ${exp.country} | ${exp.years} ${exp.years === '1' ? ' year' : ' years'}`}
                    </Paragraph>
                    <Paragraph classes="text-t2-sub-heading font-semibold">{exp.designation}</Paragraph>
                    <Paragraph classes="text-t2-sub-heading font-medium">{exp.company}</Paragraph>
                    <Paragraph>{exp.description}</Paragraph>
                  </Description>
                ))}
              </div>
            </div>
            <div className="w-3/12">
              {(personalData?.email || personalData?.phoneNumber) && <Title>contact</Title>}
              <Paragraph classes="word-keep-all">{personalData?.email}</Paragraph>
              <Paragraph>{personalData?.phoneNumber}</Paragraph>
              {extras.map(item => (
                <div key={item.id}>
                  <Paragraph classes="text-t2-sub-heading font-semibold mt-6 mb-3">{item.title}</Paragraph>
                  {item.type === 'NEW_LINE' ? (
                    item.items.map((e, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Paragraph className="text-t2-sm leading-6" key={index}>
                        {e}
                      </Paragraph>
                    ))
                  ) : (
                    <Paragraph className="text-t2-sm leading-6">
                      {item.items.map((e, i) => (i === item.items.length - 1 ? `${e}` : `${e}, `))}
                    </Paragraph>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Trical;

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
