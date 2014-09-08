'use strict';

angular.module('wordnikReaderApp')
  .controller('MainCtrl', function ($scope, $http) {
		$scope.getArticle = function(url){
			// verify URL
			var articleUrl = {url: url};
			console.log(articleUrl);
			$http.post("/api/articles", articleUrl)
				.success(function(article){
					console.log(article);
					// use this to show the article
				})
				.error(function(error){
					console.log(error);
				});
		};
  });