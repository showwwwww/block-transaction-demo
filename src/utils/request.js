// demo 待封装
const tempDomain = 'https://blockchain.info/';

const request = (param) => {
    return fetch(`${tempDomain}/${param}`).then((response) => response.json());
};

export default request;
