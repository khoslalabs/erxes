import React from 'react';
import JSONSchemaForm from 'react-jsonschema-form';
import 'bootstrap/dist/css/bootstrap.css';
import { JSONSchema7 } from 'json-schema';
const agentPostSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    name: {
      title: 'Agent Name',
      type: 'string',
      minLength: 10,
      maxLength: 140,
      readOnly: true
    },
    location: {
      title: 'Location',
      type: 'string',
      pattern: '^[a-z0-9-]+$',
      readOnly: true
    },
    mobile: {
      title: 'Mobile',
      type: 'string',
      readOnly: true
    }
  },
  required: []
};

export { agentPostSchema };

export default function Form({ onSubmit }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <JSONSchemaForm onSubmit={onSubmit} schema={agentPostSchema} />
        </div>
      </div>
    </div>
  );
}
