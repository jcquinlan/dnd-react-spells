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
        return {filter: 'All'};
    },
    render(){
        return (
            <div>
                <h3>Filter: {this.state.filter.split(', ')[0]}</h3>
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
	    	<div className="col s8 offset-s2">
                    <ul className="collection">
                        {this.renderSpells()}
                    </ul>
		    </div>
	    </div>
        )
    },
    getMeteorData(){
        let filter = this.props.filter.split(', ');

        if(filter[0] === "All") {
            return {
                spells: Spells.find().fetch()
            }
        } else if (filter[0] === "level") {
            return {
                spells: Spells.find({ level: filter[1] }).fetch()
            }
        } else if (filter[0] === "class") {
            return {
                spells: Spells.find({ class: filter[1] }).fetch()
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
                <select onChange={this.handleChange} name="spell-filter" id="show-all">
                  <option value="level, 1st-level">1st Level</option>
                  <option value="level, 2nd-level">2nd Level</option>
                  <option value="level, 3rd-level">3rd Level</option>
                  <option value="level, 4th-level">4th Level</option>
                </select>
                <label htmlFor="show-all">Level</label>

                <select onChange={this.handleChange} name="spell-filter" id="show-all">
                  <option value="class, Bard">Bard</option>
                  <option value="class, Warlock">Warlock</option>
                  <option value="class, Fighter">Fighter</option>
                  <option value="class, Wizard">Wizard</option>
                </select>
                <label htmlFor="show-all">Class</label>
            </div>
        )
    },
    handleChange(event){
        let value = event.target.value;
        this.props.updateFilter(value);
    }
});
