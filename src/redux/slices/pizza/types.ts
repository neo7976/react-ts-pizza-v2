export type Pizza = {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

export type Params = {
    url: string,
    sortBy: string,
    category: string,
    startWithTitle: string,
    limit: string,
    page: string,
}

export interface SearchPizzaParams extends Params {

}

export interface PizzaSliceState {
    items: Pizza[];
    status: StatusLoading,
    countPage: number
}

export enum StatusLoading {
    NONE = (''),
    LOADING = ('loading'),
    SUCCESS = ('success'),
    ERROR = ('error'),
}