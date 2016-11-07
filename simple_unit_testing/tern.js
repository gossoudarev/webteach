var tern = function(x){ return isNaN(x) ? (x!=x ? "NaN" :  (undefined===x ? "undefined" : (isNaN(x) ? "NaN" : "qqq"   )  )  ) : (x === 0? "number" :  ( isNaN(parseInt(x)) ? "NaN" : "number"  ) )  }

module.exports = tern;