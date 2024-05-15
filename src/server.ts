import App from '@/app';
import validateEnv from '@utils/validateEnv';
import AuthRoute from './routes/auth.route';
import ProfileRoute from './routes/profile.route';
validateEnv();

const app = new App({
  apiRoutes: [new AuthRoute(), new ProfileRoute()],
  generalRoutes: [],
});

app.listen();
