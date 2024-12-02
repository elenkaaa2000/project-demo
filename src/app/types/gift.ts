export interface Gift {
    _id:string,
    title: string,
    category: string,
    description: string,
    price:string,
    delivery:string ,
    imageUrl: string,
    buyingList: string[],
    likesList: string[],
    userId: string
}

export interface GiftDetails {
    title: string,
    category: string,
    description: string,
    price:number,
    delivery:number,
    imageUrl: string,
}