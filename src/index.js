const UserService = require('./user-service');
const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const port = 8080

const app = express()
app.use(bodyParser.json())
app.use(cookieSession({
	name: 'session',
	secret: 'secret-key',
	maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.post('/authn', async (req, res) => {
	const username = req.body.username;
	const user = await UserService.get(username);
	if((username !== undefined) && !(user.password === req.body.password)){
		res.sendStatus(401);
		return;
	}
	req.session.username = req.body.username;
	res.sendStatus(200).end();
})

app.get('/authn', async (req, res) => {
    const username = req.session.username;
    if(username == undefined){
        res.sendStatus(401).end();
        return 
    }
    const user = await UserService.get(username);
    res.send(user).end();
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
UserService.init();