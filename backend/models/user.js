const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const options = {
    timestamps:{
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    },
    collection: 'users',
}
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
    },
    userType: {
        type: String,
        required: true,
        default: "member",
        enum: ["member", "admin", "super-admin"]
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, options);

const User = mongoose.model("User", userSchema);

module.exports = {
    model: User,
    insertOne: async(payload) => {
        try {
            return await User.create(payload);
        } catch (error) {
            throw error;
        }
    }, 
    findAll: async(query) => {
        try {
            return await User.find(query)
        } catch (error) {
            throw error;
        }
    },
    findOne: async(query) => {
        try {
            return await User.findOne(query);
        } catch (error) {
            throw error;
        }
    }, 
    deleteOne: async(id) => {
        try {
            return await User.updateOne({_id: ObjectId(id)}, {$set:{isDeleted: true}});
        } catch (error) {
            throw error;
        }
    }, 
    updateOne: async(id, payload) => {
        try {
            return await User.updateOne({_id: ObjectId(id)}, {$set:payload});
        } catch (error) {
            throw error;
        }
    }, 
    aggregate: async(pipeline) => {
        try {
            return await User.aggregate(pipeline);
        } catch (error) {
            throw error;
        }
    }
};