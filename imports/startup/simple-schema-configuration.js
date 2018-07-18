import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform(error => {
    return meteorError = new Meteor.Error(400, error.message);
});