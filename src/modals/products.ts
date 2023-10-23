export interface IProduct {
    id:       number;
    imageUrl: string;
    title:    string;
    types:    number[];
    sizes:    number[];
    price:    number;
    category: number;
    rating:   number;
}

export interface ISort {
    name: string,
    sortProperty: string,
}