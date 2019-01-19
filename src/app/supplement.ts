export class Supplement {
    code: string;
    notes: string;

    constructor(code: string = '', notes: string = '') {
        this.code = code;
        this.notes = notes;
    }
}
