import CompanySection from 'modules/companies/components/common/CompanySection';
import CustomerSection from 'modules/customers/components/common/CustomerSection';
import React from 'react';
import { RightContent } from '../../styles/item';
import { IItem, IOptions } from '../../types';

type Props = {
  item: IItem;
  saveItem: (doc: { [key: string]: any }) => void;
  options: IOptions;
  renderItems: () => React.ReactNode;
};

class SidebarConformity extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.item.modifiedAt === this.props.item.modifiedAt) {
      return false;
    }
    return true;
  }

  render() {
    const { item, options, renderItems } = this.props;
    console.log("this.props=======================", typeof (item))
    let obj =
    {
      "_id": "s64MHd4BZm7RRnxbp",
      "names": [
        "Sanwariya Trading Company"
      ],
      "emails": [
        "gdecarterete@example.com"
      ],
      "phones": [
        "982-373-2183"
      ],
      "status": "Active",
      "doNotDisturb": "No",
      "isSubscribed": "Yes",
      "tagIds": [],
      "mergedIds": [],
      "scopeBrandIds": [
        "Cvp27yHExr9HyX2bT"
      ],
      "customFieldsData": [],
      "primaryName": "Sanwariya Trading Company",
      "industry": "Automobiles",
      "primaryEmail": "gdecarterete@example.com",
      "avatar": "http://dummyimage.com/121x178.png/5fa2dd/ffffff",
      "size": 9.0,
      "primaryPhone": "982-373-2183",
      "website": "http://nasa.gov",
      "businessType": "Investor",
      "ownerId": "PL3LQfcSkFFS9ekLg",
      "searchText": "Sanwariya Trading Company gdecarterete@example.com 982-373-2183 http://nasa.gov Automobiles   "
    }
    // item.companies && item.companies.push(obj)
    item.companies && item.companies.length === 0 && item.companies.push(obj)

    console.log("item.companies", typeof (item.companies))

    return (
      <RightContent>
        <CompanySection
          mainType={options.type}
          mainTypeId={item._id}
          companies={item.companies}
        />

        <CustomerSection
          mainType={options.type}
          mainTypeId={item._id}
          customers={item.customers}
        />

        {renderItems()}
      </RightContent>
    );
  }
}

export default SidebarConformity;
