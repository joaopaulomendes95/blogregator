import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl: string,
    currentUserName?: string,
};

function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
    const filePath = getConfigFilePath();

    const jsonData = JSON.stringify(
        {
            db_url: cfg.dbUrl,
            current_user_name: cfg.currentUserName,
        }, null, 2
    );

    fs.writeFileSync(filePath, jsonData, { encoding: "utf-8" });
}

function validateConfig(raw: any): Config {
    if (typeof raw !== "object" || raw === null) {
        throw new Error("Invalid config format");
    }
    if (typeof raw.db_url !== "string") {
        throw new Error("Missing or invalid db_url");
    }

    const config: Config = {
        dbUrl: raw.db_url,
    };

    if (typeof raw.current_user_name === "string") {
        config.currentUserName = raw.current_user_name;
    }

    return config;
}

export function readConfig(): Config {
    const filePath = getConfigFilePath();
    const content = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parsed = JSON.parse(content);
    return validateConfig(parsed);
}

export function setUser(name: string) {
    const currentConfig = readConfig();
    currentConfig.currentUserName = name;
    writeConfig(currentConfig);
}

