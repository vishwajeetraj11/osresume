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
        className={`resume-a4 bg-white flex justify-between ${t1.container} overflow-hidden`}
        style={{ fontFamily: customStyles ? customStyles.font : 'Raleway' }}
      >
        <div className="left w-8/12 bg-yellow-4000">
          <p className="text-lg">Experience</p>
          {data.experience.map(((experience, i) => (
            <div className={i === data.experience.length - 1 ? '' : 'mb-4'} key={experience.id}>
              <h4 className="font-bold">{experience.company} | <span className="font-normal">{experience.designation}</span></h4>
              <p className="font-normal">{experience.startedAt} - {experience.endAt} | {experience.country}</p>
              <p>{experience.description}</p>
            </div>
          )))}
        </div>
        <div className="right w-3/12">
          {data.extras.map(item => (
            <div key={item.id} className="mb-2">
              <p className="text-black font-bold capitalize text-t1-sm">{item.title}</p>
              {item.type === 'NEW_LINE' ? (
                item.items.map((e, index) => (
                // eslint-disable-next-line react/no-array-index-key
                  <p className="capitalize text-black font-light text-t1-sm leading-6" key={index}>
                    {e}
                  </p>
                ))
              ) : (
                <p className="capitalize text-black font-light text-t1-sm leading-6">
                  {item.items.map((e, i) => (i === item.items.length - 1 ? `${e}` : `${e} • `))}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dee;
