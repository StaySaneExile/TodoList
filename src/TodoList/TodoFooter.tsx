import React from 'react';
import './TodoFooter.css';



type OwnType = {
    filterValue: string
    changeFilter: (newFilterValue: string)=> void
}

class TodoFooter extends React.Component<OwnType> {
    state = {
        isHidden: false
    }
    onAllFilterClick = () => {this.props.changeFilter('All')};
    onCompletedFilterClick = () => {this.props.changeFilter('Completed')};
    onActiveFilterClick = () => {this.props.changeFilter('Active')};
    onShowFiltersClick = () => {this.setState({isHidden: false})};
    onHideFiltersClick = () => {this.setState({isHidden: true})};

    render = () => {
        let classForAll = this.props.filterValue === "All" ? "filter-active" : "default_button";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "default_button";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "default_button";

        return (
            <div className="todoList-footer">
                {!this.state.isHidden &&
                <div>
                    <button className={classForAll} onClick={this.onAllFilterClick}>All</button>
                    <button className={classForCompleted} onClick={this.onCompletedFilterClick}>Completed</button>
                    <button className={classForActive} onClick={this.onActiveFilterClick}>Active</button>
                </div>
                }
            </div>

        );
    }
}

export default TodoFooter;

