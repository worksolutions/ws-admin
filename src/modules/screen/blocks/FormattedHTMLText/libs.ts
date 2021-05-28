import Prism from "prismjs";

const DEFAULT_LANGUAGE = "js";
const LANGUAGES = Object.keys(Prism.languages);

export const testLanguage = (text: string) => (language: string) => new RegExp(language).test(text);
export const getLanguage = (text: string) => LANGUAGES.find(testLanguage(text)) || DEFAULT_LANGUAGE;

const brRegExp = /<br ?\/?>/g;
const carryover = "\n";
const arrowRegExp = /&gt;/g;
const arrow = ">";

export const htmlCodeFormat = (innerHTML: string) => innerHTML.replace(brRegExp, carryover).replace(arrowRegExp, arrow);
