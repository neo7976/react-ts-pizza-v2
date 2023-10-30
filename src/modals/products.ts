export interface Root {
    pageCount: number,
    total: number,
    data: IProduct[]
}

export interface ISortCategory {
    categoryId: number,
    sort: ISort
}

export interface IProduct {
    id: number;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

export interface ISort {
    name: string,
    sortProperty: string,
}