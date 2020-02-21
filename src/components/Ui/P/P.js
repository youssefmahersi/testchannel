import React from 'react';

import classes from './P.module.css';

const p = (props) => (
    <p className={[classes.P, classes[props.pType]].join(' ') }>{props.children}</p>
);

export default p;