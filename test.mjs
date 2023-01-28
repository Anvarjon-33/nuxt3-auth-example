import http from 'node:http'
import { sign, unsign } from 'cookie-signature'
http
    .createServer((req, res) => {
        if (req.headers?.cookie) {
            console.log(req.headers?.cookie)
        }
        res.writeHead(201, {
            "Set-Cookie": "name={name:'anvarjon', lastName:'Buranov'}",
            "Content-Type": "text/plain"
        }).end("Some Date")
    })
    .listen(3100, () => console.log("-----------"))

var user = {
    name: 'Anvar',
    lastName: 'Buranov',
    password: 'kadr1988'
}

const { password: _pass, ..._user } = user
console.log(_user)