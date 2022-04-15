import React from 'react';
import { Table, Input } from 'antd';
import _ from 'lodash';

import request from '../../utils/request';
import apis from '../../apis';
import Components from '../../components';

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
class Top extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topDataSource: [],
        };
        this.columns = [
            {
                title: 'Key',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
            },
        ];
        this.initial();
    }

    initial = () => {
        const initialHash = '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa';
        const { topDataSource } = this.state;
        const temp = _.cloneDeep(topDataSource);
        request(apis.blockHash(initialHash))
            .then((data) => {
                const keys = Object.keys(data);
                keys.filter(
                    (key) => typeof key !== 'object' && (typeof data[key] === 'string' || typeof data[key] === 'number')
                ).forEach((key) => {
                    temp.push({
                        key,
                        name: key,
                        value: data[key],
                    });
                });
            })
            .then(() => {
                console.log(topDataSource);
                this.setState({ topDataSource: temp });
            });
    };

    render() {
        const { topDataSource } = this.state;
        console.log(topDataSource);
        return (
            <>
                <h1>Block</h1>
                <p>
                    {`This block was mined on December 22, 2020 at 3:09 PM GMT+8 by Poolin. It currently has 69,353 confirmations on the Bitcoin blockchain.
The miner(s) of this block earned a total reward of 6.25000000 BTC ($250,918.00). The reward consisted of a base reward of 6.25000000 BTC ($250,918.00) with an additional 0.16583560 BTC ($6,657.78) reward paid as fees of the 912 transactions which were included in the block. The Block rewards, also known as the Coinbase reward, were sent to this address.
A total of 306.51676953 BTC ($12,305,691.96) were sent in the block with the average transaction being 0.33609295 BTC ($13,493.08).  Learn more about how blocks work.`}
                </p>
                <Table
                    dataSource={topDataSource}
                    columns={this.columns}
                    bordered={false}
                    pagination={false}
                    showHeader={false}
                />
            </>
        );
    }
}

function Home() {
    return <Components.Layout header={<Components.Input />} aside={<Aside />} top={<Top />} bottom={<h1>bottom</h1>} />;
}

export default Home;
