export interface Root {
    pageCount: number,
    total: number,
    data: IProduct[]
}

export interface FilterSliceState {
    categoryId: number,
    sort: ISort,
    countPage: number,
    currentPage: number,
    searchValue: string
}

export type SearchPizzaParams = {
    sortProperty: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
};

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