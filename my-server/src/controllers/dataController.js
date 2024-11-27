import { Router } from "express";
import { create, getAll,  getLastThree } from "../services/dataService.js";
import { getErrorMessage } from "../utils/errorHandling.js";


const dataController = Router()

dataController.get('/catalog', async (req, res) => {
    const result = await getAll()
   
    res.status(200).json(result)
});

dataController.get('/', async(req,res)=>{
    const limit = Number(req.query.limit) || 0; 
    const result = await getLastThree(limit)

    res.status(200).json(result)
});

dataController.post('/data', async (req,res)=>{
    const userId = req.user._id;
    const data = req.body;

    try {
        const result = await create(data,userId);
        res.json(res)
    } catch (error) {
        res.status(400).json({message: getErrorMessage(err)})
    }
});

export default dataController