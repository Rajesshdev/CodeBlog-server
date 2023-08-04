const mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment');
const CrudSchema = new mongoose.Schema({
    author: {
        bio: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        photo: {
            type: String,
            required: true
        }
    },
    categories: {
        type: {
            type: String,
            required: true
        }
    },
    content: [
        {
            text: {
                type: String,
                required: false
            },
            code: {
                type: String,
                required: false
            }
        }
    ],
    blogphoto: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now }
})
autoIncrement.initialize(mongoose.connection);
CrudSchema.plugin(autoIncrement.plugin, {
    model: 'cruds',
    field: 'id',
    startAt: 1,
    incrementBy: 1
}); 
const CrudModel = mongoose.model('cruds', CrudSchema)
module.exports = CrudModel