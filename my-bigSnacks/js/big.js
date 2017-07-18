/**
 * Created by lb on 2017/6/15.
 */

var app = angular.module('big', ['ionic']);

//自定义服务
app.service('$bigHttp',
  ['$http', '$ionicLoading',
    function ($http, $ionicLoading) {
      //url:请求的地址和参数 handleSucc:成功之后的处理函数
      this.sendRequest = function (url, handleSucc) {
        $ionicLoading.show({template: 'loading...'});
        $http
          .get(url)
          .success(function (data) {
            $ionicLoading.hide();
            handleSucc(data);
          })
      }

    }]);

//配置状态
app.config(
  function ($stateProvider,
            $ionicConfigProvider,
            $urlRouterProvider) {

    //调整tabs固定在底部（无论是在哪个平台）
    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider
      .state('bigStart', {
        url: '/bigStart',
        templateUrl: 'tpl/start.html'
      })
      .state('bigMain', {
        url: '/bigMain',
        templateUrl: 'tpl/main.html',
        controller: 'MainCtrl'
      })
      .state('bigDetail', {
        url: '/bigDetail/:id',
        templateUrl: 'tpl/detail.html',
        controller: 'DetailCtrl'
      })
      .state('bigOrder', {
        url: '/bigOrder/:cartDetail/:price',
        templateUrl: 'tpl/order.html',
        controller: 'OrderCtrl'
      })
      .state('bigMyOrder', {
        url: '/bigMyOrder',
        templateUrl: 'tpl/myOrder.html',
        controller: 'myOrderCtrl'
      })
      .state('bigCart', {
        url: '/bigCart',
        templateUrl: 'tpl/cart.html',
        controller: 'cartCtrl'
      });

    $urlRouterProvider.otherwise('/bigStart');

  });

//创建一个父控制器--定义公用跳转函数
app.controller('parentCtrl', ['$scope', '$state',
  function ($scope, $state) {

    $scope.jump = function (desState, arg) {
      $state.go(desState, arg);
    }
  }
]);

app.controller('MainCtrl', ['$scope', '$bigHttp',
  function ($scope, $bigHttp) {
    $scope.hasMore = true;
    $scope.dishList = [];
    $scope.judge= true;
    $scope.noData= true;
    //加载首页数据
    $scope.loadStart=function(){
      $bigHttp.sendRequest(
          'data/dish_getbypage.php',
          function (data) {
            console.log(data);
            $scope.dishList = data;
          });
    };
    //给按钮定义一个处理函数：加载更多数据
    $scope.loadMore = function () {
        $bigHttp.sendRequest(
            'data/dish_getbypage.php?start=' + $scope.dishList.length,
            function (data) {
              if (data.length < 5) {
                $scope.hasMore = false;
              }
              $scope.dishList = $scope.dishList.concat(data);
              $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        )
    };
    //ng-model 方向2的绑定
    $scope.inputTxt = {kw: ''};
    //监听用户输入 的关键词进行搜索
    $scope.$watch('inputTxt.kw', function () {
      $bigHttp.sendRequest(
        'data/dish_getbykw.php?kw=' + $scope.inputTxt.kw,
        function (data) {
          if (data.length > 0) {
            $scope.dishList = data;
            $scope.judge= false;
            $scope.noData= true;
          }else if(!$scope.inputTxt.kw){
            $scope.loadStart();
            $scope.judge= true;
            $scope.noData= true;
          }else{
            $scope.judge= false;
            $scope.noData= false;
          }
        }
      )
    });
    $scope.loadStart();
  }
]);

app.controller('DetailCtrl',
  ['$scope', '$bigHttp', '$stateParams', '$ionicPopup',
    function ($scope, $bigHttp, $stateParams, $ionicPopup) {
      console.log($stateParams);
      //定义方法，更新购物车信息
      $scope.addToCart = function () {
        //与服务器端通信
        $bigHttp.sendRequest(
          'data/cart_update.php?uid=1&did=' + $stateParams.id + "&count=-1",
          function (result) {
            console.log(result);
            //  将添加都购物车的结果弹窗显示
            $ionicPopup.alert({
              template: '添加到购物车成功'
            })
          }
        )
      };
      //发起网络请求，取指定id的详情信息并显示在视图
      $bigHttp.sendRequest(
        'data/dish_getbyid.php?id=' + $stateParams.id,
        function (data) {
          console.log(data);
          $scope.dish = data[0];
        }
      )
    }
  ]);

app.controller('OrderCtrl',
  ['$scope', '$bigHttp', '$stateParams', '$httpParamSerializerJQLike',
    function ($scope, $bigHttp, $stateParams, $httpParamSerializerJQLike) {
      $scope.order = {
        userid:1,
        totalprice:$stateParams.price,
        cartDetail: $stateParams.cartDetail
      };
      $scope.confirmOrder = function(){
        console.log(123321);
        var msg = $httpParamSerializerJQLike($scope.order);
        $scope.orderSucc = false;

        $bigHttp.sendRequest('data/order_add.php?'+msg,function(data){
          if(data.length>0){
            console.log(data);
            if(data[0].msg == 'succ'){
              $scope.orderSucc = true;
              $scope.result = '下单成功，订单编号为：' + data[0].oid;
              $scope.oid = data[0].oid;
            }
            else{
              $scope.result = '下单失败。';
            }
          }
        })

      }
    }
  ]);

app.controller('myOrderCtrl', ['$scope', '$bigHttp',
  function ($scope, $bigHttp) {
    var userPhone = sessionStorage.getItem('phone');
    $bigHttp
      .sendRequest(
      'data/order_getbyuserid.php?userid=1',
      function (result) {
        console.log(result);
        $scope.orderList = result.data;
      }
    )
  }
]);

app.controller('cartCtrl', ['$scope', '$bigHttp',
  function ($scope, $bigHttp) {
    $scope.editEnable = false;
    $scope.editText = '编辑';
    $scope.cart = [];//购物车对象数组
    $scope.toggleEdit = function () {
      $scope.editEnable = !$scope.editEnable;
      if ($scope.editEnable) {
        $scope.editText = '完成'
      }
      else {
        $scope.editText = '编辑'
      }
    };
    //请求服务器端，读取指定用户的购物车的数据
    $bigHttp.sendRequest(
      'data/cart_select.php?uid=1',
      function (result) {
        console.log(result);
        $scope.cartList = result.data;
        $scope.cal();
      }
    );

    function update(did, count) {
      $bigHttp.sendRequest(
        'data/cart_update.php?uid=1&did=' + did + "&count=" + count,
        function (result) {
          console.log(result);
        }
      )
    }

    $scope.minus = function (index) {
      //将产品的数据减1
      var dish = $scope.cartList[index];
      if (dish.dishCount == 1) {
        return
      }
      else {
        dish.dishCount--;
        update(dish.did, dish.dishCount);
        $scope.cal();
      }
    };

    $scope.add = function (index) {
      //将产品的数据加1
      var dish = $scope.cartList[index];
      console.log(dish);
      dish.dishCount++;
      update(dish.did, dish.dishCount);
      $scope.cal();
    };

    $scope.cal = function(){
      $scope.total = 0;
      for(var key in $scope.cartList){
        $scope.total += $scope.cartList[key].dishCount * $scope.cartList[key].price;
      }
    };

    $scope.jumpToOrder = function(){
      //json格式的序列化,转化为json格式
      var detail = angular.toJson($scope.cartList);
      $scope.jump('bigOrder',{cartDetail:detail,price:$scope.total});
    };
  }
]);






