import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import StarIcon from 'mdi-react/StarIcon';
import StarOutlineIcon from 'mdi-react/StarOutlineIcon';

const Rating = props => {
  const { rating, starCount, text } = props;

  return (
    <Fragment>
      <div className='d-flex'>
      {Array(starCount)
        .fill()
        .map((el, index) => {
          return (
            <div
              className='rating-icon'
              key={index + 1}
            >
              {rating >= index + 1 ? (
                <StarIcon />
              ) : (
                <StarOutlineIcon />
              )}
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
  rating:3
};
