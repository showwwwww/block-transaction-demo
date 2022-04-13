import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

Layout.propTypes = {
    aside: PropTypes.node.isRequired,
    top: PropTypes.node.isRequired,
    bottom: PropTypes.node.isRequired,
};
function Layout(props) {
    return (
        <div className="layout-container">
            <div className="layout-aside">{props.aside}</div>
            <div className="layout-top">{props.top}</div>
            <div className="layout-bottom">{props.bottom}</div>
        </div>
    );
}

export default Layout;
