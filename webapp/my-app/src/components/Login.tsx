import * as React from "react";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/LockOutlined';
import MicIcon from '@material-ui/icons/Mic';

import { createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import MediaStreamRecorder from 'msr';

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
  divider: {
    backgroundColor: theme.palette.secondary.main,
    width: "80%",
    height: 1,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "blur"
  },
  button: {
    width: 40,
    height: 40
  },
  mic: {
    color:  theme.palette.primary.main
  }
});

const wordList = ['Microsoft.', 'Banana.', 'Orange.', 'Ice cream.', 'Salt.']

interface IProps extends WithStyles<typeof styles> {
  loginHandle: any
  failed: boolean
  
}

interface IState {
  username: string
  password: string
  token: string
  recog: any
  verify: boolean
  verifyFail: boolean
  word: string
}

class Login extends React.Component<IProps, IState > {
  constructor(props: any) {
    super(props)
    this.state = {
      username: '',
      password: '',
      token: '',
      verifyFail: false,
      recog: {RecognitionStatus: "Success", DisplayText: "", Offset: 5800000, Duration: 20700000},
      verify: false,
      word: wordList[Math.floor(Math.random()*wordList.length)]
    }
    this.accessSpeechToken()
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }
  public render() {
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {this.verifyForm()}
          <div className={this.props.classes.divider}/>
          Please speak the following word: {"'"+ this.state.word +"'"} 
          <Button variant="fab" color="secondary" className={this.props.classes.button} onClick={this.withVoice(this.state.token)}><MicIcon className={this.props.classes.mic} /></Button>
          {this.state.recog.DisplayText}
        </Paper>
      </main>
    );
  }
  private verifyForm() {
    if(this.state.recog.DisplayText !== this.state.word) {
      return(
<form className={this.props.classes.form} onSubmit={this.failVerify(true)}>
            <FormControl margin="normal" required={true} fullWidth={true}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" name="username" autoComplete="username" autoFocus={true} onChange={this.handleUsername} />
            </FormControl>
            <FormControl margin="normal" required={true} fullWidth={true}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handlePassword}/>
            </FormControl>
            {this.onFailVerify()}
            <Button
              type="submit"
              fullWidth={true}
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
            >
              Sign in
            </Button>
          </form>
      )
      
    } else {
      return (
      <form className={this.props.classes.form} onSubmit={this.props.loginHandle(this.state.username, this.state.password)}>
      <FormControl margin="normal" required={true} fullWidth={true}>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input id="username" name="username" autoComplete="username" autoFocus={true} onChange={this.handleUsername} />
      </FormControl>
      <FormControl margin="normal" required={true} fullWidth={true}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handlePassword}/>
      </FormControl>
      {this.onFail()}
      <Button
        type="submit"
        fullWidth={true}
        variant="contained"
        color="primary"
        className={this.props.classes.submit}
      >
        Sign in
      </Button>
    </form>
      )
    }
  }
  private failVerify = (b:boolean) => (event:any) => {
    this.setState({verifyFail: b})
    event.preventDefault()
  }
  private onFailVerify() {
    if (this.state.verifyFail) {
      return (
        <Typography component="body1" variant="body1" color="error">
                {"* Please verify by speaking following word"}
              </Typography>
      )
    } else {
      return null
    }
  }
  private withVoice = (token:string) => (event:any) => {
    const mediaConstraints = {
      audio: true
    }
    const onMediaSuccess = (stream: any) => {
      
      const mediaRecorder = new MediaStreamRecorder(stream);
      mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
      mediaRecorder.ondataavailable = (blob: any) => {
        fetch('https://southeastasia.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US', {
          body: blob, // this is a .wav audio file    
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer' + token,
              'Content-Type': 'audio/wav;codec=audio/pcm; samplerate=16000',
              'Ocp-Apim-Subscription-Key': '133ae18dd48b4062a5652ce220cad342'
          },    
          method: 'POST'
        }).then((res) => {
          return res.json()
        }).then((res: any) => {
          this.setState({
            recog: res
          })
        }).catch((error) => {
          alert(error)
        });
          mediaRecorder.stop()
      }
      mediaRecorder.start(3000);
    }
    navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)

    function onMediaError(e: any) {
      alert(e);
    }
  }
  private accessSpeechToken() {
    fetch('https://southeastasia.api.cognitive.microsoft.com/sts/v1.0/issuetoken', {
        headers: {
            'Content-Length': '0',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Ocp-Apim-Subscription-Key': '133ae18dd48b4062a5652ce220cad342'
        },
        method: 'POST'
    }).then((response) => {
        // console.log(response.text())
        return response.text()
    }).then((response) => {
        this.setState({token: response})
    }).catch((error) => {
        alert(error)
    });
  }

  private onFail() {
    if (this.props.failed) {
      return (
        <Typography component="body1" variant="body1" color="error">
                {"* The combination of credentials you have entered is incorrect."}
                {" Please check that you have entered a valid username and correct password."}
              </Typography>
      )
    } else {
      return null
    }
    
  }
  private handleUsername(event:any) {
    this.setState({username: event.target.value});
  }
  private handlePassword(event:any) {
    this.setState({password: event.target.value});
  }
}

export default withStyles(styles)(Login);