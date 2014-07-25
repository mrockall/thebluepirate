(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function r(r){return null!=r&&""!==r}function n(e){return Array.isArray(e)?e.map(n).filter(r).join(" "):e}var e={};return e.merge=function t(n,e){if(1===arguments.length){for(var a=n[0],s=1;s<n.length;s++)a=t(a,n[s]);return a}var i=n["class"],l=e["class"];(i||l)&&(i=i||[],l=l||[],Array.isArray(i)||(i=[i]),Array.isArray(l)||(l=[l]),n["class"]=i.concat(l).filter(r));for(var o in e)"class"!=o&&(n[o]=e[o]);return n},e.joinClasses=n,e.cls=function(r,t){for(var a=[],s=0;s<r.length;s++)a.push(t&&t[s]?e.escape(n([r[s]])):n(r[s]));var i=n(a);return i.length?' class="'+i+'"':""},e.attr=function(r,n,t,a){return"boolean"==typeof n||null==n?n?" "+(a?r:r+'="'+r+'"'):"":0==r.indexOf("data")&&"string"!=typeof n?" "+r+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'":t?" "+r+'="'+e.escape(n)+'"':" "+r+'="'+n+'"'},e.attrs=function(r,t){var a=[],s=Object.keys(r);if(s.length)for(var i=0;i<s.length;++i){var l=s[i],o=r[l];"class"==l?(o=n(o))&&a.push(" "+l+'="'+o+'"'):a.push(e.attr(l,o,!1,t))}return a.join("")},e.escape=function(r){var n=String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+r?r:n},e.rethrow=function a(r,n,e,t){if(!(r instanceof Error))throw r;if(!("undefined"==typeof window&&n||t))throw r.message+=" on line "+e,r;try{t=t||require("fs").readFileSync(n,"utf8")}catch(s){a(r,null,e)}var i=3,l=t.split("\n"),o=Math.max(e-i,0),c=Math.min(l.length,e+i),i=l.slice(o,c).map(function(r,n){var t=n+o+1;return(t==e?"  > ":"    ")+t+"| "+r}).join("\n");throw r.path=n,r.message=(n||"Jade")+":"+e+"\n"+i+"\n\n"+r.message,r},e}();

    var templatizer = {};
    templatizer["modals"] = {};
    templatizer["my_round"] = {};
    templatizer["pages"] = {};
    templatizer["tournaments"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(is_logged_in, identity_type, image_url) {
            buf.push('<body><div class="content"><header class="container"><a href="/" class="logo"></a><a class="button icon hamburger-icon"><svg height="36" version="1.1" width="36" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 64 64"><g><path d="M5.0916789,20.818994C5.0916789,20.818994,58.908321,20.818994,58.908321,20.818994"></path><path d="m 5.1969746,31.909063 53.8166424,0" transform="matrix(1,0,0,1,0,0)" style="opacity: 1;"></path><path d="M5.0916788,42.95698C5.0916788,42.95698,58.908321,42.95698,58.908321,42.95698"></path></g></svg></a><div class="nav"><ul>');
            if (is_logged_in == true) {
                if (identity_type == "user") {
                    buf.push('<li><a href="/">Dashboard</a></li><li><a href="/tournaments/new">Add a Tournament</a></li><li><a href="/logout" data-bypass="true">Logout</a></li><li class="profile_pic"><img' + jade.attr("src", image_url, true, false) + "/></li>");
                } else if (identity_type == "tee_time") {
                    buf.push('<li><a href="/">Leaderboard</a></li><li><a href="/my-round">My Round</a></li>');
                }
            } else {
                buf.push('<li><a href="/login" data-bypass="true">Login</a></li>');
            }
            buf.push('</ul></div></header><div role="page-container" class="container pages"></div><div class="loading"><div class="loader"><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div></div></div></div><div role="modal-container" class="modals"><div class="modal"></div></div></body>');
        })("is_logged_in" in locals_for_with ? locals_for_with.is_logged_in : typeof is_logged_in !== "undefined" ? is_logged_in : undefined, "identity_type" in locals_for_with ? locals_for_with.identity_type : typeof identity_type !== "undefined" ? identity_type : undefined, "image_url" in locals_for_with ? locals_for_with.image_url : typeof image_url !== "undefined" ? image_url : undefined);
        return buf.join("");
    };

    // modals/nine_box.jade compiled template
    templatizer["modals"]["nine_box"] = function tmpl_modals_nine_box(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(title) {
            buf.push('<div class="nine_box"><div class="meta"><div class="title">' + jade.escape(null == (jade_interp = title) ? "" : jade_interp) + '</div><div class="back">x</div></div><div class="options"><div class="score"><div data-value="1" class="box"><div class="value">1</div></div><div data-value="2" class="box"><div class="value">2</div></div><div data-value="3" class="box"><div class="value">3</div></div><div data-value="4" class="box"><div class="value">4</div></div><div data-value="5" class="box"><div class="value">5</div></div><div data-value="6" class="box"><div class="value">6</div></div><div data-value="7" class="box"><div class="value">7</div></div><div data-value="8" class="box"><div class="value">8</div></div><div data-value="9" class="box"><div class="value">9</div></div><div data-value="10" class="box"><div class="value">10</div></div></div><div class="putts"><div data-value="0" class="box"><div class="value">0</div></div><div data-value="1" class="box"><div class="value">1</div></div><div data-value="2" class="box"><div class="value">2</div></div><div data-value="3" class="box"><div class="value">3</div></div><div data-value="4" class="box"><div class="value">4</div></div><div data-value="5" class="box"><div class="value">5</div></div></div><div class="fairway"><div data-value=\'1\' class="box"><div class="value">Yep</div></div><div data-value=\'0\' class="box"><div class="value">Nope</div></div></div></div></div>');
        })("title" in locals_for_with ? locals_for_with.title : typeof title !== "undefined" ? title : undefined);
        return buf.join("");
    };

    // my_round/hole.jade compiled template
    templatizer["my_round"]["hole"] = function tmpl_my_round_hole(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(hole_number, hole_par, hole_length, hole_index, prev_hole, prev_hole_id, next_hole, next_hole_id) {
            buf.push('<div class="page"><h1>' + jade.escape(null == (jade_interp = "#" + hole_number + " - Par " + hole_par) ? "" : jade_interp) + "</h1><h2>" + jade.escape(null == (jade_interp = "Length " + hole_length + "m") ? "" : jade_interp) + "</h2><h2>" + jade.escape(null == (jade_interp = "Index " + hole_index) ? "" : jade_interp) + '</h2><div class="players"></div><div class="next_prev_nav">');
            if (prev_hole) {
                buf.push("<a" + jade.attr("href", "/my-round/" + prev_hole_id, true, false) + ' class="prev"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><polygon points="142.332,104.886 197.48,50 402.5,256 197.48,462 142.332,407.113 292.727,256 "></polygon></svg><div class="number">' + jade.escape(null == (jade_interp = "#" + prev_hole) ? "" : jade_interp) + "</div></a>");
            }
            if (next_hole) {
                buf.push("<a" + jade.attr("href", "/my-round/" + next_hole_id, true, false) + ' class="next"><div class="number">' + jade.escape(null == (jade_interp = "#" + next_hole) ? "" : jade_interp) + '</div><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><polygon points="142.332,104.886 197.48,50 402.5,256 197.48,462 142.332,407.113 292.727,256 "></polygon></svg></a>');
            }
            buf.push("</div></div>");
        })("hole_number" in locals_for_with ? locals_for_with.hole_number : typeof hole_number !== "undefined" ? hole_number : undefined, "hole_par" in locals_for_with ? locals_for_with.hole_par : typeof hole_par !== "undefined" ? hole_par : undefined, "hole_length" in locals_for_with ? locals_for_with.hole_length : typeof hole_length !== "undefined" ? hole_length : undefined, "hole_index" in locals_for_with ? locals_for_with.hole_index : typeof hole_index !== "undefined" ? hole_index : undefined, "prev_hole" in locals_for_with ? locals_for_with.prev_hole : typeof prev_hole !== "undefined" ? prev_hole : undefined, "prev_hole_id" in locals_for_with ? locals_for_with.prev_hole_id : typeof prev_hole_id !== "undefined" ? prev_hole_id : undefined, "next_hole" in locals_for_with ? locals_for_with.next_hole : typeof next_hole !== "undefined" ? next_hole : undefined, "next_hole_id" in locals_for_with ? locals_for_with.next_hole_id : typeof next_hole_id !== "undefined" ? next_hole_id : undefined);
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
        })("id" in locals_for_with ? locals_for_with.id : typeof id !== "undefined" ? id : undefined, "number" in locals_for_with ? locals_for_with.number : typeof number !== "undefined" ? number : undefined, "par" in locals_for_with ? locals_for_with.par : typeof par !== "undefined" ? par : undefined);
        return buf.join("");
    };

    // my_round/hole_player.jade compiled template
    templatizer["my_round"]["hole_player"] = function tmpl_my_round_hole_player(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(player_name) {
            buf.push('<div class="player_scores"><h2>' + jade.escape(null == (jade_interp = player_name) ? "" : jade_interp) + '</h2><ul class="course_tiles"><li data-attr="score" data-title="Strokes"><a href="#"><div class="meta">Strokes</div><div role="pretty_score" class="hole_num"></div></a></li><li data-attr="putts" data-title="Putts"><a href="#"><div class="meta">Putts</div><div role="pretty_putts" class="hole_num"></div></a></li><li data-attr="fairway" data-title="Fairway"><a href="#"><div class="meta">Fairway</div><div role="pretty_fairway" class="hole_num"></div></a></li></ul></div>');
        })("player_name" in locals_for_with ? locals_for_with.player_name : typeof player_name !== "undefined" ? player_name : undefined);
        return buf.join("");
    };

    // my_round/leaderboard_record.jade compiled template
    templatizer["my_round"]["leaderboard_record"] = function tmpl_my_round_leaderboard_record() {
        return '<li><a href="player_url">Steve Horgan<div class="cell left">6</div><div class="cell">18</div><div class="cell score">39</div></a></li>';
    };

    // my_round/view.jade compiled template
    templatizer["my_round"]["view"] = function tmpl_my_round_view(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(tournament_name) {
            buf.push('<div class="page"><h1>' + jade.escape(null == (jade_interp = tournament_name) ? "" : jade_interp) + '</h1><ul class="leaderboard"></ul><ul class="course_tiles"></ul></div>');
        })("tournament_name" in locals_for_with ? locals_for_with.tournament_name : typeof tournament_name !== "undefined" ? tournament_name : undefined);
        return buf.join("");
    };

    // pages/home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<div class="page"></div>';
    };

    // pages/loading.jade compiled template
    templatizer["pages"]["loading"] = function tmpl_pages_loading() {
        return '<div class="page"><div class="loader"><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div><div class="loader-block"></div></div></div>';
    };

    // pages/profile.jade compiled template
    templatizer["pages"]["profile"] = function tmpl_pages_profile() {
        return '<div class="page"><Profile>Page</Profile></div>';
    };

    // tournaments/edit.jade compiled template
    templatizer["tournaments"]["edit"] = function tmpl_tournaments_edit() {
        return '<div class="page"><div class="col8 push2"><form role="person-form"><fieldset role="field-container"></fieldset><div class="buttons"><button type="submit" class="btn">Submit</button></div></form></div></div>';
    };

    // tournaments/hole_list_item.jade compiled template
    templatizer["tournaments"]["hole_list_item"] = function tmpl_tournaments_hole_list_item(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(hole_number, hole_length, hole_par, hole_index, result, score, points) {
            buf.push('<li><div class="hole_information"><div class="cell number">' + jade.escape(null == (jade_interp = hole_number) ? "" : jade_interp) + '</div><div class="cell length">' + jade.escape(null == (jade_interp = hole_length) ? "" : jade_interp) + '</div><div class="cell par">' + jade.escape(null == (jade_interp = hole_par) ? "" : jade_interp) + '</div><div class="cell index">' + jade.escape(null == (jade_interp = hole_index) ? "" : jade_interp) + '</div></div><div class="score_information"><div class="cell score"><div' + jade.cls([ result ], [ true ]) + ">" + jade.escape(null == (jade_interp = score) ? "" : jade_interp) + '</div></div><div class="cell points">' + jade.escape(null == (jade_interp = points) ? "" : jade_interp) + "</div></div></li>");
        })("hole_number" in locals_for_with ? locals_for_with.hole_number : typeof hole_number !== "undefined" ? hole_number : undefined, "hole_length" in locals_for_with ? locals_for_with.hole_length : typeof hole_length !== "undefined" ? hole_length : undefined, "hole_par" in locals_for_with ? locals_for_with.hole_par : typeof hole_par !== "undefined" ? hole_par : undefined, "hole_index" in locals_for_with ? locals_for_with.hole_index : typeof hole_index !== "undefined" ? hole_index : undefined, "result" in locals_for_with ? locals_for_with.result : typeof result !== "undefined" ? result : undefined, "score" in locals_for_with ? locals_for_with.score : typeof score !== "undefined" ? score : undefined, "points" in locals_for_with ? locals_for_with.points : typeof points !== "undefined" ? points : undefined);
        return buf.join("");
    };

    // tournaments/list_item.jade compiled template
    templatizer["tournaments"]["list_item"] = function tmpl_tournaments_list_item(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(slug, name) {
            buf.push("<a" + jade.attr("href", slug, true, false) + ' class="tournament"><div class="col6 push0"><div class="title">' + jade.escape(null == (jade_interp = name) ? "" : jade_interp) + '</div><div class="sub_title">Athenry Golf Club</div><div class="sub_title">26 May 2014</div></div><div class="col6 push6"><ul class="leaderboard"><li>Mike Rockall<div class="score">9.15</div></li><li>David Flanagan<div class="score">9.15</div></li><li>Brendan Considine<div class="score">9.15</div></li></ul></div></a>');
        })("slug" in locals_for_with ? locals_for_with.slug : typeof slug !== "undefined" ? slug : undefined, "name" in locals_for_with ? locals_for_with.name : typeof name !== "undefined" ? name : undefined);
        return buf.join("");
    };

    // tournaments/player.jade compiled template
    templatizer["tournaments"]["player"] = function tmpl_tournaments_player(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(player_name, player_handicap) {
            buf.push('<div class="page"><h1>' + jade.escape(null == (jade_interp = player_name) ? "" : jade_interp) + "</h1><h2>" + jade.escape(null == (jade_interp = "Handicap " + player_handicap) ? "" : jade_interp) + '</h2><ul class="scorecard"></ul></div>');
        })("player_name" in locals_for_with ? locals_for_with.player_name : typeof player_name !== "undefined" ? player_name : undefined, "player_handicap" in locals_for_with ? locals_for_with.player_handicap : typeof player_handicap !== "undefined" ? player_handicap : undefined);
        return buf.join("");
    };

    // tournaments/player_list_item.jade compiled template
    templatizer["tournaments"]["player_list_item"] = function tmpl_tournaments_player_list_item(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(player_url, player_name, position, holes_through, points_scored, time) {
            buf.push("<li><a" + jade.attr("href", player_url, true, false) + ">" + jade.escape(null == (jade_interp = player_name) ? "" : jade_interp) + '<div class="cell left">' + jade.escape(null == (jade_interp = position) ? "" : jade_interp) + '</div><div class="cell thru">' + jade.escape(null == (jade_interp = holes_through) ? "" : jade_interp) + '</div><div class="cell score">' + jade.escape(null == (jade_interp = points_scored) ? "" : jade_interp) + '</div><div class="cell time">' + jade.escape(null == (jade_interp = time) ? "" : jade_interp) + "</div></a></li>");
        })("player_url" in locals_for_with ? locals_for_with.player_url : typeof player_url !== "undefined" ? player_url : undefined, "player_name" in locals_for_with ? locals_for_with.player_name : typeof player_name !== "undefined" ? player_name : undefined, "position" in locals_for_with ? locals_for_with.position : typeof position !== "undefined" ? position : undefined, "holes_through" in locals_for_with ? locals_for_with.holes_through : typeof holes_through !== "undefined" ? holes_through : undefined, "points_scored" in locals_for_with ? locals_for_with.points_scored : typeof points_scored !== "undefined" ? points_scored : undefined, "time" in locals_for_with ? locals_for_with.time : typeof time !== "undefined" ? time : undefined);
        return buf.join("");
    };

    // tournaments/totals_list_item.jade compiled template
    templatizer["tournaments"]["totals_list_item"] = function tmpl_tournaments_totals_list_item(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(title, score_total, points_total) {
            buf.push('<li><div class="hole_information">' + jade.escape(null == (jade_interp = title) ? "" : jade_interp) + '</div><div class="totals_information"><div class="cell score">' + jade.escape(null == (jade_interp = score_total) ? "" : jade_interp) + '</div><div class="cell points">' + jade.escape(null == (jade_interp = points_total) ? "" : jade_interp) + "</div></div></li>");
        })("title" in locals_for_with ? locals_for_with.title : typeof title !== "undefined" ? title : undefined, "score_total" in locals_for_with ? locals_for_with.score_total : typeof score_total !== "undefined" ? score_total : undefined, "points_total" in locals_for_with ? locals_for_with.points_total : typeof points_total !== "undefined" ? points_total : undefined);
        return buf.join("");
    };

    // tournaments/view.jade compiled template
    templatizer["tournaments"]["view"] = function tmpl_tournaments_view(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(tournament_name, course_name, tournament_date) {
            buf.push('<div class="page"><h1>' + jade.escape(null == (jade_interp = tournament_name) ? "" : jade_interp) + "</h1><h2>" + jade.escape(null == (jade_interp = course_name) ? "" : jade_interp) + "</h2><h2>" + jade.escape(null == (jade_interp = tournament_date) ? "" : jade_interp) + '</h2><ul class="leaderboard"></ul></div>');
        })("tournament_name" in locals_for_with ? locals_for_with.tournament_name : typeof tournament_name !== "undefined" ? tournament_name : undefined, "course_name" in locals_for_with ? locals_for_with.course_name : typeof course_name !== "undefined" ? course_name : undefined, "tournament_date" in locals_for_with ? locals_for_with.tournament_date : typeof tournament_date !== "undefined" ? tournament_date : undefined);
        return buf.join("");
    };

    return templatizer;
}));