import '../imports/api/_old/fixtures'
import '../imports/api/_old/methods'
import '../imports/api/_old/publications'
import { Meteor } from 'meteor/meteor';
import { Accounts} from "meteor/accounts-base";

const USERNAME = 'Admin';
const PASSWORD = 'Admin';

Meteor.startup(() => {
    if (!Accounts.findUserByUsername((USERNAME))) {
        Accounts.createUser({
            username: USERNAME,
            password: PASSWORD
        });
    }
})
