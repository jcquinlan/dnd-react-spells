Meteor.subscribe('spells');

Meteor.startup(function(){
    ReactDOM.render(<Main />, document.getElementById('root'));
});

const Main = React.createClass({
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col l12 center-align">
                        <h1>D&D Spells</h1>
                    </div>
                </div>
                <List />
            </div>
        )
    }
});

const List = React.createClass({
    getInitialState(){
        return {filter: 'Bless'};
    },
    render(){
        return (
            <div>
                <FilterButtons updateFilter={this.updateFilter}/>
                <SpellList filter={this.state.filter}/>
            </div>
        )
    },
    updateFilter(filter){
        this.setState({ filter: filter });
    }
});




const SpellList = React.createClass({
    mixins: [ReactMeteorData],
    render(){
        return (
	    <div className="row">
	    	<div className="col l8 offset-l2">
                    <ul className="collection">
                        {this.renderSpells()}
                    </ul>
		    </div>
	    </div>
        )
    },
    getMeteorData(){
        let filter = this.props.filter;
        if(filter === "All") {
            return {
                spells: Spells.find().fetch()
            }
        } else {
            return {
                spells: Spells.find({ name: this.props.filter }).fetch()
            }
        }

    },
    renderSpells(){
        return this.data.spells.map((spell) => {
            return <Spell name={spell.name} level={spell.level}/>
        });
    }
});




const Spell = React.createClass({
    render(){
        return (
            <li className="collection-item"><div>{this.props.name} <div className="secondary-content">{this.props.level}</div></div></li>
        )
    }
});




const FilterButtons = React.createClass({
    render(){
        return (
            <div>
                <form onChange={this.handleChange}>
                    <p>
                      <input name="spell-filter" type="radio" id="show-all" value="All"/>
                      <label htmlFor="show-all">All</label>
                    </p>
                    <p>
                      <input name="spell-filter" type="radio" id="show-aid" value="Aid"/>
                      <label htmlFor="show-aid">Show Aid</label>
                    </p>
                </form>
            </div>
        )
    },
    handleChange(event){
        let value = event.target.value;
        this.props.updateFilter(value);
    }
});
