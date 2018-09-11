import React from 'react';
import extend from 'smart-extend';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import empty from 'is-empty';
import VideoGameForm from '../component/VideoGameForm';

const fields = {
  name: '',
  description: '',
  releaseYear: '',
  genre: '',
  developer: '',
  platform: '',
  status: 'T',
  userScore: '',
  esrbRating: ''
};

@observer
class VideoGamePage extends React.Component {
  @observable pageState = {};

  constructor (props) {
    super(props);

    let releaseYearList = [];
    let actualYear = new Date().getFullYear();
    for (let i = actualYear; i > 1970; i--)
      releaseYearList.push({ value: i, label: i });

    this.pageState = {
      data: extend.clone(fields),
      errors: extend.clone(fields),
      developerList: [],
      esrbRatingList: [],
      genreList: [],
      platformList: [],
      releaseYearList: releaseYearList,
      statusList: [],
      update: !empty(this.props.id)
    };
  }

  componentWillMount () {
    this.getDeveloperList();
    this.getEsrbRatingList();
    this.getFormData();
    this.getGenreList();
    this.getPlatformList();
    this.getStatusList();
  }

  getDeveloperList = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('get', '/api/developer');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status == 200) {//ADD empty
        this.pageState.developerList = xhr.response.data.map(developer => {
          return { value: developer.id, label: developer.name };
        });
      }/* else {
        this.props.showScreenMessage(xhr.response.message);
      }*/
    });
    xhr.send();
  }

  getEsrbRatingList = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('get', '/api/esrbRating');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status == 200) {//ADD empty
        this.pageState.esrbRatingList = xhr.response.data.map(esrbRating => {
          return { value: esrbRating.id, label: esrbRating.name };
        });
      }/* else {
        this.props.showScreenMessage(xhr.response.message);
      }*/
    });
    xhr.send();
  }

  getFormData = () => {
    if (!this.pageState.update)
      return;

    const xhr = new XMLHttpRequest();

    xhr.open('get', `/api/videogame/${this.props.id}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        let { data } = xhr.response;

        extend.keys(fields)(this.pageState.data, data);
        this.pageState.data.releaseYear = { value: data.releaseYear, label: data.releaseYear };
      } else {

      }
    });

    xhr.send();
  }

  getGenreList = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('get', '/api/genre');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status == 200) {//ADD empty
        this.pageState.genreList = xhr.response.data.map(genre => {
          return { value: genre.id, label: genre.name };
        });
      }/* else {
        this.props.showScreenMessage(xhr.response.message);
      }*/
    });
    xhr.send();
  }

  getPlatformList = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('get', '/api/platform');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status == 200) {//ADD empty
        this.pageState.platformList = xhr.response.data.map(platform => {
          return { value: platform.id, label: platform.name };
        });
      }/* else {
        this.props.showScreenMessage(xhr.response.message);
      }*/
    });
    xhr.send();
  }

  getStatusList = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('get', '/api/status');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status == 200) {//ADD empty
        this.pageState.statusList = xhr.response.data.map(status => {
          return { value: status.id, label: status.name };
        });
      }/* else {
        this.props.showScreenMessage(xhr.response.message);
      }*/
    });
    xhr.send();
  }

  handleChange = event => {
    console.log(event, "event");
    let { name, value } = event.target;
    
    this.pageState.data[name] = value;
  }

  processForm = event => {
    event.preventDefault();
    let formData = `data=${encodeURIComponent(JSON.stringify(this.pageState.data))}`;
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/api/videoGame');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      let { errors, message } = xhr.response;
      
      this.pageState.errors = extend.keys(fields).clone(fields, errors);

      if (xhr.status == 200) {

      } 
    });

    xhr.send(formData);
  }

  render () {
    return (
      <VideoGameForm
        onChange={this.handleChange}
        onSubmit={this.processForm}
        {...this.pageState}
      />
    );
  }
}

export default VideoGamePage;