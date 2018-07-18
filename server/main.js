import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import '../imports/api/user';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  // code to run on server at startup

    WebApp.connectHandlers.use((req, res, next) => {
        const _id = req.url.slice(1);
        const link = Links.findOne({_id});
        debugger;
        if (link) {
            let url = 'http://www.google.com';
            res.statusCode = 302;
            res.setHeader('Location' ,link.url);
            res.end();
            Meteor.call('links.trackVisited', _id);
        }else {
            next();
        }

    });

});
