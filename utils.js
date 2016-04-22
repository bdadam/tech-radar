
function polar_to_cartesian(r,t) {  
  //radians to degrees, requires the t*pi/180
  var x = r * Math.cos((t*Math.PI/180));
  var y = r * Math.sin((t*Math.PI/180));
  return [x,y];
}

function cartesian_to_raster(x,y) {
  var rx = w/2 + x;
  var ry = h/2 + y;
  return [rx,ry];
}

function raster_to_cartesian(rx,ry) {
  var x = rx - w/2;
  var y = ry - h/2;
  return [x,y];
}

function polar_to_raster(r,t) {
  var xy= polar_to_cartesian(r,t);
  return cartesian_to_raster(xy[0], xy[1]);
}


function activateHelpBox(name, explanation, url, xPosition, yPosition){
  var helpBox = document.querySelector(".helpbox");
  helpBox.querySelector("h3").textContent = name;
  helpBox.querySelector("p").textContent = explanation && explanation != "" ? explanation : "No explanation is available. Please help us by providing one.";

  var anchor = helpBox.querySelector("a");

  if(url && url != ""){
    anchor.href = url;
    anchor.textContent = url;
  }else{
    anchor.href = "javascript:alert('Please help us by adding an url to this item.')";
    anchor.textContent = "No url provided.";
  }


  helpBox.style.left = xPosition;
  helpBox.style.top = yPosition;
  helpBox.style.display = "inline-block"
}

function hideHelpBox(){
  document.querySelector(".helpbox").style.display = "none";
}
