



api.php?action=query&titles=Albert%20Einstein&prop=info&format=jsonfm
// Using jQuery
$.ajax( {
    url: remoteUrlWithOrigin,
    data: queryData,
    dataType: 'json',
    type: 'POST',
    headers: { 'Api-User-Agent': 'Example/1.0' },
    success: function(data) {
       // do something with data
       console.log(data);
    }
} );