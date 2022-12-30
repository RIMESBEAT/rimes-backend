const mongoose = require("mongoose")

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
       
    },
    description: {
        type: String,
       
    },
    categories: {
        type: String
    },
    
})

const PornModel = mongoose.model("pornvideos", VideoSchema)
module.exports = PornModel