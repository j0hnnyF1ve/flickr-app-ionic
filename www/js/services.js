angular.module('main').service('Photos', Photos);
Photos.$inject = [];
function Photos() {
	
	function photos() {
		var self = this;
		var mPhotos = [];
		
		self.get = function() { return mPhotos;}		
		self.set = function(in_photos) { mPhotos = in_photos;	}
	}

	return new photos();
}

angular.module('main').service('AppState', AppState);
AppState.$inject = [];
function AppState() {
	
	function appState() {
		var self = this;
		var properties = [];
		properties.searchTerm = '';
		
		self.get = function(property) { return properties[property];}
		self.set = function(property, value) { properties[property] = value;	}
	}

	return new appState();
}
