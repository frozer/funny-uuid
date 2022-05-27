// <reference path="types.d.ts" />
import { CorporaDictionary, CorporaEntity, getFiles } from 'corpora-project';
import {v4 as uuidv4} from 'uuid';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomEl<T>(src: T[]): T | undefined {
    if (Array.isArray(src)) {
        const index = getRandomInt(0, src.length);
        return src[index];
    }
    return undefined;
}

function getLastId(uuid: string, appendCount = 4): string {
    const count = Number.isNaN(appendCount) ? 4 : appendCount < uuid.length ? appendCount : 0;

    return uuid.split('-')
        .reduce((acc, val, i, splitted) => (i === splitted.length - 1) ? acc = val : acc)
        .slice(-1 * count);
}

export type AdjType = 'adjs' | 'encouraging_words';

export function funnyUuid(appendCount?: number, adjType: AdjType = 'adjs'): string {
    let adjsEntity: CorporaEntity | undefined;
    let nounsEntity: CorporaEntity | undefined;
    let id = uuidv4();

    try {
        adjsEntity = getFiles('words').find(({name}) => name === adjType);
        nounsEntity = getFiles('words').find(({name}) => name === 'nouns');
    } catch (e) {
        return id;
    }

    if (adjsEntity && nounsEntity) {
        const adjs = adjsEntity.get() as CorporaDictionary & { [key: string]: string[]};
        const nouns = nounsEntity.get() as CorporaDictionary & { nouns: string[]};
        const adj = getRandomEl<string>(adjs[adjType])?.toLowerCase();
        const noun = getRandomEl<string>(nouns.nouns)?.toLowerCase();

        if (adj && noun) {
            id = `${adj}-${noun}-${getLastId(id, appendCount)}`;
        }
    }

    return id;
}
