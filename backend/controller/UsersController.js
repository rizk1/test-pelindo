require('dotenv').config();

const { User } = require('../models/BaseModel');
const bcrypt = require('bcryptjs')

module.exports.getDetailUser = async (req, res, next) => {
    try {
        const { userid } = req.params
        const user = await User.findOne({
            where: {
                userid: userid
            }
        })
        return res.status(200).json({
            status: 'success',
            data: user,
            message: "List Of User"
        })
    } catch (error) {
        return next(error);
    }
}

module.exports.getDataUser = async (req, res, next) => {
    try {
        const user = await User.findAll()
        return res.status(200).json({
            status: 'success',
            data: user,
            message: "List Of User"
        })
    } catch (error) {
        return next(error);
    }
}

module.exports.setDataUser = async (req, res, next) => {
    try {
        let hash = null
        if (req.body.password) {
            hash = await bcrypt.hash(req.body.password, 12);
        }

        const user = await User.create({
            namalengkap: req.body.namalengkap,
            username: req.body.namalengkap,
            password: hash,
        })
        return res.status(200).json({
            status: 'success',
            data: user,
            message: "User added successfully"
        })
    } catch (error) {
        return next(error);
    }
}

module.exports.delDataUser = async (req, res, next) => {
    try {
        const { userid } = req.params
        await User.destroy({
            where: {
                userid: userid
            }
        })
        return res.status(200).json({
            status: 'success',
            message: "Delete Success"
        })
    } catch (error) {
        return next(error);
    }
}