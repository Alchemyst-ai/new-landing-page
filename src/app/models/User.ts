import mongoose, { Schema, SchemaTypes, model, models } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: SchemaTypes.String,
        unique: [true, 'Username must be unique.'],
        require: [true, 'Username is required.'],
        match: [
            /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            'Username must be 8-20 alphanumeric characters long.',
        ],
    },
    fullName: {
        type: SchemaTypes.String,
        require: [true, 'Username is required.'],
        unique: false,
    }
}, {
    collection: 'users'
});

export const User = models.User || model('User', userSchema);