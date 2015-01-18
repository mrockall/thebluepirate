(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root === 'undefined' || root !== Object(root)) {
        throw new Error('templatizer: window does not exist or is not an object');
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function e(e){return null!=e&&""!==e}function n(t){return(Array.isArray(t)?t.map(n):t&&"object"==typeof t?Object.keys(t).filter(function(e){return t[e]}):[t]).filter(e).join(" ")}var t={};return t.merge=function r(n,t){if(1===arguments.length){for(var a=n[0],i=1;i<n.length;i++)a=r(a,n[i]);return a}var o=n["class"],s=t["class"];(o||s)&&(o=o||[],s=s||[],Array.isArray(o)||(o=[o]),Array.isArray(s)||(s=[s]),n["class"]=o.concat(s).filter(e));for(var l in t)"class"!=l&&(n[l]=t[l]);return n},t.joinClasses=n,t.cls=function(e,r){for(var a=[],i=0;i<e.length;i++)a.push(r&&r[i]?t.escape(n([e[i]])):n(e[i]));var o=n(a);return o.length?' class="'+o+'"':""},t.style=function(e){return e&&"object"==typeof e?Object.keys(e).map(function(n){return n+":"+e[n]}).join(";"):e},t.attr=function(e,n,r,a){return"style"===e&&(n=t.style(n)),"boolean"==typeof n||null==n?n?" "+(a?e:e+'="'+e+'"'):"":0==e.indexOf("data")&&"string"!=typeof n?(-1!==JSON.stringify(n).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),n&&"function"==typeof n.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+e+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'"):r?(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+t.escape(n)+'"'):(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+n+'"')},t.attrs=function(e,r){var a=[],i=Object.keys(e);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],l=e[s];"class"==s?(l=n(l))&&a.push(" "+s+'="'+l+'"'):a.push(t.attr(s,l,!1,r))}return a.join("")},t.escape=function(e){var n=String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+e?e:n},t.rethrow=function a(e,n,t,r){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||r))throw e.message+=" on line "+t,e;try{r=r||require("fs").readFileSync(n,"utf8")}catch(i){a(e,null,t)}var o=3,s=r.split("\n"),l=Math.max(t-o,0),f=Math.min(s.length,t+o),o=s.slice(l,f).map(function(e,n){var r=n+l+1;return(r==t?"  > ":"    ")+r+"| "+e}).join("\n");throw e.path=n,e.message=(n||"Jade")+":"+t+"\n"+o+"\n\n"+e.message,e},t}();

    var templatizer = {};
    templatizer["modals"] = {};
    templatizer["my_round"] = {};
    templatizer["tournaments"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body><div class="content"><header><div href="/" class="logo"></div><div class="title">Blue Pirate #7</div><div class="subtitle">Athenry Golf Course - 22nd April 2015</div><div class="tabs"><a class="home active">Home</a><a class="ldrboard">Leaderboard</a><a class="me_user">Me</a></div></header><div role="page-container" class="container pages"><div class="page"></div></div></div><div role="modal-container" class="modals"><div class="modal"></div></div></body>';
    };

    // modals/nine_box.jade compiled template
    templatizer["modals"]["nine_box"] = function tmpl_modals_nine_box(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(title) {
            buf.push('<div class="nine_box"><div class="meta"><div class="title">' + jade.escape(null == (jade_interp = title) ? "" : jade_interp) + '</div><div class="back">x</div></div><div class="options"><div class="score"><div data-value="1" class="box"> <div class="value">1</div></div><div data-value="2" class="box"> <div class="value">2</div></div><div data-value="3" class="box"> <div class="value">3</div></div><div data-value="4" class="box"> <div class="value">4</div></div><div data-value="5" class="box"> <div class="value">5</div></div><div data-value="6" class="box"> <div class="value">6</div></div><div data-value="7" class="box"> <div class="value">7</div></div><div data-value="8" class="box"><div class="value">8</div></div><div data-value="9" class="box"> <div class="value">9</div></div><div data-value="10" class="box"> <div class="value">10</div></div></div><div class="putts"><div data-value="0" class="box"> <div class="value">0</div></div><div data-value="1" class="box"> <div class="value">1</div></div><div data-value="2" class="box"> <div class="value">2</div></div><div data-value="3" class="box"> <div class="value">3</div></div><div data-value="4" class="box"> <div class="value">4</div></div><div data-value="5" class="box"> <div class="value">5</div></div></div><div class="fairway"><div data-value=\'1\' class="box"> <div class="value">Yep</div></div><div data-value=\'0\' class="box"> <div class="value">Nope</div></div></div></div></div>');
        }).call(this, "title" in locals_for_with ? locals_for_with.title : typeof title !== "undefined" ? title : undefined);
        return buf.join("");
    };

    // my_round/hole.jade compiled template
    templatizer["my_round"]["hole"] = function tmpl_my_round_hole(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(hole_index, hole_length, hole_number, hole_par, next_hole, next_hole_id, prev_hole, prev_hole_id) {
            buf.push('<div class="page"><div class="page_header"><h1>' + jade.escape(null == (jade_interp = "#" + hole_number + " - Par " + hole_par) ? "" : jade_interp) + "</h1><h2>" + jade.escape(null == (jade_interp = "Length " + hole_length + "m") ? "" : jade_interp) + "</h2><h2>" + jade.escape(null == (jade_interp = "Index " + hole_index) ? "" : jade_interp) + '</h2></div><div class="menu_stripe"></div><div class="players"></div><div class="next_prev_nav">');
            if (prev_hole) {
                buf.push("<a" + jade.attr("href", "/my-round/" + prev_hole_id, true, false) + ' class="prev"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><polygon points="142.332,104.886 197.48,50 402.5,256 197.48,462 142.332,407.113 292.727,256 "></polygon></svg><div class="number">' + jade.escape(null == (jade_interp = "#" + prev_hole) ? "" : jade_interp) + "</div></a>");
            }
            if (next_hole) {
                buf.push("<a" + jade.attr("href", "/my-round/" + next_hole_id, true, false) + ' class="next"><div class="number">' + jade.escape(null == (jade_interp = "#" + next_hole) ? "" : jade_interp) + '</div><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><polygon points="142.332,104.886 197.48,50 402.5,256 197.48,462 142.332,407.113 292.727,256 "></polygon></svg></a>');
            }
            buf.push("</div></div>");
        }).call(this, "hole_index" in locals_for_with ? locals_for_with.hole_index : typeof hole_index !== "undefined" ? hole_index : undefined, "hole_length" in locals_for_with ? locals_for_with.hole_length : typeof hole_length !== "undefined" ? hole_length : undefined, "hole_number" in locals_for_with ? locals_for_with.hole_number : typeof hole_number !== "undefined" ? hole_number : undefined, "hole_par" in locals_for_with ? locals_for_with.hole_par : typeof hole_par !== "undefined" ? hole_par : undefined, "next_hole" in locals_for_with ? locals_for_with.next_hole : typeof next_hole !== "undefined" ? next_hole : undefined, "next_hole_id" in locals_for_with ? locals_for_with.next_hole_id : typeof next_hole_id !== "undefined" ? next_hole_id : undefined, "prev_hole" in locals_for_with ? locals_for_with.prev_hole : typeof prev_hole !== "undefined" ? prev_hole : undefined, "prev_hole_id" in locals_for_with ? locals_for_with.prev_hole_id : typeof prev_hole_id !== "undefined" ? prev_hole_id : undefined);
        return buf.join("");
    };

    // my_round/hole_card.jade compiled template
    templatizer["my_round"]["hole_card"] = function tmpl_my_round_hole_card(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(id, number, par) {
            buf.push("<li><a" + jade.attr("href", "my-round/" + id, true, false) + '><div class="hole_num">' + jade.escape(null == (jade_interp = "#" + number) ? "" : jade_interp) + '</div><div class="meta">' + jade.escape(null == (jade_interp = "Par " + par) ? "" : jade_interp) + "</div></a></li>");
        }).call(this, "id" in locals_for_with ? locals_for_with.id : typeof id !== "undefined" ? id : undefined, "number" in locals_for_with ? locals_for_with.number : typeof number !== "undefined" ? number : undefined, "par" in locals_for_with ? locals_for_with.par : typeof par !== "undefined" ? par : undefined);
        return buf.join("");
    };

    // my_round/hole_player.jade compiled template
    templatizer["my_round"]["hole_player"] = function tmpl_my_round_hole_player(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(player_name) {
            buf.push('<div class="player_scores"><h2>' + jade.escape(null == (jade_interp = player_name) ? "" : jade_interp) + '</h2><ul class="course_tiles"><li data-attr="score" data-title="Strokes"><a href="#"><div class="meta">Strokes</div><div role="pretty_score" class="hole_num"></div></a></li><li data-attr="points" data-title="Points"><div><div class="meta">Points</div><div role="points" class="hole_num"></div></div></li></ul></div>');
        }).call(this, "player_name" in locals_for_with ? locals_for_with.player_name : typeof player_name !== "undefined" ? player_name : undefined);
        return buf.join("");
    };

    // my_round/view.jade compiled template
    templatizer["my_round"]["view"] = function tmpl_my_round_view() {
        return '<div class="page"><ul class="leaderboard"></ul><ul class="course_tiles"></ul></div>';
    };

    // tournaments/fairways_list_item.jade compiled template
    templatizer["tournaments"]["fairways_list_item"] = function tmpl_tournaments_fairways_list_item(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(collection, model) {
            buf.push("<li><a" + jade.attr("href", model.player_url, true, false) + ">" + jade.escape(null == (jade_interp = model.player().name) ? "" : jade_interp) + '<div class="cell left">' + jade.escape(null == (jade_interp = collection.indexOf(model) + 1) ? "" : jade_interp) + '</div><div class="cell big">');
            if (model.fairways_played != 0) {
                buf.push(jade.escape(null == (jade_interp = model.fairways + "/" + model.fairways_played) ? "" : jade_interp));
            } else {
                buf.push("-");
            }
            buf.push("</div></a></li>");
        }).call(this, "collection" in locals_for_with ? locals_for_with.collection : typeof collection !== "undefined" ? collection : undefined, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // tournaments/greens_list_item.jade compiled template
    templatizer["tournaments"]["greens_list_item"] = function tmpl_tournaments_greens_list_item(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(collection, model) {
            buf.push("<li><a" + jade.attr("href", model.player_url, true, false) + ">" + jade.escape(null == (jade_interp = model.player().name) ? "" : jade_interp) + '<div class="cell left">' + jade.escape(null == (jade_interp = collection.indexOf(model) + 1) ? "" : jade_interp) + '</div><div class="cell big">');
            if (model.greens_played != 0) {
                buf.push(jade.escape(null == (jade_interp = model.greens_hit + "/" + model.greens_played) ? "" : jade_interp));
            } else {
                buf.push("-");
            }
            buf.push("</div></a></li>");
        }).call(this, "collection" in locals_for_with ? locals_for_with.collection : typeof collection !== "undefined" ? collection : undefined, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // tournaments/hole_list_item.jade compiled template
    templatizer["tournaments"]["hole_list_item"] = function tmpl_tournaments_hole_list_item(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(model, score) {
            buf.push('<li><div class="hole_information"><div class="cell number">' + jade.escape(null == (jade_interp = model.number) ? "" : jade_interp) + '</div><div class="cell length">' + jade.escape(null == (jade_interp = model.length) ? "" : jade_interp) + '</div><div class="cell par">' + jade.escape(null == (jade_interp = model.par) ? "" : jade_interp) + '</div><div class="cell index">' + jade.escape(null == (jade_interp = model.index) ? "" : jade_interp) + '</div></div><div class="score_information"><div class="cell score"><div role="score"' + jade.cls([ score.result ], [ true ]) + ">" + jade.escape(null == (jade_interp = score.pretty_score) ? "" : jade_interp) + '</div></div><div role="points" class="cell points">' + jade.escape(null == (jade_interp = score.pretty_points) ? "" : jade_interp) + "</div></div></li>");
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined, "score" in locals_for_with ? locals_for_with.score : typeof score !== "undefined" ? score : undefined);
        return buf.join("");
    };

    // tournaments/list_item.jade compiled template
    templatizer["tournaments"]["list_item"] = function tmpl_tournaments_list_item(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(name, slug) {
            buf.push("<a" + jade.attr("href", slug, true, false) + ' class="tournament"><div class="col6 push0"><div class="title">' + jade.escape(null == (jade_interp = name) ? "" : jade_interp) + '</div><div class="sub_title">Athenry Golf Club</div><div class="sub_title">26 May 2014</div></div><div class="col6 push6"><ul class="leaderboard"><li>Mike Rockall<div class="score">9.15</div></li><li>David Flanagan<div class="score">9.15</div></li><li>Brendan Considine<div class="score">9.15</div></li></ul></div></a>');
        }).call(this, "name" in locals_for_with ? locals_for_with.name : typeof name !== "undefined" ? name : undefined, "slug" in locals_for_with ? locals_for_with.slug : typeof slug !== "undefined" ? slug : undefined);
        return buf.join("");
    };

    // tournaments/player.jade compiled template
    templatizer["tournaments"]["player"] = function tmpl_tournaments_player(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(player_handicap, player_name) {
            buf.push('<div class="page"><div class="list-loading"><div class="loader"><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div></div></div><div class="page_header"><h1>' + jade.escape(null == (jade_interp = player_name) ? "" : jade_interp) + "</h1><h2>" + jade.escape(null == (jade_interp = "Handicap " + player_handicap) ? "" : jade_interp) + '</h2></div><ul class="scorecard"></ul></div>');
        }).call(this, "player_handicap" in locals_for_with ? locals_for_with.player_handicap : typeof player_handicap !== "undefined" ? player_handicap : undefined, "player_name" in locals_for_with ? locals_for_with.player_name : typeof player_name !== "undefined" ? player_name : undefined);
        return buf.join("");
    };

    // tournaments/player_list_item.jade compiled template
    templatizer["tournaments"]["player_list_item"] = function tmpl_tournaments_player_list_item(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(model) {
            buf.push("<li><a" + jade.attr("href", model.player_url, true, false) + '><div role="pretty_through" class="cell one">' + jade.escape(null == (jade_interp = model.pretty_through) ? "" : jade_interp) + '</div><div class="cell six ellipsis name">' + jade.escape(null == (jade_interp = model.player().name) ? "" : jade_interp) + '</div><div role="pretty_score" class="cell one score blue">' + jade.escape(null == (jade_interp = model.pretty_score) ? "" : jade_interp) + '</div><div role="points" class="cell one score">' + jade.escape(null == (jade_interp = model.points) ? "" : jade_interp) + '</div><div role="through" class="cell one thru">' + jade.escape(null == (jade_interp = model.through) ? "" : jade_interp) + '</div><div class="cell three time">' + jade.escape(null == (jade_interp = model.time_parsed) ? "" : jade_interp) + "</div></a></li>");
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // tournaments/putts_list_item.jade compiled template
    templatizer["tournaments"]["putts_list_item"] = function tmpl_tournaments_putts_list_item(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(collection, model) {
            buf.push("<li><a" + jade.attr("href", model.player_url, true, false) + ">" + jade.escape(null == (jade_interp = model.player().name) ? "" : jade_interp) + '<div class="cell left">' + jade.escape(null == (jade_interp = collection.indexOf(model) + 1) ? "" : jade_interp) + '</div><div class="cell big">' + jade.escape(null == (jade_interp = model.putts) ? "" : jade_interp) + "</div></a></li>");
        }).call(this, "collection" in locals_for_with ? locals_for_with.collection : typeof collection !== "undefined" ? collection : undefined, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // tournaments/totals_list_item.jade compiled template
    templatizer["tournaments"]["totals_list_item"] = function tmpl_tournaments_totals_list_item(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(points_total, score_total, title) {
            buf.push('<li><div class="hole_information">' + jade.escape(null == (jade_interp = title) ? "" : jade_interp) + '</div><div class="totals_information"><div class="cell score">' + jade.escape(null == (jade_interp = score_total) ? "" : jade_interp) + '</div><div class="cell points">' + jade.escape(null == (jade_interp = points_total) ? "" : jade_interp) + "</div></div></li>");
        }).call(this, "points_total" in locals_for_with ? locals_for_with.points_total : typeof points_total !== "undefined" ? points_total : undefined, "score_total" in locals_for_with ? locals_for_with.score_total : typeof score_total !== "undefined" ? score_total : undefined, "title" in locals_for_with ? locals_for_with.title : typeof title !== "undefined" ? title : undefined);
        return buf.join("");
    };

    // tournaments/view.jade compiled template
    templatizer["tournaments"]["view"] = function tmpl_tournaments_view() {
        return '<div class="page"><div class="list-loading"><div class="loader"><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div></div></div><ul class="leaderboard players"></ul></div>';
    };

    return templatizer;
}));