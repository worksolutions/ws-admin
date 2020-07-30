import { last } from "ramda";
import { v4 as uuidV4 } from "uuid";

interface EnhancerPositionInterface {
  startPos: number;
  endPos: number;
}

const startEnhancerSymbol = "#text-enhancer";
const endEnhancerSymbol = "#";

function getEnhancerPositions(text: string, startWith = 0): EnhancerPositionInterface | null {
  const startPos = text.indexOf(startEnhancerSymbol, startWith);
  if (startPos === -1) return null;
  const endPos = text.indexOf(endEnhancerSymbol, startPos + startEnhancerSymbol.length);
  if (endPos === -1) return null;
  return { startPos, endPos: endPos + endEnhancerSymbol.length };
}

function getEnhancersPositions(text: string, input: EnhancerPositionInterface[] = []): EnhancerPositionInterface[] {
  const lastElement = last(input);
  const found = getEnhancerPositions(text, lastElement ? lastElement.endPos : 0);
  if (!found) return input;
  return getEnhancersPositions(text, [...input, found]);
}

function generateSpan(id: string, modifierName: string) {
  return `<span class="text-enhancer-block" id="${id}" data-modifier-name="${modifierName}"></span>`;
}

export interface EnhancerInterface<DATA = any> extends EnhancerPositionInterface {
  id: string;
  name: string;
  data: DATA;
}

export function modifyTextWithEnhancers(text: string) {
  const enhancers: EnhancerInterface[] = getEnhancersPositions(text).map((enhancer) => ({
    ...enhancer,
    id: "",
    name: "",
    data: null,
  }));

  let result = text;

  enhancers.reverse().forEach((enhancer) => {
    const [, modifierName, ...modifierData] = text.slice(enhancer.startPos + 1, enhancer.endPos - 1).split(":");

    enhancer.id = `text-enhancer-${uuidV4()}`;
    enhancer.name = modifierName;
    enhancer.data = JSON.parse(modifierData.join(":"));

    const span = generateSpan(enhancer.id, modifierName);
    result = result.slice(0, enhancer.startPos) + span + result.slice(enhancer.endPos);
  });

  return { enhancers, text: result };
}
