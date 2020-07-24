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
    templatizer["card"] = {};
    templatizer["home"] = {};
    templatizer["login"] = {};
    templatizer["modals"] = {};
    templatizer["my_round"] = {};
    templatizer["player"] = {};
    templatizer["tournament"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<div class="main"><header class="page-header"><div class="max-width-wrapper"><a href="/" class="back">Back to all Events</a><a href="/" class="headline"><div class="content"><div class="title">Esker Hills</div><div class="subtitle">27 - 29 March 2020</div></div><div class="logo"></div></a></div></header><div class="max-width-wrapper"><div class="tabs"><a href="/tournament/1/leaderboard" class="ldrboard">Leaderboard</a><a href="/tournament/1/my-round" class="me_user">My Round</a></div></div><section class="page-tabs max-width-wrapper"><div class="container pages page-container"><div class="page"></div></div></section></div>';
    };

    // card/card.jade compiled template
    templatizer["card"]["card"] = function tmpl_card_card() {
        return '<div class="max-width-wrapper"><p>Card</p></div>';
    };

    // home/home.jade compiled template
    templatizer["home"]["home"] = function tmpl_home_home() {
        return '<ul class="events"></ul>';
    };

    // home/loading.jade compiled template
    templatizer["home"]["loading"] = function tmpl_home_loading() {
        return '<div class="page-loader"><div class="sk-spinner-double-bounce sk-spinner"><div class="sk-double-bounce1"></div><div class="sk-double-bounce2"></div></div></div>';
    };

    // home/tournament.jade compiled template
    templatizer["home"]["tournament"] = function tmpl_home_tournament(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(model) {
            buf.push('<li class="event"><a href="/tournament/1"><div class="title">' + jade.escape(null == (jade_interp = model.name) ? "" : jade_interp) + '</div><div class="date">' + jade.escape(null == (jade_interp = model.formatted_date) ? "" : jade_interp) + '</div><div class="actions"><p>Full Leaderboard &amp; Scoring</p></div></a></li>');
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // layout.jade compiled template
    templatizer["layout"] = function tmpl_layout() {
        return '<body><div class="app-wrapper"><header><a href="/" class="brand">Home</a><h1>Blue Pirate</h1><div class="profile"></div></header><div class="workspace-container"></div></div></body>';
    };

    // login/base.jade compiled template
    templatizer["login"]["base"] = function tmpl_login_base() {
        return '<div class="login_page"><p>Enter your unique passphrase to login and begin keeping score.</p><div class="errors"></div><div class="options"></div></div>';
    };

    // login/error.jade compiled template
    templatizer["login"]["error"] = function tmpl_login_error() {
        return "<p>Oops, that didn't work.. Please try again.</p>";
    };

    // login/loading.jade compiled template
    templatizer["login"]["loading"] = function tmpl_login_loading() {
        return '<div><div class="list-loading"><div class="loader"><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div></div></div><p>Logging you in</p></div>';
    };

    // login/login.jade compiled template
    templatizer["login"]["login"] = function tmpl_login_login() {
        return '<div class="max-width-wrapper"><p>Login</p></div>';
    };

    // login/option.jade compiled template
    templatizer["login"]["option"] = function tmpl_login_option(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(extra_classes, label) {
            buf.push("<div" + jade.cls([ "option", extra_classes ], [ null, true ]) + ">" + jade.escape(null == (jade_interp = label) ? "" : jade_interp) + "</div>");
        }).call(this, "extra_classes" in locals_for_with ? locals_for_with.extra_classes : typeof extra_classes !== "undefined" ? extra_classes : undefined, "label" in locals_for_with ? locals_for_with.label : typeof label !== "undefined" ? label : undefined);
        return buf.join("");
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

    // my_round/base.jade compiled template
    templatizer["my_round"]["base"] = function tmpl_my_round_base() {
        return '<div class="page"></div>';
    };

    // my_round/hole.jade compiled template
    templatizer["my_round"]["hole"] = function tmpl_my_round_hole(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(hole) {
            buf.push('<li><div class="hole"></div><div class="score-keeper"><ul class="score-players"></ul><a href="#" class="save">' + jade.escape(null == (jade_interp = "Save Scores for Hole #" + hole.number) ? "" : jade_interp) + "</a></div></li>");
        }).call(this, "hole" in locals_for_with ? locals_for_with.hole : typeof hole !== "undefined" ? hole : undefined);
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

    // my_round/hole_summary.jade compiled template
    templatizer["my_round"]["hole_summary"] = function tmpl_my_round_hole_summary(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(hole, scores, undefined) {
            buf.push('<div class="summary"><div class="cell one name"><div class="hole"><div class="num">' + jade.escape(null == (jade_interp = "#" + hole.number) ? "" : jade_interp) + '</div><div class="par_idx"><div>' + jade.escape(null == (jade_interp = "Par: " + hole.par) ? "" : jade_interp) + "</div><div>" + jade.escape(null == (jade_interp = "Idx: " + hole.index) ? "" : jade_interp) + "</div></div></div></div>");
            (function() {
                var $obj = scores;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var score = $obj[$index];
                        buf.push('<div class="cell two score"> <div' + jade.cls([ score.result ], [ true ]) + ">" + jade.escape(null == (jade_interp = score.pretty_score) ? "" : jade_interp) + "</div></div>");
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var score = $obj[$index];
                        buf.push('<div class="cell two score"> <div' + jade.cls([ score.result ], [ true ]) + ">" + jade.escape(null == (jade_interp = score.pretty_score) ? "" : jade_interp) + "</div></div>");
                    }
                }
            }).call(this);
            buf.push("</div>");
        }).call(this, "hole" in locals_for_with ? locals_for_with.hole : typeof hole !== "undefined" ? hole : undefined, "scores" in locals_for_with ? locals_for_with.scores : typeof scores !== "undefined" ? scores : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // my_round/logged_in_as.jade compiled template
    templatizer["my_round"]["logged_in_as"] = function tmpl_my_round_logged_in_as() {
        return '<div class="logged_in_block"><a href="/logout" data-bypass="data-bypass">You can log out if you\'d like</a></div>';
    };

    // my_round/scorecard.jade compiled template
    templatizer["my_round"]["scorecard"] = function tmpl_my_round_scorecard() {
        return '<ul class="my-scorecard"></ul>';
    };

    // my_round/scorecard_header.jade compiled template
    templatizer["my_round"]["scorecard_header"] = function tmpl_my_round_scorecard_header() {
        return '<li><a><div class="cell one name"></div><div class="cell two score">Mike</div><div class="cell two score">Steve</div><div class="cell two score">Ryan</div></a></li>';
    };

    // my_round/scorecard_hole_player.jade compiled template
    templatizer["my_round"]["scorecard_hole_player"] = function tmpl_my_round_scorecard_hole_player(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(model, player) {
            buf.push('<li><div class="name">' + jade.escape(null == (jade_interp = player.name) ? "" : jade_interp) + '</div><div class="score-panel"><div class="minus"></div><div data-hook="pretty_score" class="score">' + jade.escape(null == (jade_interp = model.pretty_score) ? "" : jade_interp) + '</div><div class="plus"></div></div></li>');
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined, "player" in locals_for_with ? locals_for_with.player : typeof player !== "undefined" ? player : undefined);
        return buf.join("");
    };

    // my_round/view.jade compiled template
    templatizer["my_round"]["view"] = function tmpl_my_round_view() {
        return '<div class="page"><ul class="leaderboard"></ul><ul class="course_tiles"></ul></div>';
    };

    // player/player.jade compiled template
    templatizer["player"]["player"] = function tmpl_player_player() {
        return '<div class="max-width-wrapper"><p>Player</p></div>';
    };

    // tournament/hole_list_item.jade compiled template
    templatizer["tournament"]["hole_list_item"] = function tmpl_tournament_hole_list_item(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(model, score) {
            buf.push('<li><div class="hole_information"><div class="cell number">' + jade.escape(null == (jade_interp = model.number) ? "" : jade_interp) + '</div><div class="cell length">' + jade.escape(null == (jade_interp = model.length) ? "" : jade_interp) + '</div><div class="cell par">' + jade.escape(null == (jade_interp = model.par) ? "" : jade_interp) + '</div><div class="cell index">' + jade.escape(null == (jade_interp = model.index) ? "" : jade_interp) + '</div></div><div class="score_information"><div class="cell score"><div role="score"' + jade.cls([ score.result ], [ true ]) + ">" + jade.escape(null == (jade_interp = score.pretty_score) ? "" : jade_interp) + '</div></div><div role="points" class="cell points">' + jade.escape(null == (jade_interp = score.pretty_points) ? "" : jade_interp) + "</div></div></li>");
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined, "score" in locals_for_with ? locals_for_with.score : typeof score !== "undefined" ? score : undefined);
        return buf.join("");
    };

    // tournament/home.jade compiled template
    templatizer["tournament"]["home"] = function tmpl_tournament_home() {
        return "<p>Hello Mike</p>";
    };

    // tournament/list_item.jade compiled template
    templatizer["tournament"]["list_item"] = function tmpl_tournament_list_item(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(name, slug) {
            buf.push("<a" + jade.attr("href", slug, true, false) + ' class="tournament"><div class="col6 push0"><div class="title">' + jade.escape(null == (jade_interp = name) ? "" : jade_interp) + '</div><div class="sub_title">Athenry Golf Club</div><div class="sub_title">26 May 2014</div></div><div class="col6 push6"><ul class="leaderboard"><li>Mike Rockall<div class="score">9.15</div></li><li>David Flanagan<div class="score">9.15</div></li><li>Brendan Considine<div class="score">9.15</div></li></ul></div></a>');
        }).call(this, "name" in locals_for_with ? locals_for_with.name : typeof name !== "undefined" ? name : undefined, "slug" in locals_for_with ? locals_for_with.slug : typeof slug !== "undefined" ? slug : undefined);
        return buf.join("");
    };

    // tournament/player.jade compiled template
    templatizer["tournament"]["player"] = function tmpl_tournament_player(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(player_handicap, player_name) {
            buf.push('<div class="page"><div class="list-loading"><div class="loader"><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div></div></div><div class="page_header"><h1>' + jade.escape(null == (jade_interp = player_name) ? "" : jade_interp) + "</h1><h2>" + jade.escape(null == (jade_interp = "Handicap " + player_handicap) ? "" : jade_interp) + '</h2></div><ul class="scorecard"></ul></div>');
        }).call(this, "player_handicap" in locals_for_with ? locals_for_with.player_handicap : typeof player_handicap !== "undefined" ? player_handicap : undefined, "player_name" in locals_for_with ? locals_for_with.player_name : typeof player_name !== "undefined" ? player_name : undefined);
        return buf.join("");
    };

    // tournament/player_list_item.jade compiled template
    templatizer["tournament"]["player_list_item"] = function tmpl_tournament_player_list_item(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(model, pos, score, undefined) {
            buf.push("<li><a" + jade.attr("href", model.player_url, true, false) + '><div role="pretty_through" class="cell one">' + jade.escape(null == (jade_interp = pos) ? "" : jade_interp) + '</div><div class="cell six ellipsis name">' + jade.escape(null == (jade_interp = model.player.name) ? "" : jade_interp) + '</div><div role="pretty_score" class="cell one score blue">' + jade.escape(null == (jade_interp = model.pretty_score) ? "" : jade_interp) + '</div><div role="points" class="cell one score">' + jade.escape(null == (jade_interp = model.points) ? "" : jade_interp) + '</div><div role="through" class="cell one thru">' + jade.escape(null == (jade_interp = model.through) ? "" : jade_interp) + "</div></a><div" + jade.cls([ "scorecard", model.is_expanded ], [ null, true ]) + '><div class="nine"><div class="hole"><div class="label">Hole</div><div class="label">Par</div><div class="label">Idx</div><div class="label score">Str</div><div class="label points">Pts</div></div>');
            (function() {
                var $obj = model.course.front_nine;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var hole = $obj[$index];
                        score = model.score_on_hole(hole.id);
                        buf.push('<div class="hole"><div class="hole_num">' + jade.escape(null == (jade_interp = hole.number) ? "" : jade_interp) + '</div><div class="par">' + jade.escape(null == (jade_interp = hole.par) ? "" : jade_interp) + '</div><div class="index">' + jade.escape(null == (jade_interp = hole.index) ? "" : jade_interp) + "</div><div" + jade.cls([ "score", score ? score.result : "" ], [ null, true ]) + ">" + jade.escape(null == (jade_interp = score.pretty_score) ? "" : jade_interp) + "</div><div" + jade.cls([ "points", score ? score.result : "" ], [ null, true ]) + ">" + jade.escape(null == (jade_interp = score.pretty_points) ? "" : jade_interp) + "</div></div>");
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var hole = $obj[$index];
                        score = model.score_on_hole(hole.id);
                        buf.push('<div class="hole"><div class="hole_num">' + jade.escape(null == (jade_interp = hole.number) ? "" : jade_interp) + '</div><div class="par">' + jade.escape(null == (jade_interp = hole.par) ? "" : jade_interp) + '</div><div class="index">' + jade.escape(null == (jade_interp = hole.index) ? "" : jade_interp) + "</div><div" + jade.cls([ "score", score ? score.result : "" ], [ null, true ]) + ">" + jade.escape(null == (jade_interp = score.pretty_score) ? "" : jade_interp) + "</div><div" + jade.cls([ "points", score ? score.result : "" ], [ null, true ]) + ">" + jade.escape(null == (jade_interp = score.pretty_points) ? "" : jade_interp) + "</div></div>");
                    }
                }
            }).call(this);
            buf.push('<div class="hole total"><div class="hole_num">&nbsp;</div><div class="par">' + jade.escape(null == (jade_interp = model.course.front_nine_total_par()) ? "" : jade_interp) + '</div><div class="index">&nbsp;</div><div class="score">' + jade.escape(null == (jade_interp = model.get_totals("Front 9").strokes) ? "" : jade_interp) + '</div><div class="points">' + jade.escape(null == (jade_interp = model.get_totals("Front 9").points) ? "" : jade_interp) + '</div></div></div><div class="nine"><div class="hole"><div class="label">Hole</div><div class="label">Par</div><div class="label">Idx</div><div class="label score">Str</div><div class="label points">Pts</div></div>');
            (function() {
                var $obj = model.course.back_nine;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var hole = $obj[$index];
                        score = model.score_on_hole(hole.id);
                        buf.push('<div class="hole"><div class="hole_num">' + jade.escape(null == (jade_interp = hole.number) ? "" : jade_interp) + '</div><div class="par">' + jade.escape(null == (jade_interp = hole.par) ? "" : jade_interp) + '</div><div class="index">' + jade.escape(null == (jade_interp = hole.index) ? "" : jade_interp) + "</div><div" + jade.cls([ "score", score.result ], [ null, true ]) + ">" + jade.escape(null == (jade_interp = score.pretty_score) ? "" : jade_interp) + "</div><div" + jade.cls([ "points", score.result ], [ null, true ]) + ">" + jade.escape(null == (jade_interp = score.pretty_points) ? "" : jade_interp) + "</div></div>");
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var hole = $obj[$index];
                        score = model.score_on_hole(hole.id);
                        buf.push('<div class="hole"><div class="hole_num">' + jade.escape(null == (jade_interp = hole.number) ? "" : jade_interp) + '</div><div class="par">' + jade.escape(null == (jade_interp = hole.par) ? "" : jade_interp) + '</div><div class="index">' + jade.escape(null == (jade_interp = hole.index) ? "" : jade_interp) + "</div><div" + jade.cls([ "score", score.result ], [ null, true ]) + ">" + jade.escape(null == (jade_interp = score.pretty_score) ? "" : jade_interp) + "</div><div" + jade.cls([ "points", score.result ], [ null, true ]) + ">" + jade.escape(null == (jade_interp = score.pretty_points) ? "" : jade_interp) + "</div></div>");
                    }
                }
            }).call(this);
            buf.push('<div class="hole total"><div class="hole_num">&nbsp;</div><div class="par">' + jade.escape(null == (jade_interp = model.course.front_nine_total_par()) ? "" : jade_interp) + '</div><div class="index">&nbsp;</div><div class="score">' + jade.escape(null == (jade_interp = model.get_totals("Back 9").strokes) ? "" : jade_interp) + '</div><div class="points">' + jade.escape(null == (jade_interp = model.get_totals("Back 9").points) ? "" : jade_interp) + "</div></div></div></div></li>");
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined, "pos" in locals_for_with ? locals_for_with.pos : typeof pos !== "undefined" ? pos : undefined, "score" in locals_for_with ? locals_for_with.score : typeof score !== "undefined" ? score : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // tournament/tournament.jade compiled template
    templatizer["tournament"]["tournament"] = function tmpl_tournament_tournament() {
        return '<div class="max-width-wrapper"><p>Tournament</p></div>';
    };

    // tournament/view.jade compiled template
    templatizer["tournament"]["view"] = function tmpl_tournament_view() {
        return '<div class="page"><ul class="leaderboard players"></ul></div>';
    };

    return templatizer;
}));