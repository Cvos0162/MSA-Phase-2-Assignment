import * as React from "react";

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search'

import { Avatar, createStyles, Drawer, Paper } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import logoPot from './img/LogoPot.png'
import Profile from './Profile';

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'sticky',
    top: 0,
    width: '100%',
    zIndex:20,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  Logo: {
    marginLeft: 0,
    marginRight: 10,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    display: 'block',
    position: 'absolute',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 300,
      '&:focus': {
        width: 360,
      },
    },
  },
});

interface IProps extends WithStyles<typeof styles> {
  profile: any,
  my_profile: any,
  setMyProfile: any,
  searchMedia: any,
  handleHeaderClick: any
  login: boolean
  setLogin: any
}

interface IState {
  open: boolean,
  openSearch: boolean
  failed: boolean,
  
  searchProfile: any[],
}

class Header extends React.Component<IProps,IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      open: false,
      openSearch: false,
      failed: false,
      searchProfile: []
    }
    this.login = this.login.bind(this)
    this.logOut = this.logOut.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.viewSearch = this.viewSearch.bind(this)
  }
  public render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap={true}>
            <div onClick={this.props.handleHeaderClick}>
              <img src={logoPot} width={40} height ={40} className={this.props.classes.Logo}/>
              POT{" "}
              {this.subHeader()}
            </div>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Username…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={this.handleSearch}
              onClick={this.toggleSearch(true)}
            />
            {this.viewSearch()}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
        <Profile 
          profile={this.props.my_profile}
          login={this.props.login}
          signUpHandle={this.signUp}
          loginHandle={this.login}
          failed={this.state.failed}
          logOut={this.logOut}
          editProfile= {this.editProfile}
          uploadProfilePic= {this.uploadProfilePic}
          />
      </Drawer>
    </div>
    )
  }
  private toggleDrawer = (b:boolean) => () => {
    this.setState({
      open: b
    })
    this.reloadLogin()
  }
  private toggleSearch = (b:boolean) => () => {
    this.setState({
      openSearch: b
    })
  }
  private handleSearch(event: any) {
    const url = "https://potapi.azurewebsites.net/api/Profile/by?username=" + event.target.value
    fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }).then(res => res.json())
    .then(res => {
      const m = res
      if (m === undefined) {
        this.setState({
          searchProfile: []
        })
      } else {
        this.setState({
          searchProfile: m
        })
      }
    })
  }
  private viewSearch(){
    if (this.state.openSearch === false) {
      return null;
    } else {
      
      const children:any = []
      if (this.state.searchProfile !== [{}] && this.state.searchProfile !== []) {
        for( const element of this.state.searchProfile) {
          const name = "#"+element.id+":"+" "+element.first_Name+" "+ element.last_Name
          children.push(
            <ListItem button={true} type="submit" onClick={this.searchSubmit(element.username)}>
              <ListItemIcon>
                <Avatar src={element.url}/>
              </ListItemIcon>
              <ListItemText primary={element.username} secondary={name}/>
            </ListItem>
          )
        }
        return (<Paper className={this.props.classes.list}><List>{children}</List></Paper>)
      }
      return null;
    }
  }
  private searchSubmit = (username:string) => (event:any) => {
    this.setState({
      openSearch: false
    })
    event.preventDefault()
  }
  private subHeader() {
    if (this.props.profile === undefined) {
      return null;
    } else {
      return <small>{this.props.profile.username}</small>
    }
  }
  private login = (username: string, password: string) => (event:any) => {
    let url = "https://potapi.azurewebsites.net/api/Profile/login"
    url += "?username=" + username + "&password=" + password
    fetch(url, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
      const m = res[0]
      if (m === undefined) {
        this.setState({
          failed: true,
        })
        this.props.setMyProfile({})
      } else {
        this.setState({
          failed: false,
          open: false
        })
        this.props.setMyProfile(m)
        this.props.setLogin(true)
      }
    })
    event.preventDefault()
  }
  private signUp = ( username:string, password:string, firstName:string, lastName:string, discription:string, email:string, image:any ) => (event:any) => {
    const url = "https://potapi.azurewebsites.net/api/Profile/"
    if (firstName === undefined) {
      firstName = ""
    }
    if (lastName === undefined) {
      lastName = ""
    }
    if (discription === undefined) {
      discription = ""
    }
    if (email === undefined) {
      email = ""
    }
      
    const p = {
        "username": username,
        "password": password,
        "first_Name": firstName,
        "last_Name": lastName,
        "discription": discription,
        "email": email,
        "url": "",
        "uploaded": "",
        "width": "",
        "height": ""
    }
    this.props.setMyProfile(p)
    fetch(url, {
      method: 'POST',
      headers: {"Content-Type": "application/json", "accept": "application/json"},
      body: JSON.stringify(p)
    })
    .then(res => res.json())
    .then(res => {
      const m = res
      if (m === undefined) {
        alert("failed to signUp")
      } else {
        this.setState({
          failed: false,
          open: false,
        })
        this.props.setMyProfile(m)
        this.props.setLogin(true)
        const url1 = "https://potapi.azurewebsites.net/api/Profile/upload"
        const formData = new FormData()
        formData.append("User_id", this.props.my_profile.id)
        formData.append("Image", image[0])
  
        fetch(url1, {
          body: formData,
		    	headers: {'cache-control': 'no-cache'},
		    	method: 'POST'
        }).then((response : any) => {
          if (!response.ok) {
            // Error State
            alert(response.statusText)
          }

        })
      }
    })
    
    event.preventDefault()
  }
  private editProfile = (firstName: string, lastName: string, description: string, email: string) => (event:any) => {
    let changed = false
    let first_Name = this.props.my_profile.first_Name
    let last_Name = this.props.my_profile.last_Name
    let discription = this.props.my_profile.discription
    let emailC = this.props.my_profile.email
    if (firstName !== null && firstName !== undefined && firstName !== "") {
      first_Name = firstName
      changed = true
    }
    if (lastName !== null && lastName !== undefined && lastName !== "") {
      last_Name = lastName
      changed = true
    }
    if (description !== null && description !== undefined && description !== "") {
      discription = description
      changed = true
    }
    if (email !== null && email !== undefined && email !== "") {
      emailC = email
      changed = true
    }
    const m = {
      "id": this.props.my_profile.id,
      "username": this.props.my_profile.username,
      "password": this.props.my_profile.password,
      "first_Name": first_Name,
      "last_Name": last_Name,
      "discription": discription,
      "email": emailC,
      "url": this.props.my_profile.url,
      "uploaded": Date.now().toString(),
      "width": this.props.my_profile.width,
      "height": this.props.my_profile.height
    }
    if (changed) {
      const url = "https://potapi.azurewebsites.net/api/Profile/" + this.props.my_profile.id
      fetch(url, {
        method: "PUT",
        headers: {'cache-control': 'no-cache','Content-Type': 'application/json'},
        body: JSON.stringify(m)
      }).then((response : any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText)
        } else {
          this.setState({
            failed: false,
            open: false
          })
          this.props.setMyProfile(m)
          this.props.setLogin(true)
        }
      })
    }
    
    event.preventDefault()
  }
  private reloadLogin() {
    let url1 = "https://potapi.azurewebsites.net/api/Profile/login"
    url1 += "?username=" + this.props.my_profile.username + "&password=" + this.props.my_profile.password
    fetch(url1, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
      const m = res[0]
      if (m === undefined) {
        this.props.setMyProfile({})
      } else {
        this.setState({
          failed: false
        })
        this.props.setMyProfile(m)
        this.props.setLogin(true)
      }
    })
  }
  private uploadProfilePic = (picture: any)  => (event:any) => {
    if (picture !== {} && picture !== null && picture !== undefined) {
      const url = "https://potapi.azurewebsites.net/api/Profile/upload"
      const formData = new FormData()
		  formData.append("User_id", this.props.my_profile.id)
      formData.append("Image", picture[0])

      fetch(url, {
        body: formData,
		  	headers: {'cache-control': 'no-cache'},
		  	method: 'POST'
      }).then((response : any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText)
        }
        const r = response.json()[0]
        if (r !== undefined) {
          this.props.setMyProfile(r)
          this.props.setLogin(true)
        }
        this.setState({
          failed: false,
          open: false
        })
      })
    }
    event.preventDefault()
  }
  private logOut(event:any) {
    this.setState({
      failed: false,
      open: false
    })
    this.props.setMyProfile({})
    this.props.setLogin(false)
  }
}
export default withStyles(styles)(Header)