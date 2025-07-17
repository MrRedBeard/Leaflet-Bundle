import * as realDefault from 'xdim';

const root = realDefault?.default || realDefault;

export const prepareData = root?.prepareData || realDefault.prepareData || (() => {});
export const prepareUpdate = root?.prepareUpdate || realDefault.prepareUpdate || (() => {});
