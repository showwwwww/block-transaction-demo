import React from 'react';
import propTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';

export default class CompileRouter extends React.Component {
    constructor() {
        super();
        this.state = {
            component: [],
        };
    }

    renderRoute() {
        const { routes } = this.props;
        if (Array.isArray(routes) && routes.length > 0) {
            const finalRoutes = routes.map((route) => {
                return (
                    <Route
                        path={route.path}
                        key={route.path}
                        // render={() => <route.component routes={route.children} />}
                        element={<route.component />}
                    />
                );
            });

            this.setState({
                component: finalRoutes,
            });
        } else {
            throw new Error('routes必须是一个数组,并且长度要大于0');
        }
    }

    componentDidMount() {
        this.renderRoute();
    }

    render() {
        const { component } = this.state;
        return (
            <Routes>
                {component}
                {/* <Redirect from="*" to="/" /> */}
            </Routes>
        );
    }
}

CompileRouter.propTypes = {
    routes: propTypes.array.isRequired,
};
