var api = '6237cbf0dced170e8c83a41d';
var userUrl = 'https://ldavis-b83d.restdb.io/rest/majorlogins';
var arrUsers = [''];
const AUTH0_CLIENT_ID = "XXK1MFFk3DwMidOeqZuKJvYxuXXEnDR0";
const AUTH0_DOMAIN = "lavenmajor.au.auth0.com";
//var db = new restdb("6237cbf0dced170e8c83a41d", options);
//var db = new restdb(api);
//var majorlogins = "6237b460f088b11e000072b0"; 

$("#scannerScreen").hide();
$("#startPage").hide();
$("#scannerScreen").hide();
$("#userHub").hide();
$("#irritantLog").hide();
$("#scanResults").hide();
$('#userNameTaken').hide();

//linking pages
//forward 
//log in stub
/*function login() {
    $("#loginPage").hide();
    $("#startPage").show();
};
$('#btnLogin').click(function () {
    login();
});*/

function changePage(button, pageStart, pageEnd) {
    $(button).click(function () {
        $(pageStart).hide();
        $(pageEnd).show();
    });
};

changePage("#btnLogBack", "#irritantLog", "#userHub");
changePage("#btnScannerPage", "#startPage", "#scannerScreen");
changePage("#btnUserHub", "#startPage", "#userHub");
changePage("#btnIrritantEdit", "#userHub", "#irritantLog");
changePage("#btnScannerBack", "#scannerScreen", "#startPage");
changePage("#btnUserBack", "#userHub", "#startPage")

//Login process (first attempt)

/*function addUser(item, url, apikey) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(item)
    }

    $.ajax(settings).done(function (response) {
        console.log('Item successfully added');
        console.log(response);
    });
}

function getUser(url, apikey) {
    var serviceURL = url;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": serviceURL,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log('Item successfully retrieved');
        console.log(response);
        arrUser = response;
    });

}
getUser(userUrl, api);*/

/*$("#btnSignUp").click(function () {
    var found = false;
    var username = $('#userName').val();
    var userLogin = {
        "Username": $('#userName').val(),
        "Password": $('#password').val()
    }
    console.log(arrUsers);
    var query = {}; // get all records
    var hints = { "$max": 10000, "$orderby": { "_id": -1 } }; // top ten, sort by creation id in descending order
    db.majorlogins.find(query, hints, function (err, res) {
        if (!err) {
            // res is an array of majorlogins instances
            for (i = 0; i < res.length - 1; i++) {
                console.log(res);
                if (res[i].Username == username) {
                    console.log('bad');
                    found = true;
                }
            }
        }
    });
    if (found == false) {
        addUser(userLogin, userUrl, api);
        console.log(arrUsers);
    } else {
        $("#userNameTaken").show();
    }
})*/


/*$("#btnSignUp").click(function () {
var found = false;
    while (found = false){

    }
});*/

//login through authfication

var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
    auth: {
        params: { scope: 'openid email profile' },
        configurationBaseUrl: 'https://cdn.auth0.com',
        esponseType: 'token id_token'
    }
});

$("#btnLogIn").click(
    function (e) {
        e.preventDefault();
        lock.show();
        return false;
    }
);

lock.on("authenticated", function(authResult) {
    lock.getProfile(authResult.accessToken, function(error, profile) {
      if (error) {
          // TODO: Handle error
          console.log("Auth0 getProfile failed", error);
          return;
      }
                  
      localStorage.setItem('id_token', authResult.idToken);
  
      // Display user information
      show_profile_info(profile);
  
      // global ajax Authorization setup
      $.ajaxPrefilter(function( options ) {
          if ( !options.beforeSend) {
              options.beforeSend = function (xhr) { 
                  xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
              }
          }
      });
  
      // get task items from database
      getIrritants();
    });
});

/* change item stuff to irritant stuff
// get tasks from database
function getIrritants(){
  $.getJSON('https://myapp-7175.restdb.io/rest/items', function(data){...});}
/*

  

//irritant log



//Scanner
/*function cameraActivate() {

    // activate camera through browser
    var video = document.getElementById('camForScan');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            video.srcObject = stream;
            video.play();
        });
    };
}
cameraActivate();*/

const player = document.getElementById('player')
const snapshotZone = document.getElementById('snapshot')
const captureButton = document.getElementById('capture')
const result = document.getElementById('result')

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    player.srcObject = stream
})

captureButton.addEventListener('click', function () {
    const context = snapshot.getContext('2d')
    context.drawImage(player, 0, 0, snapshotZone.width, snapshotZone.height)
    // Tesseract.recognize(snapshotZone, 'jpn', { logger: m => console.log(m) }) // 日本語
    Tesseract.recognize(snapshotZone, 'eng', { logger: m => console.log(m) }) // 英語
        .then(({ data: { text } }) => {
            result.value = text
        })
    //$("#snapshot").hide();
})
