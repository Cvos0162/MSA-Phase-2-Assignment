import * as React from 'react';
import './App.css';

import Header from './components/Header';
import Media from './components/Media';

interface IState {
  loaded: boolean,
  login: boolean,
  my_profile: any,
  profile: any,
  medialist: any[]
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loaded: false,
      login: false,
      my_profile: {},
      medialist: [{"id": 0, "uploader": "", "discription": "", "url": "", "uploaded": "", "width": "","height": ""}],
      profile: {"id": 0, "username": "", "first_Name": "", "last_Name": "", "discription": "", "email": "","url": "", "uploaded": "", "width": "", "height": ""},
      
    }
    this.fetchMedia("");
    this.fetchProfile = this.fetchProfile.bind(this);
    this.fetchMedia = this.fetchMedia.bind(this);
  }
  public render() {
    
    return (
      <div>
        <Header profile={this.state.profile} login={this.state.login}/>
        {this.createTable()}
      </div>
    );
  }
  private createTable(){
    const table:any[] = []
    this.state.medialist.forEach(element => {
      table.push(<Media media={element}/>)
    });
    return table
  }
  private fetchProfile(username: string) {
    let url = "https://iryu.azurewebsites.net/api/Profile"
    if (username !== "") {
      url += "/by?username=" + username;
    }
    fetch(url, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
      let p = res[0]
      if (p === undefined) {
        p = {"id": 0, "username": "", "first_Name": "", "last_Name": "", "discription": "", "email": "","url": "", "uploaded": "", "width": "", "height": ""}
      }
      this.setState({
        loaded: true,
        profile: p
      })
    })
  }
  private fetchMedia(username: string) {
    let url = "https://iryu.azurewebsites.net/api/Media"
    if (username !== "") {
      url += "/by?uploader=" + username;
    }
    fetch(url, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
      let m = res
      if (m === undefined) {
        m = {"id": 0, "uploader": "", "discription": "", "url": "", "uploaded": "", "width": "","height": ""}
      }
      this.setState({
        loaded: true,
        medialist: m
      })
    })
  }
}

export default App;
