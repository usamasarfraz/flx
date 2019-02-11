import React, { Component } from "react";
import {
  TextField,
  Select,
  Divider,
  Paper,
  Typography,
  Grid,
  Button,
  Input,
  MenuItem,
  OutlinedInput
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import "./Ad.css";
import AdModal from "../AdModal/AdModal";
import adACtion from "../../actions/AdAction/adAction";
import editedAdAction from "../../actions/sendEditedDataAction/sendEditedDataAction";
import provinceArr from "../../localData/provinceData/provinceData";
import store from "../../store/store";
import history from '../../history';
import { connect } from "react-redux";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    height: 29
  }
});

class Ad extends Component {
  constructor() {
    super();

      this.state = {
        showModal: false,
        adTitle: "",
        category: "",
        price: "",
        description: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
        image6: "",
        image7: "",
        image8: "",
        image9: "",
        image10: "",
        image11: "",
        image12: "",
        user_name: "",
        phone: "",
        province: ""
      };
    }


    componentWillMount(){
      this.checkForUpdateRequest();
    }

  handleChange = (name, evt) => {
    this.setState({ [name]: evt.target.value });
  };

  imageHandle = (name, evt) => {
    this.setState({ [name]: evt.target.files[0] });
  };

  modalFunctionToShow() {
    this.setState({ showModal: true });
  }
  modalFunctionToHide = getValue => {
    this.setState({ showModal: false, category: getValue });
  };
  adFormSubmitFun(evt) {
    var st = this.state;
    if (!st.category) {
      evt.preventDefault();
      alert("Please Select Category");
    }
    if (
      !st.image1 ||
      !st.image2 ||
      !st.image3 ||
      !st.image4
    ) {
      evt.preventDefault();
      alert("Please Select Atleast Four Photos");
    }
    if (!st.province) {
      evt.preventDefault();
      alert("Please Select Province");
    }
    if (
      st.category &&
      st.image1 &&
      st.image2 &&
      st.image3 &&
      st.image4 &&
      st.province
    ) {
      evt.preventDefault();
      if(!this.props.login.signin){
        alert('Please Login.');
        history.push('/login');
      }
      else if (this.props.AdData.adRecieveToUpdate) {
        store.dispatch(editedAdAction(this.state));
      } else {
        store.dispatch(adACtion(this.state));
      }
    }
  }

  checkForUpdateRequest() {
    if (this.props.AdData.adRecieveToUpdate) {
      var itemData = this.props.AdData.data;
      this.setState(itemData);
      var count = "1";
      itemData.images.map(item => {
        this.setState({["image" + count] : item});
        count++;
        return 0;
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <form
        onSubmit={this.adFormSubmitFun.bind(this)}
        encType="multipart/form-data"
      >
        <div className="main_form_div">
          <Paper container={"true"} className="paper">
            <Typography align="left" variant="display1">
              Submit an Ad
            </Typography>
            <Divider />

            {/* Title Grid */}
            <Grid container={true} spacing={8}>
              <Grid item xs={3}>
                <Typography
                  noWrap={true}
                  align="right"
                  className="titlesForInput"
                  variant="h6"
                >
                  Ad Title*
                </Typography>
              </Grid>
              <Grid className="inputs" item xs={9}>
                <TextField
                  id="outlined-bare"
                  required={true}
                  value={this.state.adTitle}
                  className="textField"
                  onChange={this.handleChange.bind(this, "adTitle")}
                  name="adTitle"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            {/* Title Grid */}

            {/* Category Grid */}
            <Grid container={true} spacing={8}>
              <Grid item xs={3}>
                <Typography
                  noWrap={true}
                  align="right"
                  className="titlesForInput"
                  variant="h6"
                >
                  Category*
                </Typography>
              </Grid>
              <Grid className="inputs" item xs={9}>
              {/* <span dangerouslySetInnerHTML={{__html:this.state.category}}></span> */}
                <TextField
                  onClick={this.modalFunctionToShow.bind(this)}
                  id="category-input-txt"
                  className="textField"
                  value={this.state.category.replace('&amp;', '&')}
                  disabled={true}
                  onChange={this.handleChange.bind(this, "category")}
                  name="category"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            {/* Category Grid */}

            <Divider />

            {/* Price Grid */}
            <Grid container={true} spacing={8}>
              <Grid item xs={3}>
                <Typography
                  noWrap={true}
                  align="right"
                  className="titlesForInput"
                  variant="h6"
                >
                  Price*
                </Typography>
              </Grid>
              <Grid className="inputs" item xs={3}>
                <TextField
                  className="textField"
                  required={true}
                  value={this.state.price}
                  onChange={this.handleChange.bind(this, "price")}
                  name="price"
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            {/* Price Grid */}

            {/* Description Grid */}
            <Grid container={true} spacing={8}>
              <Grid item xs={3}>
                <Typography
                  noWrap={true}
                  align="right"
                  className="titlesForInput"
                  variant="h6"
                >
                  Ad Description*
                </Typography>
              </Grid>
              <Grid className="inputs" item xs={9}>
                <TextField
                  multiline={true}
                  rows={7}
                  rowsMax={10}
                  required={true}
                  value={this.state.description}
                  id="outlined-bare"
                  onChange={this.handleChange.bind(this, "description")}
                  name="description"
                  className="textArea"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            {/* Description Grid */}

            {/* Photos Main Grid */}
            <Grid className="Photo_main_grid" container={true} spacing={8}>
              {/* Photos Title Grid */}
              <Grid item xs={3}>
                <Typography
                  noWrap={true}
                  align="right"
                  className="titlesForInput"
                  variant="h6"
                >
                  Upload Photos*
                </Typography>
              </Grid>
              {/* Photos Title Grid */}

              {/* Photos Main item Grid */}
              <Grid className="inputs" item xs={7}>
                {/* Photos First row Main Grid */}
                <Grid container={true} spacing={24}>
                  {/* 1st Photo Grid */}
                  <Grid item>
                    <Input
                      accept="image/*"
                      // className={classes.input}
                      style={{ display: "none" }}
                      onChange={this.imageHandle.bind(this, "image1")}
                      name="image1"
                      id="fab-button-file1"
                      multiple
                      type="file"
                    />
                    <label htmlFor="fab-button-file1">
                      <Paper className="upload_button">
                        <Button
                          variant="fab"
                          component="span"
                          size="small"
                          color="primary"
                          className="plus_sign"
                        >
                          <AddIcon />
                        </Button>
                      </Paper>
                    </label>
                  </Grid>
                  {/* 1st Photo Grid */}

                  {/* 2nd Photo Grid */}
                  <Grid item>
                    <Input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      onChange={this.imageHandle.bind(this, "image2")}
                      name="image2"
                      id="fab-button-file2"
                      multiple
                      type="file"
                    />
                    <label htmlFor="fab-button-file2">
                      <Paper className="upload_button">
                        <Button
                          variant="fab"
                          component="span"
                          size="small"
                          color="primary"
                          className="plus_sign"
                        >
                          <AddIcon />
                        </Button>
                      </Paper>
                    </label>
                  </Grid>
                  {/* 2nd Photo Grid */}

                  {/* 3rd Photo Grid */}
                  <Grid item>
                    <Input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      onChange={this.imageHandle.bind(this, "image3")}
                      name="image3"
                      id="fab-button-file3"
                      multiple
                      type="file"
                    />
                    <label htmlFor="fab-button-file3">
                      <Paper className="upload_button">
                        <Button
                          variant="fab"
                          component="span"
                          size="small"
                          color="primary"
                          className="plus_sign"
                        >
                          <AddIcon />
                        </Button>
                      </Paper>
                    </label>
                  </Grid>
                  {/* 3rd Photo Grid */}

                  {/* 4th Photo Grid */}
                  <Grid item>
                    <Input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      onChange={this.imageHandle.bind(this, "image4")}
                      name="image4"
                      id="fab-button-file4"
                      multiple
                      type="file"
                    />
                    <label htmlFor="fab-button-file4">
                      <Paper className="upload_button">
                        <Button
                          variant="fab"
                          component="span"
                          size="small"
                          color="primary"
                          className="plus_sign"
                        >
                          <AddIcon />
                        </Button>
                      </Paper>
                    </label>
                  </Grid>
                  {/* 4th Photo Grid */}

                  {/* </Grid> */}
                  {/* Photos First row Main Grid */}

                  {/* Photos Second row Main Grid */}
                  {/* <Grid container={true} spacing={24}> */}
                  {/* 1st Photo Grid */}
                  <Grid item>
                    <Input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      onChange={this.imageHandle.bind(this, "image5")}
                      name="image5"
                      id="fab-button-file5"
                      multiple
                      type="file"
                    />
                    <label htmlFor="fab-button-file5">
                      <Paper className="upload_button">
                        <Button
                          variant="fab"
                          component="span"
                          size="small"
                          color="primary"
                          className="plus_sign"
                        >
                          <AddIcon />
                        </Button>
                      </Paper>
                    </label>
                  </Grid>
                  {/* 1st Photo Grid */}

                  {/* 2nd Photo Grid */}
                  <Grid item>
                    <Input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      onChange={this.imageHandle.bind(this, "image6")}
                      name="image6"
                      id="fab-button-file6"
                      multiple
                      type="file"
                    />
                    <label htmlFor="fab-button-file6">
                      <Paper className="upload_button">
                        <Button
                          variant="fab"
                          component="span"
                          size="small"
                          color="primary"
                          className="plus_sign"
                        >
                          <AddIcon />
                        </Button>
                      </Paper>
                    </label>
                  </Grid>
                  {/* 2nd Photo Grid */}

                  {/* 3rd Photo Grid */}
                  <Grid item>
                    <Input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      onChange={this.imageHandle.bind(this, "image7")}
                      name="image7"
                      id="fab-button-file7"
                      multiple
                      type="file"
                    />
                    <label htmlFor="fab-button-file7">
                      <Paper className="upload_button">
                        <Button
                          variant="fab"
                          component="span"
                          size="small"
                          color="primary"
                          className="plus_sign"
                        >
                          <AddIcon />
                        </Button>
                      </Paper>
                    </label>
                  </Grid>
                  {/* 3rd Photo Grid */}

                  {/* 4th Photo Grid */}
                  <Grid item>
                    <Input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      onChange={this.imageHandle.bind(this, "image8")}
                      name="image8"
                      id="fab-button-file8"
                      multiple
                      type="file"
                    />
                    <label htmlFor="fab-button-file8">
                      <Paper className="upload_button">
                        <Button
                          variant="fab"
                          component="span"
                          size="small"
                          color="primary"
                          className="plus_sign"
                        >
                          <AddIcon />
                        </Button>
                      </Paper>
                    </label>
                  </Grid>
                  {/* 4th Photo Grid */}

                  {/* </Grid> */}
                  {/* Photos Second row Main Grid */}

                  {/* Photos Third row Main Grid */}
                  {/* <Grid container={true} spacing={24}> */}
                  {/* 1st Photo Grid */}
                  <Grid item>
                    <Input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      onChange={this.imageHandle.bind(this, "image9")}
                      name="image9"
                      id="fab-button-file9"
                      multiple
                      type="file"
                    />
                    <label htmlFor="fab-button-file9">
                      <Paper className="upload_button">
                        <Button
                          variant="fab"
                          component="span"
                          size="small"
                          color="primary"
                          className="plus_sign"
                        >
                          <AddIcon />
                        </Button>
                      </Paper>
                    </label>
                  </Grid>
                  {/* 1st Photo Grid */}

                  {/* 2nd Photo Grid */}
                  <Grid item>
                    <Input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      onChange={this.imageHandle.bind(this, "image10")}
                      name="image10"
                      id="fab-button-file10"
                      multiple
                      type="file"
                    />
                    <label htmlFor="fab-button-file10">
                      <Paper className="upload_button">
                        <Button
                          variant="fab"
                          component="span"
                          size="small"
                          color="primary"
                          className="plus_sign"
                        >
                          <AddIcon />
                        </Button>
                      </Paper>
                    </label>
                  </Grid>
                  {/* 2nd Photo Grid */}

                  {/* 3rd Photo Grid */}
                  <Grid item>
                    <Input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      onChange={this.imageHandle.bind(this, "image11")}
                      name="image11"
                      id="fab-button-file11"
                      multiple
                      type="file"
                    />
                    <label htmlFor="fab-button-file11">
                      <Paper className="upload_button">
                        <Button
                          variant="fab"
                          component="span"
                          size="small"
                          color="primary"
                          className="plus_sign"
                        >
                          <AddIcon />
                        </Button>
                      </Paper>
                    </label>
                  </Grid>
                  {/* 3rd Photo Grid */}

                  {/* 4th Photo Grid */}
                  <Grid item>
                    <Input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      onChange={this.imageHandle.bind(this, "image12")}
                      name="image12"
                      id="fab-button-file12"
                      multiple
                      type="file"
                    />
                    <label htmlFor="fab-button-file12">
                      <Paper className="upload_button">
                        <Button
                          variant="fab"
                          component="span"
                          size="small"
                          color="primary"
                          className="plus_sign"
                        >
                          <AddIcon />
                        </Button>
                      </Paper>
                    </label>
                  </Grid>
                  {/* 4th Photo Grid */}
                </Grid>
                {/* Photos Third row Main Grid */}
              </Grid>
              {/* Photos Main item Grid */}
            </Grid>
            {/* Photos Main Grid */}

            <Divider />

            {/* Contact Details Start Here */}

            <Typography align="left" variant="display1">
              Your Contact Details
            </Typography>

            {/* Name Grid */}
            <Grid container={true} spacing={8}>
              <Grid item xs={3}>
                <Typography
                  noWrap={true}
                  align="right"
                  className="titlesForInput"
                  variant="h6"
                >
                  Name*
                </Typography>
              </Grid>
              <Grid className="inputs" item xs={5}>
                <TextField
                  id="outlined-bare"
                  required={true}
                  value={this.state.user_name}
                  className="textField"
                  onChange={this.handleChange.bind(this, "user_name")}
                  name="user_name"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            {/* Name Grid */}

            {/* Phone number Grid */}
            <Grid container={true} spacing={8}>
              <Grid item xs={3}>
                <Typography
                  noWrap={true}
                  align="right"
                  className="titlesForInput"
                  variant="h6"
                >
                  Phone Number*
                </Typography>
              </Grid>
              <Grid className="inputs" item xs={5}>
                <TextField
                  id="outlined-bare"
                  className="textField"
                  required={true}
                  value={this.state.phone}
                  onChange={this.handleChange.bind(this, "phone")}
                  name="phone"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            {/* Phone number Grid */}

            <Divider />

            {/* Province Grid */}
            <Grid container={true} spacing={8}>
              <Grid item xs={3}>
                <Typography
                  noWrap={true}
                  className="titlesForInput"
                  align="right"
                  variant="h6"
                >
                  Province*
                </Typography>
              </Grid>
              <Grid id="selectType" className="inputs" item xs={5}>
                <Select
                  required={true}
                  value={this.state.province}
                  onChange={this.handleChange.bind(this, "province")}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      name="province"
                      className="textField"
                      id="outlined-select"
                    />
                  }
                >
                  {provinceArr.map(item => {
                    return (
                      <MenuItem key={item} value={item.replace(/ /g, "")}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
            </Grid>
            {/* Province Grid */}

            {/* Terms And Conditions Text Grid */}
            <Grid>
              <Typography color="primary" className="conditions">
                By clicking 'Submit' you confirm that you have carefully read
                and understood all the facts, statements and conditions stated
                in the Terms of Use &amp; Posting Rules of our website to which
                you unconditionally agree and accept as true and correct and
                constituting a binding agreement between us.
              </Typography>
            </Grid>
            {/* Terms And Conditions Text Grid */}

            <Divider />

            {/* Submit Button Grid */}
            <Grid className="submitGrid">
              <Button type="submit" id="submitButton" variant="contained">
                <Typography noWrap={true} variant="title" color="inherit">
                  Submit
                </Typography>
              </Button>
            </Grid>
            {/* Submit Button Grid */}
          </Paper>
          {this.state.showModal ? (
            <AdModal stateChange={this.modalFunctionToHide} />
          ) : null}
        </div>
      </form>
    );
  }
}

function recieveData(store) {
  return {
    AdData: store.editAdReducer,
    login: store.LoginReducer
  };
}

const newAd = connect(recieveData)(Ad);

export default withStyles(styles)(newAd);
