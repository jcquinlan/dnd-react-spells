Meteor.subscribe('spells');

Meteor.startup(function(){
    ReactDOM.render(<Main />, document.getElementById('root'));
});

const Main = React.createClass({
    render(){
        return (
            <div>
                <List />
            </div>
        )
    }
});

const List = React.createClass({
    mixins: [ReactMeteorData],
    render(){
        return (
            <ul>
                {this.renderSpells()}
            </ul>
        )
    },
    getMeteorData(){
        return {
            spells: Spells.find().fetch()
        }
    },
    renderSpells(){
        return this.data.spells.map((spell) => {
            return <Spell name={spell.name} />
        });
    }
});

const Spell = React.createClass({
    render(){
        return (
            <li>{this.props.name}</li>
        )
    }
})
