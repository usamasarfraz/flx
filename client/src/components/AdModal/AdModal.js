import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Modal,Grid,Paper,Table,TableHead,TableBody,TableRow,TableCell} from '@material-ui/core';
import './AdModal.css';
import arr from '../../localData/adModalData/adModalData';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);




function getModalStyle() {
  return {
    top: `${10}%`,
    left: 0,
    right:0,
    margin:'auto'
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: `${60}%`,
    // height: theme.spacing.unit * 50,
    height:`${61}%`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 1,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  }
});

class SimpleModal extends React.Component {
  
  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (getValue) => {
    if(typeof getValue != 'string'){
    this.setState({ open: false });
    this.props.stateChange('');
    }
    else{
      this.setState({ open: false });
      this.props.stateChange(getValue);
    }
  };


  setValueFun(evt) {
    this.handleClose(evt.target.innerHTML);
  }
  render() {
    const { classes } = this.props;

    return (
      <div>
        
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Grid className="gridHeightSetClass" container={true} spacing={8}>
              <Grid item xs={4}>
                <Paper className="paperForModalSections">
                  { arr?
                      <Table>
                      <TableHead>
                          <TableRow>
                              <CustomTableCell>Categories</CustomTableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          arr.map(item => {
                              return<TableRow key={Object.keys(item).join("")} hover={true}>
                                <CustomTableCell className="tableCellToPoint"
                                  onClick={() => {
                                    this.setState({ secondValues: Object.values(item)[0],secondKey:Object.keys(item).join("") });
                                  }}
                                >
                                  {Object.keys(item).join("")}
                                </CustomTableCell>
                              </TableRow>
                            }
                          )
                          
                        }
                      </TableBody>
                      </Table>:null
                      
                  }
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className="paperForModalSections">
                {this.state.secondValues ? (
                      <Table>
                      <TableHead>
                          <TableRow>
                              <CustomTableCell>{this.state.secondKey}</CustomTableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody id="tablebodySecond">
                        {this.state.secondValues.map(item => {
                          if (typeof item != "string") {
                            return (
                              <TableRow key={Object.keys(item).join("")} hover={true}>
                                <CustomTableCell className="tableCellToPoint"
                                  onClick={() => {
                                    this.setState({ thirdValues: Object.values(item)[0],thirdKey:Object.keys(item).join("") });
                                  }}
                                >
                                  {Object.keys(item).join("")}
                                </CustomTableCell>
                              </TableRow>
                            );
                          } else {
                            return (
                              <TableRow key={item} hover={true}>
                                <CustomTableCell className="tableCellToPoint" onClick={this.setValueFun.bind(this)}>
                                  {item}
                                </CustomTableCell>
                              </TableRow>
                            );
                          }
                        })}
                      </TableBody>
                      </Table>
                    ) : null}
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className="paperForModalSections">
                {this.state.thirdValues ? (
                  <Table>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>{this.state.thirdKey}</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody id="tablebodySecond">
                      {this.state.thirdValues.map(item => {
                        return (
                          <TableRow key={item} hover={true}>
                          <CustomTableCell className="tableCellToPoint" onClick={this.setValueFun.bind(this)}>
                            {item}
                          </CustomTableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : null}
                </Paper>
              </Grid>

            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

// We need an intermediary variable for handling the recursive nesting.

export default withStyles(styles)(SimpleModal);