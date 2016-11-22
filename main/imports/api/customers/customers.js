import faker from 'faker';

import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import { _ } from 'meteor/underscore';

import { Factory } from 'meteor/dburles:factory';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { KIND_CHOICES } from '/imports/api/integrations/constants';
import { Brands } from '/imports/api/brands/brands';
import { Tags } from '/imports/api/tags/tags';

const inAppMessagingSchema = new SimpleSchema({
  lastSeenAt: {
    type: Date,
    optional: true,
  },

  sessionCount: {
    type: Number,
    defaultValue: 0,
  },

  isActive: {
    type: Boolean,
    defaultValue: false,
  },

  customData: {
    type: Object,
    blackbox: true,
    optional: true,
  },
});

const schema = new SimpleSchema({
  name: {
    type: String,
    optional: true,
  },

  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true,
  },

  brandId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },

  createdAt: {
    type: Date,
  },

  // from in app, twitter, facebook etc...
  source: {
    type: String,
    allowedValues: KIND_CHOICES.ALL_LIST,
  },

  // in app messaging data
  inAppMessagingData: {
    type: inAppMessagingSchema,
    optional: true,
  },
});

class CustomersCollection extends Mongo.Collection {
  insert(doc, callback) {
    const customer = _.extend({ createdAt: new Date() }, doc);

    return super.insert(customer, callback);
  }

  remove(selector, callback) {
    const customers = this.find(selector).fetch();

    const result = super.remove(selector, callback);

    // remove tags
    let removeIds = [];

    customers.forEach((obj) => {
      removeIds.push(obj.tagIds || []);
    });

    removeIds = _.uniq(_.flatten(removeIds));
    Tags.update({ _id: { $in: removeIds } }, { $inc: { objectCount: -1 } });

    return result;
  }
}

// collection
export const Customers = new CustomersCollection('customers');

Customers.attachSchema(schema);

// collection helpers
Customers.helpers({
  brand() {
    return Brands.findOne(this.brandId);
  },

  getInAppMessagingCustomData() {
    const results = [];
    const data = this.inAppMessagingData.customData || {};

    _.each(_.keys(data), (key) => {
      results.push({
        name: key.replace(/_/g, ' '),
        value: data[key],
      });
    });

    return results;
  },
});

Customers.TAG_TYPE = 'customer';

Customers.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Customers.publicFields = {
  name: 1,
  email: 1,
  brandId: 1,
  createdAt: 1,
  source: 1,
  inAppMessagingData: 1,
  tagIds: 1,
};

Factory.define('customer', Customers, {
  email: () => faker.internet.email(),
  brandId: () => Random.id(),
  source: KIND_CHOICES.IN_APP_MESSAGING,
  inAppMessagingData: {},
});
