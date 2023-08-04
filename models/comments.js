const mongoose = require('mongoose')
const CommentSchema = new mongoose.Schema({
    blog_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
})
const CommentModel = mongoose.model('comments', CommentSchema)
module.exports = CommentModel