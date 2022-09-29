import React from "react";

import classes from "./Input.module.css"
import { useRef ,useImperativeHandle} from "react";

const Input=React.forwardRef((props,ref)=>
{

const inputRef=useRef()

const activate=()=>
{
    inputRef.current.focus()
}

// here we are creating this activate function which will focus the inputs through ref, but this function will have to evoked from its parent
//therefore here we are using useImperativeHandle hook , along with React.forwardRef
// useImperativeHandle basically establish connection between parent and child
// It takes two parameters, first is ref and second is function which will return object having key with any name and value with this function "activate" we want to evoke
//React.forwardRef allows parent component to transfer ref to its child, it is not possible with props, because ref is also a inbuild function and cannot pass through ref

useImperativeHandle(ref,()=>
{
    return {focused:activate}
})

    return( <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={props.id}>{props.type}</label>
        <input
        
        ref={inputRef}
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>)
})

export default Input;

//Making this input component for input fields i.e, E-mail and Password
// Using it in Login .js