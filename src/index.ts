import { setUser, readConfig } from "./config.js"

function main() {
    setUser("JohnDoe");

    const config = readConfig();
    console.log(config);
}

main();
