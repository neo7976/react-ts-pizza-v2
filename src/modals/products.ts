export interface Root<T> {
    pageCount: number,
    total: number,
    data: T[]
}

export interface FilterSliceState {
    categoryId: number,
    sort: ISort,
    currentPage: number,
    searchValue: string
}

export interface IProduct {
    id: string;
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