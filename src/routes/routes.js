import Main from '../component/Main';
import MyVideoGames from '../container/MyVideoGames';
import VideoGamePage from '../container/VideoGamePage';

const routes = [{
  component: Main,
  routes: [
    {
      path: '/myVideogames',
      exact: true,
      component: MyVideoGames
    }/*,
    {
      path: '/videogame',
      exact: true,
      component: VideoGamePage
    },
    {
      path: '/videogame/:id',
      exact: true,
      component: 
    }*/
  ]
}]

export default routes;