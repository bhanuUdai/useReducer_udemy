import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});


//here we are creating AuthContextProvider, component and exporting it
//  we enclose <App.js> in this component, means all child of <App> are now connected to this Context
// We pass every useState and useeffect here from App.js , to make App . js more clean component
//Now App.js component is just for showing data and nothing else
//Now every component , where we are giving and receivng data through props., now will do it with .usecontext

export const AuthContextProvider = (props) => {
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

//AuthContext is not a component, but object which will contain component

// We will wrap the components where we want to use this context
//Component which will provide data will be wrapped by <AuthContext.Provider>, now it become component with .Provider, initialy it was just an object
//Here we will pass an attribute must name with value i.e value={}, inside it we will pass above object {isLoggedIn:false}
//To make this dynamic we will pass state name in it value= {{isLoggedIn:isLoggedIn}}, now this objet value will change accordingly

//Now we will wrap component, where we want these value or data inside <AuthContext.Consumer>
// here we put a fat arrow function inside it , with parameter (cxt), that will return the whole jsx code
//This (ctx), is nothing but this object {isLoggedIn:false} in side AuthContext . And this object value will change by <AuthContext.Provider>

//Note:
// if you not pass these "isLoggedIn:false" and "onLogout:()=>{}", it will still work but passing these two key, variable and function here is good practice
