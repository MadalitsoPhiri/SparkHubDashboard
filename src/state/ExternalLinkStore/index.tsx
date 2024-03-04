import { ExternalLink } from '@/types/external_link.type';
import { makeAutoObservable } from 'mobx';

class ExternalLinkStore {
  constructor() {
    makeAutoObservable(this);
  }

  public selectedExternalLink: ExternalLink | null = null;
  public externalLinks: ExternalLink[] = [];
  public loading = false;

  public setSelectedExternalLink = (externalLink: ExternalLink) => {
    this.selectedExternalLink = externalLink;
  };

  public setExternalLinks = (externalLinks: ExternalLink[]) => {
    this.externalLinks = externalLinks;
  };

  public setLoading = (loading: boolean) => {
    this.loading = loading;
  };
}

export const externalLinkStore = new ExternalLinkStore();
