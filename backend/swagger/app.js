'use strict';

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui')

var app = require('express')();

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.runner.swagger.host = 'localhost:3000'
  app.use(SwaggerUi(swaggerExpress.runner.swagger))
  swaggerExpress.register(app);

  var port = process.env.PORT || 3001;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://localhost:' + port + '/hello?name=Scott');
  }
});
