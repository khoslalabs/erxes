import { Document, Schema } from 'mongoose';
import {
  attachmentSchema,
  commonItemFieldsSchema,
  IItemCommonFields
} from './boards';
import * as _ from 'underscore';
import { customFieldSchema, ICustomField } from './common';
import { ICompany } from './companies';
import {
  PRODUCT_STATUSES,
  PRODUCT_TYPES,
  INTEREST_FREQUENCIES,
  INTEREST_FREQUENCY
} from './constants';
import { field, schemaWrapper } from './utils';

export interface IProduct {
  name: string;
  categoryId?: string;
  categoryCode?: string;
  type?: string;
  description?: string;
  sku?: string;
  unitPrice?: number;
  code: string;
  customFieldsData?: ICustomField[];
  productId?: string;
  tagIds?: string[];
  attachment?: any;
  status?: string;
  vendorId?: string;

  mergedIds?: string[];
}

export interface IProductDocument extends IProduct, Document {
  _id: string;
  createdAt: Date;
  vendor?: ICompany;
}

export interface IProductCategory {
  name: string;
  code: string;
  order: string;
  description?: string;
  parentId?: string;
}

export interface IProductCategoryDocument extends IProductCategory, Document {
  _id: string;
  createdAt: Date;
}

export interface IProductData extends Document {
  productId: string;
  uom: string;
  currency: string;
  quantity: number;
  unitPrice: number;
  taxPercent?: number;
  tax?: number;
  discountPercent?: number;
  discount?: number;
  amount?: number;
  tickUsed?: boolean;
  assignUserId?: string;
  loanAmount: number;
  processingFees: number;
  interestRate: number;
  loanTenureInMonths: number;
  interestFrequency: string;
}

interface IPaymentsData {
  [key: string]: {
    currency?: string;
    amount?: number;
  };
}

export interface IDeal extends IItemCommonFields {
  productsData?: IProductData[];
  paymentsData?: IPaymentsData[];
  loanApplicationId: string;
}

export interface IDealDocument extends IDeal, Document {
  _id: string;
}

// Mongoose schemas =======================

export const productSchema = schemaWrapper(
  new Schema({
    _id: field({ pkey: true }),
    name: field({ type: String, label: 'Name' }),
    code: field({ type: String, unique: true, label: 'Code' }),
    categoryId: field({ type: String, label: 'Category' }),
    type: field({
      type: String,
      enum: PRODUCT_TYPES.ALL,
      default: PRODUCT_TYPES.PRODUCT,
      label: 'Type'
    }),
    tagIds: field({ type: [String], optional: true, label: 'Tags' }),
    description: field({ type: String, optional: true, label: 'Description' }),
    sku: field({ type: String, optional: true, label: 'Stock keeping unit' }),
    unitPrice: field({ type: Number, optional: true, label: 'Unit price' }),
    customFieldsData: field({
      type: [customFieldSchema],
      optional: true,
      label: 'Custom fields data'
    }),
    createdAt: field({
      type: 'Date',
      default: new Date(),
      label: 'Created at'
    }),
    attachment: field({ type: attachmentSchema }),
    status: field({
      type: String,
      enum: PRODUCT_STATUSES.ALL,
      optional: true,
      label: 'Status',
      default: 'active',
      esType: 'keyword',
      index: true
    }),
    vendorId: field({ type: String, optional: true, label: 'Vendor' }),
    mergedIds: field({ type: [String], optional: true })
  })
);

export const productCategorySchema = schemaWrapper(
  new Schema({
    _id: field({ pkey: true }),
    name: field({ type: String, label: 'Name' }),
    code: field({ type: String, unique: true, label: 'Code' }),
    order: field({ type: String, label: 'Order' }),
    parentId: field({ type: String, optional: true, label: 'Parent' }),
    description: field({ type: String, optional: true, label: 'Description' }),
    createdAt: field({
      type: Date,
      default: new Date(),
      label: 'Created at'
    })
  })
);

export const productDataSchema = new Schema(
  {
    _id: field({ type: String }),
    productId: field({ type: String }), // Product
    uom: field({ type: String }), // Units of measurement
    currency: field({ type: String }), // Currency
    quantity: field({ type: Number }), // Quantity
    unitPrice: field({ type: Number }), // Unit price
    taxPercent: field({ type: Number }), // Tax percent
    tax: field({ type: Number }), // Tax
    discountPercent: field({ type: Number }), // Discount percent
    discount: field({ type: Number }), // Discount
    amount: field({ type: Number }), // Amount
    tickUsed: field({ type: Boolean }), // TickUsed
    assignUserId: field({ type: String }), // AssignUserId
    loanAmount: field({ type: Number, label: 'Loan Amount' }),
    processingFees: field({ type: Number, label: 'Processing Fees (%)' }),
    interestRate: field({ type: Number, label: 'Interest Rate(%)' }),
    loanTenureInMonths: field({
      type: Number,
      label: 'Loan Tenure in Months'
    }),
    interestFrequency: field({
      type: String,
      enum: _.values(INTEREST_FREQUENCIES),
      label: 'Interest Frequency',
      selectOptions: INTEREST_FREQUENCY
    })
  },
  { _id: false }
);

export const dealSchema = schemaWrapper(
  new Schema({
    ...commonItemFieldsSchema,

    productsData: field({ type: [productDataSchema], label: 'Products' }),
    paymentsData: field({ type: Object, optional: true, label: 'Payments' }),
    loanApplicationId: field({
      type: String,
      optional: true,
      label: 'Loan Application'
    })
  })
);
