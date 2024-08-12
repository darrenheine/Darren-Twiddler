var students = [
  {
    name: "Jack",
    age: 19,
    hometown: "Atlanta",
  },
  {
    name: "Kyle",
    age: 24,
    hometown: "Buffalo",
  },
  {
    name: "Jane",
    age: 19,
    hometown: "Miami",
  },
  {
    name: "Kayla",
    age: 19,
    hometown: "Miami",
  },
];

//1. create a function called groupStudents that takes in an
// array and a tester callback function

//the function should return an array of the names of people
//who pass the test
const groupStudents = (array, callback) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      result.push(array[i].name);
    }
  }
  return result;
};

//2. call the function with the students array and a function
//that will test if the object's name starts with the letter k
// (set the function call to studentsWithK variable)

// after calling the function you should get back [Kyle, Kayla]

let studentsWithK = groupStudents(
  students,
  (student) => student.name[0] === "K"
);

//3. Use reduce to put the hometowns from the students into
//a string. There should be no repeating hometowns

var hometowns = students.reduce(function (acc, curr, i, coll) {}, "");

console.log(hometowns);

//hometowns ==> "Atlanta Buffalo Miami"

//4. make a function called age19Count that takes in an array
// Use recursion to return the count of objects that has an age of 19

function age19Count(array) {
  let num = 0;
  if (array.length === 0) {
    return num;
  }
  if (array[0].age === 19) {
    num += 1;
  }
  return age19Count(array.slice(1), num);
}

console.log(age19Count(students)); //==> 3

//5. Use higher Order Functions filter and map to get all of the students
//that are 19 and their hometown is Miami

var miamiAnd19 = students
  .filter((student) => student.age === 19 && student.hometown === "Miami")
  .map((student) => student.name);

console.log(miamiAnd19); //==> [Jane, Kayla]

// 6. Use the higher order function forEach to print each name from the students array

//7 Create the each function

const each = (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
};

//8 Create the filter function using each

const filter = (array, callback) => {
  let result = [];
  each(array, (element) => {
    if (callback(element)) {
      result.push(element);
    }
  });
  return result;
};
