export type CustomField = {
  _id: string;
  field: string;
  type: string;
  metaData: string[];
  createdAt: string;
  updatedAt: string;
};

export type ContactCustomField = {
  value: string;
  custom_field_id: string;
  contact_id: string;
};

export type CustomFieldObject = {
  [field: string]: any;
};
