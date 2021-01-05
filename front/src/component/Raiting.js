import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import StarIcon from 'mdi-react/StarIcon';
import StarOutlineIcon from 'mdi-react/StarOutlineIcon';

const Rating = props => {
  const { value, starCount, text, color } = props;

  return (
    <Fragment>
      <div className='d-flex'>
        {Array(starCount)
          .fill()
          .map((el, index) => {
            return (
              <div
               style={{ color }}
               key={index + 1}>
                {value >= index + 1 ? <StarIcon /> : <StarOutlineIcon />}
              </div>
            );
          })}
      </div>
      <span>{text}</span>
    </Fragment>
  );
};
export default Rating;
Rating.defaultProps = {
  starCount: 5,
  value: 0,
  color: '#f8e825',
};
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};
