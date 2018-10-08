$(document).ready(function () {

    $.ajax({
url: "https://api.textrazor.com/",
type: "POST",
dataType: 'json',
beforeSend: function(xhr){xhr.setRequestHeader('x-textrazor-key', '6536fa92061fbf8d1cbf3c002df526b60569cc9067c37357c44d99ac');},
data: { 
   extractors: "dependency-trees,relations",
   text:"Spain's stricken Bankia expects to sell..." 
},
success:function(data) {
    alert(JSON.stringify(data));
},error: function(xhr) {
    alert("<some error>");
    console.error(xhr.responseText);
}});
    
    var config = {
        apiKey: "AIzaSyBEDO_kuqrxstzCdnUU0fYAYFNdko9JUYQ",
        authDomain: "orion-mxiv.firebaseapp.com",
        databaseURL: "https://orion-mxiv.firebaseio.com",
        projectId: "orion-mxiv",
        storageBucket: "orion-mxiv.appspot.com",
        messagingSenderId: "829704271422"
    };
    firebase.initializeApp(config);

    $('#codeFunction').on('keypress', function (e) {
            if (e.keyCode === 9 || e.which === 9) {
                e.preventDefault();
                console.log("yo");
                var s = this.selectionStart;
                console.log(this.value);
                this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
                this.selectionEnd = s + 1;
            }
        });
    

    document.querySelector("#Console-input").addEventListener("keypress", function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            var query = '> ' + document.getElementById('Console-input').value;
            document.getElementById('Console-input').value = "";
            console.log(query);
            typeOnConsole(query);
            orion_nlp(query);
        }
    });

    $('#right').tabSlideOut({
        tabLocation: 'right',
        offsetReverse: true, // position the panel from the bottom of the page, rather than the top
        handleOffsetReverse: false, // position the tab from the bottom of the panel, rather than the top
        onLoadSlideOut: false, // open by default
        /* don't close this tab if a button is clicked, or if the checkbox is set */
        clickScreenToCloseFilters: [
            'button', // ignore button clicks
            function (event) { // custom filter
                // filters need to return true to filter out the click passed in the parameter
                return $('#keepTabOpen').is(':checked');
            }
        ]
    });

    $('#right2').tabSlideOut({
        tabLocation: 'right',
        offsetReverse: true, // position the panel from the bottom of the page, rather than the top
        handleOffsetReverse: true, // position the tab from the bottom of the panel, rather than the top
        onLoadSlideOut: false, // open by default
        /* don't close this tab if a button is clicked, or if the checkbox is set */
        clickScreenToCloseFilters: [
            'button', // ignore button clicks
            function (event) { // custom filter
                // filters need to return true to filter out the click passed in the parameter
                return $('#keepTabOpen').is(':checked');
            }
        ]
    });

    /* register event handler for every tab event, and show events on the page*/
    $(document).on('slideouttabopen slideouttabclose slideouttabbounce', function (event) {
        var text = $(event.target).attr('id') + ': ' + event.type;
        $('#events').append(text + "\n");
    });


    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

});

$('#collapseOne').on('show.bs.collapse', function () {
    $('.panel-heading').animate({
        backgroundColor: "#515151"
    }, 500);
})

$('#collapseOne').on('hide.bs.collapse', function () {
    $('.panel-heading').animate({
        backgroundColor: "#00B4FF"
    }, 500);
})

var editor = CodeMirror(document.getElementById("codeeditor"), {
    value: "import java.util.*;\n{\tpublic class Main\n\t{\tpublic static void main(String[] args)\n\t\t{\n\n\t\t}\n\t}\n}",
    mode: "text/x-java",
    theme: "oceanic-next",
    tabSize: 4,
    indentUnit: 4,
    indentWithTabs: true,
    lineNumbers: true,
    firstLineNumber: 0,
    matchBrackets: true,
    autoCloseBrackets: true,
    foldGutter: true,
    foldCode: true,
    styleActiveLine: true,
    styleActiveSelected: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    extraKeys: {
        "Ctrl-Space": "autocomplete"
    }
});
editor.setSize(null, "540px");

function RunFunction() {
    console.log(editor.getValue());
    var clientId = "2b08f04240d3e4a24c0dcd91568cbeae";
    var clientSecret = "c86905ab6b330d46eaaf77fad8da0a671c96f8e16f1dc739949ae892acdbfa7";
    var script = editor.getValue();
    var stdin = "";
    var language = "java";
    var versionIndex = 0;
    var datad = "{\"clientId\": \"" + clientId + "\",\"clientSecret\":\"" + clientSecret + "\",\"script\":\"" + script + "\",\"language\":\"" + language + "\",\"versionIndex\":\"" + versionIndex + "\"} ";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.jdoodle.com/v1/execute",
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "processData": false,
        "data": datad
    }


    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

console.log($(window).height()); // returns height of browser viewport
console.log($(document).height()); // returns height of HTML document (same as pageHeight in screenshot)
console.log($(window).width()); // returns width of browser viewport
console.log($(document).width()); // returns width of HTML document (same as pageWidth in screenshot)

var changeSizeIndex = 0;

function changeSize() {
    if (changeSizeIndex++ % 2 == 0) {
        console.log("expanding");
        editor.setSize(null, "430px");
        $('#main-row').css("height", "450px");

        $('#right-sidebar').css("height", "450px");
        $('#home-content').css("height", "430px");
        $('#settings-content').css("height", "430px");
        $('#profile-content').css("height", "430px");

        //$("#setting-button").text(<span class="glyphicon glyphicon glyphicon-cog"></span>);
        $("#setting-button").html('<span class="glyphicon glyphicon glyphicon-cog"></span>');

    } else {
        console.log("collapsed");
        editor.setSize(null, "540px");
        $('#main-row').css("height", "560px");

        $('#right-sidebar').css("height", "560px");
        $('#home-content').css("height", "540px");
        $('#settings-content').css("height", "540px");
        $('#profile-content').css("height", "540px");

        $("#setting-button").text('SETTINGS');
    }

}

window.onload = function () {
    var btn = document.getElementById("run"),
        cd = document.getElementById("code"),
        chart;

    (btn.onclick = function () {
        var code = cd.value;

        if (chart) {
            chart.clean();
        }

        chart = flowchart.parse(code);
        chart.drawSVG('canvas', {
            // 'x': 30,
            // 'y': 50,
            'line-width': 3,
            'maxWidth': 3, //ensures the flowcharts fits within a certian width
            'line-length': 50,
            'text-margin': 10,
            'font-size': 14,
            'font': 'normal',
            'font-family': 'Helvetica',
            'font-weight': 'normal',
            'font-color': 'black',
            'line-color': 'black',
            'element-color': 'black',
            'fill': 'white',
            'yes-text': 'yes',
            'no-text': 'no',
            'arrow-end': 'block',
            'scale': 1,
            'symbols': {
                'start': {
                    'font-color': 'red',
                    'element-color': 'green',
                    'fill': 'yellow'
                },
                'end': {
                    'class': 'end-element'
                }
            },
            'flowstate': {
                'past': {
                    'fill': '#CCCCCC',
                    'font-size': 12
                },
                'current': {
                    'fill': 'yellow',
                    'font-color': 'red',
                    'font-weight': 'bold'
                },
                'future': {
                    'fill': '#FFFF99'
                },
                'request': {
                    'fill': 'blue'
                },
                'invalid': {
                    'fill': '#444444'
                },
                'approved': {
                    'fill': '#58C4A3',
                    'font-size': 12,
                    'yes-text': 'APPROVED',
                    'no-text': 'n/a'
                },
                'rejected': {
                    'fill': '#C45879',
                    'font-size': 12,
                    'yes-text': 'n/a',
                    'no-text': 'REJECTED'
                }
            }
        });

        $('[id^=sub1]').click(function () {
            alert('info here');
        });
    })();

};

function typeOnConsole(str) {
    var console = document.getElementById('mCSB_2_container');
    var text = document.createElement("h1");
    var textData = document.createTextNode(str);
    text.appendChild(textData);
    console.appendChild(text);
}

function trial() {
    $("#rightContent").toggleClass("hidden");
    $("#right-sidebar").toggleClass("col-sm-1 col-sm-4");
    $("#codeeditorPanel").toggleClass("col-sm-11 col-sm-8");
}

function addModule()
{   
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = dd+'/'+mm+'/'+yyyy;
    
    var module = {
        "name"        : document.getElementById('moduleName').value,
        "date"        : today,
        "description" : document.getElementById('codeDescription').value,
        "tags"        : document.getElementById('codeTag').value.toLowerCase().replace(/\s+/g, '').split(','),
        "headers"     : document.getElementById('codeHeaders').value.split('\n'),
        "function"    : document.getElementById('codeFunction').value,
    };
    /*
    module.name = document.getElementById('moduleName').value;
    module.date = today;
    module.description = document.getElementById('codeDescription').value;
    module.tags = document.getElementById('codeTag').value.toLowerCase().replace(/\s+/g, '').split(',');
    module.headers = document.getElementById('codeHeaders').value.split('\n');
    module.function = document.getElementById('codeFunction').value;
    */
    
    //console.log(module);
    var html=JSON.stringify(module,0,4);
    //console.log(html);
    
    var database = firebase.database();
    var ref = database.ref('ORION-Modules');
    ref.push(module);
    
    return html;
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function saveJSONLocally(){
    download(addModule(),document.getElementById('moduleName').value+".json","");
}