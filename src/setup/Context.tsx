import React, { useReducer, Dispatch } from "react";
import App from "./App";
import { CheckAuth } from '../queries/Authentication';

const ACTION_TYPES = {
  CHANGE_CURRENT_LANG: "CHANGE_CURRENT_LANG",
  CHECK_AUTH: "CHECK_AUTH",
  LOGOUT: "LOGOUT",
};

type StateType = {
  currentLang: string | null,
  user: any,
  checkAuth?: any
}

const initialState: StateType = {
  currentLang: localStorage.getItem("lang"),
  user: null,
};

const AppCtxt = React.createContext({ ...initialState });

function appReducer(state: any, action: any) {
  switch (action.type) {

    case ACTION_TYPES.CHECK_AUTH:
      console.log(action.user)
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
}

function CtxtProvider(props: any) {
  const [state, dispatch] = useReducer(appReducer, { ...initialState });

  // Set application language
  function setCurrentLang(lang: string) {
    dispatch({ currentLang: lang, type: ACTION_TYPES.CHANGE_CURRENT_LANG });
  }

  // Check currently authenticated user
  function checkAuth() {
    CheckAuth().then(result => {
      dispatch({ type: ACTION_TYPES.CHECK_AUTH, user: result })
    }).catch(error => {
      console.log(error)
    });
  };

  return (
    <AppCtxt.Provider
      value={{
        checkAuth,
        currentLang: state.currentLang,
        user: state.user

        // setCurrentLang,
        // checkAuth
      }}
      {...props}
    >
      <App />
    </AppCtxt.Provider>
  );
}

export { AppCtxt, CtxtProvider };
