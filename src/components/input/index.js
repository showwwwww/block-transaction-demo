import React from 'react';
import PropTypes from 'prop-types';

import './index.css';
import queryIcon from './query-icon.svg';

Input.defaultProps = {
    onClick: null,
    onChange: null,
    placeholder: null,
};

Input.propTypes = {
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
};

function Input(props) {
    const { onClick, onChange, placeholder } = props;
    return (
        <>
            <div className="my-input-container">
                <input className="my-input" onChange={onChange} placeholder={placeholder} />
                <button type="button" className="my-input-button" onClick={onClick}>
                    <img src={queryIcon} alt="query icon" className="my-input-icon" />
                </button>
            </div>
        </>
    );
}

export default Input;
