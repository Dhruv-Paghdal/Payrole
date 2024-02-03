const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const options = {
    timestamps:{
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    },
    collection: 'uphands'
}
const uphandSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    type: {
        enum: ["CASH", "NEFT"],
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    isDeleted: {
        default: false,
        type: Boolean
    }
}, options);

const Uphand = mongoose.model("Uphand", uphandSchema);

module.exports = {
    model: Uphand,
    insertOne: async(payload) => {
        try {
            return await Uphand.create(payload);
        } catch (error) {
            throw error;
        }
    }, 
    findAll: async(query, projection) => {
        try {
            return await Uphand.find(query, projection)
        } catch (error) {
            throw error;
        }
    },
    findOne: async(query, projection) => {
        try {
            return await Uphand.findOne(query, projection);
        } catch (error) {
            throw error;
        }
    }, 
    deleteOne: async(id) => {
        try {
            return await Uphand.updateOne({_id: ObjectId(id)}, {$set:{isDeleted: true}});
        } catch (error) {
            throw error;
        }
    }, 
    updateOne: async(id, payload) => {
        try {
            return await Uphand.updateOne({_id: ObjectId(id)}, {$set:payload});
        } catch (error) {
            throw error;
        }
    }, 
    aggregate: async(pipeline) => {
        try {
            return await Uphand.aggregate(pipeline);
        } catch (error) {
            throw error;
        }
    }
};