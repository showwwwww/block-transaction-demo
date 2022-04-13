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

function Home() {
    return (
        <Components.Layout
            header={<Components.Input />}
            aside={<Aside />}
            top={<h1>Top</h1>}
            bottom={<h1>bottom</h1>}
        />
    );
}

export default Home;
