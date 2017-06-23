
var config_pattern = '{"configVersion":2,"bites": [{{BITE}}]}';
var preview_url_pattern = "https://data.humdata.org/hxlpreview/show;url={{URL}};embeddedConfig={{CONFIG}};singleWidgetMode=true";

function handle_submit () {
    event.preventDefault();
    update_preview();
    return false;
}

function update_preview(url, bite) {
    var url = document.getElementById('url').value;
    var bite = document.getElementById('bite').value;
    var config = config_pattern
        .replace('{{BITE}}', bite.replace(/("[^"]*")|\s/g, "$1"));
    var preview_url = preview_url_pattern
        .replace('{{URL}}', encodeURIComponent(url))
        .replace('{{CONFIG}}', encodeURIComponent(config));
    document.getElementById('preview').setAttribute('src', preview_url);
    document.getElementById('embed-url').textContent = preview_url;
}

update_preview();

document.getElementById('config').addEventListener('submit', handle_submit);
