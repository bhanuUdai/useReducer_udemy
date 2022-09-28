import React from "react";

const AuthContext=React.createContext({
    isLoggedIn:false
})

export default AuthContext


//AuthContext is not a component, but object which will contain component

// We will wrap the components where we want to use this context
//Component which will provide data will be wrapped by <AuthContext.Provider>, now it become component with .Provider, initialy it was just an object
//Here we will pass an attribute must name with value i.e value={}, inside it we will pass above object {isLoggedIn:false}
//To make this dynamic we will pass state name in it value= {{isLoggedIn:isLoggedIn}}, now this objet value will change accordingly


//Now we will wrap component, where we want these value or data inside <AuthContext.Consumer>
// here we put a fat arrow function inside it , with parameter (cxt), that will return the whole jsx code
//This (ctx), is nothing but this object {isLoggedIn:false} in side AuthContext . And this object value will change by <AuthContext.Provider>