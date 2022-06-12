
//vraća true ako je true, inace vraca false
if(typeof Number.isInteger === "undefined") Number.prototype.isInteger = function(x) { return x % 1 === 0;};
//Inserta string u drugi string kod specificiranog indexa
String.prototype.insert = function(index, string) {
  if(index > 0)
    return this.toString().substring(0, index) + string + this.toString().substring(index, this.toString().length);
  else
    return string + this.toString();
};
//ponavlja string n-broj puta
if(typeof String.repeat === "undefined") {
	String.prototype.repeat = function(x) {
		var temp = "";
		for(var i=0;i<x;i++) temp += this.toString();
		return temp;
	};
}
//Vraća true ako string započinje sa navedenim stringom, inače false
if(typeof String.startsWith === "undefined") {
	String.prototype.startsWith = function(str) {
		if(this.toString().substring(0,str.length) === str) return true;
		else return false;
	};
}
//Vraća true ako string završava sa navedenim stringom, inače false
if(typeof String.endsWith === "undefined") {
	String.prototype.endsWith = function(str) {
		if(this.toString().substring(this.toString().length - str.length, this.toString().length) === str) return true;
		else return false;
	};
}
//Vraća true ako string sadrži navedeni string, inače false
if(typeof String.includes === "undefined") {
	String.prototype.includes = function(str) {
		if(this.toString().indexOf(str) >= 0) return true;
		else return false;
	};
}
Number.prototype.intToBinary = function() {
	var binary = parseInt(this, 10).toString(2);
	return "0".repeat(8 - binary.length) + binary;
};
String.prototype.binaryToInt = function() {
	return parseInt(this.toString(), 2);
};
function intToBinary(int){
    var binStr = parseInt(int, 10).toString(2);
	binStr = "0".repeat(8 - binStr.length) + binStr;
	return binStr;
}
function binaryToInt(bin) {
	return parseInt(bin, 2);
}

var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope){
	$scope.oct0 = 0;
	$scope.oct1 = 0;
	$scope.oct2 = 0;
	$scope.oct3 = 0;
	$scope.prefix = 24;
  $scope.brU = 0;

	$scope.class = function() {
		if($scope.oct0 >= 0 && $scope.oct0<= 127) return "A";
		else if($scope.oct0 >= 128 && $scope.oct0 <= 191) return "B";
		else if($scope.oct0 >= 192 && $scope.oct0 <= 223) return "C";
    else if($scope.oct0 >= 224 && $scope.oct0 <= 239) return "D";
    else if($scope.oct0 >= 240 && $scope.oct0 <= 255) return "E";
    else return "";
	};



	$scope.IPBinary = function() {
		var ipBin = [
			intToBinary($scope.oct0 ? $scope.oct0 : 0),
			intToBinary($scope.oct1 ? $scope.oct1 : 0),
			intToBinary($scope.oct2 ? $scope.oct2 : 0),
			intToBinary($scope.oct3 ? $scope.oct3 : 0)
		];
		return ipBin.join(".");
	};

	$scope.subnetBinary = function() {
		var subnetBin = "1".repeat($scope.prefix);
		subnetBin += "0".repeat(32 - subnetBin.length);
		subnetBin = subnetBin.insert(8, ".").insert(17, ".").insert(26, ".");
		return subnetBin;
	};
	$scope.networkAddress = function() {
		var netBin = "";
		for(var i=0;i<35;i++){
			if($scope.IPBinary()[i] == $scope.subnetBinary()[i]){
				netBin += $scope.IPBinary()[i];
			} else {
				netBin += "0";
			}
		}

		$scope.networkBinary = netBin;
		var net = netBin.split(".");
		net[0] = binaryToInt(net[0]);
		net[1] = binaryToInt(net[1]);
		net[2] = binaryToInt(net[2]);
		net[3] = binaryToInt(net[3]);
		return net.join(".");
	};

  $scope.firsthost = function() {

     var fh = "";
     for(var i=0;i<35;i++){
       if($scope.IPBinary()[i] == $scope.subnetBinary()[i]){
        fh += $scope.IPBinary()[i];
       } else {
         fh += "0";
       }
     }


     var frh = fh.split(".");
     frh[0] = binaryToInt(frh[0]);
     frh[1] = binaryToInt(frh[1]);
     frh[2] = binaryToInt(frh[2]);
     frh[3] = binaryToInt(frh[3])+1;
     return frh.join(".");

  };

  $scope.fhbinary = function () {
    var fh = "";
    for(var i=0;i<35;i++){
      if($scope.IPBinary()[i] == $scope.subnetBinary()[i]){
       fh += $scope.IPBinary()[i];
      } else {
        fh += "0";
      }
    }
    if($scope.oct1 == 0){
      return "00000000.00000000.00000000.00000000"
    }
    else{
    return fh+1;
    }

  };
  $scope.lasthost = function() {
    var subnetBin = "1".repeat($scope.prefix);
    subnetBin += "0".repeat(32 - subnetBin.length);
    subnetBin = subnetBin.insert(8, ".").insert(17, ".").insert(26, ".");

    var test = subnetBin.split(".");
    test[0] = binaryToInt(test [0]);
    test[1] = binaryToInt(test [1]);
    test[2] = binaryToInt(test [2]);
    test[3] = binaryToInt(test [3]);

    var lh = "";
    for(var i=0;i<35;i++){
      if($scope.IPBinary()[i] == $scope.subnetBinary()[i]){
       lh += $scope.IPBinary()[i];
      } else {
        lh += "0";
      }
    }


    var lah = lh.split(".");
    lah[0] = binaryToInt(lah[0]);
    lah[1] = binaryToInt(lah[1]);
    lah[2] = binaryToInt(lah[2]);
    lah[3] = binaryToInt(lah[3])+1;

    var prvi,drugi,treci,cet;
    var broj1,broj2,broj3,broj4;
    var prvihelp,drugihelp,trecihelp,cethelp;

    broj1 = parseInt($scope.oct0);
    broj2 = parseInt($scope.oct1);
    broj3 = parseInt($scope.oct2);
    broj4 = parseInt($scope.oct3);

      // prvi
    if (test[0] == 255){
        prvi = broj1;
      }
      else if(test[0] == 0){
        prvi = 255;
      }
      else if(test[0] != 0 && test[0] != 255){
            prvihelp = 256 - test[0];

            for(var i = 1; i < 100; i++){

              if(prvihelp > broj1){
                prvi = lah[0]+prvihelp-1;
                break;

              }
              if(prvihelp <= broj1){
                prvi = lah[0]+prvihelp-1;
                break;
              }
            }
      }
      // drugi
    if (test[1] == 255){
        drugi = broj2;
      }
      else if(test[1] == 0){
        drugi = 255;
      }
      else if(test[1] != 0 && test[1] != 255){
            drugihelp = 256 - test[1];

            for(var i = 1; i < 100; i++){

              if(drugihelp >= broj2){
                drugi = lah[1]+drugihelp-1;
                break;

              }
              if(drugihelp <= broj2){
                drugi = lah[1]+drugihelp-1;
                break;
              }
            }
      }
      // treci
    if (test[2] == 255){
        treci = broj3;
      }
      else if(test[2] == 0){
        treci = 255;
      }
      else if(test[2] != 0 && test[2] != 255){
            trecihelp = 256 - test[2];

            for(var i = 1; i < 100; i++){

              if(trecihelp >= broj3){
                treci = lah[2]+trecihelp-1;
                break;

              }
              if(trecihelp < broj3){
                treci = lah[2]+trecihelp-1;
                break;
              }
            }
      }
      //cet
    if (test[3] == 255){
        cet = broj4;
      }
      else if(test[3] == 0){
        cet = 255;
      }
      else if(test[3] != 0 && test[3] != 255){
            cethelp = 256 - test[3];

            for(var i = 1; i < 100; i++){

              if(cethelp > broj4){
                cet = lah[3]+cethelp-1;
                break;

              }
              if(cethelp <= broj4){
                cet = lah[3]+cethelp-1;
                break;
              }
            }
      }


    var zadnji = cet-1;





      return prvi+"."+drugi+"."+treci+"."+zadnji;


  };
  $scope.BroadcastAddress = function () {
    var subnetBin = "1".repeat($scope.prefix);
    subnetBin += "0".repeat(32 - subnetBin.length);
    subnetBin = subnetBin.insert(8, ".").insert(17, ".").insert(26, ".");

    var test = subnetBin.split(".");
    test[0] = binaryToInt(test [0]);
    test[1] = binaryToInt(test [1]);
    test[2] = binaryToInt(test [2]);
    test[3] = binaryToInt(test [3]);

    var lh = "";
    for(var i=0;i<35;i++){
      if($scope.IPBinary()[i] == $scope.subnetBinary()[i]){
       lh += $scope.IPBinary()[i];
      } else {
        lh += "0";
      }
    }


    var lah = lh.split(".");
    lah[0] = binaryToInt(lah[0]);
    lah[1] = binaryToInt(lah[1]);
    lah[2] = binaryToInt(lah[2]);
    lah[3] = binaryToInt(lah[3])+1;

   var prvi,drugi,treci,cet;
   var broj1,broj2,broj3,broj4;
    var prvihelp,drugihelp,trecihelp,cethelp;

    broj1 = parseInt($scope.oct0);
    broj2 = parseInt($scope.oct1);
    broj3 = parseInt($scope.oct2);
    broj4 = parseInt($scope.oct3);

      // prvi
    if (test[0] == 255){
        prvi = broj1;
      }
      else if(test[0] == 0){
        prvi = 255;
      }
      else if(test[0] != 0 && test[0] != 255){
            prvihelp = 256 - test[0];

            for(var i = 1; i < 100; i++){

              if(prvihelp > broj1){
                prvi = lah[0]+prvihelp-1;
                break;

              }
              if(prvihelp <= broj1){
                prvi = lah[0]+prvihelp-1;
                break;
              }
            }
      }
      // drugi
    if (test[1] == 255){
        drugi = broj2;
      }
      else if(test[1] == 0){
        drugi = 255;
      }
      else if(test[1] != 0 && test[1] != 255){
            drugihelp = 256 - test[1];

            for(var i = 1; i < 100; i++){

              if(drugihelp >= broj2){
                drugi = lah[1]+drugihelp-1;
                break;

              }
              if(drugihelp <= broj2){
                drugi = lah[1]+drugihelp-1;
                break;
              }
            }
      }
      // treci
    if (test[2] == 255){
        treci = broj3;
      }
      else if(test[2] == 0){
        treci = 255;
      }
      else if(test[2] != 0 && test[2] != 255){
            trecihelp = 256 - test[2];

            for(var i = 1; i < 100; i++){

              if(trecihelp >= broj3){
                treci = lah[2]+trecihelp-1;
                break;

              }
              if(trecihelp < broj3){
                treci = lah[2]+trecihelp-1;
                break;
              }
            }
      }
      //cet
    if (test[3] == 255){
        cet = broj4;
      }
      else if(test[3] == 0){
        cet = 255;
      }
      else if(test[3] != 0 && test[3] != 255){
            cethelp = 256 - test[3];

            for(var i = 1; i < 100; i++){

              if(cethelp > broj4){
                cet = lah[3]+cethelp-1;
                break;

              }
              if(cethelp <= broj4){
                cet = lah[3]+cethelp-1;
                break;
              }
            }
      }









      return prvi+"."+drugi+"."+treci+"."+cet;

  };


  $scope.prjv = function(){
    if($scope.oct0 == 10) return "Privatna adresa";
    else if ($scope.oct0 == 172 && $scope.oct1 >=16 && $scope.oct1 <= 31) return "Privatna adresa";
    else if ($scope.oct0 == 192 && $scope.oct1 == 168) return "Privatna adresa";

    else return "Javna adresa";
  };
  $scope.wildcard = function() {

    var subnetBin = "0".repeat($scope.prefix);
    subnetBin += "1".repeat(32 - subnetBin.length);
    subnetBin = subnetBin.insert(8, ".").insert(17, ".").insert(26, ".");

    var test = subnetBin.split(".");
    test[0] = binaryToInt(test [0]);
    test[1] = binaryToInt(test [1]);
    test[2] = binaryToInt(test [2]);
    test[3] = binaryToInt(test [3]);

    return test.join(".");







  };
  $scope.disabled = function () {
    if($scope.oct0 >= 224 && $scope.oct0 <= 239)
    {
      return "Disabled";
    }
    else {
      var mask = "1".repeat($scope.prefix);
      mask += "0".repeat(32-mask.length);
      mask = mask.replace(/\s*[01]{8}\s*/g, function(mask) {return parseInt(mask, 2).toString() + ".";});
      return mask.substring(0, mask.length-1)
    }

  }


});
