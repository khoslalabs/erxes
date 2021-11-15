import { Model, model } from 'mongoose';
import { ACTIVITY_LOG_ACTIONS, putActivityLog } from '../../data/logUtils';
import {
  destroyBoardItemRelations,
  fillSearchTextItem,
  watchItem
} from './boardUtils';
import { IItemCommonFields as ITask } from './definitions/boards';
import { ACTIVITY_CONTENT_TYPES } from './definitions/constants';
import { ITaskDocument, taskSchema } from './definitions/tasks';
import { Request, Response, NextFunction } from 'express';
// import { Request } from 'aws-sdk';

export interface ITaskModel extends Model<ITaskDocument> {
  createTask(doc: ITask): Promise<ITaskDocument>;
  getTask(_id: string): Promise<ITaskDocument>;
  updateTask(_id: string, doc: ITask): Promise<ITaskDocument>;
  watchTask(_id: string, isAdd: boolean, userId: string): void;
  removeTasks(_ids: string[]): Promise<{ n: number; ok: number }>;
  updateTimeTracking(
    _id: string,
    status: string,
    timeSpent: number,
    startDate: string
  ): Promise<ITaskDocument>;
}

export const loadTaskClass = () => {
  class Task {
    /**
     * Retreives Task
     */
    public static async getTask(_id: string) {
      const task = await Tasks.findOne({ _id });

      if (!task) {
        throw new Error('Task not found');
      }

      return task;
    }

    /**
     * Create a Task
     */
    public static async createTask(doc: ITask) {
      console.log("doc-------------------------- inside", doc)
      // return false
      if (doc.sourceConversationIds) {
        const convertedTask = await Tasks.findOne({
          sourceConversationIds: { $in: doc.sourceConversationIds }
        });

        if (convertedTask) {
          throw new Error('Already converted a task');
        }
      }
      // return false
      const task = await Tasks.create({
        ...doc,
        createdAt: new Date(),
        modifiedAt: new Date(),
        stageChangedDate: new Date(),
        searchText: fillSearchTextItem(doc),
        response: {
          "formName": "CPVForm",
          "data": {
            "personMetInShop": "suresh",
            "personMetDesignation": "self",
            "signBoardInShop": "yes",
            "businessVintage": 4,
            "yearsInShop": 3,
            "industry": "MobilePhone",
            "storeOwnership": "owned",
            "numberEmployees": 2,
            "numberStores": 4,
            "numberEDCTerminal": 3,
            "bankEDCTerminal": "SBI",
            "upiAcceptance": "+91 89704 23891",
            "storeQuality": "medium",
            "businessActivity": "notBusy",
            "stockSeen": "yes",
            "roof": "yes",
            "shopContact": "+91 89704 23891",
            "shopLocationType": "market",
            "storeSize": 500,
            "documentsCheck": true,
            "firstNeighbourConfirmation": "yes",
            "neighbourName2": "Vikram",
            "secondNeighbourConfirmation": "yes",
            "neighbourName1": "Thiru",
            "neighbourShopOpen1": "yes",
            "neighbourIrregularity1": "no",
            "neighbourCollectionAgents1": "yes",
            "politicalConnectionneighbour1": "no",
            "neighbourFeedback1": "positive",
            "neighbourYears1": 4
          },
          "applicationId": "325306"
        }
      });
      console.log("craete task>>>>>>>>>>>>>>>>>>>", task)
      await putActivityLog({
        action: ACTIVITY_LOG_ACTIONS.CREATE_BOARD_ITEM,
        data: { item: task, contentType: 'task' }
      });

      return task;
    }

    /**
     * Update Task
     */
    public static async updateTask(_id: string, doc: ITask) {
      console.log("step1-------------------------------doc", doc,_id)
      const searchText = fillSearchTextItem(doc, await Tasks.getTask(_id));

      await Tasks.updateOne({ _id }, { $set: doc, searchText });

      return Tasks.findOne({ _id });
    }

    /**
     * Watch task
     */
    public static async watchTask(_id: string, isAdd: boolean, userId: string) {
    console.log("_id==================================", _id, isAdd, userId)
      return watchItem(Tasks, _id, isAdd, userId);
    }

    public static async removeTasks(_ids: string[]) {
      // completely remove all related things
      for (const _id of _ids) {
        await destroyBoardItemRelations(_id, ACTIVITY_CONTENT_TYPES.TASK);
      }

      return Tasks.deleteMany({ _id: { $in: _ids } });
    }

    public static async updateTimeTracking(
      _id: string,
      status: string,
      timeSpent: number,
      startDate?: string
    ) {
      const doc: { status: string; timeSpent: number; startDate?: string } = {
        status,
        timeSpent
      };

      if (startDate) {
        doc.startDate = startDate;
      }

      await Tasks.updateOne({ _id }, { $set: { timeTrack: doc } });

      return Tasks.findOne({ _id }).lean();
    }
  }

  taskSchema.loadClass(Task);

  return taskSchema;
};

loadTaskClass();


// export const getPost = async (req: Request, res: Response, next: NextFunction) => {
//   // get the post id from the req
//   console.log("req=======================", req.body)

//   // let id: string = req.params.id;
//   // console.log("id=======================",id)

// };

const Tasks = model<ITaskDocument, ITaskModel>('tasks', taskSchema);

export default Tasks;
