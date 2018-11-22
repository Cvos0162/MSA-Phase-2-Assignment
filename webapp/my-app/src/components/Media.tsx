import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import { createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import ImageAvatar from "./ImageAvatars"

const styles = (theme: Theme) => createStyles({
    card: {
      maxWidth: "100%",
    },
    media: {
      paddingTop: '100%', // 16:9
      maxWidth: "100%",
      maxHeight: "80%"
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  });

interface IProps extends WithStyles<typeof styles>{
    media: any
    loaded: boolean
    updateMedia: any
    handleProfileClick: any
}

interface IStates {
    expanded: boolean;
    like: boolean
}

class Media extends React.Component<IProps, IStates> {
    constructor(props: any) {
        super(props)
        this.state = {
            expanded: false,
            like: false,
        }
        this.handleLike = this.handleLike.bind(this)
    }
    
    public render() {
        const { classes } = this.props
        return (
            <div>
                <Card className={classes.card}>
        <CardHeader
          avatar={
            <ImageAvatar uploader={this.props.media.uploader} aria-label="Recipe" className={classes.avatar}/>
          }
          title={this.props.media.title}
          subheader={this.unixToDate(this.props.media.uploaded)}
        />
        <CardMedia title={this.props.media.title}>
          <img
            src={this.props.media.url}
            height={this.props.media.height}
            width={this.props.media.width}
            />
        </CardMedia>
        <CardContent>
          <Typography component="p">
          <b onClick={this.props.handleProfileClick(this.props.media.uploader)}>{this.props.media.uploader} - </b>
          {this.props.media.discription}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing={true}>
          <IconButton aria-label="Add to favorites" onClick={this.handleLike}>
            <FavoriteIcon color={this.likeColour()}/>
            {this.props.media.like}
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>

        </CardActions>
      </Card>
            </div>
        )
    }
    private handleLike(event: any) {
      let n = 0;
      if (this.state.like === true) {
        this.setState({
          like: false
        })
        n = -1
      } else {
        this.setState({
          like: true
        })
        n = 1
      }
      const m = {
        "id": this.props.media.id,
        "uploader": this.props.media.uploader,
        "title": this.props.media.title,
        "discription": this.props.media.discription,
        "like": this.props.media.like + n,
        "url": this.props.media.url,
        "uploaded": this.props.media.uploaded,
        "width": this.props.media.width,
        "height": this.props.media.height
      }
      const url = "https://potapi.azurewebsites.net/api/Media/"+this.props.media.id
      fetch(url, {
        method: 'PUT',
        headers: {'cache-control': 'no-cache','Content-Type': 'application/json'},
        body: JSON.stringify(m)
      })
      .then((response : any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText)
        }
      })
      setTimeout(this.props.updateMedia.bind(this), 500)
      
    }
    private likeColour() {
      if (this.state.like === true) {
        return "error" 
      } else {
        return "default"
      }
    }
    private unixToDate(unix:string) {
        const a = new Date(unix);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }
}
export default withStyles(styles)(Media);