import {PlaywrightTestConfig} from "playwright/test";

const config: PlaywrightTestConfig = {
    testDir: 'tests',
    workers: 4
}

export default config;
