/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var getBranchBadge = function(t){
  return Promise.all([
    t.get('board', 'shared', 'prefix', 'tr'),
    t.card('idShort').get('idShort'),
    t.card('name').get('name'),
  ])
  .then(function(result){
    var slug = result[2]
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
    return [{
      title: 'Branch name', // for detail badges only
      text: (result[0] ? result[0] + '-' : '') + result[1] + '-' + slug
    }];
  })
};

TrelloPowerUp.initialize({
  'card-detail-badges': function(t, options) {
    return getBranchBadge(t);
  },
  'show-settings': function(t, options){
    return t.popup({
      title: 'Settings',
      url: './settings.html',
      height: 184
    });
  }
});
