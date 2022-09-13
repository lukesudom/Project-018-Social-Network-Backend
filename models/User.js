const { Scehma, model } = require('mongoose');
const { schema } = require('./Thought');

const userSchema = new schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },

    freinds: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false
});

userSchema.virtual('friendCount').get(function() {
    const friendCount = this.friends.length;
    return friendCount
});

module.exports = model ('User', userSchema);