export const Initialized = Symbol();
export const Loaded = Symbol();
export const Expired = Symbol();
export type NetworkState = typeof Initialized | typeof Loaded | typeof Expired;
export type ExpiredAt = Date;
