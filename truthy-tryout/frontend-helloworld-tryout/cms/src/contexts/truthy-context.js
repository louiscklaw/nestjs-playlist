import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { authApi } from '../__fake-api__/auth-api';

var ActionType;
(function (ActionType) {
  ActionType['INITIALIZE'] = 'INITIALIZE';
  ActionType['LOGIN'] = 'LOGIN';
  ActionType['LOGOUT'] = 'LOGOUT';
  ActionType['REGISTER'] = 'REGISTER';
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: state => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

export const AuthContext = createContext({
  ...initialState,
  platform: 'JWT',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

export const AuthProvider = props => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = globalThis.localStorage.getItem('accessToken');

        if (accessToken) {
          const user = await authApi.me({ accessToken });

          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    let res = await fetch('//localhost:7777/auth/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        username: email,
        password: password,
        remember: true,
      }), // body data type must match "Content-Type" header);
    });

    if (!res.ok) {
      console.log(res);
      console.debug(`${__filename}, login failed`);
    } else {
      console.debug(`${__filename}, login ok`);
      dispatch({
        type: ActionType.LOGIN,
        payload: { user: 'helloworld' },
      });
    }
  };

  const logout = async () => {
    // localStorage.removeItem('accessToken');
    let res = await fetch('//localhost:7777/logout', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      console.log(res);
      console.debug(`${__filename}, logout failed`);
    } else {
      console.debug(`${__filename}, logout ok`);

      dispatch({ type: ActionType.LOGOUT });
    }
  };

  const register = async (email, name, password) => {
    const { accessToken } = await authApi.register({ email, name, password });
    const user = await authApi.me({ accessToken });

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: ActionType.REGISTER,
      payload: {
        user,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'JWT',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
