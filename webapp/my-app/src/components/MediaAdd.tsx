import * as React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

import { createStyles } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

const styles = (theme: Theme) => createStyles({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

interface IProps extends WithStyles<typeof styles> {
    postMedia: any,
    open: boolean,
    handleClick: any
}
interface IState {
    title: string
    description: string
    picture: any
}

class MediaAdd extends React.Component<IProps,IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            title: "",
            description: "",
            picture: {}
        }
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleChangePicture = this.handleChangePicture.bind(this)
    }

  public render() {
    const { classes } = this.props;
    return (
        <div>
        <Button 
            variant="fab"
            className={classes.fab}
            color='secondary'
            onClick={this.props.handleClick(true)}
            >
            <AddIcon />
        </Button>
        <Dialog
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.props.open}
            onClose={this.props.handleClick(false)}
        >
                <form onSubmit={
                    this.props.postMedia(
                        this.state.title,
                        this.state.description,
                        this.state.picture
                    )}>
                <DialogTitle id="alert-dialog-title">
                    Add media
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"Please enter the information."}
                    </DialogContentText>
                    <TextField
                      id="standard-name"
                      label="Title"
                      value={this.state.title}
                      onChange={this.handleChangeTitle}
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
                    <input type='file' accept='image/*' id='single' onChange={this.handleChangePicture} /> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClick(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="secondary"
                        autoFocus={true}>
                        Send
                    </Button>
                </DialogActions>
                </form>
        </Dialog>
        </div>
    );
  }
  private handleChangeTitle(event:any){
    this.setState({title:event.target.value})
  }
  private handleChangeDescription(event:any){
    this.setState({description:event.target.value})
  }
  private handleChangePicture(fileList:any) {
    this.setState({
        picture: fileList.target.files
    })
}
}

export default withStyles(styles, { withTheme: true })(MediaAdd);