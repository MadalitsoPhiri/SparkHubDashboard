export const SOCKET_EVENT_NAMES = {
  // CHAT
  GET_CONVERSATIONS: 'get_conversations',
  GET_CONFIG: 'get_config',
  GET_MESSAGES: 'get_messages',
  UPDATE_USER_INFO: 'update_user_info',
  GET_USER_INFO: 'get_user_info',
  UPDATE_CONFIG: 'update_config',
  UPDATE_CON_TITLE: 'update_conversation_title',
  UPDATE_CON_STATUS: 'update_conversation_status',

  // NOTE
  GET_LEAD_NOTES: 'get_lead_notes',
  CREATE_LEAD_NOTE: 'create_lead_note',
  DELETE_LEAD_NOTE: 'delete_lead_note',
  UPDATE_LEAD_NOTE: 'update_lead_note',

  // TASK
  GET_TASKS: 'get_tasks',
  CREATE_TASK: 'create_task',
  DELETE_TASK: 'delete_task',
  UPDATE_TASK: 'update_task',

  // SparkGPT
  IMPORT_GOOGLE_DOC: 'import_google_doc',

  // AUTH

  // USER AND TEAMMATE
  GET_TEAMMATES: 'get_team_mates',
  INVITE_TEAMMATES: 'invite_team_mates',
  GET_INVITES: 'get_invites',
  RESEND_INVITE: 'resend_invite_to_team_mates',
  DELETE_INVITE: 'delete_invite',
  DELETE_TEAMMATE: 'delete_team_mate',

  // CONTACT
  CREATE_RECENTLY_VIEWED_CONTACTS: 'create_recently_viewed_contacts',
  CREATE_MY_CONTACTS: 'create_my_contacts',
  ASSIGN_CONTACT: 'assign_contact',

  // TAG
  GET_TAGS: 'get_tags',
  CREATE_TAG: 'create_tag',
  DELETE_TAG: 'delete_tag',

  // WORKSPACE
  CREATE_WORKSPACE: 'create_workspace',
  UPDATE_WORKSPACE: 'update_workspace',
  SWITCH_WORKSPACE: 'change_active_workspace_data',

  // EXTERNAL LINK
  CREATE_USER_EXTERNAL_LINK: 'create_user_external_link',
  GET_USER_EXTERNAL_LINKS: 'get_user_external_links',

  // STORAGE
  UPLOAD_FILE: 'upload',
  DELETE_FILE: 'delete_file',

  // CUSTOM FIELD
  CREATE_CUSTOM_FIELD: 'create_custom_field',
  GET_CUSTOM_FIELDS: 'get_custom_fields',
  DELETE_CUSTOM_FIELD: 'delete_custom_field',
  UPDATE_CUSTOM_FIELD: 'update_custom_field',
  UPDATE_CUSTOM_FIELD_VALUE: 'update_custom_field_value',
  GET_CUSTOM_FIELD_BY_CONTACT_ID: 'get_custom_field_by_contact_id',
} as const;
