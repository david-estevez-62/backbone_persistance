
var Group = {};
//  group.player model settings and setup
Group.Player = Backbone.Model.extend({
    initialize: function() {
      this.on('add', this.addHandler);
      this.on('change', this.changeHandler);
      this.on('remove', this.removeHandler);
    },

    addHandler: function() {
      this.save();
    },

    changeHandler: function() {
      this.save(this.changed);
    },

    removeHandler: function() {
      this.destroy();
    }
});
// create the collection & connect the group.player model with the group.players collection
Group.Players = Backbone.Collection.extend({
  model: Group.Player,
  url: $("#formAdd").attr("action")
});
// initialize collection and optionally initialize (/seed) some object variables in collection 
var group = new Group.Players();


Group.Player.View = Backbone.View.extend({
    tagName: 'li',

    render: function() {
      // add the name to the list item
      this.$el.text(this.model.get('username'));

      // append the new list item to the list in the parent view
      this.parentView.$el.append( this.$el );

      return this;
    }
});

Group.Players.View = Backbone.View.extend({
   el: '#group-wrapper',

   initialize: function() {
      // share the “this” context with the render function
      _.bindAll( this, 'render' );

      // add various events for the collection
      this.collection.on('change', this.render);
      this.collection.on('add', this.render);
      this.collection.on('remove', this.render);
      this.collection.on('sync', this.render);

      // render the initial state
      this.render();
   },

   render: function() {
      // empty out the view element
      this.$el.empty();
      // cache this before entering the loop
      var thisView = this;

      // loop through all of the items in the collection, creating a
      // view for each
      this.collection.each(function(groupPlayer) {
        var groupPlayerView = new Group.Player.View({
          model: groupPlayer
        });

        // save a reference to this view within the child view
        groupPlayerView.parentView = thisView;

        // render it
        groupPlayerView.render();
      });


     return this;
   }
});

// create a new instance of the group view
var groupView = new Group.Players.View({
 collection: group
});




// Onload get the data from backend when this line in the code is reached and append into list
group.fetch({
  success: function() {
    console.log( 'Synced with particular database in backend' );
  },

  error: function() {
    console.log( 'Unable to fetch players data' );
  }
});


$("#formAdd").on("submit", function(e) {
      e.preventDefault();

      var thisUser = {
        username: $("#inputPlayer").val()
      }

      group.add(thisUser);

      $("#inputPlayer").val("")

})



