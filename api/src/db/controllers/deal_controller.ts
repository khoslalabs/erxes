import { Model, model } from 'mongoose';
import { ACTIVITY_LOG_ACTIONS, putActivityLog } from '../../data/logUtils';
import {
    destroyBoardItemRelations,
    fillSearchTextItem,
    watchItem
} from '../models/boardUtils';
import { ACTIVITY_CONTENT_TYPES } from '../models/definitions/constants';
import { dealSchema, IDeal, IDealDocument } from '../models/definitions/deals';
import * as mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

export interface IDealModel extends Model<IDealDocument> {
    getDeal(_id: string): Promise<IDealDocument>;
    createDeal(doc: IDeal): Promise<IDealDocument>;
    updateDeal(_id: string, doc: IDeal): Promise<IDealDocument>;
    watchDeal(_id: string, isAdd: boolean, userId: string): void;
    removeDeals(_ids: string[]): Promise<{ n: number; ok: number }>;
}

export async function createDeal(req: Request, res: Response) {
    console.log("doc--------------------------create task", req.body)
    // return false

    if (req.body.sourceConversationIds) {
        const convertedDeal = await Deals.findOne({
            sourceConversationIds: { $in: req.body.sourceConversationIds }
        });

        if (convertedDeal) {
            throw new Error('Already converted a deal');
        }
    }

    // return false
    const deal = await Deals.create({
        ...req.body,
        createdAt: new Date(),
        modifiedAt: new Date(),
        stageChangedDate: new Date(),
        searchText: fillSearchTextItem(req.body)
    });

    console.log("create deal>>>>>>>>>>>>>>>>>>>", deal)

    await putActivityLog({
        action: ACTIVITY_LOG_ACTIONS.CREATE_BOARD_ITEM,
        data: { item: deal, contentType: 'deal' }
    });

    return res.status(200).json({
        message: 'Deal created successfully',
        response: deal
    });
}

export async function updateDeal(req: Request, res: Response) {
    let date = new Date()
    let isoDate = date.toISOString()
    req.body.doc.modifiedAt = isoDate
    console.log("step1-------------------------------doc", req.body)
    // return false
    let _id = req.body._id
    const searchText = fillSearchTextItem(req.body.doc, await Deals.getDeal(_id));

    await Deals.updateOne({ _id }, { $set: req.body.doc, searchText });

    let deal = await Deals.findOne({ _id });
    return res.status(200).json({
        message: 'Deal updated successfully',
        response: deal
    });
}


export async function watchDeal(req: Request, res: Response) {
    console.log("_id==================================", req.body)
    let watchData = await watchItem(Deals, req.body._id, req.body.isAdd, req.body.userId);
    return res.status(200).json({
        message: 'Watch status changed successfully',
        data: watchData
    });
}

export async function getDeal(req: Request, res: Response) {
    let _id = req.body._id
    console.log("_id==================================", req.body)
    const deal = await Deals.findOne({ _id });
    if (!deal) {
        return res.status(200).json({
            message: 'Deal not found'
        });
      }
    return res.status(200).json({
        message: 'Deal fetched successfully',
        response:deal
    });
}

// tslint:disable-next-line
const Deals = model<IDealDocument, IDealModel>('deals', dealSchema);

export default Deals;
