import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../Store';

const ProtectedRoute = ({
    component: Component,
    fallbackPath,
    redirectCallback,
    locationPathname,
    whenLoggedIn,
    whenLoggedOut,
    ...rest
}) => {
    // eslint-disable-next-line
    const [user, setUser] = useContext(UserContext);

    return (
        <Route {...rest}
            render={(props)=>{
                if(whenLoggedIn) {
                    if(user!== null) {
                        return <Component locationPathname={locationPathname} redirectCallback={redirectCallback} {...props} />
                    } else {
                        return <Redirect to={fallbackPath} />
                    }
                } else if(whenLoggedOut) {
                    if(user === null) {
                        return <Component locationPathname={locationPathname} redirectCallback={redirectCallback} {...props} />
                    } else {
                        return <Redirect to={fallbackPath} />
                    }
                } else {
                    if(user!== null) {
                        return <Component locationPathname={locationPathname} redirectCallback={redirectCallback} {...props} />
                    } else {
                        return <Redirect to={fallbackPath} />
                    }
                }
            }}
        />
    )
}

export default ProtectedRoute;