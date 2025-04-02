'use client'

import type { FC, ReactNode } from 'react';
import { createContext, useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
//import { authApi } from '../../api/auth';
import type { User } from '../../types/user';
import { Issuer } from '@/lib/utils/auth';
import { changeRoleQuery, signInQuery, superUserSignUpQuery } from '@/lib/apollo/queries/auth';
import { useMutation, useQuery, useLazyQuery, gql } from '@apollo/client';
import { isJwtValid, getJwtSub } from '@/lib/utils/jwt';


export const getMeDocument = gql`query getMe($where:UserWhereInput!) {
    users(where:$where) {
          id
          name
          firstName
          lastName
          email
          roles {
              id
              name
          }
      }
  }`

  
const STORAGE_KEY = 'accessToken';

interface State {
    isInitialized: boolean;
    isAuthenticated: boolean;
    user: User | null;
}

enum ActionType {
    INITIALIZE = 'INITIALIZE',
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP',
    SIGN_OUT = 'SIGN_OUT'
}

type InitializeAction = {
    type: ActionType.INITIALIZE;
    payload: {
        isAuthenticated: boolean;
        user: User | null;
    };
};

type SignInAction = {
    type: ActionType.SIGN_IN;
    payload: {
        user: User;
    };
};

type SignUpAction = {
    type: ActionType.SIGN_UP;
    payload: {
        user: User;
    };
};

type SignOutAction = {
    type: ActionType.SIGN_OUT;
};

type Action =
    | InitializeAction
    | SignInAction
    | SignUpAction
    | SignOutAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
    isAuthenticated: false,
    isInitialized: false,
    user: null
};

const handlers: Record<ActionType, Handler> = {
    INITIALIZE: (state: State, action: InitializeAction): State => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user
        };
    },
    SIGN_IN: (state: State, action: SignInAction): State => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    },
    SIGN_UP: (state: State, action: SignUpAction): State => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    },
    SIGN_OUT: (state: State): State => ({
        ...state,
        isAuthenticated: false,
        user: null
    })
};

const reducer = (state: State, action: Action): State => (
    handlers[action.type] ? handlers[action.type](state, action) : state
);

export interface AuthContextType extends State {
    issuer: Issuer.JWT;
    signIn: (email: string) => Promise<void>;
    changeRole: (role: string) => Promise<void>;
    signUp: (data: any) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    ...initialState,
    issuer: Issuer.JWT,
    signIn: () => Promise.resolve(),
    changeRole: (role: string) => Promise.resolve(),
    signUp: () => Promise.resolve(),
    signOut: () => Promise.resolve()
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    const [signUpRequest] = useMutation<any>(superUserSignUpQuery);
    const [signInRequest] = useMutation<any>(signInQuery);
    const [changeRoleRequest] = useMutation<any>(changeRoleQuery);
    const [me] = useLazyQuery<any>(getMeDocument);

    const initialize = useCallback(
        async (): Promise<void> => {
            try {
                const accessToken = globalThis.localStorage.getItem(STORAGE_KEY);

                if (isJwtValid(accessToken)) {
                    const user = await me({ variables: { where: { email: getJwtSub(accessToken) } } });

                    dispatch({
                        type: ActionType.INITIALIZE,
                        payload: {
                            isAuthenticated: true,
                            user: user.data?.users[0]
                        }
                    });
                } else {
                    dispatch({
                        type: ActionType.INITIALIZE,
                        payload: {
                            isAuthenticated: false,
                            user: null
                        }
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: ActionType.INITIALIZE,
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                });
            }
        },
        [dispatch]
    );

    useEffect(() => {
        initialize();
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    const signIn = useCallback(
        async (data: any): Promise<void> => {
            const result = await signInRequest({
                variables: {
                    input: {
                        ...data,
                        roles: ['Admin'],
                        defaultRole: 'Admin'
                    }
                }
            });

            const accessToken = result.data.signIn.token;
            const user = await me({ variables: { where: { email: getJwtSub(accessToken) } } });

            localStorage.setItem(STORAGE_KEY, accessToken);

            dispatch({
                type: ActionType.SIGN_IN,
                payload: {
                    user: user.data?.users[0]
                }
            });
        }, [dispatch]);

    const changeRole = useCallback(
        async (role: string): Promise<void> => {

            const result = await changeRoleRequest({
                variables: {
                    input: {
                        role: role,
                    }
                }
            });

            const accessToken = result.data.changeRole.token;
            localStorage.setItem(STORAGE_KEY, accessToken);
        }, []);

    const signUp = useCallback(
        async (data: any): Promise<void> => {

            await signUpRequest({
                variables: {
                    input: {
                        ...data,
                        roles: ['Admin'],
                        defaultRole: 'Admin'
                    }
                }
            });

            // const { accessToken } = await authApi.signUp({ email, name, password });
            // const user = await authApi.me({ accessToken });

            // localStorage.setItem(STORAGE_KEY, accessToken);

            // dispatch({
            //     type: ActionType.SIGN_UP,
            //     payload: {
            //         user
            //     }
            // });
        },
        [dispatch]
    );

    const signOut = useCallback(
        async (): Promise<void> => {
            localStorage.removeItem(STORAGE_KEY);
            dispatch({ type: ActionType.SIGN_OUT });
        }, [dispatch]);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                issuer: Issuer.JWT,
                signIn,
                signUp,
                signOut,
                changeRole
            }}
        >
            {state.isInitialized && children}

        </AuthContext.Provider>
    );
};

export const AuthConsumer = AuthContext.Consumer;
