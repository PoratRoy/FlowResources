import { Key } from "react";

const isBrowser = typeof window !== 'undefined';

export enum SKey {
    Projects = 'projects',
    Categories = 'categories',
    Websites = 'websites',
}

export default class SessionStorage {
    public static get = (key: Key) => {
        if (!isBrowser) return undefined;
        const value = sessionStorage.getItem(key as string);
        return value ? JSON.parse(value) : undefined;
    };

    public static set = (key: Key, anyValue: string | number | Object) => {
        if (!isBrowser) return;
        const value = JSON.stringify(anyValue);
        sessionStorage.setItem(key as string, value);
    };

    public static setAll = (valuesArray: [Key, string | number | Object][]) => {
        if (!isBrowser) return;
        valuesArray.forEach((value) => {
            this.set(value[0], value[1]);
        });
    };

    public static add = (key: Key, anyValue: string | number | Object) => {
        const value = this.get(key);
        if (value && Array.isArray(value)) {
            this.set(key, [...value, anyValue]);
        } else {
            this.set(key, [anyValue]);
        }
    };

    public static removeFrom = (key: Key, index: number) => {
        const value = this.get(key);
        if (value && Array.isArray(value)) {
            if (index > -1) {
                value.splice(index, 1);
                this.set(key, value);
            }
        }
    };

    public static remove = (key: Key) => {
        if (!isBrowser) return;
        sessionStorage.removeItem(key as string);
    };

    public static clear = () => {
        if (!isBrowser) return;
        sessionStorage.clear();
    };
}
