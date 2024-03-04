export type IntegrationName = 'Twilio' | 'Outlook' | 'Google';

export interface Integration {
  _id: string;
  name: IntegrationName;
  description: string;
  logo: string;
}

export type IntegrationPayload = {
  integrationId?: string;
} & {
  [key: string]: string;
};
