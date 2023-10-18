
export interface IAddress {
    country: string;
    city: string;
    street:string;
    house:string
}


export interface IShippingFields {
    name: string
    email: string
    address: IAddress
}