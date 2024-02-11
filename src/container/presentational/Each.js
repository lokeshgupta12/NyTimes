/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';

function Each({ items, render }) {
  return (
    <>
      {items?.map?.((item, index) => (
        <React.Fragment key={item?.id}>
          {render(item, index)}
        </React.Fragment>
      ))}
    </>
  );
}

Each.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  render: PropTypes.func.isRequired
};

export default Each;
