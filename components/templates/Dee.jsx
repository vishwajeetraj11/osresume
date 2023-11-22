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
              <h4 className="font-semibold">{experience.company} | <span className="font-normal">{experience.designation}</span></h4>
              <p className="font-normal">{experience.startedAt} - {experience.endAt} | {experience.country}</p>
              <p>{experience.description}</p>
            </div>
          )))}
        </div>
        <div className="right w-3/12">
          Right
        </div>
      </div>
    );
  }
}

export default Dee;
