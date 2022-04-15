import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import leftArrow from './left-arrow.svg';
import rightArrow from './right-arrow.svg';
import './index.css';

class Table extends React.Component {
    constructor(props) {
        super(props);

        const { pagination, data, isPagination } = this.props;
        this.state = {
            paginationItems: this.generatePaginationItems(data, pagination),
            currentPage: this.generateTableCell(data, isPagination),
        };
    }

    generatePaginationItems = (data, pagination, startValue = 0) => {
        const paginationItems = [];
        let itemsCount = 0;
        data.forEach((row) => {
            const keys = Object.keys(row);
            itemsCount += keys.length;
        });
        const iterator = Math.min(pagination.count, itemsCount);
        for (let i = startValue; i < iterator; i++) {
            paginationItems.push(
                <button
                    className="my-table-pagination-count-button buttons"
                    type="button"
                    key={_.uniqueId()}
                    onClick={() => {
                        this.setState({ currentPage: this.generateTableCell(this.tableCell.slice(i + 1, i + 5)) });
                    }}
                >
                    {i + 1}
                </button>
            );
        }
        return paginationItems;
    };

    generateTableCell = (data, isPagination, isUpdate = false) => {
        const tableCell = [];
        const dataPerPage = 10;
        data.forEach((row) => {
            const keys = Object.keys(row);
            keys.forEach((key) => {
                tableCell.push(
                    <tr key={_.uniqueId()}>
                        <td className="my-table-row-key">{key}</td>
                        <td className="my-table-row-value">{row[key]}</td>
                    </tr>
                );
            });
        });
        if (isPagination) {
            if (!isUpdate) {
                this.tableCell = tableCell;
            }
            return tableCell.slice(0, dataPerPage + 1);
        }
        return tableCell;
    };

    render() {
        const { title, details, isPagination } = this.props;
        const { paginationItems, currentPage } = this.state;
        return (
            <div className="my-table-container">
                <div className="my-table-top">
                    <table className="my-table-display-data">
                        <thead>
                            <tr>
                                <th>{title}</th>
                            </tr>
                            {details && (
                                <tr>
                                    <th>{details}</th>
                                </tr>
                            )}
                        </thead>
                        <tbody className="my-table-tbody">
                            {currentPage.length > 0 ? (
                                currentPage.map((item) => item)
                            ) : (
                                <tr>
                                    <td className="my-table-empty">暂无数据</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="my-table-bottom">
                    {isPagination && paginationItems.length > 1 && (
                        <div className="my-table-pagination">
                            <button type="button" className="my-table-pagination-left-arrow buttons">
                                <img src={leftArrow} alt="left arrow" />
                            </button>
                            {paginationItems.map((item) => item)}
                            <input
                                type="number"
                                onInput={_.debounce((e) => {
                                    if (e.target.value < 0) {
                                        e.target.value = 1;
                                    }
                                })}
                                onChange={_.debounce((e) => {
                                    this.setState({ currentPage: parseInt(e.target.value, 10) });
                                }, 500)}
                                className="my-table-pagination-input"
                                placeholder="跳转至"
                            />
                            <button type="button" className="my-table-pagination-right-arrow buttons">
                                <img src={rightArrow} alt="right arrow" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Table.defaultProps = {
    title: '',
    pagination: {
        count: 8,
    },
    details: null,
    data: [],
    isPagination: false,
};

Table.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    details: PropTypes.string,
    pagination: PropTypes.object,
    isPagination: PropTypes.bool,
};
export default Table;
