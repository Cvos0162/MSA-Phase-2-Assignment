import * as React from 'react';
import './App.css';

import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import { createStyles } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import Header from './components/Header';
import Media from './components/Media';
import MediaAdd from './components/MediaAdd'

const styles = (theme: Theme) => createStyles({
  paper: {
    width: '100%',
    height: 60
  },
  chip: {

  }
});

interface IProps extends WithStyles<typeof styles> {}

interface IState {
  loaded: boolean,
  login: boolean,
  open: boolean,
  my_profile: any,
  profile: any,
  medialist: any[],
  latest: boolean
}

class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loaded: false,
      login: false,
      open: false,
      latest: true,
      medialist: [{"id": 0, "uploader": "", "discription": "", "url": "", "uploaded": "", "width": "","height": ""}],
      my_profile: {"id": 0, "username": "", "password": "", "first_Name": "", "last_Name": "", "discription": "", "email": "","url": "", "uploaded": "", "width": "", "height": ""},
      profile: {"id": 0, "username": "", "password": "", "first_Name": "", "last_Name": "", "discription": "", "email": "","url": "", "uploaded": "", "width": "", "height": ""},
      
    }
    this.fetchMedia("");
    this.fetchProfile = this.fetchProfile.bind(this);
    this.fetchMedia = this.fetchMedia.bind(this);
    this.updateMedia = this.updateMedia.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this)
    this.handleHeaderClick = this.handleHeaderClick.bind(this)
    this.setLogin = this.setLogin.bind(this)
    this.setMyProfile = this.setMyProfile.bind(this)
    this.handleChip = this.handleChip.bind(this)
  }
  
  public render() {
    return (
      <div>
        <Header
          profile={this.state.profile}
          my_profile={this.state.my_profile}
          setMyProfile={this.setMyProfile}
          searchMedia={this.searchMedia}
          handleHeaderClick={this.handleHeaderClick}
          login={this.state.login}
          setLogin={this.setLogin}
          />
        <Paper className={this.props.classes.paper}/>
        {this.createChip()}
        {this.createTable()}
        {this.adder()}
      </div>
    );
  }
  private createTable(){
    const table:any[] = []
    this.state.medialist.forEach(element => {
      table.push(<Media
        media={element}
        loaded={true}
        updateMedia={this.updateMedia}
        handleProfileClick={this.handleProfileClick}
        />)
    });
    return table
  }
  private createChip() {
    let b: string
    if (this.state.latest) {
      b = "Order by Latest"
    } else {
      b = "Order by Like"
    }
    if ( this.state.profile === undefined || this.state.profile.id === 0) {
      return (
        <Chip label={b} className={this.props.classes.chip} onClick={this.handleChip}/>
        )
    } else {
      return null;
    } 
  }
  private handleChip() {
    this.setState({
      latest: !this.state.latest
    })
    this.fetchMedia('')
  }
  private adder() {
    if (this.state.login === false) {
      return null
    } else {
      return <MediaAdd postMedia={this.postMedia} open={this.state.open} handleClick={this.handleClick}/>
    }
  }
  private handleClick = (b:boolean) => (event:any) => {
    this.setState({open:b})
  }
  private setLogin(b:boolean) {
    this.setState({
      login: b
    })
  }
  private setMyProfile(a:any) {
    this.setState({
      my_profile: a
    })
  }
  private fetchProfile(username: string) {
    let url = "https://potapi.azurewebsites.net/api/Profile"
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
        p = {"id": 0, "username": "", "password": "", "first_Name": "", "last_Name": "", "discription": "", "email": "","url": "", "uploaded": "", "width": "", "height": ""}
      }
      this.setState({
        loaded: true,
        profile: p
      })
    })
    this.forceUpdate()
  }
  private handleProfileClick = (username: string) => (event: any) => {
    this.fetchProfile(username)
    this.fetchMedia(username)
  }
  private handleHeaderClick(event:any) {
    this.setState({
      profile: {"id": 0, "username": "", "password": "", "first_Name": "", "last_Name": "", "discription": "", "email": "","url": "", "uploaded": "", "width": "", "height": ""}
    })
    this.fetchMedia('')
  }
  private fetchMedia(username: string) {
    let url = "https://potapi.azurewebsites.net/api/Media"
    if (username !== "") {
      url += "/by?uploader=" + username +"&skip=0"+"&take=5";
    } else {
      if (this.state.latest) {
        url += "/latest?skip=0"+"&take=5";
      } else {
        url += "/like?skip=0"+"&take=5";
      }
    }
    
    fetch(url, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
      let m:any[] = res
      if (m === undefined) {
        m = [{"id": 0, "uploader": "", "title":"", "discription": "", "like": "", "url": "", "uploaded": "", "width": "","height": ""}]
      }
      this.setState({
        loaded: true,
        medialist: m,
      })
    })
  }
  private updateMedia() {
    this.fetchMedia(this.state.profile.username);
  }
  private searchMedia = (username: string) => (event:any) => {
    this.fetchProfile(username)
    this.fetchMedia(username)
  }
  private postMedia = (title: string, description: string, picture:any) => (event:any) => {
    const url = "https://potapi.azurewebsites.net/api/Media/upload"
    const formData = new FormData()
    formData.append('Title', title)
    formData.append('Discription', description)
    formData.append('Uploader', this.state.my_profile.username)
    formData.append('Image', picture[0])

    fetch(url, {
      body: formData,
			headers: {'cache-control': 'no-cache'},
      method: 'POST'
    }).then((response : any) => {
      if (!response.ok) {
        // Error State
        alert(response.statusText)
      }
    })
    this.setState({open: false})
    event.preventDefault()
    this.fetchMedia('')
  }
}

export default withStyles(styles)(App)
