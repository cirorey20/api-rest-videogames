// const axios = require('axios');
const { User } = require('../../db.js');
const bcrypt = require('bcrypt')
const boom = require('@hapi/boom');

async function getUsers() { //datos desde la api
    try {
        const allsUsers = await User.findAll();
        
        return allsUsers;
    } catch (error) {
        console.log(error)
    }
}

async function findUser(id) {
    try {
        const user = await User.findByPk(id, {
            include: [
                {
                    association: 'videogames'
                }
            ]
        });
        if(!user){
            return boom.notFound('not found user')
        }
        return user;
    } catch (error) {
        console.log(error)
    }
}

async function findByEmail(email) {
    const rta = await User.findOne({
        where: { email }
    })
    if(!rta){
        return boom.notFound('not found user')
    }
    
    return rta;
}

async function createUser(body) { //datos desde la api
    try {
        if (!body.name || !body.email || !body.password) {
            return boom.notFound("not found create")
        }
        const hash = await bcrypt.hash(body.password, 10);
        const user = await User.create({
            ...body,
            password: hash
        });
        
        delete user.dataValues.password;
        return user;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUsers,
    createUser,
    findByEmail,
    findUser
}