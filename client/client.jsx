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
        return {
            class: 'All',
            level: 'All'
        };
    },
    render(){
        return (
            <div>
                <h3>Filter: {this.state.class} + {this.state.level}</h3>
                <FilterButtons updateClass={this.updateClass} updateLevel={this.updateLevel}/>
                <SpellList classType={this.state.class} level={this.state.level} />
            </div>
        )
    },
    updateClass(filter){
        this.setState({ class: filter });
    },
    updateLevel(filter){
        this.setState({ level: filter });
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
        let query = {};

        if (this.props.classType !== 'All') query.class = this.props.classType;
        if (this.props.level !== 'All') query.level = this.props.level;

        return {
            spells: Spells.find(query).fetch()
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
                <select onChange={this.updateLevel} name="spell-filter" id="level-filter">
                  <option value="All">All Levels</option>
                  <option value="1st-level">1st Level</option>
                  <option value="2nd-level">2nd Level</option>
                  <option value="3rd-level">3rd Level</option>
                  <option value="4th-level">4th Level</option>
                </select>
                <label htmlFor="level-filter">Level</label>

                <select onChange={this.updateClass} name="spell-filter" id="class-filter">
                  <option value="All">All Classes</option>
                  <option value="Bard">Bard</option>
                  <option value="Warlock">Warlock</option>
                  <option value="Fighter">Fighter</option>
                  <option value="Wizard">Wizard</option>
                  <option value="Sorcerer">Sorcerer</option>
                  <option value="Druid">Druid</option>
                  <option value="Ranger">Ranger</option>
                  <option value="Cleric">Cleric</option>
                  <option value="Paladin">Paladin</option>
                </select>
                <label htmlFor="class-filter">Class</label>
            </div>
        )
    },
    updateClass(event){
        let value = event.target.value;
        this.props.updateClass(value);
    },
    updateLevel(event){
        let value = event.target.value;
        this.props.updateLevel(value);
    }
});
