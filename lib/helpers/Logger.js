const getDate = () => new Date().toLocaleString("hu-HU");

const typeColors = {
    info: "\x1b[36m",
    build: "\x1b[33m",
    error: "\x1b[31m",
    email: "\x1b[32m",
};

export default function logger(type, message, object) {
    console.log(`${typeColors[type]}[${type.toUpperCase()}] -- [${getDate()}], \x1b[0m${message} ${object ? `-||- ${object}` : ""}`);
}
