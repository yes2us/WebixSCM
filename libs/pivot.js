var pivot = function(array,rows,cols,cells,addTotal) {

    //row bins
    var r = {};
    var c = {};
    array.forEach(function(row) {
        if (!r[row[rows]]) {
            r[row[rows]] = [];
            r[row[rows]].total = 0;
        }
        r[row[rows]].push(row);
        
        if (!c[row[cols]]) {
            c[row[cols]] = [];
            c[row[cols]].total = 0;
        }
        c[row[cols]].push(row);
    });
//console.log(JSON.stringify(r));
//console.log(JSON.stringify(c));

    var res = Object.keys(r).map(function(key) {
        var ret = {};
        ret[rows] = key;
        Object.keys(c).forEach(function(col) {
            //add all column keys
            ret[col] = r[key].filter(function(cell) {
                //with the cells matching
                return cell[cols] == col;
            });
            if (cells) {
                //reduced by the given function
                ret[col] = ret[col].reduce(cells.callback,cells.initialValue);
                //store running sums
                c[col].total += ret[col];
                r[key].total += ret[col];
            }
        });
        if (addTotal) {
            ret.total = r[key].total;
        }
        return ret;
    });

    if (addTotal) {
        var total = {};
        total[rows] = 'Total';
        total.total = 0;
        Object.keys(c).forEach(function(col) {
            total[col] = c[col].total;
            total.total += c[col].total;
        });

        res.push(total);
    }

    return res;
};

//attach and detach to array prototype
var orig;
pivot.attach = function() {
    orig = Array.prototype.pivot;
    Array.prototype.pivot = function(rows,cols,cells,addTotal) {
        return pivot(this,rows,cols,cells,addTotal);
    };
    return pivot;
};
pivot.detach = function() {
    Array.prototype.pivot = orig;
    return pivot;
};

//reducers
pivot.sum = function(field) {
    return {
        callback: function(prev,cell) {
            return parseInt((prev||0)) + parseInt(cell[field]);
        },
        initialValue: null
    };
};
pivot.count = function() {
    return {
        callback: function(prev,cell) {
            return prev + 1;
        },
        initialValue: 0
    };
};
pivot.average = function(field) {
    return {
        callback: function(prev,cell,index,array) {
            return (prev||0) + cell[field]/array.length;
        },
        initialValue: null
    };
};
pivot.min = function(field) {
    return {
        callback: function(prev,cell,index,array) {
            if (prev === null) {
                prev = Number.POSITIVE_INFINITY;
            }
            return Math.min(prev,cell[field]);
        },
        initialValue: null
    };
};
pivot.max = function(field) {
    return {
        callback: function(prev,cell,index,array) {
            if (prev === null) {
                prev = Number.NEGATIVE_INFINITY;
            }
            return Math.max(prev,cell[field]);
        },
        initialValue: null
    };
};

//https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.pivot = factory();
  }
}(this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return pivot;
}));
