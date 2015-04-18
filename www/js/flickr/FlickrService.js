angular.module('flickr', [])

.constant('FlickrENV', {
	'endpoint' : 'https://api.flickr.com/services/rest/',
	'api_key' : 'f100f808b8501d88fae083df7dc7d7a6',
	'per_page' : 50
})

.service('FlickrService', ['$http', '$q', 'FlickrENV',  function($http, $q, FlickrENV) { 
	var rootUrl = FlickrENV.endpoint + 
		'?api_key=' + FlickrENV.api_key + 
		'&format=json&nojsoncallback=1&per_page=' + FlickrENV.per_page;

	return {
		search : function(searchTerm) {
			var deferred = $q.defer(); 

			var url = rootUrl + '&method=flickr.photos.search&text=' + searchTerm;

			$http({ url: url, 
				method: 'GET', 
				dataType: 'json'
			})
				.success( function(data) { 
					deferred.resolve(data);
				})
				.error( function() { 
					deferred.reject('FlickrService: An error occurred while requesting a search');
				});
			return deferred.promise;
		},

		recentPhotos : function() { 

		}

	}
}])

;