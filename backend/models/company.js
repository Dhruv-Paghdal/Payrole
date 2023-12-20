const mongoose = require('mongoose');

const options = {
    timestamps:{
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    },
    collection: 'companies'
}
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        addressLine1: {
            type: String,
        },
        addressLine2: {
            type: String,
        },
        city: {
            type: String,
        }
    },
    ownerDetail:{
        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
        },
        email: {
            type: String,
        }
    },
    logo: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true
    },
    isDeleted: {
        default: false,
        type: Boolean
    },
}, options);

const Company = mongoose.model("Company", companySchema);

module.exports = {
    model: Company,
    insertOne: async(payload) => {
        try {
            return await Company.create(payload);
        } catch (error) {
            throw error;
        }
    }, 
    findAll: async(query) => {
        try {
            return await Company.find(query)
        } catch (error) {
            throw error;
        }
    },
    findOne: async(query) => {
        try {
            return await Company.findOne(query);
        } catch (error) {
            throw error;
        }
    }, 
    deleteOne: async(id) => {
        try {
            return await Company.updateOne({_id: ObjectId(id)}, {$set:{isDeleted: true}});
        } catch (error) {
            throw error;
        }
    }, 
    updateOne: async(id, payload) => {
        try {
            return await Company.updateOne({_id: ObjectId(id)}, {$set:payload});
        } catch (error) {
            throw error;
        }
    }, 
    aggregate: async(pipeline) => {
        try {
            return await Company.aggregate(pipeline);
        } catch (error) {
            throw error;
        }
    }
};