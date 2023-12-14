import React from 'react';
import t1 from '../../styles/template1.module.scss';

class Dee extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { data, customStyles } = this.props;
    return (
      <div
        id="t1"
        className={`resume-a4 bg-white ${t1.container} overflow-hidden`}
        style={{ fontFamily: customStyles ? customStyles.font : 'Raleway' }}
      >
        <h1 className="text-3xl text-center">Vishwajeet Raj</h1>
        <p className="text-center border-b pb-2 border-gray-300">vishwajeetraj11@gmail.com | <span>+91 8507407214</span></p>

        <div className="mt-2 flex justify-between">
          <div className="left w-8/12 bg-yellow-4000">
            <p className="text-lg">Experience</p>
            {data.experience.map(((experience, i) => (
              <div className={i === data.experience.length - 1 ? '' : 'mb-4'} key={experience.id}>
                <h4 className="font-bold">{experience.company} | <span className="font-normal">{experience.designation}</span></h4>
                <p className="font-normal">{experience.startedAt} - {experience.endAt} | {experience.country}</p>
                <p>{experience.description}</p>
              </div>
            )))}
            <p className="text-lg mt-5">Projects</p>
            {data.experience.map(((experience, i) => (
              <div className={i === data.experience.length - 1 ? '' : 'mb-4'} key={experience.id}>
                <h4 className="font-bold">{experience.company} | <span className="font-normal">{experience.designation}</span></h4>
                <p className="font-normal">{experience.startedAt} - {experience.endAt} | {experience.country}</p>
                <p>{experience.description}</p>
              </div>
            )))}
          </div>
          <div className="right w-4/12">
            {data.extras.map(item => (
              <div key={item.id} className="mb-2">
                <p className="text-black text-xl font-extralight uppercase">{item.title}</p>
                {item.type === 'NEW_LINE' ? (
                  item.items.map((e, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <p className="capitalize text-black font-medium text-t1-sm leading-6" key={index}>
                      {e}
                    </p>
                  ))
                ) : (
                  <p className="capitalize text-black font-medium text-t1-sm leading-6">
                    {item.items.map((e, i) => (i === item.items.length - 1 ? `${e}` : `${e} • `))}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Dee;
