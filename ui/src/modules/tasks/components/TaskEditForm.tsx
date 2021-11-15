import EditForm from 'modules/boards/components/editForm/EditForm';
import Left from 'modules/boards/components/editForm/Left';
import Sidebar from 'modules/boards/components/editForm/Sidebar';
import Top from 'modules/boards/components/editForm/Top';
import { FlexContent, HeaderRowSmall } from 'modules/boards/styles/item';
import {
  IEditFormContent,
  IItem,
  IItemParams,
  IOptions
} from 'modules/boards/types';
import { __ } from 'modules/common/utils';
import { Tabs, TabTitle } from 'modules/common/components/tabs';
import TaskTimer, { STATUS_TYPES } from 'modules/common/components/Timer';
import PortableDeals from 'modules/deals/components/PortableDeals';
// import PortableTickets from 'modules/tickets/components/PortableTickets';
import React from 'react';
import Form from '@rjsf/bootstrap-4';
import { cpvPostSchema } from './cpvform';

type Props = {
  options: IOptions;
  item: IItem;
  addItem: (doc: IItemParams, callback: () => void, msg?: string) => void;
  saveItem: (doc: IItemParams, callback?: (item) => void) => void;
  copyItem: (itemId: string, callback: () => void) => void;
  removeItem: (itemId: string, callback: () => void) => void;
  onUpdate: (item: IItem, prevStageId?: string) => void;
  updateTimeTrack: (
    {
      _id,
      status,
      timeSpent
    }: { _id: string; status: string; timeSpent: number; startDate?: string },
    callback?: () => void
  ) => void;
  beforePopupClose: () => void;
  sendToBoard?: (item: any) => void;
};

type StringState = {
  currentTab: string;
  items: any;

};

type State = {} & StringState;

// const divStyle = {
//   background: '#F9F9F9',
//   overflowY: 'scroll',
//   padding: '20px',
//   margin: '20px',
//   height: '450px',
//   display: 'block',
// };

export default class TaskEditForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    const item = props.item;
    // console.log("----------------------------------taskitem", item && item.response);
    this.state = {
      currentTab: 'deal',
      items: item && item.priority ? item.priority : 'low'
    };
  }
  companyFormData = () => {
    const item = this.props.item;
    // console.log("items", item.response)
    return {
      title: item && item.response && item.response.formName,
      location: item && item.response && item.response && item.response.data && item.response.data.shopLocationType,
      owned: item && item.response && item.response && item.response.data && item.response.data.storeOwnership,
      store_size: item.response && item.response && item.response.data && item.response.data.storeSize,
      total_stores: item.response && item.response && item.response.data && item.response.data.numberStores,
      earning_members: '2',
      monthly_income: '',
      shop_address: '',
      bankEDCTerminal: item.response && item.response && item.response.data && item.response.data.bankEDCTerminal,
      businessActivity: item.response && item.response && item.response.data && item.response.data.businessActivity,
      businessVintage: item.response && item.response && item.response.data && item.response.data.businessVintage,
      documentsCheck: item.response && item.response && item.response.data && item.response.data.documentsCheck,
      firstNeighbourConfirmation: item.response && item.response && item.response.data && item.response.data.firstNeighbourConfirmation,
      industry: item.response && item.response && item.response.data && item.response.data.industry,
      neighbourCollectionAgents1: item.response && item.response && item.response.data && item.response.data.neighbourCollectionAgents1,
      neighbourFeedback1: item.response && item.response && item.response.data && item.response.data.neighbourFeedback1,
      neighbourIrregularity1: item.response && item.response && item.response.data && item.response.data.neighbourIrregularity1,
      neighbourName1: item.response && item.response && item.response.data && item.response.data.neighbourName1,
      neighbourName2: item.response && item.response && item.response.data && item.response.data.neighbourName2,
      neighbourShopOpen1: item.response && item.response && item.response.data && item.response.data.neighbourShopOpen1,
      neighbourYears1: item.response && item.response && item.response.data && item.response.data.neighbourYears1,
      numberEDCTerminal: item.response && item.response && item.response.data && item.response.data.numberEDCTerminal,
      numberEmployees: item.response && item.response && item.response.data && item.response.data.numberEmployees,
      personMetDesignation: item.response && item.response && item.response.data && item.response.data.personMetDesignation,
      personMetInShop: item.response && item.response && item.response.data && item.response.data.personMetInShop,
      politicalConnectionneighbour1: item.response && item.response && item.response.data && item.response.data.politicalConnectionneighbour1,
      roof: item.response && item.response && item.response.data && item.response.data.roof,
      secondNeighbourConfirmation: item.response && item.response && item.response.data && item.response.data.secondNeighbourConfirmation,
      shopContact: item.response && item.response && item.response.data && item.response.data.shopContact,
      signBoardInShop: item.response && item.response && item.response.data && item.response.data.signBoardInShop,
      stockSeen:item.response && item.response && item.response.data && item.response.data.stockSeen,
      storeQuality: item.response && item.response && item.response.data && item.response.data.storeQuality,
      upiAcceptance: item.response && item.response && item.response.data && item.response.data.upiAcceptance,
      yearsInShop: item.response && item.response && item.response.data && item.response.data.yearsInShop,
    };
  };

  onChange = (name: string, value: string) => {
    this.setState({ [name]: value } as Pick<StringState, keyof StringState>);
  };

  renderItems = () => {
    const { item, updateTimeTrack } = this.props;

    const timeTrack = item.timeTrack || {
      timeSpent: 0,
      status: STATUS_TYPES.STOPPED
    };
    return (
      <>
        <TaskTimer
          taskId={item._id}
          status={timeTrack.status}
          timeSpent={timeTrack.timeSpent}
          startDate={timeTrack.startDate}
          update={updateTimeTrack}
        />
        <PortableDeals mainType="task" mainTypeId={this.props.item._id} />
        {/*<PortableTickets mainType="task" mainTypeId={this.props.item._id} />*/}
      </>
    );
  };

  renderFormContent = ({
    state,
    copy,
    remove,
    saveItem,
    onChangeStage
  }: IEditFormContent) => {
    const { item, options, onUpdate, addItem, sendToBoard } = this.props;
    const { currentTab } = this.state;
    const tabOnClick = (name: string) => {
      this.onChange('currentTab', name);
    };

    return (
      <>
        <Top
          options={options}
          stageId={state.stageId}
          item={item}
          saveItem={saveItem}
          onChangeStage={onChangeStage}
        />
        <HeaderRowSmall>
          <Tabs full={true}>
            <TabTitle
              className={currentTab === 'deal' ? 'active' : ''}
              onClick={tabOnClick.bind(this, 'deal')}
            >
              {__('Details')}
            </TabTitle>

            <TabTitle
              className={currentTab === 'response' ? 'active' : ''}
              onClick={tabOnClick.bind(this, 'response')}
            >
              {__('Response')}
            </TabTitle>
          </Tabs>
        </HeaderRowSmall>

        {currentTab === 'response' && (
          <div style={{
            background: '#F9F9F9',
            overflowY: 'scroll',
            padding: '20px',
            margin: '20px',
            height: '450px',
            display: 'block',
          }}>
            <Form
              schema={cpvPostSchema}
              // uiSchema={uiSchema}
              //
              formData={this.companyFormData()}
            >
              <button type="submit" style={{ display: 'none' }} />
            </Form>
          </div>
        )}

        {currentTab === 'deal' && (
          <FlexContent>
            <Left
              options={options}
              saveItem={saveItem}
              copyItem={copy}
              removeItem={remove}
              onUpdate={onUpdate}
              sendToBoard={sendToBoard}
              item={item}
              addItem={addItem}
              onChangeStage={onChangeStage}
              onChangePriority={(value) => {
                // console.log("onChangePriority", value)
                this.setState({ items: value })
              }}
              items={this.state.items}
            />

            <Sidebar
              options={options}
              item={item}
              saveItem={saveItem}
              renderItems={this.renderItems}
            />
          </FlexContent>
        )}
      </>
    );
  };

  render() {
    const extendedProps = {
      ...this.props,
      formContent: this.renderFormContent,
      extraFields: this.state
    };

    return <EditForm {...extendedProps} />;
  }
}
