const app = require('./config/server');
const connection = require('./config/dbConnection');

require('./app/routes/navigation')(app);

app.listen(app.get('port'), () => {
	console.log('Sevidor en el puerto: ', app.get('port'));
})