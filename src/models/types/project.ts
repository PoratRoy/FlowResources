import { Website } from "./website";

export type Project = {
    id: string;
    title: string;
    description: string;
    websites: Website[];
};