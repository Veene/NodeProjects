//node inspect (FILENAME)
//debugger allows you to use C in debug to jump to the break point
// use n for next line
// when wanting to inspect any object list etc -> go into 'repl' READ EVALUATE PRINT LOOP
//CHOME DEV: node --inspect-brk FILENAME

var person = {
    name: 'John'
}

person.age = 25;

debugger;

person.name = 'Mike'

console.log(person)