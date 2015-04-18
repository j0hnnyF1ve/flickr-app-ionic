angular.module('main').controller('HeaderController', HeaderController);
HeaderController.$inject = ['$scope', '$ionicScrollDelegate', '$timeout', 'FlickrService', 'Photos', 'AppState'];
function HeaderController($scope, $ionicScrollDelegate, $timeout, FlickrService, Photos, AppState) {
	var self = this;

	var timeout;
	var SEARCHDELAY = 1000;

	self.searchActive = false;
	self.searchTerm = '';

	self.openSearch = function() { self.searchActive = true; }
	self.closeSearch = function() { self.searchActive = false; }
	
	self.handleKeyPress = function($event) { 
		$timeout.cancel(timeout);

		AppState.set("searchTerm", self.searchTerm);

		if(self.searchTerm.length > 0) {
			timeout = $timeout(function() { 
				FlickrService.search(self.searchTerm)
					.then(function(data) { 
						console.log("response", data);
						var photos = data.photos.photo;
						var page = data.photos.page;
						var totalPages = data.photos.pages;

						Photos.set([]);
						$ionicScrollDelegate.scrollTop();

						photoList = [];
						for(var i=0; i < photos.length; i++) {
							var photo = photos[i];

							t_url = "http://farm" + photo.farm + ".static.flickr.com/" + 
							        photo.server + "/" + photo.id + "_" + photo.secret + "_" + "t.jpg";
							photo_url = "http://farm" + photo.farm + ".static.flickr.com/" + 
							        photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
							p_url = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
						    //s +=  '<a href="' + p_url + '">' + '<img alt="'+ photo.title + '"src="' + t_url + '"/>' + '</a>';

						    caption = photo.title;

						    photoList.push({ thumbnailUrl: t_url, photoUrl: photo_url, pageUrl: p_url, caption: caption });
						}
						Photos.set(photoList);
					
						if(window.cordova && window.cordova.plugins.Keyboard) {
						  cordova.plugins.Keyboard.close();
						}
					})

			}, SEARCHDELAY);
		}
	}
};


angular.module('main').controller('SubHeaderController', SubHeaderController);
SubHeaderController.$inject = ['$scope', 'Photos', 'AppState'];
function SubHeaderController($scope, Photos, AppState) {
	var self = this;
	self.searchTerm = 'Hello World';

	$scope.$watch(
		function() { return AppState.get('searchTerm'); }, 
		function(newVal, oldVal) { 
			self.searchTerm = newVal; 
	});
}

angular.module('main').controller('ContentController', ContentController);
ContentController.$inject = ['$scope', 'Photos', 'AppState'];
function ContentController($scope, Photos, AppState) {
	var self = this;
	self.photos = [];

	$scope.$watch(
		function() { return Photos.get(); }, 
		function(newVal, oldVal) { 
			if(newVal !== oldVal) {
				self.photos = newVal; 
				console.log(self.photos);
			}
	});

}