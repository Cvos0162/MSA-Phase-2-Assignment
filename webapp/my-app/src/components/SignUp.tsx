import * as React from "react";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SignUpIcon from '@material-ui/icons/PersonAdd'

import { createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

const styles = (theme: Theme) => createStyles({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  name: {
    width: '75%',
  },
  nameDiv: {
    display: 'inline',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

interface IProps extends WithStyles<typeof styles> {
  signUpHandle: any
}

interface IState {
  username: string
  password: string
  first_Name: string
  last_Name: string
  discription: string
  email: string
  image: any
  
}

class SignUp extends React.Component<IProps, IState > {
  constructor(props: any) {
    super(props)
    this.state = {
      username: '',
      password: '',
      first_Name: '',
      last_Name: '',
      discription: '',
      email: '',
      image: {}
    }
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleFirstname = this.handleFirstname.bind(this)
    this.handleLastname = this.handleLastname.bind(this)
    this.handleDiscription = this.handleDiscription.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleChangePicture = this.handleChangePicture.bind(this)
  }
  public render() {
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SignUpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={this.props.signUpHandle(this.state.username, this.state.password, this.state.first_Name, this.state.last_Name, this.state.discription, this.state.email, this.state.image)}>
            <FormControl margin="normal" required={true} fullWidth={true}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" name="username" autoComplete="username" autoFocus={true} onChange={this.handleUsername} />
            </FormControl>
            <FormControl margin="normal" required={true} fullWidth={true}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handlePassword}/>
            </FormControl>
            <div className={this.props.classes.nameDiv} >
            <FormControl margin="normal" required={false} fullWidth={false}>
              <InputLabel htmlFor="Firstname">Firstname</InputLabel>
              <Input className={this.props.classes.name} name="firstname" type="firstname" id="firstname" autoComplete="firstname" onChange={this.handleFirstname}/>
            </FormControl>
            <FormControl margin="normal" required={false} fullWidth={false}>
              <InputLabel htmlFor="Lastname">Lastname</InputLabel>
              <Input className={this.props.classes.name} name="lastname" type="lastname" id="lastname" autoComplete="lastname" onChange={this.handleLastname}/>
            </FormControl>
            </div>
            <TextField
                id="filled-multiline-static"
                label="Description"
                multiline={true}
                rows="4"
                margin="normal"
                variant="filled"
                fullWidth={true}
                value={this.state.discription}
                onChange={this.handleDiscription}
                required={false}
            />
            <FormControl margin="normal" required={false} fullWidth={true}>
              <InputLabel htmlFor="Email">Email</InputLabel>
              <Input name="email" type="email" id="email" autoComplete="email" onChange={this.handleEmail}/>
            </FormControl>
            <input type='file' accept='image/*' id='single' required={true} onChange={this.handleChangePicture} /> 
            <Button
              type="submit"
              fullWidth={true}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }

  private handleUsername(event:any) {
    this.setState({username: event.target.value});
  }
  private handlePassword(event:any) {
    this.setState({password: event.target.value});
  }
  private handleFirstname(event:any) {
    this.setState({first_Name: event.target.value});
  }
  private handleLastname(event:any) {
    this.setState({last_Name: event.target.value});
  }
  private handleDiscription(event:any) {
    this.setState({discription: event.target.value});
  }
  private handleEmail(event:any) {
    this.setState({email: event.target.value});
  }
  private handleChangePicture(fileList:any) {
    this.setState({
        image: fileList.target.files
    })
  }
}

export default withStyles(styles)(SignUp);