// Requirements

const { Schema, model } = require('mongoose');


// Reaction Schema
//DONE
const reactionSchema = new Schema({
    author: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        get: val => formatDate(val)
    },

    reactionText: {
        type: String,
        required: true,
        maxLength: 300
    },

    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
}, {
    toJSON: {
        getters: true
    },

    id: false
})

//Thought Schema
//DONE

const thoughtSchema = new Schema({
    author: {
        type: String,
        required: true
    },

    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 200
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        get: val => formatDate(val)

    },

    reactions: [reactionSchema]
}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },

    id: false
})

//Date creation

function formatDate() {
    console.log(`Current date: ${this.createdAt}`)
}

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


//Exports

module.exports = model('Thought', thoughtSchema);