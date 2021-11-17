import React from 'react';
import JSONSchemaForm from 'react-jsonschema-form';
import 'bootstrap/dist/css/bootstrap.css';
import { JSONSchema7 } from 'json-schema';

const cpvPostSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    title: {
      title: 'Business Name',
      type: 'string',
      minLength: 10,
      maxLength: 140,
      readOnly: true
    },
    location: {
      title: 'Store Location',
      type: 'string',
      pattern: '^[a-z0-9-]+$',
      readOnly: true
    },
    owned: {
      title: 'Owned / Rented',
      type: 'string',
      pattern: '^(\\+\\d{1,3}[- ]?)?\\d{10}$',
      readOnly: true
    },
    store_size: {
      title: 'Store Size',
      type: 'string',
      pattern: '[A-Z]{5}[0-9]{4}[A-Z]{1}',
      readOnly: true
    },
    total_stores: {
      title: 'Total Stores',
      type: 'string',
      readOnly: true
    },
    earning_members: {
      title: 'Total Earning Members',
      type: 'string',
      readOnly: true
    },
    monthly_income: {
      title: 'Total Monthly Income',
      type: 'string',
      readOnly: true
    },
    shop_address: {
      title: 'Shop Address',
      type: 'string',
      readOnly: true
    },
    bankEDCTerminal: {
      title: 'Bank EDC Terminal',
      type: 'string',
      readOnly: true
    },
    businessActivity: {
      title: 'Business Activity',
      type: 'string',
      readOnly: true
    },
    businessVintage: {
      title: 'Business Vintage',
      type: 'number',
      readOnly: true
    },
    documentsCheck: {
      title: 'Document Check',
      type: 'string',
      readOnly: true
    },
    firstNeighbourConfirmation: {
      title: 'First Neighbour Confirmation',
      type: 'string',
      readOnly: true
    },
    industry: {
      title: 'Industry',
      type: 'string',
      readOnly: true
    },
    neighbourCollectionAgents1: {
      title: 'Neighbour Collection Agents 1',
      type: 'string',
      readOnly: true
    },
    neighbourFeedback1: {
      title: 'Neighbour Feedback 1',
      type: 'string',
      readOnly: true
    },
    neighbourIrregularity1: {
      title: 'Neighbour Irregularity 1',
      type: 'string',
      readOnly: true
    },
    neighbourName1: {
      title: 'Neighbour Name 1',
      type: 'string',
      readOnly: true
    },
    neighbourName2: {
      title: 'Neighbour Name 2',
      type: 'string',
      readOnly: true
    },
    neighbourShopOpen1: {
      title: 'Neighbour Shop Open 1',
      type: 'string',
      readOnly: true
    },
    neighbourYears1: {
      title: 'Neighbour Years 1',
      type: 'number',
      readOnly: true
    },
    numberEDCTerminal: {
      title: 'Number EDC Terminal',
      type: 'number',
      readOnly: true
    },
    numberEmployees: {
      title: 'Number Employees',
      type: 'number',
      readOnly: true
    },
    personMetDesignation: {
      title: 'Person Met Designation',
      type: 'string',
      readOnly: true
    },
    personMetInShop: {
      title: 'Person Met InShop',
      type: 'string',
      readOnly: true
    },
    politicalConnectionneighbour1: {
      title: 'Political Connection Neighbour 1',
      type: 'string',
      readOnly: true
    },
    roof: {
      title: 'Roof',
      type: 'string',
      readOnly: true
    },
    secondNeighbourConfirmation: {
      title: 'Second Neighbour Confirmation',
      type: 'string',
      readOnly: true
    },
    shopContact: {
      title: 'Shop Contact',
      type: 'string',
      readOnly: true
    },
    signBoardInShop: {
      title: 'Sign Board InShop',
      type: 'string',
      readOnly: true
    },
    stockSeen: {
      title: 'Stock Seen',
      type: 'string',
      readOnly: true
    },
    storeQuality: {
      title: 'Store Quality',
      type: 'string',
      readOnly: true
    },
    upiAcceptance: {
      title: 'UPI Acceptance',
      type: 'string',
      readOnly: true
    },
    yearsInShop: {
      title: 'Years In Shop',
      type: 'number',
      readOnly: true
    }
  },
  required: []
};

export { cpvPostSchema };

export default function Form({ onSubmit }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <JSONSchemaForm onSubmit={onSubmit} schema={cpvPostSchema} />
        </div>
      </div>
    </div>
  );
}
