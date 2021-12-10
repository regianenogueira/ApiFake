const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
var db = require('./db.json');

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use(jsonServer.rewriter({
  '/veiculo?id_marca=:id_marca': '/veiculo/:id_marca'
}));


server.get('/veiculo/:id_marca', (req, res) => {
  if (req.method === 'GET') {
    let id_marca = req.query['id_marca'];
    if (id_marca != null && id_marca >= 0) {
      let result = db.users.find(user => {
        return user.id_marca == id_marca;
      })

      if (result) {
        let {id, ...user} = result;
        res.status(200).jsonp(user);
      } else {
        res.status(400).jsonp({
          error: "Bad userId"
        });
      }
    } else {
      res.status(400).jsonp({
        error: "No valid userId"
      });
    }
  }
});

server.use(router);
server.listen(port);