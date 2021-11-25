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
import { Alert} from 'modules/common/utils';
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
          {value !== '' ? value : '-'}
        </SidebarCounter>
      </li>
    );
  }

  downloadFile(docId: string) {
    let docArr = docId.split("::");
    if(docArr.length && docArr[0] !== ''){
    let BaseUrl = `https://dev-codeapp.novopay.in/lending/download?id=${docArr[0]}`
    axios.get(BaseUrl, {
      responseType: "blob"
    })
      .then(function (response) {
        console.log("typeof", response)
        if (response.status == 200 && response.data) {
        Alert.success('Download Successful');
          const url = URL.createObjectURL(response.data);
          let a = document.createElement("a");
          a.setAttribute("style", "display: none");
          document.body.appendChild(a);
          a.href = url;
          a.download = `${docArr[1]}`;
          a.click();
          URL.revokeObjectURL(url);
          a.remove();
        }
      })}
      else{
        Alert.error('Download Error');
      }
   
  }

  renderCIBIL(cibildocid: string) {
    return (
      <li>
        <FieldStyle>{__('CIBIL')}:</FieldStyle>
        <SidebarCounter>
          <p style={{ textDecoration: "underline" }} onClick={(e) => this.downloadFile(cibildocid)}> Download</p>
        </SidebarCounter>
      </li>
    );
  }

  renderGST(gstid: string) {
    return (
      <li>
        <FieldStyle>{__('GST')}:</FieldStyle>
        <SidebarCounter>
          <p style={{ textDecoration: "underline" }} onClick={(e) => this.downloadFile(gstid)}> Download</p>
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
        {this.rendernewRow('GST', company.gst ? company.gst : '')}
        {this.rendernewRow('Udyam', company.udyam ? company.udyam : '')}
        {this.rendernewRow('Shop & Establishment license check? ', company.licensechecked ? company.licensechecked : '')}
        {this.renderCIBIL(company.cibil ? company.cibil : '')}
        {this.renderGST(company.gstid ? company.gstid : '')}

      </SidebarList>
    );
  }
}

export default DetailInfo;
