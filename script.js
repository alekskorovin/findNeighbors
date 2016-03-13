var findNeighbors = (function (findNeighbors) {

    var that = findNeighbors;

    that.createOriginalArray = function(numbers, squareSize) {
        var originalArray = new Array(squareSize);
        for (var i = 0; i < squareSize; i++) {
            originalArray[i] = new Array(squareSize);
        }
        for(var i = 0; i < squareSize; i++) {
            for(var j = 0; j < squareSize; j++) {
                originalArray[j][i] = numbers[j + squareSize * i];
            }
        }
        return originalArray;
    };

    that.equalItems = [];

    that.neighborsItems = [];

    that.getAllEqualItemsFromArray = function() {
        for(var i = 0; i < that.squareSize; i++) {
            for(var j = 0; j < that.squareSize; j++) {
                if(that.array2d[j][i] === that.targetNumber) {
                    that.equalItems.push({ x: j, y: i});
                }
            }
        }
    };

    that.markNeighbors = function(neighbors) {
        that.equalItems.forEach(function(item){
            var x = item.x;
            var y = item.y;
            if(item.neighbor !== true && (
                    (neighbors[0].x === x && neighbors[0].y === y) ||
                    (neighbors[1].x === x && neighbors[1].y === y) ||
                    (neighbors[2].x === x && neighbors[2].y === y) ||
                    (neighbors[3].x === x && neighbors[3].y === y)
                )
            ) {
                item.neighbor = true;
                that.generateNeighborsForItem(x, y);
            }
        });
    };

    that.generateNeighborsForItem = function(x, y) {
        var topNeighbor = {
            x: x,
            y: y - 1
        };
        var leftNeighbor = {
            x: x - 1,
            y: y
        };
        var bottomNeighbor = {
            x: x,
            y: y + 1
        };
        var rightNeighbor = {
            x: x + 1,
            y: y
        };
        var neighbors = [topNeighbor, leftNeighbor, bottomNeighbor, rightNeighbor];
        that.markNeighbors(neighbors);
    };

    that.getOnlyNeighbors = function() {
        var initIndex;
        that.equalItems.forEach(function(item, i){
            if(item.x === that.targetX && item.y === that.targetY) {
                initIndex = i;
                item.neighbor = true;
            }
        });
        that.generateNeighborsForItem(that.targetX, that.targetY);
        that.equalItems.forEach(function(item){
            if(item.neighbor === true) {
                delete item.neighbor;
                that.neighborsItems.push(item);
            }
        });
    };

    that.getNeighbors = function (numbers, cellXY) {
        that.squareSize = Math.sqrt(String(numbers).length);
        that.targetX = cellXY.x;
        that.targetY = cellXY.y;
        that.array2d = that.createOriginalArray(numbers, that.squareSize);
        that.targetNumber = that.createOriginalArray(numbers, that.squareSize)[cellXY.x][cellXY.y];
        that.getAllEqualItemsFromArray();
        that.getOnlyNeighbors();
        return that.neighborsItems;
    };

    return that;

}(findNeighbors || {}));

var numbers = '0112592471115849461150781161382116525288139490034';
var cellXY = {
    x: 4,
    y: 1
};

console.log(findNeighbors.getNeighbors(numbers, cellXY));
