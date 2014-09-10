'use strict';

angular.module('wordnikReaderApp')
  .controller('MainCtrl', function ($scope, $http) {
  	$scope.show = false;

		$scope.enter = function(e){
			if (e.keyCode != 13){
				return;
			} else {
				$scope.getArticle($scope.url);
			}
		}
		$scope.getArticle = function(url){
			$scope.wordObj = '';
			var splitUrl = url.split(/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/);
			if (splitUrl.length === 1){
				return alert('Please enter a Fast Company URL');
			} else {
				var sites = ['fastcompany', 'fastcoexist', 'fastcodesign', 'fastcolabs', 'fastcocreate'];
				var baseUrl = splitUrl[3].split('.')[1];
				console.log(baseUrl);
				if (sites.indexOf(baseUrl)===-1){
					return alert('Please enter a Fast Company URL')
				} else {
					var articleUrl = {url: url};
					console.log(articleUrl);
					$http.post("/api/articles", articleUrl)
						.success(function(article){
							console.log(article);
							$scope.title = article.title.split(' ');
							$scope.summary = article.summary.split(' ');
							$scope.byline = article.byline;
							$scope.content = article.content;
							$scope.show = true;
							$scope.url = "";
						})
						.error(function(error){
							console.log(error);
						});
				};
			};
		};

		$scope.changeShow = function(){
			$scope.show = !$scope.show;
		};

		$scope.wordDef = function(word){
			$scope.defPointer = 0;
			var symbols = [".", ",", "?", "!", "s", "'", ":"]
			if (symbols.indexOf(word[word.length-1]) !== -1){
				if (word[word.length-2] === "'"){
					word = word.slice(0, -2);
				} else {
					word = word.slice(0, -1);
				};
			};
			word = word.toLowerCase();
			word = {word: word};
			$http.post("/api/articles/word/definition", word)
				.success(function(wordObj){
					console.log(wordObj);
					$scope.wordObj = wordObj;
				})
				.error(function(error){
					$scope.message = error;
				});
		};

		$scope.showDef = function(def){
			if ($scope.defPointer === $scope.wordObj.indexOf(def)){
				return true;
			} else {
				return false;
			}
		};

		$scope.next = function(){
			if ($scope.defPointer === $scope.wordObj.length-1){
				return;
			}
			$scope.defPointer++;
		};

		$scope.back = function(){
			if ($scope.defPointer === 0){
				return;
			}
			$scope.defPointer--;
		};
  });