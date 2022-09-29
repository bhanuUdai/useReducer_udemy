import React from "react";

import classes from "./Input.module.css"

function Input(props)
{
    return( <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={props.id}>{props.type}</label>
        <input
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>)
}

export default Input;

//Making this input component for input fields i.e, E-mail and Password
// Using it in Login .js