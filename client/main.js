import { Meteor } from "meteor/meteor";
import { Tracker } from 'meteor/tracker';
import { Session }from 'meteor/session';
import React from "react";
import ReactDOM from 'react-dom';
import { AppRouter, onAuthChanged } from '.././imports/routes/AppRouter';

import '../imports/startup/simple-schema-configuration';
import './main.html';

Tracker.autorun(()  => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChanged(isAuthenticated);
});

Meteor.startup(() => {
    Session.set('showVisible', true);
    ReactDOM.render(<AppRouter />, document.getElementById("app"));
})


