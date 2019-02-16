import { Snippet } from './snippet';
import { Index } from './index';

export interface Table {
    head: boolean;
    index: Index;
    subTables?: Table[];
    contents?: Snippet[];
}
