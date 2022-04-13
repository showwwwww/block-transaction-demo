import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import CompileRouter from './utils/compile-router';
import routes from './router';

function App() {
    return <CompileRouter routes={routes} />;
}
const WrappedApp = App;

export default () => {
    // While the blocklet is deploy to a sub path, this will be work properly.
    const basename = window?.blocklet?.prefix || '/';

    return (
        <Router basename={basename}>
            <WrappedApp />
        </Router>
    );
};
