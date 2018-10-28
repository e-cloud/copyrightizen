/**
 * Copyright (C) xxx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by John Doe <jdoe@heaven.com>, 1984
 *
 * From https://softwareengineering.stackexchange.com/a/68150/266765
 */

class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);

// from https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#classes
