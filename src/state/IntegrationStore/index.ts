import { Integration } from '@/types/integration.types';
import { makeAutoObservable } from 'mobx';

class IntegrationStore {
  constructor() {
    makeAutoObservable(this);
  }
  public integrations: Integration[] = [];
  public creating = false;
  public loading = false;

  public setCreating(creating: boolean) {
    this.creating = creating;
  }

  public setLoading(loading: boolean) {
    this.loading = loading;
  }

  public setIntegrations(integrations: Integration[]) {
    this.integrations = integrations;
  }
}

export const integrationStore = new IntegrationStore();
