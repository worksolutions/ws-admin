import Prism from "prismjs";
// @ts-ignore
import getLoader from "prismjs/dependencies";
import components from "prismjs/components";

const componentsToLoad = ["php"];

getLoader(components, componentsToLoad, []).load((id: string) => require(`prismjs/components/prism-${id}.min.js`));

export const DEFAULT_LANGUAGE = "plaintext";
export const LANGUAGES = Object.keys(Prism.languages);

export const testLanguage = (text: string) => (language: string) => text.replace("data-code-", "") === language;
export const getLanguage = (text: string) => LANGUAGES.find(testLanguage(text));

const brRegExp = /<br ?\/?>/g;
const carryover = "\n";
const arrowRegExp = /&gt;/g;
const arrow = ">";

export const htmlCodeFormat = (innerHTML: string) => innerHTML.replace(brRegExp, carryover).replace(arrowRegExp, arrow);
