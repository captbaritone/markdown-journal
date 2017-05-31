import React, { Component } from "react";
import { connect } from "react-redux";
import AddBox from "material-ui/svg-icons/content/add-box";
import AppBar from "material-ui/AppBar";
import CircularProgress from "material-ui/CircularProgress";
import IconButton from "material-ui/IconButton";
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates
} from "react-infinite-calendar";
import "react-infinite-calendar/styles.css"; // only needs to be imported once

import { getJournalAsArray } from "../accessors";
import { addEntry, addEntryForToday, toggleDrawer } from "../actionCreators";
import SavingProgress from "./SavingProgress";

const MultipleDatesCalendar = withMultipleDates(Calendar);

class Journal extends Component {
  render() {
    return (
      <div>
        <AppBar
          title={"Markdown Today"}
          titleStyle={{ textAlign: "center" }}
          onLeftIconButtonTouchTap={this.props.toggleDrawer}
          iconElementRight={
            <IconButton tooltip="New" onTouchTap={this.props.addEntryForToday}>
              <AddBox />
            </IconButton>
          }
        />
        <SavingProgress />
        {!this.props.entries
          ? <div
              style={{ width: "100%", textAlign: "center", marginTop: "300px" }}
            >
              <CircularProgress size={80} thickness={5} />
            </div>
          : <div>
              {this.props.entries &&
                <InfiniteCalendar
                  width="100%"
                  Component={MultipleDatesCalendar}
                  interpolateSelection={defaultMultipleDateInterpolation}
                  selected={this.props.entries.map(
                    entry => new Date(entry.date)
                  )}
                  displayOptions={{
                    showHeader: false
                  }}
                  onSelect={this.props.addEntry}
                />}
            </div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entries: getJournalAsArray(state),
  // TODO: Move to acessor
  showDrawer: state.view.showDrawer
});

export default connect(mapStateToProps, {
  addEntry,
  addEntryForToday,
  toggleDrawer
})(Journal);