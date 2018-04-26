import React from 'react';

const AxisY = ({ measures }) => measures.map((measure, i) => <div key={i}>{measure}</div>);

export default AxisY;
