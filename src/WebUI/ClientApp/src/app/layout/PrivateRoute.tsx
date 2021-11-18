/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
import React, { ComponentType } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../store';

interface Props extends RouteProps {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

export default function PrivateRoute({ component: Component, ...rest }: Props): React.ReactElement {
    const { user } = useAppSelector((state) => state.account);
    return (
        <Route
            {...rest}
            render={(props: any) =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
}
*/
export default function PrivateRoute(): React.ReactElement {
    return <></>;
}
