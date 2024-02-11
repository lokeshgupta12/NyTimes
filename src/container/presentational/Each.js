/* eslint-disable */
import React from 'react';

function Each({ items, render }) {
  return (
    <>
      {items &&
        items.map((item, index) => (
          <React.Fragment key={item.id}>{render(item, index)}</React.Fragment>
        ))}
    </>
  );
}

export default Each;
