import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';

import { createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import defaultPic from './img/blank-profile-picture-973461_1280.png'

const styles = (theme: Theme) => createStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

interface IProps extends WithStyles<typeof styles>{
    uploader: any
}

interface IState {
    url: string
}

class ImageAvatars extends React.Component<IProps, IState > {
    constructor(props: any) {
      super(props)
      this.state = {
          url: ""
      }
      this.getUploader(this.props.uploader)
    }
    public render(){
        const { classes } = this.props;
        return (
            <Avatar alt={defaultPic} src={this.state.url} className={classes.avatar} />
        )
    }
    private getUploader(username: string) {
        let url = "https://iryu.azurewebsites.net/api/Profile"
        if (username != null) {
            url += "/by?username=" + username
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
        url: p.url
      })
          })
    }
}

export default withStyles(styles)(ImageAvatars);