const express = require("express")
const mongoose = require("mongoose")
const product_router = require("./routes/product")
const bodyparser = require("body-parser")
const app = express()
app.use(express.json())
app.use(bodyparser.json())
const port = 5000
mongoose.connect("mongodb+srv://chhatrapati:mandwe@cluster0.mwzmddi.mongodb.net/?retryWrites=true&w=majority").then((res)=>{
    console.log("connected db")
})
app.use("/", product_router)
app.listen(port, ()=>{
    console.log(`server running on ${port}`)
})