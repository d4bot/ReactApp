import path from 'path';
import Express from 'express';
import BodyParser from 'body-parser';
import apiRoutes from './routes/api';

const app = Express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(Express.static(path.join(__dirname, 'static')));

app.use(BodyParser.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  res.render('index');
});

const port = 9005;
app.listen(port, err => {
  console.log(err || `Server is running on port ${port}`);
});