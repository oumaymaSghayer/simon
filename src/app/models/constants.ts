export const START_COUNT = 2;
export enum COLORS{
    red,green,blue,yellow
}

export const sleep = async time => new Promise(resolve => setTimeout(resolve, time));