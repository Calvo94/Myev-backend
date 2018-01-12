import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import busboyBodyParser from 'busboy-body-parser';

export default app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('dev'));
  app.use(passport.initialize());
  app.use(busboyBodyParser({ limit: '5mb' }));
};
