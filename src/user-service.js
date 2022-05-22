const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URL

async function init(){
    const client = await MongoClient.connect(`${uri}`);
    db = client.db("db")
    collection = db.collection('users')
    var builtinAdmin = { 
        username: process.env.BUILTIN_ADMIN_USERNAME,
        password: process.env.BUILTIN_ADMIN_PASSWORD,
    }
    await collection.updateOne({username: process.env.BUILTIN_ADMIN_PASSWORD}, { $set: builtinAdmin}, {upsert: true});
    client.close();
}


async function get(username){
    const client = await MongoClient.connect(`${uri}`);
    const users = client.db('db').collection('users');
    const result = await users.findOne({username: username});
    await client.close();
    return result
}

async function set(username, data){
    const client = await MongoClient.connect(`${uri}`);
    const users = client.db('db').collection('users');
    const result = await users.updateOne({username: username}, { $set: data}, {upsert: true});
    await client.close();
	return result;
}

module.exports = {
    init: init,
	get: get, 
	set: set
}