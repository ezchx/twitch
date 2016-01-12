$.ajaxSetup({
  async: false
});

$(document).ready(function() {
  var ss = "";
  var users = [
    {"name":"freecodecamp", "icon":"", "online":"", "status":""},
    {"name":"MedryBW", "icon":"", "online":"", "status":""},
    {"name":"storbeck", "icon":"", "online":"", "status":""},
    {"name":"AdmiralBulldog", "icon":"", "online":"", "status":""},
    {"name":"habathcx", "icon":"", "online":"", "status":""},
    {"name":"RobotCaleb", "icon":"", "online":"", "status":""},
    {"name":"thomasballinger", "icon":"", "online":"", "status":""},
    {"name":"noobs2ninjas", "icon":"", "online":"", "status":""},
    {"name":"comster404", "icon":"", "online":"", "status":""},
    {"name":"brunofin", "icon":"", "online":"", "status":""},
    {"name":"beohoff", "icon":"", "online":"", "status":""}];
  
  $("#arrow-1").attr("class","arrow-show");
  $("#arrow-2").attr("class","arrow-hide");
  $("#arrow-3").attr("class","arrow-hide");
  list = "all";
  
  $("#button-1").on("click", function(){
    $("#arrow-1").attr("class","arrow-show");
    $("#arrow-2").attr("class","arrow-hide");
    $("#arrow-3").attr("class","arrow-hide");
    list = "all";
    runList();
  });
  
  $("#button-2").on("click", function(){
    $("#arrow-1").attr("class","arrow-hide");
    $("#arrow-2").attr("class","arrow-show");
    $("#arrow-3").attr("class","arrow-hide");
    list = "online";
    runList();
  });
  
  $("#button-3").on("click", function(){
    $("#arrow-1").attr("class","arrow-hide");
    $("#arrow-2").attr("class","arrow-hide");
    $("#arrow-3").attr("class","arrow-show");
    list = "offline";
    runList();
  });
  
  $("#search_button").on("click", function(){
    runList();
  });
  
  $("#searchy").on("input", function(){
    runList();
  });
  
  
  
  for (var i = 0; i < users.length; i++) {
    
    url = "https://api.twitch.tv/kraken/channels/" + users[i].name;
    $.getJSON(url, function(json) {
      
      if (json.logo === null || json.logo === undefined) {
        users[i].logo = "https://www.ezchx.com/projects/blank_face.png";
      } else {
        users[i].logo = json.logo;
      }

    });
    
    url2 = "https://api.twitch.tv/kraken/streams/" + users[i].name;
    $.getJSON(url2, function(json2) {
      
       if (json2["stream"] == null) {
         users[i].online = "no";
       } else {
         users[i].online = "yes";
         users[i].status = json2.stream.channel.status.substring(0,30) + "...";
       }
      
    });
    
    if (users[i].logo == null) {
      users[i].logo = "https://www.ezchx.com/projects/blank_face.png";
      users[i].online= "no";
      users[i].status = "Account not found!";
    }
    
  }
  

  
    
  runList();
   
  function runList() {
  var html = "";
  var ss = $("#searchy").val();
  $("#users").html(html);  
  for (var i = 0; i < users.length; i++) {
    if (((list === "all") || (list === "online" && users[i].online === "yes") || (list === "offline" && users[i].online === "no")) && ((users[i].name.substring(0,ss.length).toLowerCase() === ss.toLowerCase()) || (ss === ""))) {
      
      if (users[i].online === "yes") {
        icon_img = "https://www.ezchx.com/projects/ok.png";
      } else {
        icon_img = "https://www.ezchx.com/projects/bad.png";
      }
      
      html += '<a href="http://www.twitch.tv/' + users[i].name + '" target="_blank"><div class="row text-center">';
      html += '  <div class="icon"><img src="' + users[i].logo +'" height="35"></div>';
      html += '  <div class="users">' + users[i].name + '<p>' + users[i].status + '</p></div>';
      html += '  <div class="check"><img src="' + icon_img +'" height="25"></div>';
      html += '</div></a>';

    }
  }
  $("#users").html(html);
  }

    
  
});