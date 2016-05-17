define(['jquery'], function($) {
    return {
        POSTer: function(url, data, callback) {
            $.ajax({
                url: url,
                method: 'POST',
                data: data,
                beforeSend: function() {},
                complete: function() {},
                success: function(data) { return callback(null, data); },
                error: function(err) { return callback(err, null); }
            });
        },
        GETer: function(url, data, callback) {
            $.ajax({
                url: url,
                method: 'GET',
                data: data,
                beforeSend: function() {},
                complete: function() {},
                success: function(data) { return callback(null, data); },
                error: function(err) { return callback(err, null); }
            });
        }
    };
});
