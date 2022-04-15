import React from 'react';
import propTypes from 'prop-types';

import './index.css';

Loading.propTypes = {
    isLoading: propTypes.bool.isRequired,
};
function Loading(props) {
    return <>{props.isLoading ? <div className="my-loading" /> : null}</>;
}

export default Loading;
