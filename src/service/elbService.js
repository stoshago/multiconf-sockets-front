const hosts = [
    "localhost:8080",
    "localhost:9090"
]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const randomHost = hosts[getRandomInt(hosts.length)];

export const getRandomHost = () => {
    return randomHost;
}
