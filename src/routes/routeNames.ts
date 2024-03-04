const PREFIX = {
  dashboard: '/d',
  integration: `/d/integration`,
  auth: '/auth',
  workspaces: '/workspaces',
  teams: '/teams',
  verification: 'verification',
} as const;

const routeNames = {
  landing: '/',
  privacyPolicy: '/privacy-policy',
  termsOfService: '/terms-of-service',
  demo: '/demo',
  dashboard: {
    home: PREFIX.dashboard,
    inbox: `${PREFIX.dashboard}/inbox`,
    contacts: `${PREFIX.dashboard}/contacts`,
    userProfile: `${PREFIX.dashboard}/contacts/contact-profile`,
    allContacts: `${PREFIX.dashboard}/all-contacts`,
    configurations: `${PREFIX.dashboard}/configurations`,
    chat: `${PREFIX.dashboard}/chat`,
    agentProfile: `${PREFIX.dashboard}/profile`,
    marketing: `${PREFIX.dashboard}/marketing`,
    settings: `${PREFIX.dashboard}/settings`,
    invites: `${PREFIX.dashboard}/settings/teammates/invites`,
    permissions: `${PREFIX.dashboard}/settings/teammates/invites/permissions`,
    integration: `${PREFIX.integration}`,
    cova: `${PREFIX.integration}/cova-integration`,
    covaUpdate: `${PREFIX.integration}/cova-update/:id`,
    twilio: `${PREFIX.integration}/twilio-integration`,
    twilioSendMessage: `${PREFIX.integration}/twilio-send-message`,
    twilioUpdate: `${PREFIX.integration}/twilio-update/:id`,
    addContact: `${PREFIX.dashboard}/add-contact`,
    customerProfile: `${PREFIX.dashboard}/contact`,
    calendar: `${PREFIX.dashboard}/calendar`,
    emailTemplates: `${PREFIX.dashboard}/create-email-template`,
    pageTemplates: `${PREFIX.dashboard}/create-page-template`,
    popUpTemplates: `${PREFIX.dashboard}/create-popup-templates`,
    teams: `${PREFIX.dashboard}/teams`,
  },

  authentication: {
    login: `${PREFIX.auth}/login`,
    signUp: `/sign-up`,
    forgotPassword: `/forgot-password`,
    resetPassword: `/reset-password`,
  },
  workspaces: {
    root: PREFIX.workspaces,
    add: `${PREFIX.workspaces}/add`,
    no_workspaces: `${PREFIX.workspaces}/no_workspaces`,
  },
  teams: {
    join: `${PREFIX.teams}/join`,
    sign_up: `${PREFIX.teams}/sign_up`,
  },
  emailVerification: {
    verificationPage: `${PREFIX.verification}/email-verification`,
    verifyEmail: `${PREFIX.verification}/email-verification/:code`,
  },
} as const;

export default routeNames;
