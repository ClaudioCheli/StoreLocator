export class Store {
    constructor(
        public ID: string,
        public lat: number,
        public long: number,
        public type: string,
        public hasFlyers: boolean,
        public pr?: boolean
    ) { }
}