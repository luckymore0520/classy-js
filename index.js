module.exports = 
function Class(configure, parent){
    var initialize = configure.initialize;

    function classFunction(){
        if (initialize) {
            initialize.apply(this,arguments)
        }
    }
    if (parent) {
        for (var key in parent.prototype) {
            classFunction.prototype[key] = parent.prototype[key]; 
        }
        classFunction.prototype.__proto__ = parent.prototype;
        classFunction.__super__ = parent;
        var recursiveSuperClass = classFunction;
        classFunction.prototype.super = function(){
            parentFunctionName = arguments[0];
            parentFunction = recursiveSuperClass.prototype.__proto__[parentFunctionName];
            count = arguments.length;
            var i = 0;
            for (; i < count - 1; i++) {
                arguments[i] = arguments[i+1];
            }
            arguments[i] = undefined;
            superClass = recursiveSuperClass.__super__;
            if (superClass.prototype.__proto__[parentFunctionName]) {
                recursiveSuperClass = superClass;
            } else {
                recursiveSuperClass = classFunction;
            }
            return parentFunction.apply(this,arguments); 
        }
    } else {
        classFunction.__super__ = Object;
    }
    for(var key in configure){ 
        if(typeof(configure[key])=="function"){ 
            if (key != "initialize") {
                classFunction.prototype[key] = configure[key]
            }
        }
    } 
    return classFunction;
}



// const A = Class({
//   foo: function(n) {
//     return n + n;
//   }
// });

// const B = Class({
//   foo: function(n) {
//     return this.super("foo", n * n);
//   }
// }, A);
// const b = new B();
// console.log(b.foo(2))
// console.log(b.foo(2))

// const C = Class({
//   foo: function(n) {
//     return this.super("foo", n * 10);
//   }
// }, B);

// const c = new C();
// console.log(c.foo(1))
// console.log(c.foo(1))

// const A = Class({
//   foo: function(a, b) {
//     return [this.n, a, b];
//   }
// });

// const B = Class({
//   foo: function(a, b) {
//     return this.super("foo", a*10, b*100);
//   }
// }, A);

// const b = new B();
// b.n = 1;
// console.log(b.foo(2, 3));
// => [1, 20, 300]

// var A = Class({
//     a: function() {
//       return 1;
//     }
//   });

//   var B = Class({
//     b: function() {
//       return 2;
//     }
//   }, A);

// console.log(B.__super__);
// console.log(A)
// console.log(A.__super__);
// console.log(Object);

// const A = Class({
//   a: function() {
//     return 1;
//   }
// });

// const B = Class({
//   b: function() {
//     return 2;
//   }
// }, A);

// var a = new A();
// console.log(a.a());
// // => 1
// console.log(a.b);
// // undefined

// var b = new B();

// console.log(b.a());
// // => 1
// console.log(b.b());
// // => 2

// console.log(A.__super__);
// console.log(B.__super__);