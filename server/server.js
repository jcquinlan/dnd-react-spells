Meteor.startup(function(){
    const spells = JSON.parse(Assets.getText('test.json'));

    if( Spells.find().count() === 0){
        spells.forEach(function(spell){
            Spells.insert(spell);
        });
        console.log(spells);
    }
});


Meteor.publish('spells', function(){
    return Spells.find();
});
