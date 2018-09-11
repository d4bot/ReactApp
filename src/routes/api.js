import Express from 'express';
import db from '../middleware/postgresApi';
import formValidator from '../middleware/formValidator';
const router = new Express.Router();

const requestFormValidation = (validationFunction, callback) => {
  return (req, res, next) => {
    if (req.body && req.body.data)
      req.body = JSON.parse(req.body.data);
    const formValidation = validationFunction(req.body);

    if (formValidation.isValid)
      return callback(req, res, next);

    res.status(500).json(formValidation);
  };
};

//GET
router.get('/developer', db.getDeveloperList);
router.get('/genre', db.getGenreList);
router.get('/esrbRating', db.getEsrbRatingList);
router.get('/platform', db.getPlatformList);
router.get('/status', db.getStatusList);
router.get('/videogame', db.getVideoGameList);
router.get('/videogame/:id', db.getVideoGameById);

//POST
router.post('/videoGame', requestFormValidation(formValidator.videoGameForm, db.insertVideoGame));

router.all('*', (req, res) => {
  res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});

export default router;