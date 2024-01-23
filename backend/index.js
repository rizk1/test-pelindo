const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;

app.use(express.json());
const corsOptions = {
	origin: '*',
	allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
	credentials: true,
	enablePreflight: true
}
app.use(
	cors(corsOptions)
);
app.options('*', cors(corsOptions))
app.get('/', (req, res, next) => {
	try {
		res.json({
			status: 'success',
			message: 'Welcome',
		});
	} catch (err) {
		return next(err);
	}
});

const routes = require('./routes/index');
app.use([routes]);

//404 error
app.get('*', function (req, res) {
	res.status(404).json({
		message: 'Page Not Found',
	});
});

//An error handling middleware
app.use((err, req, res, next) => {
	console.log('Error Handler');

	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		err: err,
	});
});

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})