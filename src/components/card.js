import React from 'react';
import '../index.css';

export default function Card(props) {
  return (
    <button className={"card " + props.piece}
            onClick={props.onClick}>
    </button>
  );
}
