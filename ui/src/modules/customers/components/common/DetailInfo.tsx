import dayjs from 'dayjs';
import { __ } from 'modules/common/utils';
import { GENDER_TYPES } from 'modules/customers/constants';
import { ICustomer } from 'modules/customers/types';
import {
  FieldStyle,
  SidebarCounter,
  SidebarFlexRow,
  SidebarList
} from 'modules/layout/styles';
import { IField } from 'modules/settings/properties/types';
import React from 'react';
import PrimaryEmail from './PrimaryEmail';
import PrimaryPhone from './PrimaryPhone';
import axios from 'axios';

type Props = {
  customer: ICustomer;
  hasPosition?: boolean;
  fields: IField[];
  isDetail: boolean;
};

class DetailInfo extends React.PureComponent<Props> {
  renderRow(field, value) {
    const { fields, isDetail } = this.props;

    const property = fields.find(e => e.type === field);

    const isVisibleKey = isDetail ? 'isVisibleInDetail' : 'isVisible';

    if (property && !property[isVisibleKey]) {
      return null;
    }

    const label = property && property.text;

    return (
      <li>
        <FieldStyle>{__(`${label}`)}:</FieldStyle>
        <SidebarCounter fullLength={label === 'Description'}>
          {value || '-'}
        </SidebarCounter>
      </li>
    );
  }

  renderEmail(status?: string, email?: string) {
    return (
      <li>
        <FieldStyle>{__('Primary Email')}:</FieldStyle>
        <SidebarCounter>
          <PrimaryEmail email={email} status={status} />
        </SidebarCounter>
      </li>
    );
  }

  renderPhone(status?: string, phone?: string) {
    return (
      <li>
        <FieldStyle>{__('Primary phone')}:</FieldStyle>
        <SidebarCounter>
          <PrimaryPhone phone={phone} status={status} />
        </SidebarCounter>
      </li>
    );
  }

  renderDescription(description?: string) {
    const { fields, isDetail } = this.props;

    const descriptionField = fields.find(e => e.type === 'description');

    const isVisibleKey = isDetail ? 'isVisibleInDetail' : 'isVisible';

    if (descriptionField && !descriptionField[isVisibleKey]) {
      return null;
    }

    return (
      <SidebarFlexRow>
        {descriptionField && descriptionField[isVisibleKey]}
        {__(`Description`)}:<span>{description || '-'}</span>
      </SidebarFlexRow>
    );
  }

  renderPosition(customer) {
    if (!this.props.hasPosition) {
      return null;
    }

    return this.renderRow('position', customer.position);
  }
  // renderTest(customer) {
  //   return this.renderRow('testdata', customer);
  // }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  renderIncome(income?: number) {
    return (
      <li>
        <FieldStyle>{__('Monthly Income')}:</FieldStyle>
        <SidebarCounter>
          {this.numberWithCommas(income)}
        </SidebarCounter>
      </li>
    );
  }
  rendermonthlyRent(income?: number) {
    return (
      <li>
        <FieldStyle>{__('Monthly Rent')}:</FieldStyle>
        <SidebarCounter>
          {this.numberWithCommas(income)}
        </SidebarCounter>
      </li>
    );
  }

  renderuserEducation(edu?: string) {
    return (
      <li>
        <FieldStyle>{__('Qualitifications')}:</FieldStyle>
        <SidebarCounter>
          {edu}
        </SidebarCounter>
      </li>
    );
  }

  rendermaritalStatus(status: string) {
    return (
      <li>
        <FieldStyle>{__('Martial Status')}:</FieldStyle>
        <SidebarCounter>
          {status}
        </SidebarCounter>
      </li>
    );
  }

  renderuserEthnicity(ethnicity: string) {
    return (
      <li>
        <FieldStyle>{__('Ethnicity')}:</FieldStyle>
        <SidebarCounter>
          {ethnicity}
        </SidebarCounter>
      </li>
    );
  }
  renderAddress() {
    let adressObj = {
      "address1": "Trimurti Chowk",
      // "country": "IN",
      "city": "Nagpur",
      "state": "MAHARASHTRA"
      // "zipCode": "979 797"
    }
    const arrayOfObj = adressObj && adressObj && Object.entries(adressObj && adressObj).map((e) => ({ [e[0]]: e[1] }));

    let addressArr = arrayOfObj && arrayOfObj.length && arrayOfObj.map(data => {
      let datas = ''
      datas = datas + (`${Object.values(data)}`)
      return datas
    })
    let addressObj = addressArr && addressArr.length && addressArr.join(", ")
    return (
      <li>
        <FieldStyle>{__('Address')}:</FieldStyle>
        <SidebarCounter>
          {addressObj}
        </SidebarCounter>
      </li>
    )
  }
  renderBusinessvintage(vintage?: number) {
    return (
      <li>
        <FieldStyle>{__('Business Vintage')}:</FieldStyle>
        <SidebarCounter>
          {vintage}
        </SidebarCounter>
      </li>
    );
  }
  rendercoborrowerName(name: string) {
    return (
      <li>
        <FieldStyle>{__('CO-Borrower Name')}:</FieldStyle>
        <SidebarCounter>
          {name}
        </SidebarCounter>
      </li>
    );
  }
  renderGender(name: string) {
    return (
      <li>
        <FieldStyle>{__('Gender')}:</FieldStyle>
        <SidebarCounter>
          {name}
        </SidebarCounter>
      </li>
    );
  }
  panVerified(value: boolean) {
    return (
      <li>
        <FieldStyle>{__('PAN Verified?')}:</FieldStyle>
        <SidebarCounter>
          {"Yes"}
        </SidebarCounter>
      </li>
    );
  }

  otpVerified() {
    return (
      <li>
        <FieldStyle>{__('OTP Verified?')}:</FieldStyle>
        <SidebarCounter>
          {"Mobile(+91 98011 54310) has been validated"}
        </SidebarCounter>
      </li>
    );
  }

  rendernumberOfDependents(dependents?: number) {
    return (
      <li>
        <FieldStyle>{__('Number of Dependents')}:</FieldStyle>
        <SidebarCounter>
          {dependents}
        </SidebarCounter>
      </li>
    );
  }
  downloadFile() {
    let BaseUrl = "https://dev-codeapp.novopay.in/lending/download?id=6188f9e3ce646"
    axios.get(BaseUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-Appwrite-Project': '616fff40c117e',
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

  renderScore(score: number) {
    return (
      <li>
        <FieldStyle>{__('Credit Score')}:</FieldStyle>
        <SidebarCounter>
          {score}
        </SidebarCounter>
      </li>
    );
  }

  renderAmount(score: number) {
    let amount = '₹ 0';
    if (score === 40 && score < 50) {
      amount = '₹ 50,000'
    }
    else if (score === 50 && score < 60) {
      amount = '₹ 1,00,000'
    }
    else if (score === 60 && score < 70) {
      amount = '₹ 1,50,000'
    }
    else if (score === 70 && score < 80) {
      amount = '₹ 2,00,000'
    }
    else if (score === 80 && score < 90) {
      amount = '₹ 2,50,000'
    }
    else if (score > 89) {
      amount = '₹ 3,00,000'
    }

    return (
      <li>
        <FieldStyle>{__('Eligible Amount')}:</FieldStyle>
        <SidebarCounter>
          {amount}
        </SidebarCounter>
      </li>
    );
  }

  renderRisk(score: number) {
    let risk = ' ';
    if (score === 40 && score < 60) {
      risk = 'Moderate Risk'
    }
    else if (score === 60 && score < 80) {
      risk = 'Average Risk'
    }
    else if (score > 79) {
      risk = 'Low Risk'
    }
    else {
      risk = 'High Risk'
    }
    return (
      <li>
        <FieldStyle>{__('Risk categorization')}:</FieldStyle>
        <SidebarCounter>
          {risk}
        </SidebarCounter>
      </li>
    );
  }

  renderDedupe() {
    return (
      <li>
        <FieldStyle>{__('Dedupe?')}:</FieldStyle>
        <SidebarCounter>
          {''}
        </SidebarCounter>
      </li>
    );
  }
  
  render() {
    const { customer, fields } = this.props;

    if (!fields || fields.length === 0) {
      return null;
    }

    return (
      <SidebarList className="no-link">
        {this.renderScore(90)}
        {this.renderAmount(90)}
        {this.renderRisk(10)}
        {this.renderRow('code', customer.code)}
        {this.renderEmail(
          customer.emailValidationStatus,
          customer.primaryEmail
        )}
        {this.renderPhone(
          customer.phoneValidationStatus,
          customer.primaryPhone
        )}
        {this.renderPosition(customer)}
        {this.renderRow(
          'owner',
          customer.owner && customer.owner.details
            ? customer.owner.details.fullName
            : ''
        )}
        {this.renderRow('department', customer.department)}
        {this.renderRow('pronoun', GENDER_TYPES()[customer.sex || 0])}
        {this.renderRow(
          'birthDate',
          customer.birthDate && dayjs(customer.birthDate).format('MMM,DD YYYY')
        )}
        {this.renderRow('isSubscribed', customer.isSubscribed)}
        {this.renderDescription(customer.description)}
        {this.renderIncome(10000)}
        {this.rendermonthlyRent(8000)}
        {this.renderuserEducation('Graduate')}
        {this.rendermaritalStatus('Married')}
        {this.renderuserEthnicity('Sikh')}
        {this.rendercoborrowerName('Saurabh Kumar')}
        {this.renderGender('Male')}
        {this.panVerified(true)}
        {this.otpVerified()}
        {this.renderAddress()}
        {this.renderBusinessvintage(4)}
        {this.renderDedupe()}
        {this.renderCIBIL()}
        {this.renderGST()}

      </SidebarList>
    );
  }
}

export default DetailInfo;
