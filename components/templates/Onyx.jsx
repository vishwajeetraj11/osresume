import React, { forwardRef } from 'react';

export const Onyx = forwardRef(({ customStyles, extrasData, educationData, personalData, experienceData }, ref) => {
  return (
    <div
      ref={ref}
      id="t1"
      className="resume-a4 bg-white flex justify-between py-[36px] px-[48px] overflow-hidden"
      style={{ fontFamily: customStyles.font }}
    >
      <div className="left w-8/12 bg-yellow-4000">
        <div className="header-left">
          <div className="h-32 flex justify-center flex-col">
            <h1 className="font-semibold text-t1-xl text-t1-black capitalize">{personalData?.name}</h1>
            <h2 className="font-normal text-t1-lg text-t1-black capitalize">{personalData?.designation}</h2>
          </div>
        </div>
        <div className="">
          <p className="tracking-widest uppercase text-t1-md text-t1-black">{personalData?.objective && 'Career Objective'}</p>
          <p className="text-t1-md mb-3 font-normal text-t1-black">{personalData?.objective}</p>
          <p className="tracking-widest uppercase text-t1-md text-t1-black">{experienceData.length > 0 && 'Experience'}</p>
          {experienceData.map(exp => (
            <div key={exp.id} className="mb-4">
              <h4 className="capitalize text-t1-md mb-1 font-semibold text-t1-black">{exp.designation}</h4>
              <h5 className="capitalize text-t1-sm mb-1 font-normal text-t1-black">{exp.company}</h5>
              <p className="text-t1-xs text-t1-gray  mb-1 font-normal">
                {`${exp.startedAt} - ${exp.endedAt} - ${exp.years}`}
                {`${exp.years === '1' ? ' year' : ' years'}, ${exp.country}`}
              </p>
              <p className="text-t1-md mb-1 font-normal text-t1-black">{exp.description}</p>
            </div>
          ))}
        </div>
        <div className="">
          <p className="tracking-widest uppercase text-t1-md text-t1-black">{educationData.length > 0 && 'Education'}</p>
          {educationData.map(edu => (
            <div key={edu.id} className="mb-4">
              <h4 className="capitalize text-t1-md mb-1 font-semibold text-t1-black">{edu.major}</h4>
              <h5 className="capitalize text-t1-sm mb-1 font-normal text-t1-black">{edu.institution}</h5>
              <p className="text-t1-xs text-t1-gray  mb-1 font-normal">
                {`${edu.startedAt} - ${edu.endedAt} - `}
                <span className="capitalize">{edu.country}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="right w-3/12">
        {/* <div className="header-right h-32 flex items-center">
            <div>{data?.photo?.src && <img draggable={false} src={data.photo.src} alt={data?.personalData?.name} />}</div>
          </div> */}
        <div className="mb-6">
          <p className="text-t1-gray text-t1-sm" style={{ wordBreak: 'keep-all' }}>
            {personalData?.email}
          </p>
          <p className="text-t1-gray text-t1-sm">{personalData?.phoneNumber}</p>
          <p className="text-t1-gray text-t1-sm">{personalData?.country}</p>
        </div>
        {extrasData.map(item => (
          <div key={item.id} className="mb-2">
            <p className="text-t1-gray capitalize font-semibold text-t1-sm">{item.title}</p>
            {item.type === 'NEW_LINE' ? (
              item.items.map((e, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <p className="capitalize text-t1-gray font-light text-t1-sm leading-6" key={index}>
                  {e}
                </p>
              ))
            ) : (
              <p className="capitalize text-t1-gray font-light text-t1-sm leading-6">
                {item.items.map((e, i) => (i === item.items.length - 1 ? `${e}` : `${e}, `))}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Onyx;
