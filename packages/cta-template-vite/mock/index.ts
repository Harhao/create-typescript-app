import jsonServer from "json-server";
import mockjs from "mockjs";


const server = jsonServer.create();
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.get('/photo/upload', (req, res) => {
    res.json({
        "code": 200,
        "desc": "DONE",
        "success": "false",
        "result": {
            date: mockjs.Random.date('yyyy-MM-dd'),
        }
    });
});

server.listen(4000, () => {
    console.log('JSON Server is running')
})
