import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import { createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import defaultPic from './img/blank-profile-picture-973461_1280.png'
import Login from './Login';

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
        marginTop: 10
    }
  });

interface IProps extends WithStyles<typeof styles> {
    profile: any;
    login: boolean
}

interface IState {
    open: boolean;
}

class Profile extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props)
        this.state = {
            open: false
        }
    }
    public render() {
        if (this.props.login === true) {
            return (
                <div>
                    {this.loadImage()}
                    {this.loadDiscription()}
                </div>
            )
        } else {
            return (
                <div>
                    {this.loadDefault()}
                    {this.loadLoginPage()}
                    <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.toggleModal(false)}
        >
        <Login/>
        </Modal>
                </div>
            )
        }
    }
    
    private loadImage() {
        return <Avatar src={this.props.profile.url} className={this.props.classes.avatar} />
    }
    private loadDefault() {
        return <Avatar src={defaultPic} className={this.props.classes.avatar} />
    }
    private loadDiscription() {
        return (
            <div>
                <h2>{this.props.profile.username}</h2>
                <b>{this.props.profile.first_Name + " " + this.props.profile.last_Name}</b><br/>
                <small>{this.props.profile.discription}</small><br/>
                <small>email: {this.props.profile.email}</small>
            </div>
        )
    }
    private loadLoginPage() {
        return <Button variant="contained" onClick={this.toggleModal(true)} className={this.props.classes.button}> Login </Button>
    }
    private toggleModal = (b:boolean) => () => {
        this.setState({
            open: b
          })
    }
}
export default withStyles(styles)(Profile);