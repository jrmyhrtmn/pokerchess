import React from 'react';
import './components.css';

export default function Square(props) {
  return (
    <button className={"square " + props.color}>
    </button>
  );
}
