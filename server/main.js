import '../imports/api/_old/fixtures'
import '../imports/api/_old/methods'
import '../imports/api/_old/publications'
import { Meteor } from 'meteor/meteor';
import { Accounts} from "meteor/accounts-base";

const USERNAME = 'pedro';
const PASSWORD = 'pedro';

Meteor.startup(() => {
    if (!Accounts.findUserByUsername((USERNAME))) {
        Accounts.createUser({
            username: USERNAME,
            password: PASSWORD
        });
    }else{
        console.log("Account found! ", USERNAME)
    }
})
