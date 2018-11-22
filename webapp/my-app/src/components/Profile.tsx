import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

import { createStyles, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import defaultPic from './img/blank-profile-picture-973461_1280.png'
import Login from './Login';
import SignUp from './SignUp';

const styles = (theme: Theme) => createStyles({
    avatar: {
      width: 200,
      height: 200,
      margin: 30,
    },
    button: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        width: 200,
    },
    typo: {
        display: 'block',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
      
  });

interface IProps extends WithStyles<typeof styles> {
    profile: any;
    loginHandle: any;
    signUpHandle: any;
    login: boolean;
    failed: boolean;
    logOut: any;
    editProfile: any;
    uploadProfilePic: any;
}

interface IState {
    openSignUp:boolean
    openLogin: boolean;
    openLogOut: boolean;
    openEdit: boolean
    openUploadpic: boolean
    firstName: string
    lastName: string
    description: string
    email: string
    picture: any
}

class Profile extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props)
        this.state = {
            openSignUp: false,
            openLogin: false,
            openLogOut: false,
            openEdit: false,
            openUploadpic: false,
            firstName: '',
            lastName: '',
            description: '',
            email: '',
            picture: {}
        }
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
        this.handleChangeLastName = this.handleChangeLastName.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePicture = this.handleChangePicture.bind(this)

    }
    public render() {
        if (this.props.login === true) {
            return (
                <div>
                    <Avatar src={this.props.profile.url} className={this.props.classes.avatar} />
                    <Button variant="contained" onClick={this.handleUploadPic(true)} className={this.props.classes.button}>Upload Profile picture</Button>
                    <Dialog
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.openUploadpic}
                        onClose={this.handleUploadPic(false)}
                    >
                    <form onSubmit={this.props.uploadProfilePic(this.state.picture)}>
                        <DialogTitle id="alert-dialog-title">{"Upload Image"}</DialogTitle>
                        <DialogContent>
                            <input type='file' accept='image/*' id='single' onChange={this.handleChangePicture} /> 
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleUploadPic(false)} color="secondary">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                color="secondary"
                                autoFocus={true}>
                                Upload
                            </Button>
                        </DialogActions>
                    </form>
                    </Dialog>
                    
                    {this.loadDiscription()}
                    <Button variant="contained" onClick={this.handleEdit(true)} className={this.props.classes.button}>Edit Profile</Button>
                    <Dialog
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.openEdit}
                        onClose={this.handleEdit(false)}
                    >
                            <form onSubmit={
                                this.props.editProfile(
                                    this.state.firstName,
                                    this.state.lastName,
                                    this.state.description,
                                    this.state.email
                                )}>
                            <DialogTitle id="alert-dialog-title">
                                Edit Profile
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {"Please enter the information."}
                                </DialogContentText>
                                <TextField
                                  id="standard-name"
                                  label="First Name"
                                  value={this.state.firstName}
                                  onChange={this.handleChangeFirstName}
                                  margin="normal"
                                />
                                <TextField
                                    id="standard-name"
                                    label="Last Name"
                                    value={this.state.lastName}
                                    onChange={this.handleChangeLastName}
                                    margin="normal"
                                />
                                <TextField
                                  id="filled-multiline-static"
                                  label="Description"
                                  multiline={true}
                                  rows="4"
                                  margin="normal"
                                  variant="filled"
                                  fullWidth={true}
                                  value={this.state.description}
                                  onChange={this.handleChangeDescription}
                                />
                                <TextField
                                    autoFocus={true}
                                    margin="dense"
                                    id="name"
                                    label="Email Address"
                                    type="email"
                                    fullWidth={true}
                                    value={this.state.email}
                                    onChange={this.handleChangeEmail}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleEdit(false)} color="secondary">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="secondary"
                                    autoFocus={true}>
                                    Edit
                                </Button>
                            </DialogActions>
                            </form>
                    </Dialog>
                    <Button variant="contained" onClick={this.handleLogOut(true)} className={this.props.classes.button}>Log Out</Button>
                    <Dialog
                      open={this.state.openLogOut}
                      onClose={this.handleLogOut(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Do you really want to logout?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          {"Select to proceed."}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleLogOut(false)} color="secondary">
                          Disagree
                        </Button>
                        <Button onClick={this.props.logOut} color="secondary" autoFocus={true}>
                          Agree
                        </Button>
                    </DialogActions>
 
                    </Dialog>
                </div>
            )
        } else {
            return (
                <div>
                    <Avatar src={defaultPic} className={this.props.classes.avatar} />
                    <Button variant="contained" onClick={this.toggleLogin(true)} className={this.props.classes.button}> Login </Button>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.openLogin}
                        onClose={this.toggleLogin(false)}
                    >
                    <Login loginHandle={this.props.loginHandle} failed={this.props.failed}/>
                    </Modal>
                    <Button variant="contained" onClick={this.toggleSignUp(true)} className={this.props.classes.button}> SignUp </Button>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.openSignUp}
                        onClose={this.toggleSignUp(false)}
                    >
                    <SignUp signUpHandle={this.props.signUpHandle}/>
                    </Modal>
                </div>
            )
        }
    }
    private loadDiscription() {
        let str = ""
        if (this.props.profile.email !== "" && this.props.profile.email !== undefined) {
            str = 'email:'
        }
        return (
            <div>
            <Typography className={this.props.classes.typo} component="h1" variant="h5">
                {this.props.profile.username}
            </Typography>
            <Typography className={this.props.classes.typo} component="subtitle2" variant="subheading">
                {this.props.profile.first_Name + " " + this.props.profile.last_Name}<br/>
            </Typography>
            <Typography className={this.props.classes.typo} component="body1" variant="body1">
                <small>{this.props.profile.discription}</small><br/>
            </Typography>
            <Typography className={this.props.classes.typo} component="body1" variant="body1">
                <small>{str} {this.props.profile.email}</small>
            </Typography>
            </div>
            
        )
    }
    private toggleLogin = (b:boolean) => () => {
        this.setState({
            openLogin: b
          })
    }
    private toggleSignUp = (b:boolean) => () => {
        this.setState({
            openSignUp: b
          })
    }
    private handleLogOut = (b:boolean) => () => {
        this.setState({
            openLogOut: b
        })
    }
    private handleEdit = (b:boolean) => () => {
        this.setState({
            openEdit: b
        })
    }
    private handleUploadPic = (b:boolean) => () => {
        this.setState({
            openUploadpic: b
        })
    }
    private handleChangeFirstName(event:any) {
        this.setState({
            firstName: event.target.value
        })
    }
    private handleChangeLastName(event:any) {
        this.setState({
            lastName: event.target.value
        })
    }
    private handleChangeDescription(event:any) {
        this.setState({
            description: event.target.value
        })
    }
    private handleChangeEmail(event:any) {
        this.setState({
            email: event.target.value
        })
    }
    private handleChangePicture(fileList:any) {
        this.setState({
            picture: fileList.target.files
        })
    }
}
export default withStyles(styles)(Profile);