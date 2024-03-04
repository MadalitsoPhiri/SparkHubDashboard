import { CustomField, CustomFieldObject } from '@/types/customField.types';
import { makeAutoObservable } from 'mobx';

class CustomFieldStore {
  constructor() {
    makeAutoObservable(this);
  }

  public customFields: CustomField[] = [];
  public customFieldsObject: CustomFieldObject = {};
  public loading = false;

  public setCustomFields = (customFields: CustomField[]) => {
    this.customFields = customFields;
  };

  public setCustomFieldsObject = (name: string, value: any) => {
    this.customFieldsObject[name] = value;
  };

  public resetCustomFieldsObject = () => {
    this.customFieldsObject = {};
  };

  public setLoading = (loading: boolean) => {
    this.loading = loading;
  };
}

export const customFieldStore = new CustomFieldStore();
