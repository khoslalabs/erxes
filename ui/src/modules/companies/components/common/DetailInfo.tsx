import { __ } from 'modules/common/utils';
import {
  FieldStyle,
  SidebarCounter,
  SidebarFlexRow,
  SidebarList
} from 'modules/layout/styles';
import { IField } from 'modules/settings/properties/types';
import React from 'react';
import { ICompany } from '../../types';
import axios from 'axios';

type Props = {
  company: ICompany;
  fields: IField[];
};

class DetailInfo extends React.Component<Props> {
  renderRow = (field, value) => {
    const { fields } = this.props;

    const property = fields.find(e => e.type === field);

    if (property && !property.isVisible) {
      return null;
    }

    const label = property && property.text;
    const className = field === 'industry' ? 'multiple-choice' : '';

    return (
      <li className={className}>
        <FieldStyle>{__(`${label}`)}</FieldStyle>
        <SidebarCounter>{value || '-'}</SidebarCounter>
      </li>
    );
  };

  renderParentCompany(parentCompany?: string) {
    return (
      <li>
        <FieldStyle>{__('Parent company')}:</FieldStyle>
        <SidebarCounter>{parentCompany || '-'}</SidebarCounter>
      </li>
    );
  }

  renderDescription(description?: string) {
    const { fields } = this.props;

    const descriptionField = fields.find(e => e.type === 'description');

    if (descriptionField && !descriptionField.isVisible) {
      return null;
    }

    return (
      <SidebarFlexRow>
        {descriptionField && descriptionField.isVisible}
        {__(`Description`)}:<span>{description || '-'}</span>
      </SidebarFlexRow>
    );
  }
  rendernewRow(field, value?: string) {
    return (
      <li>
        <FieldStyle>{field}:</FieldStyle>
        <SidebarCounter>
          {value}
        </SidebarCounter>
      </li>
    );
  }

  downloadFile(){
    let BaseUrl ="https://dev-codeapp.novopay.in/lending/download?id=6188f9e3ce646"
           axios.get(BaseUrl,{
               headers: {
                   'Content-Type': 'application/json',
                   'X-Appwrite-Project' : '616fff40c117e',
                   'X-Appwrite-Key': '5958c59e6492a29dcc621ca18530e7f5e111a924a4985841f0da8849380664f95bd75d4186c12aae48423776401a209ca8dfaa4655f955639818d999779b50fd8766b429eef2d6e8b460ed09806d3f8742f8043e572d61edd3ac6ad1a53fb2f6f1c9603a6f8025459d3be82df6936d56e03d54c481e57fce4a031f6c63bd0b08'
               }
               })
               .then(function (response) {
               })
   }

  renderCIBIL() {
    return (
      <li>
        <FieldStyle>{__('CIBIL')}:</FieldStyle>
        <SidebarCounter>
          <a href={""} download="CIBIL_File.pdf" onClick={this.downloadFile}> Download</a>
        </SidebarCounter>
      </li>
    );
  }

  renderGST() {
    return (
      <li>
        <FieldStyle>{__('GST')}:</FieldStyle>
        <SidebarCounter>
          <a href={""} download="GST_File.pdf" onClick={this.downloadFile}> Download</a>
        </SidebarCounter>
      </li>
    );
  }

  render() {
    const { company } = this.props;

    return (
      <SidebarList className="no-link">
        {this.renderRow('code', company.code)}
        {this.renderRow('size', company.size)}
        {this.renderRow('industry', company.industry)}
        {this.renderParentCompany(
          company.parentCompany ? company.parentCompany.primaryName : '-'
        )}
        {this.renderRow('primaryEmail', company.primaryEmail)}
        {this.renderRow(
          'owner',
          company.owner && company.owner.details
            ? company.owner.details.fullName
            : '-'
        )}
        {this.renderRow('primaryPhone', company.primaryPhone)}
        {this.renderRow('location', company.location)}
        {this.renderRow('businessType', company.businessType)}
        {this.renderRow('isSubscribed', company.isSubscribed)}
        {this.renderDescription(company.description)}
        {this.rendernewRow('GST', "29AAECN6114F1ZK")}
        {this.rendernewRow('Udyam', "UDYAM-RJ-17-0000034")}
        {this.rendernewRow('Shop & Establishment license check? ', 'true')}
        {this.renderCIBIL()}
        {this.renderGST()}

      </SidebarList>
    );
  }
}

export default DetailInfo;
