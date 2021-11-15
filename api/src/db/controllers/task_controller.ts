import { Model, model } from 'mongoose';
import { ACTIVITY_LOG_ACTIONS, putActivityLog } from '../../data/logUtils';
import {
    destroyBoardItemRelations,
    fillSearchTextItem,
    watchItem
} from '../models/boardUtils';
import { IItemCommonFields as ITask } from '../models/definitions/boards';
import { ACTIVITY_CONTENT_TYPES } from '../models/definitions/constants';
import { ITaskDocument, taskSchema } from '../models/definitions/tasks';
import { Request, Response, NextFunction } from 'express';
// import { Request } from 'aws-sdk';

export interface ITaskModel extends Model<ITaskDocument> {
    createTask(doc: ITask): Promise<ITaskDocument>;
    getTask(_id: string): Promise<ITaskDocument>;
    updateTask(doc: ITask): Promise<ITaskDocument>;
    watchTask(_id: string, isAdd: boolean, userId: string): void;
    removeTasks(_ids: string[]): Promise<{ n: number; ok: number }>;
    updateTimeTracking(
        _id: string,
        status: string,
        timeSpent: number,
        startDate: string
    ): Promise<ITaskDocument>;
}

export async function createTask(req: Request, res: Response) {
    console.log("doc--------------------------create task", req.body)
    // return false

    if (req.body.sourceConversationIds) {
        const convertedTask = await Tasks.findOne({
            sourceConversationIds: { $in: req.body.sourceConversationIds }
        });

        if (convertedTask) {
            throw new Error('Already converted a task');
        }
    }

    // return false
    const task = await Tasks.create({
        ...req.body,
        createdAt: new Date(),
        modifiedAt: new Date(),
        stageChangedDate: new Date(),
        searchText: fillSearchTextItem(req.body)
    });

    console.log("create task>>>>>>>>>>>>>>>>>>>", task)

    await putActivityLog({
        action: ACTIVITY_LOG_ACTIONS.CREATE_BOARD_ITEM,
        data: { item: task, contentType: 'task' }
    });

    return res.status(200).json({
        message: 'Task created successfully',
        response: task
    });
}

export async function updateTask(req: Request, res: Response) {
    let date = new Date()
    let isoDate = date.toISOString()
    req.body.doc.modifiedAt = isoDate
    console.log("step1-------------------------------doc", req.body)
    let _id = req.body._id
    const searchText = fillSearchTextItem(req.body.doc, await Tasks.getTask(_id));

    await Tasks.updateOne({ _id }, { $set: req.body.doc, searchText });

    let task = await Tasks.findOne({ _id });
    return res.status(200).json({
        message: 'Task updated successfully',
        response: task
    });
}
export async function getTask(req: Request, res: Response) {
    let _id = req.body._id
    console.log("_id==================================", req.body)
    const task = await Tasks.findOne({ _id });

    return res.status(200).json({
        message: 'Task fetched successfully',
        response: task
    });
}

export async function removeTasks(req: Request, res: Response) {
    console.log("_id==================================", req.body._ids)
    // return false
    for (const _id of req.body._ids) {
        await destroyBoardItemRelations(_id, ACTIVITY_CONTENT_TYPES.TASK);
    }
    Tasks.deleteMany({ _id: { $in: req.body._ids } });
    return res.status(200).json({
        message: 'Task removed successfully',
    });
}

export async function watchTask(req: Request, res: Response) {
    console.log("_id==================================", req.body)
    let watchData = await watchItem(Tasks, req.body._id, req.body.isAdd, req.body.userId);
    return res.status(200).json({
        message: 'Watch status changed successfully',
        data:watchData
    });
}

const Tasks = model<ITaskDocument, ITaskModel>('tasks', taskSchema);

export default Tasks;
