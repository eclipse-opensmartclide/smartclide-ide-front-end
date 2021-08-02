import { Meteor } from 'meteor/meteor';
import Workflows from '../workflows.js';

Meteor.publish('workflows', function () {
    return Workflows.find();
});
