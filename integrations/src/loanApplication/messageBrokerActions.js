import {
  createTaskPreProcessor,
  createLoanAplicationPreProcessor,
  loanApplicationPostProcessor,
  customerPostProcessor,
  companyPostProcessor,
  coBorrowerPostProcessor,
  createTaskPostProcessor
} from './messageActions/actions'

export const SUPPORTED_ACTIONS = {
  createCustomer: {
    schema: {},
    preProcessor: (data, action) => ({ customer: data }),
    postProcessor: customerPostProcessor
  }, // JSON Schema validation of data
  createCompany: {
    schema: {},
    preProcessor: (data, action) => ({ company: data }),
    postProcessor: companyPostProcessor
  },
  createCoBorrower: {
    schema: {},
    preProcessor: (data, action) => {
      const responseData = {
        customer: data,
        loanApplicationId: data.loanApplicationId
      }
      responseData.customer.isCoBorower = true
      return responseData
    },
    postProcessor: coBorrowerPostProcessor
  },
  createLoanApplication: {
    schema: {},
    preProcessor: createLoanAplicationPreProcessor,
    postProcessor: loanApplicationPostProcessor
  },
  updateCustomer: {
    schema: {},
    preProcessor: (data, action) => ({ customer: data }),
    postProcessor: customerPostProcessor
  },
  updateCompany: {
    schema: {},
    preProcessor: (data, action) => ({ company: data }),
    postProcessor: companyPostProcessor
  },
  updateLoanApplication: {
    schema: {},
    preProcessor: (data, action) => ({ loanApplication: data }),
    postProcessor: companyPostProcessor
  },
  getLoanApplication: {
    schema: {},
    preProcessor: (data, action) => ({ loanApplication: data }),
    postProcessor: response => response
  },
  updateApplicationStatus: {
    schema: {},
    preProcessor: (data, action) => ({ loanApplication: data }),
    postProcessor: loanApplicationPostProcessor
  },
  createTask: {
    schema: {},
    preProcessor: createTaskPreProcessor,
    postProcessor: createTaskPostProcessor
  },
  upadateTask: {
    schema: {},
    preProcessor: (data, action) => ({ task: data }),
    postProcessor: response => response
  },
  sendNotification: {
    schema: {},
    preProcessor: (data, action) => ({ notification: data }),
    postProcessor: response => response
  }
}
