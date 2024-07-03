import { CategoryEntry } from "./category-entry";
import { CategoryEntryType } from "./category-entry-type";

export interface Category {
    name: string;
    color: string;
    categoryEntries: CategoryEntry[];
}

export const categories = [
    {
      name: 'Need',
      color: 'E1BEE7',
      categoryEntries: [
        {
          type: CategoryEntryType.Fund,
          name: 'Needs Buffer',
          amount: 300
        },
        {
          type: CategoryEntryType.Monthly,
          name: 'Bills',
          amount: 300
        },
        {
          type: CategoryEntryType.NonMonthly,
          name: 'Property Taxes',
          amount: 300
        },
      ]
    },
    {
      name: 'Save',
      color: 'C8E6C9',
      categoryEntries: [
        {
          type: CategoryEntryType.Fund,
          name: 'Stocks',
          amount: 300
        },
        {
          type: CategoryEntryType.Monthly,
          name: 'IRA',
          amount: 300
        },
        {
          type: CategoryEntryType.NonMonthly,
          name: 'Year-End Deposit',
          amount: 300
        },
      ]
    },
    {
      name: 'Want',
      color: 'BBDEFB',
      categoryEntries: [
        {
          type: CategoryEntryType.Fund,
          name: 'Flex Spending',
          amount: 300
        },
        {
          type: CategoryEntryType.Monthly,
          name: 'Subscriptions',
          amount: 300
        },
        {
          type: CategoryEntryType.NonMonthly,
          name: 'Annual Membership',
          amount: 300
        },
      ]
    }
  ];