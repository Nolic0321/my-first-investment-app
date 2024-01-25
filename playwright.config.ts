import {PlaywrightTestConfig} from "playwright/test";

const config: PlaywrightTestConfig = {
    testDir: 'tests',
    workers: 3
}

export default config;
