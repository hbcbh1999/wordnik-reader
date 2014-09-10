'use strict';

angular.module('wordnikReaderApp')
  .controller('MainCtrl', function ($scope, $http) {
  	$scope.show = false;

		$scope.getArticle = function(url){
			// verify URL
			var articleUrl = {url: url};
			console.log(articleUrl);
			$http.post("/api/articles", articleUrl)
				.success(function(article){
					console.log(article);
					$scope.title = article.title;
					$scope.summary = article.summary;
					$scope.byline = article.byline;
					$scope.content = article.content;
					$scope.show = true;
					$scope.url = "";
					// use this to show the article
				})
				.error(function(error){
					console.log(error);
				});
		};

		$scope.changeShow = function(){
			$scope.show = !$scope.show;
		};
  });