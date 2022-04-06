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
function login() {
    $("#loginPage").hide();
    $("#startPage").show();
};
$('#btnLogin').click(function () {
    login();
});

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


//login through authfication -- need to access connection between Auth0, restDB and Github 
// Google and standalone authentication using Auth0 integration with restdb.io
/*
$(function () {
    const AUTH0_CLIENT_ID = "XXK1MFFk3DwMidOeqZuKJvYxuXXEnDR0";
    const AUTH0_DOMAIN = "lavenmajor.au.auth0.com";

    var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
        auth: {
            params: { scope: 'openid email profile' },
            configurationBaseUrl: 'https://cdn.auth0.com',
            responseType: 'token id_token'
        }
    });
    // auto login
    if (localStorage.getItem('id_token')) {
        var token = localStorage.getItem('id_token');
        lock.getProfile(token, function (error, profile) {
            if (error) {
                // Handle error
                return;
            }
            // Display user information
            show_profile_info(profile);

            // global ajax Authorization setup
            $.ajaxPrefilter(function (options) {
                if (!options.beforeSend) {
                    options.beforeSend = function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
                    }
                }
            });

            // get task items from database
            getItems();
        });
    }
    var show_profile_info = function (profile) {
        console.log(profile.picture);
        $('.nickname').text(profile.nickname);
        $('.btn-login').hide();
        $('.avatar').attr('src', profile.picture).show();
        $('.btn-logout').show();
    };

    var retrieve_profile = function () {
        var id_token = localStorage.getItem('id_token');
        if (id_token) {
            lock.getProfile(id_token, function (err, profile) {
                if (err) {
                    return alert('There was an error getting the profile: ' + err.message);
                }
                // Display user information
                show_profile_info(profile);
                // enable api button
                $('.btn-api').removeAttr("disabled");
            });
        }
    };

    $('.btn-login').click(function (e) {
        e.preventDefault();
        lock.show();
        return false;
    });

    $('.btn-logout').click(function (e) {
        localStorage.removeItem('id_token');
        $('.btn-api').attr("disabled", "true");
        window.location.href = "/";
        e.preventDefault();
        return false;
    });

    lock.on("authenticated", function (authResult) {
        lock.getProfile(authResult.accessToken, function (error, profile) {
            if (error) {
                // Handle error
                console.log("Auth0 getProfile failed", error);
                return;
            }

            localStorage.setItem('id_token', authResult.idToken);

            // Display user information
            show_profile_info(profile);

            // global ajax Authorization setup
            $.ajaxPrefilter(function (options) {
                if (!options.beforeSend) {
                    options.beforeSend = function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
                    }
                }
            });

            // get task items from database
            getItems();
        });
    });
});

//irritant log

*/

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
