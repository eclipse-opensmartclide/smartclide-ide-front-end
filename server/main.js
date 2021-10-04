import '../imports/api/_old/fixtures'
import '../imports/api/_old/methods'
import '../imports/api/_old/publications'
import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";

const users = [
    {
        username: 'Admin',
        password: 'Admin'
    }
];

Meteor.startup(() => {
    users.forEach(user => {
        if (!Accounts.findUserByUsername(user.username)) {
            Accounts.createUser(user);
        }
    });
})
