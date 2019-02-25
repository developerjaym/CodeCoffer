import { Supplement } from './supplement';
import { Snippet } from './snippet';

export class UndoMessage {
    type: "snippet" | "supplement";
    snippet: Snippet;
    supplement?: Supplement;
    supplementIndex?: number; // the position of the supplement at time of deletion
}
