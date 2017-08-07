var mongoose = require ("mongoose");
var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.Types.ObjectId, ref: 'page'},
    type: {
        type: String,
        enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT', 'INPUT'],

    },
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: Number,
    height: Number,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    pos: Number,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'widget'});
module.exports = widgetSchema;