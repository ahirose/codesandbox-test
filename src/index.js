// /**
//  *
//  *
//  */

// var val1 = "aaa";

// let val2 = "bbb";

// val1 = "ccc";
// val2 = "ddd";

// var val1 = "aaa";
// //let val2="bbb";

// console.log(val1);
// console.log(val2);

// const val4 = {
//   name: "aaa",
//   age: 222
// };

// val4.age = 111;
// val4.aaa = "123";
// console.log(val4);

// const val5 = ["dog", "bird"];
// val5.push("cat");
// console.log(val5);

// //template

// const name = "oreore";
// const age = 111;
// const message1 = "my name is " + name + ", my age is " + age;
// console.log(message1);

// const message2 = `myname is ${name}, age is ${age}`;
// console.log(message2);

// //arrow

// function func1(str) {
//   return str;
// }

// console.log(func1("1123"));

// const func2 = function (str) {
//   return str;
// };

// const func3 = (str) => str;

// console.log(func3(12334343));

// const func4 = (a, b) => a + b;

// console.log(func4(1, 2));

// //sepalated parameter

// const myProfile2 = {
//   name2: "あああああ",
//   age2: 1113
// };

// const { age2, name2 } = myProfile2;

// const message3 = `name2 is ${name2}, age2 is ${age2}`;

// console.log(message3);

// const myProfile3 = ["NNAAMME", 123];

// const [name3, age3] = myProfile3;

// const message4 = `name is ${name3}, age is ${age3}`;

// console.log(message4);

//spread

//array
// const arr1 = [100, 2];
// console.log(...arr1);

// const sumFunc = (n1, n2) => console.log(n1 + n2);

// sumFunc(...arr1);

// gathering

// const arr2 = [1, 2, 3, 4, 5];

// const [n1, n2, ...arr3] = arr2;

// //copy array
// const [...arr4] = arr2;
// const arr5 = [...arr2];
// const arr6 = arr2; //deep copy
// const arr7 = [...arr2,...arr3];
// const arr8=arr2+arr3; //act as string

// arr6[0]=999;
// console.log("-----");
// console.log(arr2);
// console.log(arr4);
// console.log(arr5);
// console.log(arr6);
// console.log(arr7);
// console.log(arr8);
