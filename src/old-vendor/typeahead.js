/* eslint-disable */

const Bloodhound = require('typeahead.js/dist/bloodhound.js');
require('typeahead.js/dist/typeahead.jquery.js');
const localforage = require('localforage/dist/localforage.js');

$(document).ready(function() {
  function number_format(number, decimals, decPoint, thousandsSep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    let n = !isFinite(+number) ? 0 : +number;
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
    let dec = (typeof decPoint === 'undefined') ? '.' : decPoint;

    let s = '';

    let toFixedFix = function(n, prec) {
      let k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k).toFixed(prec);
    };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }

    return s.join(dec);
  }

  function getBloodhoundSettings(type) {
    let remote = {
      url: '/api/search',
      prepare: function(query, settings) {
        settings.type = 'GET';
        settings.contentType = 'application/json; charset=UTF-8';
        settings.data = {
          'query': query,
          'type': type,
        };

        return settings;
      },
    };

    let settings = {
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,

      identify: function(datum) {
        return datum.id;
      },

      sufficient: 3,
    };

    if (type == 'search') {
      settings.datumTokenizer = Bloodhound.tokenizers.obj.whitespace('query');
      settings.prefetch = {
        url: '/api/recent-searches',
        cache: false,
        cacheKey: 'recentsearches',
        prepare: function(settings) {
          settings.type = 'GET';
          settings.contentType = 'application/json; charset=UTF-8';

          return settings;
        },
      };

      return localforage.getItem('recent_search_query').then(function(recent_search_query) {
        if (recent_search_query) {
          settings.prefetch.prepare = function(settings) {
            settings.type = 'GET';
            settings.contentType = 'application/json; charset=UTF-8';
            settings.data = {
              'new_query': recent_search_query,
            };

            return settings;
          };

          localforage.removeItem('recent_search_query').then(function() {}).catch(function(err) {});
        }

        return settings;
      }).catch(function(err) {
        console.log(err);
      });
    } else {
      settings.remote = remote;
    }

    return settings;
  }

  let searchBHSettings = getBloodhoundSettings('search');
  let isPromise = typeof searchBHSettings.then === 'function';
  if (isPromise) {
    searchBHSettings.then(function(searchConfig) {
      createTypeahead(searchConfig);
    });
  } else {
    createTypeahead(searchBHSettings);
  }

  function createTypeahead(searchBHSettings) {
    let search = new Bloodhound(searchBHSettings);

    let individualsBHSettings = getBloodhoundSettings('individuals');
    let individuals = new Bloodhound(individualsBHSettings);

    let organizationsBHSettings = getBloodhoundSettings('organizations');
    let organizations = new Bloodhound(organizationsBHSettings);

    let bblBHSettings = getBloodhoundSettings('bbl');
    let bbl = new Bloodhound(bblBHSettings);

    function searchWithDefaults(query, syncCallback, asyncCallback) {
      if (query === '') {
        let allPrefetch = search.all();
        if (allPrefetch.length > 0) {
          if (allPrefetch.length > 3) {
            allPrefetch = allPrefetch.slice(0, 3);
          }

          let ids = [];
          for (let i in allPrefetch) {
            ids.push(allPrefetch[i].id);
          }

          syncCallback(search.get(ids));
        }
      } else {
        search.search(query, syncCallback, asyncCallback);
      }
    }

    let original_query = '';
    var typeaheadInput = $('header input[type=search]').typeahead({
      hint: true,
      highlight: true,
      minLength: 0,
    }, {
      name: 'search',
      source: searchWithDefaults,
      limit: 3,
      templates: {
        header: '<h4 class="suggestion-header clearfix">Recent Searches</h4>',
        suggestion: function(datum) {
          if (datum) {
            return '<div id="popular-search-id-' + datum.id + '" class="clearfix"><span><span class="popular-search-icon glyphicon glyphicon-search"></span> ' +
                              datum.query + '<span class="meta-info"></span></span></div>';
          }
        },
      },
      display: function(suggestion) {
        return suggestion.query;
      },
    }, {
      name: 'search-bbl',
      source: bbl,
      limit: 3,
      templates: {
        header: '<h4 class="suggestion-header clearfix">Properties</h4>',
        suggestion: function(datum) {
          return '<div id="property-search-id-' + datum.id + '" class="clearfix"><span>' + datum.address + '<br><span class="meta-info">Click to view property</span></span></div>';
        },
      },
      display: function(suggestion) {
        return suggestion.address;
      },
    }).bind('keydown', function(event) {
      setTimeout(function() {
        original_query = $(event.target).val();
      }, 100);
    }).bind('focus', function() {
      typeaheadInput.typeahead('open');
    }).bind('typeahead:select', function(event, suggestion) {
      localforage.setItem('recent_search_query', original_query).then(function(value) {}).catch(function(err) {});
      if (typeof suggestion.url !== 'undefined') {
        location.href = suggestion.url;
      } else if (typeof suggestion.query !== 'undefined') {
        typeaheadInput.blur();
        setTimeout(function() {
          typeaheadInput.focus();
        }, 0);
        typeaheadInput.typeahead('val', suggestion.query);
      }
    });
  }
});
