import Data from "../models/Data.js"

export function getAll(){
    return Data.find()
};

/*export function getById(recordId){    
    return Data.findById(recordId)
}*/

export function getLastThree(limit){
    
    return Data.find().sort({created_at: -1}).limit(limit)
}

export function create(data, userId){
   return Data.create({...data, _owner: userId});

}

export function update(recordId, recordData){
    return Data.findByIdAndUpdate(recordId,recordData, {runValidators: true})
}

export function deletebyId(recordId){
    return Data.findByIdAndDelete(recordId)
}

export async function recommendRecipe(recordId, userId){

    const recipe = await Data.findById(recordId)
    recipe.recommendList.push(userId)

    await recipe.save()
    return recipe
}

export async function search(query) {
  if(query){
    return (Data.find({title: {$regex: query, $options: 'i'}}).lean())
  }
}