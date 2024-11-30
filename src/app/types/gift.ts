export interface Gift {
    _id:string,
    title: string,
    category: string,
    description: string,
    price:string,
    delivery:number,
    imageUrl: string,
    buyingList: string[],
    likesList: string[],
    userId: string
}

