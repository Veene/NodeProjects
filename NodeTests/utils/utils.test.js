const utils = require('./utils');
const expect = require('expect');

describe('Utils', () => {
    describe('#add', () => {
        it('should add two numbers', () => {
            var res = utils.add(33,11);

            expect(res).toBe(44).toBeA('number');   
        });
    })
    

it('should square a number', () => {
        var res = utils.square(4);
        expect(res).toBe(16).toBeA('number');
    });
});



it('should expect some values', () => {
    // expect(12).toNotBe(11)
    // expect({name:'Andrew'}).toEqual({name:'Andrew'})
    // expect([2,3,4]).toInclude(4)
    // expect([2,3,4]).toExclude(1)
    expect({
        name: 'john',
        age:25,
        location: 'Toronto'
    }).toInclude({
        age:25
    })
})

it('should verify first and last names are set', () => {
    var user = {student: 'yes'}
    var res = utils.setName({}, 'john pawlak')
    expect({
        firstName: 'john',
        lastName: 'pawlak',
    })
})

it('should async add two number', (done) => {
    utils.asyncAdd(4, 3, (sum) => {
        expect(sum).toBe(7).toBeA('number')
        done();
    })
})
it('should async square a number', (done) => {
    utils.asyncSquare(3,(sum) => {
        expect(sum).toBe(9).toBeA('number')
        done();
    })
})