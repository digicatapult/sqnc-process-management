#!/usr/bin/env node
declare const chalk: any;
declare const clear: any;
declare const figlet: any;
declare const path: any;
declare const program: any;

declare module '*';
declare module '@digicatapult/dscp-node';
declare module './api';
declare module './api.js';
declare module './env.js';
declare module './env';

export * from './api'
export * from './env'
