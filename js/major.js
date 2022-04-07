var api = '6237cbf0dced170e8c83a41d';
var userUrl = 'https://ldavis-b83d.restdb.io/rest/majorlogins';
var arrUsers = [''];
var user = "Raymond";
var arrUserIrritants = "lanolin";
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
    Tesseract.recognize(snapshotZone, 'eng', { logger: m => console.log(m) })
        .then(({ data: { text } }) => {
            result.value = text
            console.log(text);
            //var result = text
        })
    $("#snapshot").hide();
})

//edit irritants

$(function () {


    var errorMessages = {
        "REQUIRED": "This field is required",
        "UNIQUE": "This value already exists",
        "TYPE": "Invalid data type",
        "REGEX": "Invalid data format",
        "number": "Must be an integer number",
        "money": "Must be a number with max two decimals",
        "JSON": "Not a valid JSON",
        "float_number": "Must be a decimal number",
        "email": "Must be a valid email",
        "FILESIZE": "Upload exceeds file size limit per field (max 1 MB)",
        "UPLOADERROR": "Unable to upload file, please try again",
        "GENERIC_ERROR": "A server error occured, please reload page"
    }

    var successMessage = "Thank you!";

   $.datetimepicker.setLocale('en');

    if (!Modernizr.inputtypes.datetime) {
        $("input[data-type=date]").datetimepicker({ timepicker: false, format: "Y/m/d" }).attr("type", "text");
        $("input[data-type=datetime]").datetimepicker({}).attr("type", "text");
        $("input[data-type=time]").datetimepicker({ datepicker: false, format: "H:i", value: "12:00" }).attr("type", "text");
    }

    $("#irritants-form input[data-type=file], #irritants-form input[data-type=image]").on("change", function () {
        $(this).data("uploadedfiles", []);
    });
    var apikey = api; // TODO: INSERT YOUR CORS API KEY HERE OR add formapikey to settings

    if (!apikey) alert("Please insert a CORS API key");

    var ajaxSettings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ldavis-b83d.restdb.io/rest/irritants",
        "method": "POST",
        "headers": {
            "x-apikey": apikey,
            "content-type": "application/json"
        },
        "processData": false
    }

    var ajaxSettingsAttachments = {
        "async": true,
        "url": "https://ldavis-b83d.restdb.io/media",
        "method": "POST",
        "contentType": false,
        "headers": {
            "x-apikey": apikey
        },
        "cache": false,
        "processData": false
    }

    var populateLookupSelect = function (options) {
        var collname = options.collection;
        var apikey = options.apikey;
        var fieldname = options.fieldname;
        var selectfield = options.selectfield;
        var settings = {
            "async": true,
            "url": "https://ldavis-b83d.restdb.io/rest/" + collname,
            "method": "GET",
            "headers": {
                "x-apikey": apikey
            },
            "cache": false
        }
        if (!apikey) alert("Missing API key for " + collname);
        $.ajax(settings)
            .done(function (items) {
                $.each(items, function (index, item) {
                    $("#" + fieldname).append('<option value="' + item._id + '">' + item[selectfield] + '</option>');
                })
            })
            .fail(function (response) {
                console.log(error, response);
            });
    }

    populateLookupSelect({ collection: "majorlogins", apikey: api, fieldname: "User", selectfield: "email address" });

    populateLookupSelect({ collection: "inci-list", apikey: api, fieldname: "Ingredient", selectfield: "INCI name" });

    function uploadAttachment(item) {
        var deferred = $.Deferred();
        var datatype = $(item).attr("data-type");
        var element_name = $(item).attr("name");
        var formData = new FormData();
        var files = $(item)[0].files;
        var totalsize = 0;
        var files_to_upload = []
        _.each(files, function (file) {
            // ignore non-images
            if (datatype === "image" && !file.type.match('image.*')) {
                return;
            } else {
                files_to_upload.push(file);
                totalsize += file.size;
            }
        });

        if (totalsize <= 10000) {
            _.each(files_to_upload, function (file) {
                formData.append(element_name, file, file.name);
            });
            var asa = _.clone(ajaxSettingsAttachments);
            asa.xhr = function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100) + "%";
                        $("#" + element_name + "_progress")
                            .css("width", percentComplete)
                    }
                }, false);
                return xhr;
            }
            asa.data = formData;
            var uploadedbefore = $(item).data("uploaded");
            if (!uploadedbefore) {
                $("#" + element_name + "_progress").parent().removeClass("hidden");
                $("#btn-submit").button("loading");
                $.ajax(asa)
                    .success(function (data) {
                        var result = data.ids || [];
                        var successObj = {};
                        successObj[element_name] = result;
                        $(item).data("uploaded", result);
                        deferred.resolve(successObj);
                    })
                    .fail(function () {
                        deferred.reject({ field: element_name, error: errorMessages.UPLOADERROR });
                    });
            } else {
                var obj = {};
                obj[element_name] = uploadedbefore;
                deferred.resolve(obj);
            }
        } else {
            deferred.reject({ field: element_name, error: errorMessages.FILESIZE });
        }
        return deferred.promise();
    }

    function postForm() {

        // clear errors
        $("#irritants-form .has-error").removeClass("has-error");
        $("#irritants-form .help-block").remove();

        $("#btn-submit").button("loading");

        // we need to reformat date, datetime, datetime-local and time to ISO date strings

        $("input[data-type=datetime],input[data-type=datetime-local]").each(function () {
            var theDate = $(this).val();
            if (theDate) {
                var isodate_str = new Date(theDate).toISOString();
                $(this).val(isodate_str);
            }
        });

        $("input[data-type=date]").each(function () {
            var theDate = $(this).val();
            if (theDate) {
                theDate += " GMT";
                var isodate_str = new Date(theDate).toISOString();
                $(this).val(isodate_str);
            }
        });

        $("input[data-type=time]").each(function () {
            var timeval = $(this).val();
            if (timeval) {
                var regex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
                if (timeval.match(regex)) {
                    var isodate_str = new Date("1970-01-01T" + $(this).val() + ":00Z").toISOString();
                    $(this).val(isodate_str);
                }
            }
        });


        // get the form data
        var formObj = $("#irritants-form").serializeObject();

        // get attachments from inputs
        var attachments = [];

        $("#irritants-form input[data-type=file], #irritants-form input[data-type=image]").each(function (input) {
            var files = $(this)[0].files;
            if (files && files.length > 0) {
                attachments.push($(this));
            }
        });

        var attachFuncs = [];
        _.each(attachments, function (attachment) {
            attachFuncs.push(uploadAttachment(attachment));
        });

        // upload all attachments and return with ids when done
        $.when.apply(null, attachFuncs)
            .done(function () {
                // get the attachment id's from arguments and store into form obj

                _.each(arguments, function (fieldObj) {
                    formObj = _.assign(formObj, fieldObj);
                });

                // submit the whole form with attachment ids 

                ajaxSettings.data = JSON.stringify(formObj);
                $.ajax(ajaxSettings)
                    .done(function (response) {
                        // replaces form with a thank you message, please replace with your own functionality
                        $("#irritants-form").replaceWith("<div class='thank-you'>" + successMessage + "</div>");
                    })
                    .fail(function (response) {
                        $("#btn-submit").button("reset");
                        var error = response.responseJSON;
                        if (error && error.name === "ValidationError") {
                            _.each(error.list, function (fielderr) {
                                var inputSelector = "[name=" + fielderr.field + "]";
                                var errorMessageCode = fielderr.message[1];
                                var errorMessage = errorMessages[errorMessageCode] || "Invalid value";
                                if (errorMessageCode === "TYPE") {
                                    var fieldType = $(inputSelector).data("type");
                                    errorMessage = errorMessages[fieldType] || "Invalid value";
                                }
                                $(inputSelector).after("<div class='help-block'>" + errorMessage + "</div>");
                                $(inputSelector).parents(".form-group").addClass("has-error");
                            });
                        }
                        else {
                            var msg = (ajaxSettings.headers["x-apikey"] && ajaxSettings.headers["x-apikey"].length < 24) ? "Missing API-key" : "Server Error";
                            alert(msg);
                        }
                    });
            })
            .fail(function (response) {
                $("#btn-submit").button("reset");
                if (response.field && response.error) {
                    var inputSelector = "[name=" + response.field + "]";
                    $(inputSelector).after("<div class='help-block'>" + response.error + "</div>");
                    $(inputSelector).parents(".form-group").addClass("has-error");
                } else {
                    var errorMessage = errorMessages.GENERIC_ERROR || "Problem submitting form";
                    $("#fg-errors").addClass("has-error")
                        .append("<div class='help-block'>" + errorMessage + "</div>");
                }
            });
    };

    $("#irritants-form").submit(function (event) {
        postForm();
        event.preventDefault();
        return false;
    });
});
changePage("#btnIrritantBack", "#irritantLog", "#userHub")