const mongoose = require('mongoose');

const options = {
    timestamps:{
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    },
    collection: 'degisnations'
}
const degisnationSchema = new mongoose.Schema({
    degisnation: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    isDeleted: {
        default: false,
        type: Boolean
    },
}, options);

const Degisnation = mongoose.model("Degisnation", degisnationSchema);

module.exports = {
    model: Degisnation,
    insertOne: async(payload) => {
        try {
            return await Degisnation.create(payload);
        } catch (error) {
            throw error;
        }
    }, 
    findAll: async(query) => {
        try {
            return await Degisnation.find(query)
        } catch (error) {
            throw error;
        }
    },
    findOne: async(query) => {
        try {
            return await Degisnation.findOne(query);
        } catch (error) {
            throw error;
        }
    }, 
    deleteOne: async(id) => {
        try {
            return await Degisnation.updateOne({_id: ObjectId(id)}, {$set:{isDeleted: true}});
        } catch (error) {
            throw error;
        }
    }, 
    updateOne: async(id, payload) => {
        try {
            return await Degisnation.updateOne({_id: ObjectId(id)}, {$set:payload});
        } catch (error) {
            throw error;
        }
    }, 
    aggregate: async(pipeline) => {
        try {
            return await Degisnation.aggregate(pipeline);
        } catch (error) {
            throw error;
        }
    }
};