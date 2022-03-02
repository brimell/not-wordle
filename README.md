<h1 align="center">
  <img alt="notwordle-logo" src="https://raw.githubusercontent.com/Raaydon/not-wordle/master/public/ogImage.jpg"/><br/>
  Notwordle
</h1>
<p align="center">Play <a href="https://www.powerlanguage.co.uk/wordle/" >Wordle</a> <b>without limits</b> on <b>Notwordle</b>.<br/>With<b> multiplayer functionality</b>

<br>
<br>


<p>play my version <a href="https://notwordle.netlify.app">on netlify</a> or <a href="https://notwordle.herokuapp.com/">on heroku (slower)</a></p>


or run locally with [node](https://nodejs.org/en/):

```
npm i
npm run build
npm run server
```
and both the server and webpage are served from [localhost:3001](http://localhost:3001/)

or for development:

```
npm i
npm run dev
npm run server
```

and go to [localhost:3000](http://localhost:3000)

![Homepage](./public/notwordleHomepage.png)

# Features

- [React](https://reactjs.org/)
- built with [Vite](https://vitejs.dev/) (previously [Webpack](https://webpack.js.org/))
- [Wordle](https://www.powerlanguage.co.uk/wordle/) word list
- [React-Router](https://reacttraining.com/react-router/web/guides/quick-start)
- deployed on [Netlify](https://www.netlify.com/) and [Heroku](https://www.heroku.com/)
- server hosted on [Heroku](https://www.heroku.com/)
  - written in [Node.js](https://nodejs.org/)
  - using [Socket.io](https://socket.io/)
  - using [Express](https://expressjs.com/)
  - and using [Heroku's](https://www.heroku.com/) free dynos

