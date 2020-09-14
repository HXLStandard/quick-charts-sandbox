/**
 * Script to run on page load
 */

// Constant patterns
var CONFIG_PATTERN = '{"configVersion":2,"bites": [{{BITE}}]}';
var URL_PATTERN = "https://tools.humdata.org/quickcharts/app/show;url={{URL}};embeddedConfig={{CONFIG}}";
var COOKBOOK_URL_PATTERN = "https://data.humdata.org/hxlpreview/show;url={{URL}};embeddedConfig={{CONFIG}};embeddedTitle={{TITLE}}"

URL_PATTERN=COOKBOOK_URL_PATTERN
/**
 * Set up on page load
 */
window.onload = function () {

    // GET query parameters
    var url_params = new URLSearchParams(window.location.search);
    var data_url = url_params.get('url');
    var json_bite = url_params.get('bite');

    // get data URL from query param or web page
    if (data_url) {
        document.getElementById('url').value = data_url;
    } else {
        data_url = document.getElementById('url').value;
    }

    // get JSON bite from query param or web page
    if (json_bite) {
        document.getElementById('bite').value = json_bite;
    } else {
        json_bite = document.getElementById('bite').value;
    }

    var editor = ace.edit("bite-editor");
    var textarea = document.getElementById("bite");
    editor.getSession().setValue(textarea.value);
    editor.getSession().on('change', () => {
        textarea.value = editor.getSession().getValue();
    });

    // embedded JSON
    var config = CONFIG_PATTERN
        .replace('{{BITE}}', json_bite.replace(/("[^"]*")|\s/g, "$1"));

    // entire Quick Charts URL
    var preview_url = URL_PATTERN
        .replace('{{URL}}', encodeURIComponent(data_url))
        .replace('{{CONFIG}}', encodeURIComponent(config));

    // set up the iFrame
    document.getElementById('chart').setAttribute('src', preview_url);
    document.getElementById('embed-url').textContent = preview_url;
    document.getElementById('embed-url').setAttribute('href', preview_url);
};
