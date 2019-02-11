import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DeleteAdAction from '../../actions/deleteAdAction/deleteAdAction';
import store from '../../store/store';

class ResponsiveDialog extends React.Component {
  state = {
    open: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.controlClose();
  };

  sendRequest = () =>{
    
    this.handleClose();
    store.dispatch(DeleteAdAction(this.props.adID));
      
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Confirm item Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you Sure that you want to permanently Delete the selected item.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.sendRequest} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withMobileDialog()(ResponsiveDialog);