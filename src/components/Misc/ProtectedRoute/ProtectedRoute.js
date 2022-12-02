import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({component: Component, path, ...rest}) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth);
    const redirect = path.split("/")[1];

    return (
        <>
            {!loading && (
                <Route
                    {...rest}
                    render={props => {
                        if(!isAuthenticated) {
                            return <Redirect to={`/signin/?redirect=${redirect}`} />
                        }
                        return <Component {...props} />
                    }}
                />
            )}        
        </>
    )
}

export default ProtectedRoute;
