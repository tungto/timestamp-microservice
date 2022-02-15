const express = require('express');

const app = express();
const port = 3000;

const cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/:date', (req, res) => {
	let inputDate = req.params.date;
	if (inputDate === undefined) {
		// use the current time
		date = new Date();
	} else if (isNaN(inputDate)) {
		// it's a string
		date = new Date(inputDate);
	} else {
		date = new Date(Number(req.params.date));
	}
	console.log('date', date);
	if (date.toUTCString() === 'Invalid Date') {
		res.send('invalid date, pls enter new value');
	} else {
		const timestamp = {
			unix: date.getTime(),
			utc: date.toUTCString(),
		};
		res.json(timestamp);
	}
});

app.use('/', express.static('public'));

require('dotenv').config();
const listener = app.listen(process.env.PORT || port, () => {
	console.log('App is listening on port: ' + listener.address().port);
});
