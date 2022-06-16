const express = require('express')
const router = express.Router()
const { food } = require('../models')
const FoodService = require('../services/food')

const foodService = new FoodService(food);

router.get('/', async (req, res) => {
    const listProducts = await foodService.getAll()
    res.json(listProducts)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const product = await foodService.getId(id)
    res.json(product)
})

router.post('/', async (req, res) => {
    const { name, manufacturer, ingredients, infoNutritional } = req.body
    const product = await foodService.addFood({ name, manufacturer, ingredients, infoNutritional })
    res.json(product)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await foodService.deleteFood(id)
    res.send('Produto deletado com sucesso!')
})

router.put('/:id', async (req, res) => {
    const { name, manufacturer, ingredients, infoNutritional } = req.body
    const id = req.params.id;
    const productupdated = await foodService.editFood(id, { name, manufacturer, ingredients, infoNutritional })
    res.send('Produto atualizado com sucesso!')
})

module.exports = router

