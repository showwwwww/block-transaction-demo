import React from 'react';
import { Table, Input, Tag, message } from 'antd';
import _ from 'lodash';
import dayjs from 'dayjs';

import request from '../../utils/request';
import apis from '../../apis';
import Components from '../../components';
import './index.css';

function Aside() {
    const mockMenus = [
        {
            title: 'Block',
            path: '/home',
        },
    ];

    return mockMenus.map((menu) => (
        <h3 key={`key-${menu.title}`} href={menu.path}>
            {menu.title}
        </h3>
    ));
}
class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topDataSource: [],
            title: '',
            bottomDataSource: [],
            isLoading: true,
        };

        this.topColumns = [
            {
                title: 'Key',
                dataIndex: 'name',
                key: 'name',
                width: 150,
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
                ellipsis: true,
            },
        ];

        this.bottomColumns = [
            {
                title: 'Key',
                dataIndex: 'name',
                key: 'name',
                width: 100,
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
                ellipsis: true,
                align: 'center',
            },
            {
                title: 'Next',
                dataIndex: 'next',
                key: 'next',
                ellipsis: true,
                align: 'center',
            },
            {
                title: 'Message',
                dataIndex: 'message',
                key: 'message',
                ellipsis: true,
                align: 'center',
            },
        ];
    }

    componentDidMount() {
        this.initial();
    }

    initial = (initialHash = '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa') => {
        this.setState({ isLoading: true });
        const topDataSource = [];
        let bottomDataSource = [];
        request(apis.blockHash(initialHash))
            .then((data) => {
                const keys = Object.keys(data);
                keys.forEach((key) => {
                    if (key === 'height') {
                        this.setState({ title: data[key] });
                    } else if (key === 'time') {
                        this.mindedTime = dayjs(data[key] * 1000);
                    }
                    if (key === 'tx') {
                        bottomDataSource = this.generateTransactions(data);
                    }
                    topDataSource.push(this.generateTop(data, key));
                });
                if (data.error) {
                    throw new Error();
                }
            })
            .then(() => {
                message.success('data updated!');
                this.setState({ topDataSource, bottomDataSource });
            })
            .catch(() => {
                message.error('unexpected error!');
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    };

    formatNumber(number) {
        let divider = number;
        const width = 1000;
        const arr = [];
        while (divider > 0) {
            arr.push(divider % width);
            divider = Math.floor(divider / width);
        }
        return arr.reverse().join(',');
    }

    generateTop = (data, key) => {
        const obj = {};
        if (key === 'time') {
            const timeArr = this.mindedTime.$d.toString().split(' ');
            this.setState({ time: timeArr.slice(0, timeArr.length - 3).join(' ') });
            obj.value = dayjs(this.mindedTime.$4).format('YYYY-MM-DD HH:mm');
            obj.name = 'Timestamp';
        } else if (key === 'height') {
            obj.value = this.formatNumber(data[key]);
            obj.name = 'Height';
        } else if (key === 'tx') {
            obj.value = this.formatNumber(data[key].length);
            obj.name = 'Number of Transactions';
        } else if (key === 'ver') {
            obj.value = `0x${data[key].toString(16)}`;
            obj.name = 'Version';
        } else if (key === 'mrkl_root') {
            obj.value = data[key];
            obj.name = 'Merkle root';
        } else if (key === 'weight') {
            obj.value = `${this.formatNumber(data[key])} WU`;
            obj.name = 'Weight';
        } else if (key === 'size') {
            obj.value = `${this.formatNumber(data[key])} bytes`;
            obj.name = 'Size';
        } else if (key === 'nonce') {
            obj.value = this.formatNumber(data[key]);
            obj.name = 'Nonce';
        } else if (key === 'bits') {
            obj.value = this.formatNumber(data[key]);
            obj.name = 'Bits';
        }
        obj.key = _.uniqueId();
        return obj;
    };

    generateSumItems = (arr, key) => {
        let res = 0;
        arr.forEach((a) => {
            res += a[key];
        });
        return res;
    };

    generateTransactions = (data) => {
        const rows = [];
        const { tx } = data;
        tx.forEach((transaction) => {
            rows.push({
                key: _.uniqueId(),
                name: 'Fee',
                value: (
                    <>
                        <p className="table-cell-item">{`${(transaction?.fee / 10e7).toFixed(8)} BTC`}</p>
                        <p className="table-cell-item">{`mock sat/B - mock sta/WU - ${transaction.size} bytes`}</p>
                        <p className="table-cell-item">mock sat/vByte - mock virtual bytes</p>
                    </>
                ),
                next: '',
                message: (
                    <Tag color="green">{`${(this.generateSumItems(transaction.out, 'value') / 10e7).toFixed(
                        8
                    )} BTC`}</Tag>
                ),
            });
            rows.push({
                key: _.uniqueId(),
                name: 'Hash',
                value: (
                    <>
                        <p className="table-cell-item hash">{`${data.hash}`}</p>
                        {transaction?.inputs.map((item) => (
                            <p className="table-cell-item cell" key={_.uniqueId()}>
                                {`${item.prev_out.addr}`}
                                <Tag color="yellow">{`${(item.prev_out.value / 10e7).toFixed(8)} BTC`}</Tag>
                            </p>
                        ))}
                    </>
                ),
                next: '',
                message: this.mindedTime,
            });
        });

        return rows;
    };

    render() {
        const { isLoading, topDataSource, bottomDataSource, title, time } = this.state;
        return (
            <Components.Layout
                header={
                    <Input
                        size="large"
                        allowClear
                        placeholder="please enter your hash code"
                        onChange={_.debounce((e) => {
                            if (e.target.value) {
                                this.initial(e.target.value);
                            } else {
                                this.initial();
                            }
                        }, 500)}
                        style={{ width: 400 }}
                    />
                }
                aside={<Aside />}
                top={
                    <>
                        <h1>{`Block ${title}`}</h1>
                        <p>
                            {`This block was mined on ${time} by Poolin. It currently has 69,353 confirmations on the Bitcoin blockchain.
The miner(s) of this block earned a total reward of 6.25000000 BTC ($250,918.00). The reward consisted of a base reward of 6.25000000 BTC ($250,918.00) with an additional 0.16583560 BTC ($6,657.78) reward paid as fees of the 912 transactions which were included in the block. The Block rewards, also known as the Coinbase reward, were sent to this address.
A total of 306.51676953 BTC ($12,305,691.96) were sent in the block with the average transaction being 0.33609295 BTC ($13,493.08).  Learn more about how blocks work.`}
                        </p>
                        <Table
                            loading={isLoading}
                            dataSource={topDataSource}
                            columns={this.topColumns}
                            bordered={false}
                            pagination={false}
                            showHeader={false}
                        />
                    </>
                }
                bottom={
                    <>
                        <h1>Block Transactions</h1>
                        <Table
                            loading={isLoading}
                            dataSource={bottomDataSource}
                            showHeader={false}
                            columns={this.bottomColumns}
                            pagination={{ pageSize: 10, showQuickJumper: true, showSizeChanger: false }}
                        />
                    </>
                }
            />
        );
    }
}
export default Home;
