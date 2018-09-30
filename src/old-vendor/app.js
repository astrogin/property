/* eslint-disable */

import {
  isEmpty as _isEmpty,
  debounce as _debounce,
} from 'lodash';

let AdminLTEOptions = {
  sidebarExpandOnHover: false,
  enableBoxRefresh: true,
  enableBSToppltip: true,
  enableControlSidebar: true,
  controlSidebarOptions: {
    toggleBtnSelector: '[data-toggle=\'control-sidebar\']',
    selector: '.control-sidebar',
    slide: false,
  },
};

let right_map = null;
let geocoder = null;
let marker_cluster = null;
let temp_marker = false;
let geocoder_interval = null;

// @TODOTEAMLEAD convert to vue
$(document).ready(function() {
  check_width_for_content_wrapper();
  resize_inbox_main_box();
  resize_right_map();
  // var right_panel_visible= Cookies.get('right_panel_visible');
  // if(right_panel_visible == 'true'){
  //     $('body').addClass('control-sidebar-open');
  // }

  $('body').on('hidden.bs.modal', '#user-info-modal', function() {
    $(this).removeData('bs.modal');
  });

  if ($('.articls').length || $('.article').length) {
    $('.boxs').css('background-color', '#ecf0f5');
    $('.boxs').css('display', 'block');
    $('.boxs').css('padding', '0px');
    $('.box').css('border-top', '0px');
    $('.content-wrapper').css('background-color', '#ecf0f5');
    $('.articls').css('height', $('.content-wrapper').height());
    $('.overlay').css('height', $('.content-wrapper').height());
  }

  $('#search-btn-mobile').click(function(e) {
    /* if(!$(this).parents('.mobile-view').hasClass('active')) {
          e.preventDefault();
          $(this).parents('.input-group').find('input').focus();
          $(this).parents('.mobile-view').addClass('active');

      }*/
  });

  if ($( window ).width() < 767) {
    $('.tt-input').attr('placeholder', 'Search');
  }

  $(document).on('focus', '.tt-input', function() {
    if ($( window ).width() < 767) {
      $(this).parent('span').css('width', '270px');
      $('#top-search-input-group').css('left', '2px');
      $(this).attr('placeholder', 'Address, BBL, Person');
      $('#top-search-input-group').css('border', '1px solid #fff');
      $('#top-search-input-group').css('border-radius', '25px');
      $('#top-search-input-group').css('width', '300px');
      $('.view-changer').css('display', 'none');
    }
  });

  $(document).on('click', '.tt-suggestion', function() {
    if ($( window ).width() < 767) {
      $(':focus').blur();
    }
  });

  $(document).on('blur', '.tt-input', function() {
    if ($( window ).width() < 767) {
      // console.log($(this).parents().eq(2));
      $(this).parent('span').css('width', '71px');
      $('#top-search-input-group').css('left', '0');
      $(this).attr('placeholder', 'search');
      $('#top-search-input-group').css('width', '102px');
      $('.view-changer').css('display', 'inline-block');
      $(this).parent('span').find('.tt-open').css('display', 'none');
    }
  });


  $('.mobile-view input').blur(function() {
    if ($(this).parents('.mobile-view').hasClass('active')) {
      $(this).parents('.mobile-view').removeClass('active');
    }
  });

  $('.toggle-search-form').click(function() {
    $('.property-search__filters').toggleClass('expanded');
  });
  // fit_search_result_box_to_screen();

  // expand violations details
  $('.violations__table__expand-parent').click(function() {
    let parent = $(this).parents('.violations__table__tbody');
    if (parent.hasClass('collapsed')) {
      parent.removeClass('collapsed');
    } else {
      parent.addClass('collapsed');
    }
  });

  let mapid;

  if ($( window ).width()<=769) {
    mapid = 'mobileMapId';
  } else {
    mapid = 'mapid';
  }

  function initMap(lat, lng) {
    transitLayer.setMap(map);
  }


  function addSubwayLines() {
    $.getJSON('/subwayJson/subwayLine', function(data) {
      let lnLayer = L.geoJSON(data).addTo(right_map);
      lnLayer.setStyle(function(feature) {
        switch (feature.properties.route_id) {
          case '1':
            return {color: '#EE352E'};
          case '2':
            return {color: '#EE352E'};
          case '3':
            return {color: '#EE352E'};
          case '4':
            return {color: '#00933C'};
          case '5':
            return {color: '#00933C'};
          case '6':
            return {color: '#00933C'};
          case 'B':
            return {color: '#FF6319'};
          case 'D':
            return {color: '#FF6319'};
          case 'F':
            return {color: '#FF6319'};
          case 'M':
            return {color: '#FF6319'};
          case 'A':
            return {color: '#2850AD'};
          case 'C':
            return {color: '#2850AD'};
          case 'E':
            return {color: '#2850AD'};
          case 'G':
            return {color: '#6CBE45'};
          case 'J':
            return {color: '#8f5a00'};
          case 'Z':
            return {color: '#8f5a00'};
          case 'L':
            return {color: '#A7A9AC'};
          case 'N':
            return {color: '#FCCC0A'};
          case 'Q':
            return {color: '#FCCC0A'};
          case 'R':
            return {color: '#FCCC0A'};
          case 'S':
            return {color: '#808183'};
          case '7':
            return {color: '#A7A9AC'};
        }
      });
      lnLayer.setStyle({weight: '1'});
      console.log(right_map.getZoom());
      right_map.on('zoomend', function() {
        let currentZoom = right_map.getZoom();
        console.log(currentZoom);
        if (currentZoom <= 14) {
          lnLayer.setStyle({weight: '1'});
        } else {
          lnLayer.setStyle({weight: '3'});
        }
      });
    });
  }


  // map for property search page
  // start
  if ($('#mapid_search').length>0) {
    setInterval( parse_property_titles_for_map, 2000 );
    resize_right_map();
    L.Icon.Default.imagePath = '/images/leaflet-images/';
    right_map = L.map('mapid_search').setView([40.735738, -73.941250], 12);
    geocoder = L.Control.Geocoder.google('AIzaSyAKaS4ID8DtYkDgnFrktl25yvZ9Z7J3EEQ');
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      maxZoom: 21,
    }).addTo(right_map);
    addSubwayLines();
    addSubwayStations();
    clickable_map(right_map);

    $('#mapid_search .leaflet-control-zoom.leaflet-bar').append('<a class="hide-right-sidebar" href="#" title="Hide right sidebar"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>');
    $('.hide-right-sidebar').click(function(e) {
      e.preventDefault();
      $('.control-sidebar-toggler a').click();
      return false;
    });
  }
});


$(document).on('click', '#property-map__googleId', function() {
  let property_address = $('#property-map__googleId').attr('data-address');
  geocoder.geocode(property_address, function(results) {
    let r = results[0];
    if (r) {
      let img = document.getElementById('property-map__googleImage');
      let can_map= document.getElementById('map-canvas');
      img.style.display='none';
      can_map.style.height='343px';
      initPano(r.center.lat, r.center.lng);
    }
  });
});


// parse property titles for map b
// parametrs (query - string)
function parse_property_titles_for_map() {
}


$(document).on('click', '.property-search__results .search-result-box', function() {
  if (screen.width>420) {
    right_map.setView([$(this).attr('data-lat'), $(this).attr('data-lng')], 20);

    let address = $(this).attr('data-plain_address');
    let zipcode = $(this).attr('data-plain_zipcode');
    let bbl = $(this).attr('data-plain_bbl');

    let $this = $(this);
    // addSubwayStations();
    $.post('/api/property-image', {
      address: address,
      zipcode: zipcode,
      bbl: bbl,
    }, function(response) {
      let last_sold_price =$this.attr('data-last-sold-amount');
      let marker= L.marker([$this.attr('data-lat'), $this.attr('data-lng')], 20).addTo(right_map);

      let popup_content = '<a class=\'address\' href=\''+$this.attr('data-item_url') +'\'><p>'+$this.attr('data-map_address')+'</p></a>'+
              '<p class=\'neighborhood\'>'+$this.attr('data-neighborhood')+'</p>'+
              '<div class="street_image" style="background-image:url('+response.url+')"></div>'+
              '<span>' + $this.attr('data-floors') +' STORY,</span>'+
              '<span>' + $this.attr('data-units') +' UNIT,</span>'+
              '<span>' + $this.attr('data-lot_area')/1000 + 'K SQFT,</span><br>'+
              '<span>'+$this.attr('data-type')+',</span><br>'+
              '<span>BUILT '+$this.attr('data-built') +' </span>';
      if (last_sold_price.slice(2) != 0) {
        popup_content += ',<span>LAST Sale  '+ last_sold_price +'</span>'+
              '<span>('+$this.attr('data-last-sold-data').slice(0, 4) +')</span>';
      }

      popup_content += '<a class=\'more_detile\' href=\''+$this.attr('data-item_url')+'\'>Property Details</a>';
      marker.bindPopup(popup_content).openPopup();
    }, 'json');
  }
});


// function check_if_geocoder_is_finished(items,results){
//     if(results.length ==items){
//         clearInterval(geocoder_interval);
//         // add_markers_group_on_map(results);
//
//     }
// }


// add markers cluster to map
function add_markers_group_on_map(array_markers) {
  if (right_map) {
    if ($('.property-search__results').length>0) {
      if (marker_cluster) {
        marker_cluster.clearLayers();
      } else {
        marker_cluster = L.markerClusterGroup();
      }
      for (let i = 0; i < array_markers.length; i++) {
        let a = array_markers[i];
        let title = a[2];
        let marker = L.marker(new L.LatLng(a[0], a[1]), {title: title});
        marker.bindPopup(title);
        marker.on('click', function(e) {
          right_map.setView(e.latlng, 20);
        });
        marker_cluster.addLayer(marker);
      }
      right_map.addLayer(marker_cluster);
    }
  }
}


// by click search property address
function clickable_map(map) {
  map.on('click', function(e) {
    if (temp_marker) {
      map.removeLayer(temp_marker);
    }
    search_property(e.latlng, map);
  });
}


// add subway stations
function addSubwayStations() {
  let Mlayer=[];
  $.getJSON( '/subwayJson/subwayStations', function( data ) {
    $.each(data.data, function(index, value) {
      let location = value[11].split(' ');
      let routs = value[12].split('-');
      let html='';
      $.each(routs, function(index, value) {
        html += '<span class=\'leaflet-sub_icon  line_'+value+'\'>'+value+'</span>';
      });
      let MIcon = L.divIcon({
        className: 'leaflet-item-div',
        html: html,
      });
      Mlayer.push(L.marker([location[1], location[0]], {icon: MIcon}));
    });
    let cities = L.layerGroup(Mlayer);

    if (right_map.getZoom() > 14) {
      right_map.addLayer(cities);
    }
    right_map.on('zoomend', function() {
      let currentZoom = right_map.getZoom();
      if (currentZoom <= 14) {
        right_map.removeLayer(cities);
      } else {
        right_map.addLayer(cities);
      }
    });
  });
}


// search result via api/search and add marker to map
// parametrs (query - string)
function search_property(coords, map) {
  temp_marker = L.marker(coords, {opacity: 0.7});
  map.addLayer(temp_marker);

  temp_marker.bindPopup('<div class=\'overlay\' style=\'color: #41c8f2; text-align: center; margin: 15px 0;\'>'+
      '<i class=\'fa fa-refresh fa-spin fa-4x\'></i>'+
      '</div>').addTo(map).openPopup();

  $.post('/api/search-map', {
    lat: coords.lat,
    lng: coords.lng,
  }, function(result) {
    if (!_isEmpty(result)) {
      let img = '';
      if (result.google_street_view_url != null) {
        img = result.google_street_view_url;
      }
      let popup_content = '<a class=\'address\' href=\''+result.url+'\'><p>' + result.address +',' + result.zipcode + '</p></a>' +
              '<p class=\'neighborhood\'>' + result.neighborhood_title + '</p>' +
              '<div class=\'street_image\' style=\'background-image:url(' + location.protocol + '//' + location.hostname + '' + img + ')\' ></div>' +
              '<span> ' + result.num_floors + ' STORY,</span>' +
              '<span> ' + result.units_total + ' UNIT,</span>' +
              '<span> ' + result.lot_area / 1000 + 'K SQFT,</span><br>' +
              '<span>'+result.type +',</span><br>'+
              '<span> BUILT ' + result.year_built + ' </span>';
      if (result.sales_doc_amount && result.sales_doc_amount.slice(2) != 0) {
        popup_content += ',<span>LAST Sale  '+ result.sales_doc_amount +'</span>'+
                      '<span>('+result.sales_recorded_filed.slice(0, 4) +')</span>';
      }
      popup_content += '<a class=\'more_detile\' href=\'' + result.url + '\'>Property Details</a>';
      temp_marker.bindPopup(popup_content).addTo(map).openPopup();
    } else {
      temp_marker.closePopup();
    }
  });
}

$(window).resize(_debounce(function() {
  // fit_search_result_box_to_screen();
  check_width_for_content_wrapper();
  // resize_inbox_main_box();
  resize_right_map();
}, 300));

function initiate_map_for_search_neighborhoods() {

}
function select_checkbox_from_neighborhoods(e) {
  let layer = e.target;
  let neighborhood_title = $('.leaflet-interactive.' + layer.feature.properties['NAME'].replace(/ /g, '.'));
  if (!neighborhood_title.hasClass('visible')) {
    neighborhood_title.addClass('visible');
    $( '.neighborhoods-tree__title:contains(\'' + layer.feature.properties['NAME'] +'\')' ).siblings('input').prop('checked', true);
  } else {
    neighborhood_title.removeClass('visible');
    $( '.neighborhoods-tree__title:contains(\'' + layer.feature.properties['NAME'] +'\')' ).siblings('input').prop('checked', false);
  }
}
function fit_search_result_box_to_screen() {
  if ($('.search-result-box').length>0) {
    let search_result_box_width = $('.search-result-box').width();
    $('.search-result-box').removeClass('extra-narrow');
    $('.search-result-box').removeClass('like-mobile');
    $('.search-result-box').removeClass('narrow');
    $('.search-result-box').removeClass('w-300');
    $('.search-result-box').removeClass('w-480');
    if ($(window).width() > 767) {
      if (search_result_box_width<300) {
        $('.search-result-box').addClass('w-300');
      } else if (search_result_box_width<480) {
        $('.search-result-box').addClass('w-480');
      }
      if (search_result_box_width<500) {
        $('.search-result-box').addClass('like-mobile');
      } else if (search_result_box_width<600) {
        $('.search-result-box').addClass('extra-narrow');
      } else if (search_result_box_width<800) {
        $('.search-result-box').addClass('narrow');
      }
    }
  }
}
// end


function check_width_for_content_wrapper() {
  if ($('.content-wrapper').length>0) {
    let $wrapper = $('.content-wrapper');
    if ($wrapper.hasClass('property-wrapper')) {
      var content_wrapper_width = $wrapper.children('.property').width();
    } else {
      var content_wrapper_width = $wrapper.width();
    }
    $wrapper.removeClass('w-less-850');
    $wrapper.removeClass('w-less-800');
    $wrapper.removeClass('w-less-700');
    $wrapper.removeClass('w-less-600');
    $wrapper.removeClass('w-less-500');
    $wrapper.removeClass('w-less-400');
    $wrapper.removeClass('w-less-300');
    if ($(window).width() > 767) {
      if (content_wrapper_width<300) {
        $wrapper.addClass('w-less-300');
      }
      if (content_wrapper_width<400) {
        $wrapper.addClass('w-less-400');
      }
      if (content_wrapper_width<500) {
        $wrapper.addClass('w-less-500');
      }
      if (content_wrapper_width<600) {
        $wrapper.addClass('w-less-600');
      }
      if (content_wrapper_width<700) {
        $wrapper.addClass('w-less-700');
      }
      if (content_wrapper_width<800) {
        $wrapper.addClass('w-less-800');
      }
      if (content_wrapper_width<850) {
        $wrapper.addClass('w-less-850');
      }
    }
  }
}


// resize right-map
function resize_right_map() {
  // console.log('resize_right_map FIRE');
  let map_container = false;
  if ($('#mapid').length>0) {
    map_container = $('#mapid');
  } else if ($('#mapid_search').length>0) {
    map_container = $('#mapid_search');
  }
  if (map_container) {
    if ($(window).width()>767) {
      let h = map_container.siblings('.property').height();
      let h2 = $(window).height() - $('.main-header').outerHeight() - $('.main-footer').outerHeight();
      if (h<h2) {
        map_container.css('min-height', h2);
      } else {
        map_container.css('min-height', h);
      }
    } else {
      map_container.css('min-height', $(window).height()/2);
    }
    if (right_map) {
      right_map.invalidateSize();
    }
  }
}


// resize inbox-main-box
function resize_inbox_main_box() {
  if ($('.inbox-main-box').length>0) {
    if ($(window).width() > 991) {
      let h = $(window).height() - $('.main-header').height() - $('.main-footer').height()- $('.content-header').outerHeight() - 50 - $('.inbox-main-box .box-header').outerHeight() - $('.inbox-main-box .box-footer').outerHeight();
      if (h>400) {
        $('.inbox-main-box .box-body').css('min-height', h);
      } else {
        $('.inbox-main-box .box-body').css('min-height', 400);
      }
    } else {
      $('.inbox-main-box .box-body').css('min-height', 400);
    }
  }
}


/* calendar */
$(function() {
  /* initialize the external events
   -----------------------------------------------------------------*/
  function ini_events(ele) {
    ele.each(function() {
      // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
      // it doesn't need to have a start or end
      let eventObject = {
        title: $.trim($(this).text()), // use the element's text as the event title
      };

      // store the Event Object in the DOM element so we can get to it later
      $(this).data('eventObject', eventObject);

      // make the event draggable using jQuery UI
      $(this).draggable({
        zIndex: 1070,
        revert: true, // will cause the event to go back to its
        revertDuration: 0, //  original position after the drag
      });
    });
  }

  ini_events($('#external-events div.external-event'));

  /* initialize the calendar
   -----------------------------------------------------------------*/
  // Date for the calendar events (dummy data)
  let date = new Date();
  let d = date.getDate(),
    m = date.getMonth(),
    y = date.getFullYear();


  /* ADDING EVENTS */
  let currColor = '#3c8dbc'; // Red by default
  // Color chooser button
  let colorChooser = $('#color-chooser-btn');
  $('#color-chooser > li > a').click(function(e) {
    e.preventDefault();
    // Save color
    currColor = $(this).css('color');
    // Add color effect to button
    $('#add-new-event').css({'background-color': currColor, 'border-color': currColor});
  });
  $('#add-new-event').click(function(e) {
    e.preventDefault();
    // Get value and make sure it is not null
    let val = $('#new-event').val();
    if (val.length == 0) {
      return;
    }

    // Create events
    let event = $('<div />');
    event.css({'background-color': currColor, 'border-color': currColor, 'color': '#fff'}).addClass('external-event');
    event.html(val);
    $('#external-events').prepend(event);

    // Add draggable funtionality
    ini_events(event);

    // Remove event from text input
    $('#new-event').val('');
  });
});
/* end calendar */


$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
  },
});


$(function() {
  let scrollSettings = {
    cursorcolor: '#dff4ff',
    cursoropacitymax: 1,
    cursorwidth: 7,
    cursorborder: 0,
    autohidemode: false,
    horizrailenabled: false,
  };

  // $(".scroll-block").niceScroll(scrollSettings);

  // if ($(window).width() >= 768) {

  //     if ($('.content-wrapper').length > 0) {
  //         $(".content-wrapper").niceScroll(scrollSettings);
  //     } else {
  //         $('body').css('overflow', 'auto');
  //     }

  // }

  // TODO: Wtf?
  $('#ascrail2000').show();
});


$('[data-toggle="tabajax"]').click(function(e) {
  e.preventDefault();

  let $this = $(this),
    loadurl = $this.attr('href'),
    targ = $this.attr('data-target');

  $.get(loadurl, function(data) {
    $(targ).html(data);
  });

  $this.tab('show');
  return false;
});


$.fn.extend({
  jarvismenu: function(options) {
    let defaults = {
        accordion: 'true',
        speed: 200,
        closedSign: '[+]',
        openedSign: '[-]',
      },
      // Extend our default options with those provided.
      opts = $.extend(defaults, options),
      // Assign current element to variable, in this case is UL element
      $this = $(this);

      // add a mark [+] to a multilevel menu
    $this.find('li').each(function() {
      if ($(this).find('ul').size() !== 0) {
        // add the multilevel sign next to the link
        $(this).find('a:first').append('<b class=\'collapse-sign\'>' + opts.closedSign + '</b>');

        // avoid jumping to the top of the page when the href is an #
        if ($(this).find('a:first').attr('href') == '#') {
          $(this).find('a:first').click(function() {
            return false;
          });
        }
      }
    });

    // open active level
    $this.find('li.active').each(function() {
      $(this).parents('ul').slideDown(opts.speed);
      $(this).parents('ul').parent('li').find('b:first').html(opts.openedSign);
      $(this).parents('ul').parent('li').addClass('open');
    });

    $this.find('li a').click(function() {
      if ($(this).parent().find('ul').size() !== 0) {
        if (opts.accordion) {
          // Do nothing when the list is open
          if (!$(this).parent().find('ul').is(':visible')) {
            parents = $(this).parent().parents('ul');
            visible = $this.find('ul:visible');
            visible.each(function(visibleIndex) {
              let close = true;
              parents.each(function(parentIndex) {
                if (parents[parentIndex] == visible[visibleIndex]) {
                  close = false;
                  return false;
                }
              });
              if (close) {
                if ($(this).parent().find('ul') != visible[visibleIndex]) {
                  $(visible[visibleIndex]).slideUp(opts.speed, function() {
                    $(this).parent('li').find('b:first').html(opts.closedSign);
                    $(this).parent('li').removeClass('open');
                  });
                }
              }
            });
          }
        }// end if
        if ($(this).parent().find('ul:first').is(':visible') && !$(this).parent().find('ul:first').hasClass('active')) {
          $(this).parent().find('ul:first').slideUp(opts.speed, function() {
            $(this).parent('li').removeClass('open');
            $(this).parent('li').find('b:first').delay(opts.speed).html(opts.closedSign);
          });
        } else {
          $(this).parent().find('ul:first').slideDown(opts.speed, function() {
            /* $(this).effect("highlight", {color : '#616161'}, 500); - disabled due to CPU clocking on phones*/
            $(this).parent('li').addClass('open');
            $(this).parent('li').find('b:first').delay(opts.speed).html(opts.openedSign);
          });
        } // end else
      } // end if
    });
  }, // end function
});


$(function() {
  $('.agencies-menu ul').jarvismenu({
    accordion: false,
    speed: 225,
    closedSign: '<em class="fa fa-lg fa-angle-left"></em>',
    openedSign: '<em class="fa fa-lg fa-angle-down"></em>',
  });

  $('document').on('click', 'th.expander i', function() {
    $open=$(this).hasClass('fa-minus-square')?'fa-minus-square-o':'fa-plus-square-o';
    $(this).toggleClass('fa-plus-square fa-minus-square').closest('table').find('i.'+$open).trigger('mousedown');
  });
});


/* ! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <abdullah@almsaeedstudio.com>
 * @version 2.3.6
 * @license MIT <http://opensource.org/licenses/MIT>
 */

// Make sure jQuery has been loaded before app.js
if (typeof jQuery === 'undefined') {
  throw new Error('AdminLTE requires jQuery');
}

/* AdminLTE
 *
 * @type Object
 * @description $.AdminLTE is the main object for the template's app.
 *              It's used for implementing functions and options related
 *              to the template. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */
$.AdminLTE = {};

/* --------------------
 * - AdminLTE Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.AdminLTE.options = {
  // Add slimscroll to navbar menus
  // This requires you to load the slimscroll plugin
  // in every page before app.js
  navbarMenuSlimscroll: true,
  navbarMenuSlimscrollWidth: '3px', // The width of the scroll bar
  navbarMenuHeight: '200px', // The height of the inner menu
  // General animation speed for JS animated elements such as box collapse/expand and
  // sidebar treeview slide up/down. This options accepts an integer as milliseconds,
  // 'fast', 'normal', or 'slow'
  animationSpeed: 500,
  // Sidebar push menu toggle button selector
  sidebarToggleSelector: '[data-toggle=\'offcanvas\']',
  // Activate sidebar push menu
  sidebarPushMenu: true,
  // Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
  sidebarSlimScroll: true,
  // Enable sidebar expand on hover effect for sidebar mini
  // This option is forced to true if both the fixed layout and sidebar mini
  // are used together
  sidebarExpandOnHover: false,
  // BoxRefresh Plugin
  enableBoxRefresh: true,
  // Bootstrap.js tooltip
  enableBSToppltip: true,
  BSTooltipSelector: '[data-toggle=\'tooltip\']',
  // Enable Fast Click. Fastclick.js creates a more
  // native touch experience with touch devices. If you
  // choose to enable the plugin, make sure you load the script
  // before AdminLTE's app.js
  enableFastclick: false,
  // Control Sidebar Options
  enableControlSidebar: true,
  controlSidebarOptions: {
    // Which button should trigger the open/close event
    toggleBtnSelector: '[data-toggle=\'control-sidebar\']',
    // The sidebar selector
    selector: '.control-sidebar',
    // Enable slide over content
    slide: true,
  },
  // Box Widget Plugin. Enable this plugin
  // to allow boxes to be collapsed and/or removed
  enableBoxWidget: true,
  // Box Widget plugin options
  boxWidgetOptions: {
    boxWidgetIcons: {
      // Collapse icon
      collapse: 'fa-minus',
      // Open icon
      open: 'fa-plus',
      // Remove icon
      remove: 'fa-times',
    },
    boxWidgetSelectors: {
      // Remove button selector
      remove: '[data-widget="remove"]',
      // Collapse button selector
      collapse: '[data-widget="collapse"]',
    },
  },
  // Direct Chat plugin options
  directChat: {
    // Enable direct chat by default
    enable: true,
    // The button to open and close the chat contacts pane
    contactToggleSelector: '[data-widget="chat-pane-toggle"]',
  },
  // Define the set of colors to use globally around the website
  colors: {
    lightBlue: '#3c8dbc',
    red: '#f56954',
    green: '#00a65a',
    aqua: '#00c0ef',
    yellow: '#f39c12',
    blue: '#0073b7',
    navy: '#001F3F',
    teal: '#39CCCC',
    olive: '#3D9970',
    lime: '#01FF70',
    orange: '#FF851B',
    fuchsia: '#F012BE',
    purple: '#8E24AA',
    maroon: '#D81B60',
    black: '#222222',
    gray: '#d2d6de',
  },
  // The standard screen sizes that bootstrap uses.
  // If you change these in the variables.less file, change
  // them here too.
  screenSizes: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200,
  },
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements AdminLTE's
 * functions and plugins as specified by the
 * options above.
 */
$(function() {
  'use strict';

  // Fix for IE page transitions
  $('body').removeClass('hold-transition');

  // Extend options if external options exist
  if (typeof AdminLTEOptions !== 'undefined') {
    $.extend(true,
      $.AdminLTE.options,
      AdminLTEOptions);
  }

  // Easy access to options
  let o = $.AdminLTE.options;

  // Set up the object
  _init();

  // Activate the layout maker
  $.AdminLTE.layout.activate();

  // Enable sidebar tree view controls
  $.AdminLTE.tree('.sidebar');

  // Enable control sidebar
  if (o.enableControlSidebar) {
    $.AdminLTE.controlSidebar.activate();
  }

  // Add slimscroll to navbar dropdown
  if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll !== 'undefined') {
    $('.navbar .menu').slimscroll({
      height: o.navbarMenuHeight,
      alwaysVisible: false,
      size: o.navbarMenuSlimscrollWidth,
    }).css('width', '100%');
  }

  // Activate sidebar push menu
  if (o.sidebarPushMenu) {
    $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
  }


  // Activate box widget
  if (o.enableBoxWidget) {
    $.AdminLTE.boxWidget.activate();
  }

  // Activate fast click
  if (o.enableFastclick && typeof FastClick !== 'undefined') {
    FastClick.attach(document.body);
  }

  // Activate direct chat widget
  if (o.directChat.enable) {
    $(document).on('click', o.directChat.contactToggleSelector, function() {
      let box = $(this).parents('.direct-chat').first();
      box.toggleClass('direct-chat-contacts-open');
    });
  }

  /*
   * INITIALIZE BUTTON TOGGLE
   * ------------------------
   */
  $('.btn-group[data-toggle="btn-toggle"]').each(function() {
    let group = $(this);
    $(this).find('.btn').on('click', function(e) {
      group.find('.btn.active').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });
  });
});

/* ----------------------------------
 * - Initialize the AdminLTE Object -
 * ----------------------------------
 * All AdminLTE functions are implemented below.
 */
function _init() {
  'use strict';
  /* Layout
   * ======
   * Fixes the layout height in case min-height fails.
   *
   * @type Object
   * @usage $.AdminLTE.layout.activate()
   *        $.AdminLTE.layout.fix()
   *        $.AdminLTE.layout.fixSidebar()
   */
  $.AdminLTE.layout = {
    activate: function() {
      let _this = this;
      _this.fixSidebar();
      $(window, '.wrapper').resize(function() {
        _this.fixSidebar();
      });
    },
    fixSidebar: function() {
      // Make sure the body tag has the .fixed class
      if (!$('body').hasClass('fixed')) {
        if (typeof $.fn.slimScroll !== 'undefined') {
          $('.sidebar').slimScroll({destroy: true}).height('auto');
        }
        return;
      } else if (typeof $.fn.slimScroll === 'undefined' && window.console) {
        window.console.error('Error: the fixed layout requires the slimscroll plugin!');
      }
      // Enable slimscroll for fixed layout
      if ($.AdminLTE.options.sidebarSlimScroll) {
        if (typeof $.fn.slimScroll !== 'undefined') {
          // Destroy if it exists
          $('.sidebar').slimScroll({destroy: true}).height('auto');
          // Add slimscroll
          $('.sidebar').slimscroll({
            height: ($(window).height() - $('.main-header').height()) + 'px',
            color: 'rgba(0,0,0,0.2)',
            size: '3px',
          });
        }
      }
    },
  };

  /* PushMenu()
   * ==========
   * Adds the push menu functionality to the sidebar.
   *
   * @type Function
   * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
   */
  $.AdminLTE.pushMenu = {
    activate: function(toggleBtn) {
      // Get the screen sizes
      let screenSizes = $.AdminLTE.options.screenSizes;

      // Enable sidebar toggle
      $(document).on('click', toggleBtn, function(e) {
        e.preventDefault();

        // Enable sidebar push menu
        if ($(window).width() > (screenSizes.sm - 1)) {
          if ($('body').hasClass('sidebar-collapse')) {
            $('body').removeClass('sidebar-collapse').trigger('expanded.pushMenu');
          } else {
            $('body').addClass('sidebar-collapse').trigger('collapsed.pushMenu');
          }
        }
        // Handle sidebar push menu for small screens
        else {
          if ($('body').hasClass('sidebar-open')) {
            $('body').removeClass('sidebar-open').addClass('sidebar-collapse').trigger('collapsed.pushMenu');
          } else {
            $('body').addClass('sidebar-open').removeClass('sidebar-collapse').trigger('expanded.pushMenu');
          }
        }
      });

      $('.content-wrapper').click(function() {
        // Enable hide menu when clicking on the content-wrapper on small screens
        if ($(window).width() <= (screenSizes.sm - 1) && $('body').hasClass('sidebar-open')) {
          $('body').removeClass('sidebar-open');
        }
      });

      // Enable expand on hover for sidebar mini
      if ($.AdminLTE.options.sidebarExpandOnHover
        || ($('body').hasClass('fixed')
        && $('body').hasClass('sidebar-mini'))) {
        this.expandOnHover();
      }
    },
    expandOnHover: function() {
      let _this = this;
      let screenWidth = $.AdminLTE.options.screenSizes.sm - 1;
      // Expand sidebar on hover
      $('.main-sidebar').hover(function() {
        if ($('body').hasClass('sidebar-mini')
          && $('body').hasClass('sidebar-collapse')
          && $(window).width() > screenWidth) {
          _this.expand();
        }
      }, function() {
        if ($('body').hasClass('sidebar-mini')
          && $('body').hasClass('sidebar-expanded-on-hover')
          && $(window).width() > screenWidth) {
          _this.collapse();
        }
      });
    },
    expand: function() {
      $('body').removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
    },
    collapse: function() {
      if ($('body').hasClass('sidebar-expanded-on-hover')) {
        $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
      }
    },
  };

  /* Tree()
   * ======
   * Converts the sidebar into a multilevel
   * tree view menu.
   *
   * @type Function
   * @Usage: $.AdminLTE.tree('.sidebar')
   */
  $.AdminLTE.tree = function(menu) {
    let _this = this;
    let animationSpeed = $.AdminLTE.options.animationSpeed;
    $(document).off('click', menu + ' li a')
      .on('click', menu + ' li a', function(e) {
        // Get the clicked link and the next element
        let $this = $(this);
        let checkElement = $this.next();

        // Check if the next element is a menu and is visible
        if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
          // Close the menu
          checkElement.slideUp(animationSpeed, function() {
            checkElement.removeClass('menu-open');
            // Fix the layout in case the sidebar stretches over the height of the window
            // _this.layout.fix();
          });
          checkElement.parent('li').removeClass('active');
        }
        // If the menu is not visible
        else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
          // Get the parent menu
          let parent = $this.parents('ul').first();
          // Close all open menus within the parent
          let ul = parent.find('ul:visible').slideUp(animationSpeed);
          // Remove the menu-open class from the parent
          ul.removeClass('menu-open');
          // Get the parent li
          let parent_li = $this.parent('li');

          // Open the target menu and add the menu-open class
          checkElement.slideDown(animationSpeed, function() {
            // Add the class active to the parent li
            checkElement.addClass('menu-open');
            parent.find('li.active').removeClass('active');
            parent_li.addClass('active');
            // Fix the layout in case the sidebar stretches over the height of the window
            _this.layout.fix();
          });
        }
        // if this isn't a link, prevent the page from being redirected
        if (checkElement.is('.treeview-menu')) {
          e.preventDefault();
        }
      });
  };

  /* ControlSidebar
   * ==============
   * Adds functionality to the right sidebar
   *
   * @type Object
   * @usage $.AdminLTE.controlSidebar.activate(options)
   */
  $.AdminLTE.controlSidebar = {
    // instantiate the object
    activate: function() {
      // Get the object
      let _this = this;
      // Update options
      let o = $.AdminLTE.options.controlSidebarOptions;
      // Get the sidebar
      let sidebar = $(o.selector);
      // The toggle button
      let btn = $(o.toggleBtnSelector);

      // Listen to the click event
      btn.on('click', function(e) {
        e.preventDefault();
        // If the sidebar is not open
        if (!sidebar.hasClass('control-sidebar-open')
          && !$('body').hasClass('control-sidebar-open')) {
          // Open the sidebar
          _this.open(sidebar, o.slide);
        } else {
          _this.close(sidebar, o.slide);
        }
      });

      // If the body has a boxed layout, fix the sidebar bg position
      let bg = $('.control-sidebar-bg');
      _this._fix(bg);
    },
    // Open the control sidebar
    open: function(sidebar, slide) {
      // Slide over content
      if (slide) {
        sidebar.addClass('control-sidebar-open');
      } else {
        // Push the content by adding the open class to the body instead
        // of the sidebar itself
        $('body').addClass('control-sidebar-open');
      }
    },
    // Close the control sidebar
    close: function(sidebar, slide) {
      if (slide) {
        sidebar.removeClass('control-sidebar-open');
      } else {
        $('body').removeClass('control-sidebar-open');
      }
    },
    _fix: function(sidebar) {
      let _this = this;
      if ($('body').hasClass('layout-boxed')) {
        sidebar.css('position', 'absolute');
        sidebar.height($('.wrapper').height());
        if (_this.hasBindedResize) {
          return;
        }
        $(window).resize(function() {
          _this._fix(sidebar);
        });
        _this.hasBindedResize = true;
      } else {
        sidebar.css({
          'position': 'fixed',
          'height': 'auto',
        });
      }
    },
    _fixForFixed: function(sidebar) {
      sidebar.css({
        'position': 'fixed',
        'max-height': '100%',
        'overflow': 'auto',
        'padding-bottom': '50px',
      });
    },
  };

  /* BoxWidget
   * =========
   * BoxWidget is a plugin to handle collapsing and
   * removing boxes from the screen.
   *
   * @type Object
   * @usage $.AdminLTE.boxWidget.activate()
   *        Set all your options in the main $.AdminLTE.options object
   */
  $.AdminLTE.boxWidget = {
    selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
    icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
    animationSpeed: $.AdminLTE.options.animationSpeed,
    activate: function(_box) {
      let _this = this;
      if (!_box) {
        _box = document; // activate all boxes per default
      }
      // Listen for collapse event triggers
      $(_box).on('click', _this.selectors.collapse, function(e) {
        e.preventDefault();
        _this.collapse($(this));
      });

      // Listen for remove event triggers
      $(_box).on('click', _this.selectors.remove, function(e) {
        e.preventDefault();
        _this.remove($(this));
      });
    },
    collapse: function(element) {
      let _this = this;
      // Find the box parent
      let box = element.parents('.box').first();
      // Find the body and the footer
      let box_content = box.find('> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer');
      if (!box.hasClass('collapsed-box')) {
        // Convert minus into plus
        element.children(':first')
          .removeClass(_this.icons.collapse)
          .addClass(_this.icons.open);
        // Hide the content
        box_content.slideUp(_this.animationSpeed, function() {
          box.addClass('collapsed-box');
        });
      } else {
        // Convert plus into minus
        element.children(':first')
          .removeClass(_this.icons.open)
          .addClass(_this.icons.collapse);
        // Show the content
        box_content.slideDown(_this.animationSpeed, function() {
          box.removeClass('collapsed-box');
        });
      }
    },
    remove: function(element) {
      // Find the box parent
      let box = element.parents('.box').first();
      box.slideUp(this.animationSpeed);
    },
  };
}

/* ------------------
 * - Custom Plugins -
 * ------------------
 * All custom plugins are defined below.
 */

/*
 * BOX REFRESH BUTTON
 * ------------------
 * This is a custom plugin to use with the component BOX. It allows you to add
 * a refresh button to the box. It converts the box's state to a loading state.
 *
 * @type plugin
 * @usage $("#box-widget").boxRefresh( options );
 */
(function($) {
  'use strict';

  $.fn.boxRefresh = function(options) {
    // Render options
    let settings = $.extend({
      // Refresh button selector
      trigger: '.refresh-btn',
      // File source to be loaded (e.g: ajax/src.php)
      source: '',
      // Callbacks
      onLoadStart: function(box) {
        return box;
      }, // Right after the button has been clicked
      onLoadDone: function(box) {
        return box;
      }, // When the source has been loaded

    }, options);

    // The overlay
    let overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');

    return this.each(function() {
      // if a source is specified
      if (settings.source === '') {
        if (window.console) {
          window.console.log('Please specify a source first - boxRefresh()');
        }
        return;
      }
      // the box
      let box = $(this);
      // the button
      let rBtn = box.find(settings.trigger).first();

      // On trigger click
      rBtn.on('click', function(e) {
        e.preventDefault();
        // Add loading overlay
        start(box);

        // Perform ajax call
        box.find('.box-body').load(settings.source, function() {
          done(box);
        });
      });
    });

    function start(box) {
      // Add overlay and loading img
      box.append(overlay);

      settings.onLoadStart.call(box);
    }

    function done(box) {
      // Remove overlay and loading img
      box.find(overlay).remove();

      settings.onLoadDone.call(box);
    }
  };
})(jQuery);

/*
 * EXPLICIT BOX CONTROLS
 * -----------------------
 * This is a custom plugin to use with the component BOX. It allows you to activate
 * a box inserted in the DOM after the app.js was loaded, toggle and remove box.
 *
 * @type plugin
 * @usage $("#box-widget").activateBox();
 * @usage $("#box-widget").toggleBox();
 * @usage $("#box-widget").removeBox();
 */
(function($) {
  'use strict';

  $.fn.activateBox = function() {
    $.AdminLTE.boxWidget.activate(this);
  };

  $.fn.toggleBox = function() {
    let button = $($.AdminLTE.boxWidget.selectors.collapse, this);
    $.AdminLTE.boxWidget.collapse(button);
  };

  $.fn.removeBox = function() {
    let button = $($.AdminLTE.boxWidget.selectors.remove, this);
    $.AdminLTE.boxWidget.remove(button);
  };
})(jQuery);

/*
 * TODO LIST CUSTOM PLUGIN
 * -----------------------
 * This plugin depends on iCheck plugin for checkbox and radio inputs
 *
 * @type plugin
 * @usage $("#todo-widget").todolist( options );
 */
(function($) {
  'use strict';

  $.fn.todolist = function(options) {
    // Render options
    let settings = $.extend({
      // When the user checks the input
      onCheck: function(ele) {
        return ele;
      },
      // When the user unchecks the input
      onUncheck: function(ele) {
        return ele;
      },
    }, options);

    return this.each(function() {
      if (typeof $.fn.iCheck !== 'undefined') {
        $('input', this).on('ifChecked', function() {
          let ele = $(this).parents('li').first();
          ele.toggleClass('done');
          settings.onCheck.call(ele);
        });

        $('input', this).on('ifUnchecked', function() {
          let ele = $(this).parents('li').first();
          ele.toggleClass('done');
          settings.onUncheck.call(ele);
        });
      } else {
        $('input', this).on('change', function() {
          let ele = $(this).parents('li').first();
          ele.toggleClass('done');
          if ($('input', ele).is(':checked')) {
            settings.onCheck.call(ele);
          } else {
            settings.onUncheck.call(ele);
          }
        });
      }
    });
  };
}(jQuery));
