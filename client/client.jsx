Meteor.subscribe('spells');

Meteor.startup(function(){
    ReactDOM.render(<Main />, document.getElementById('root'));
});

const Main = React.createClass({
    render(){
        return (
            <div className="container">
                <List />
            </div>
        )
    }
});

const List = React.createClass({
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
        return {
            spells: Spells.find().fetch()
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
})
