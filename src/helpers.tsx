import React from 'react';

export const compare = (first, second) => {
  const a = first.name.toLowerCase();
  const b = second.name.toLowerCase();
  if (a < b) {
    return -1;
  } else if (a === b) {
    return 0;
  } else if (a > b) {
    return 1;
  }
};

export const change = (
  event: React.ChangeEvent<HTMLInputElement>,
  updateFunc: (arg0: string) => void,
) => {
  if (event.target) {
    const { target } = event;
    updateFunc(target.value);
  }
};

export const emptyGame = {
  gid: '',
  user_ids: [],
  timestamp: '',
  name: '',
};
