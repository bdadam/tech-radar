function init(h, w) {
    $('#title').text(document.title);

    var radar = new pv.Panel()
        .width(w)
        .height(h)
        .canvas('radar')

// arcs
    radar.add(pv.Dot)
        .data(radar_arcs)
        .left(w / 2)
        .bottom(h / 2)
        .radius(function (d) {
            return d.r;
        })
        .strokeStyle("#ccc")
        .anchor("top")
        .font("16px Verdana")
        .add(pv.Label).text(function (d) {
        return d.name;
    });

//quadrant lines -- vertical
    radar.add(pv.Line)
        .data([(h / 2 - radar_arcs[radar_arcs.length - 1].r), h - (h / 2 - radar_arcs[radar_arcs.length - 1].r)])
        .lineWidth(1)
        .left(w / 2)
        .bottom(function (d) {
            return d;
        })
        .strokeStyle("#bbb");

//quadrant lines -- horizontal
    radar.add(pv.Line)
        .data([(w / 2 - radar_arcs[radar_arcs.length - 1].r), w - (w / 2 - radar_arcs[radar_arcs.length - 1].r)])
        .lineWidth(1)
        .bottom(h / 2)
        .left(function (d) {
            return d;
        })
        .strokeStyle("#bbb");


// blips
// var total_index=1;
// for (var i = 0; i < radar_data.length; i++) {
//     radar.add(pv.Dot)
//     .def("active", false)
//     .data(radar_data[i].items)
//     .size( function(d) { return ( d.blipSize !== undefined ? d.blipSize : 70 ); })
//     .left(function(d) { var x = polar_to_raster(d.pc.r, d.pc.t)[0];
//                         //console.log("name:" + d.name + ", x:" + x);
//                         return x;})
//     .bottom(function(d) { var y = polar_to_raster(d.pc.r, d.pc.t)[1];
//                           //console.log("name:" + d.name + ", y:" + y);
//                           return y;})
//     .title(function(d) { return d.name;})
//     .cursor( function(d) { return ( d.url !== undefined ? "pointer" : "auto" ); })
//     .event("click", function(d) { if ( d.url !== undefined ){self.location =  d.url}})
//     .angle(Math.PI)  // 180 degrees in radians !
//     .strokeStyle(radar_data[i].color)
//     .fillStyle(radar_data[i].color)
//     .shape(function(d) {return (d.movement === 't' ? "triangle" : "circle");})
//     .anchor("center")
//         .add(pv.Label)
//         .text(function(d) {return total_index++;})
//         .textBaseline("middle")
//         .textStyle("white");
// }


//Quadrant Ledgends
    var radar_quadrant_ctr = 1;
    var quadrantFontSize = 20;
    var headingFontSize = 14;
    var stageHeadingCount = 0;
    var lastRadius = 0;
    var lastQuadrant = '';
    var spacer = 8;
    var fontSize = 14;
    var total_index = 1;

//TODO: Super fragile: re-order the items, by radius, in order to logically group by the rings.
    for (var i = 0; i < radar_data.length; i++) {
        //adjust top by the number of headings.
        if (lastQuadrant != radar_data[i].quadrant) {
            radar.add(pv.Label)
                .left(radar_data[i].left)
                .top(radar_data[i].top)
                .text(radar_data[i].quadrant)
                .strokeStyle(radar_data[i].color)
                .fillStyle(radar_data[i].color)
                .font(quadrantFontSize + "px Verdana");

            lastQuadrant = radar_data[i].quadrant;

        }

        var itemsByStage = _.groupBy(radar_data[i].items, function (item) {
            return Math.floor(item.pc.r / 100)
        });
        var offsetIndex = 0;
        for (var stageIdx in _(itemsByStage).keys()) {

            if (stageIdx > 0) {
                offsetIndex = offsetIndex + itemsByStage[stageIdx - 1].length + 1;
                console.log("offsetIndex = " + itemsByStage[stageIdx - 1].length, offsetIndex);
            }

            // Headings
            radar.add(pv.Label)
                .left(radar_data[i].left + headingFontSize)
                .top(radar_data[i].top + quadrantFontSize + spacer + (stageIdx * headingFontSize) + (offsetIndex * fontSize))
                .text(radar_arcs[stageIdx].name)
                .strokeStyle('#cccccc')
                .fillStyle('#cccccc')
                .font(headingFontSize + "px Verdana");


            // items
            radar.add(pv.Label)
                .left(radar_data[i].left)
                .top(radar_data[i].top + quadrantFontSize + spacer + (stageIdx * headingFontSize) + (offsetIndex * fontSize))
                .strokeStyle(radar_data[i].color)
                .fillStyle(radar_data[i].color)

                .add(pv.Dot)
                .def("i", radar_data[i].top + quadrantFontSize + spacer + (stageIdx * headingFontSize) + spacer + (offsetIndex * fontSize))
                .data(itemsByStage[stageIdx])

                .top(function () {
                    return ( this.i() + (this.index * fontSize) );
                })
                .shape(function (d) {
                    return (d.movement === 't' ? "triangle" : "circle");
                })
                .cursor(function (d) {
                    return ( d.url !== undefined ? "pointer" : "auto" );
                })
                .event("click", function (d) {
                    if (d.url !== undefined) {
                        self.location = d.url
                    }
                })
                .event("mouseover", function (d) {
                    var position = polar_to_raster(d.pc.r, d.pc.t);
                    var x = position[0];
                    var y = position[1];
                    activateHelpBox(d.name, d.explanation, d.url, x + 20, h - y + 110);
                })
                .event("mouseout", function (d) {
                    hideHelpBox();
                })
                .size(fontSize * 2)
                .angle(45)
                .anchor("right")
                .add(pv.Label)
                .text(function (d) {
                    return radar_quadrant_ctr++ + ". " + d.name;
                })
                .font(headingFontSize - 2 + "px Verdana");

            radar.add(pv.Dot)
                .def("active", false)
                .data(itemsByStage[stageIdx])
                .size(function (d) {
                    return ( d.blipSize !== undefined ? d.blipSize : 70 );
                })
                .left(function (d) {
                    var x = polar_to_raster(d.pc.r, d.pc.t)[0];
                    return x;
                })
                .bottom(function (d) {
                    var y = polar_to_raster(d.pc.r, d.pc.t)[1];
                    return y;
                })
                .title(function (d) {
                    return d.name;
                })
                .cursor(function (d) {
                    return ( d.url !== undefined ? "pointer" : "auto" );
                })
                .event("mouseover", function (d) {
                    var position = this.mouse();
                    activateHelpBox(d.name, d.explanation, d.url, position.x, position.y);
                })
                .event("mouseout", function (d) {
                    hideHelpBox();
                })
                .angle(Math.PI)  // 180 degrees in radians !
                .strokeStyle(radar_data[i].color)
                .fillStyle(radar_data[i].color)
                .size(200)
                .shape(function (d) {
                    return (d.movement === 't' ? "triangle" : "circle");
                })
                .anchor("center")
                .add(pv.Label)
                .font("14px Verdana")
                .text(function (d) {
                    return total_index++;
                })
                .textBaseline("middle")
                .textStyle("white");


        }
    }

    radar.anchor('radar');
    radar.render();

};
