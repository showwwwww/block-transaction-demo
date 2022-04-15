import React from 'react';

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

const mockData = [
    {
        Fee: '00000 BTC',
        Hash: 'csfdsfdsafdsafad',
    },
    {
        next: <p>Test</p>,
    },
];
function Home() {
    return (
        <Components.Layout
            header={<Components.Input />}
            aside={<Aside />}
            top={<Components.Table isPagination data={mockData} />}
            bottom={<h1>bottom</h1>}
        />
    );
}

export default Home;
