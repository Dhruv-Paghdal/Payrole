const mongoose = require('mongoose');

const options = {
    timestamps:{
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    },
    collection: 'salaries'
}
const salarySchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    isPaid: {
        type: Boolean,
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

const Salary = mongoose.model("Salary", salarySchema);

module.exports = {
    model: Salary,
    insertOne: async(payload) => {
        try {
            return await Salary.create(payload);
        } catch (error) {
            throw error;
        }
    }, 
    findAll: async(query) => {
        try {
            return await Salary.find(query)
        } catch (error) {
            throw error;
        }
    },
    findOne: async(query) => {
        try {
            return await Salary.findOne(query);
        } catch (error) {
            throw error;
        }
    }, 
    deleteOne: async(id) => {
        try {
            return await Salary.updateOne({_id: ObjectId(id)}, {$set:{isDeleted: true}});
        } catch (error) {
            throw error;
        }
    }, 
    updateOne: async(id, payload) => {
        try {
            return await Salary.updateOne({_id: ObjectId(id)}, {$set:payload});
        } catch (error) {
            throw error;
        }
    }, 
    aggregate: async(pipeline) => {
        try {
            return await Salary.aggregate(pipeline);
        } catch (error) {
            throw error;
        }
    }
};