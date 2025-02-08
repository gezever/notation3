import { iterate } from './utils/create-n3-rules.js';
import yaml from "js-yaml";
import fs from "fs";

const config = yaml.load(fs.readFileSync('./source/config.yml', 'utf8'));
const prefixen = config.prefix


async function generate_n3_rules(my_url) {
    return await iterate([my_url], prefixen)
}

export { generate_n3_rules };



