import { FilterTabOption } from '@/components/molecules/FilterTabs';

let BASE_URL = import.meta.env.VITE_API_BASE_URL;
const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

if (import.meta.env.VITE_NODE_ENV !== 'development') {
  BASE_URL = 'https://www.getsparky.io';
}
export { APP_BASE_URL, BASE_URL, USERTYPE };

const USERTYPE = {
  AGENT: 'AGENT',
  CLIENT: 'CLIENT',
};

export const UPLOAD_STATUS = {
  WAITING: 'waiting',
  UPLOADING: 'uploading',
  ERRORED: 'error',
  COMPLETED: 'completed',
};
export const ATTACHMENT_TYPE = {
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  FILE: 'FILE',
  CODE_SNIPPET: 'CODE_SNIPPET',
  STICKER: 'STICKER',
  IMAGE: 'IMAGE',
};
export const CONVERSATION_STATUS = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  SNOOZED: 'SNOOZED',
};
export const CONVERSATION_TYPE = {
  GROUP: 'GROUP',
  COLABORATION: 'COLABORATON',
  SINGLE: 'SINGLE',
};

export const MESSAGE_STATUS = {
  SENDING: 'sending',
  DEFAULT: 'default',
};

export const CONVERSATION_SORT_OPTIONS = {
  LATEST: { name: 'Latest' },
  OLDEST: { name: 'Oldest' },
};

export enum CONVERSATION_SORT {
  LATEST = 'Latest',
  OLDEST = 'Oldest',
}

export const USER_TOKEN = '_ki';

export const signUpSelectOptions = [
  { label: '1 - 4 Employees', value: 'XXS' },
  { label: '5 - 9 Employees', value: 'XS' },
  { label: '10 - 49 Employees', value: 'SM' },
  { label: '50 - 199 Employees', value: 'MD' },
  { label: '200 - 499 Employees', value: 'LG' },
  { label: '500 - 999 Employees', value: 'XL' },
  { label: '1000+ Employees', value: 'XXL' },
];

export const contacts_menu = [
  {
    id: 1,
    title: 'Create new contact',
  },
  {
    id: 2,
    title: 'Import people',
  },
];

export const filterOperators = [
  {
    id: 1,
    name: 'Equals',
    value: 'equals',
  },
  {
    id: 2,
    name: 'Not Equal To',
    value: 'not_equal_to',
  },
  {
    id: 3,
    name: 'Contains',
    value: 'contains',
  },
  {
    id: 4,
    name: 'Greater Than',
    value: 'greater_than',
  },
  {
    id: 5,
    name: 'Less Than',
    value: 'less_than',
  },
  {
    id: 6,
    name: 'Greater Or Equal',
    value: 'greater_or_equal',
  },
  {
    id: 7,
    name: 'Less Or Equal',
    value: 'less_or_equal',
  },
] as const;

type TaskType = {
  icon: string;
  color: string;
  label: string;
};

export const taskTypes: Record<string, TaskType> = {
  Call: {
    icon: 'ic:round-phone',
    color: 'violet-800',
    label: 'Call',
  },
  Task: {
    icon: 'icons8:tasks',
    color: 'orange-900',
    label: 'Task',
  },
  Note: {
    icon: 'icons8:tasks',
    color: 'orange-900',
    label: 'Note',
  },
  Email: {
    icon: 'fluent:mail-24-filled',
    color: 'cyan-900',
    label: 'Email',
  },
  Tag: {
    icon: 'fluent:tag-24-filled',
    color: 'black/60',
    label: 'Tag',
  },
};

export const iconWrapperBgColorMap: Record<string, string> = {
  Call: 'bg-[#F7F6FF]',
  Task: 'bg-[#FFF8F1]',
  Note: 'bg-[#92b76229]',
  Email: 'bg-[#F0FFFF]',
  Tag: 'bg-[#F7F6FF]',
};

export const TASK_FILTERS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Overdue',
    value: 'overdue',
  },
  {
    label: 'Due Today',
    value: 'due_today',
  },
  {
    label: 'Up Coming',
    value: 'up_coming',
  },
  {
    label: 'Completed',
    value: 'completed',
  },
];

export enum COMPANY_SIZE {
  XXS = 'XXS',
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  XXL = 'XXL',
}

export enum MESSAGE_TYPE {
  ARTICLE = 'ARTICLE',
  NOTE = 'NOTE',
  TEXT = 'TEXT',
  INFO = 'INFO',
  WARNING = 'WARNING',
  PROMPT = 'PROMPT',
  SURVEY_ANSWER = 'SURVEY_ANSWER',
  REPLY = 'REPLY',
}
export const priorityOptions = [
  {
    label: 'High',
    value: 'high',
  },
  {
    label: 'Medium',
    value: 'medium',
  },
  {
    label: 'Low',
    value: 'low',
  },
];

export const taskStatusOptions = [
  {
    label: 'Done',
    value: 'done',
  },
  {
    label: 'To Do',
    value: 'to_do',
  },
  {
    label: 'In Progress',
    value: 'in_progress',
  },
];

export const taskFilterTabOptions: FilterTabOption[] = [
  { id: 1, title: 'All', icon: null, type: 'tab' },
  { id: 2, title: 'Overdue', icon: null, type: 'tab' },
  { id: 3, title: 'Due Today', icon: null, type: 'tab' },
  { id: 4, title: 'Upcoming', icon: null, type: 'tab' },
  { id: 5, title: 'Add Task', icon: null, type: 'button' },
];
export const weeklyTaskFilterTabOptions: FilterTabOption[] = [
  { id: 1, title: 'All', icon: null, type: 'tab' },
  { id: 2, title: 'Overdue', icon: null, type: 'tab' },
  { id: 3, title: 'Due Today', icon: null, type: 'tab' },
  { id: 4, title: 'Upcoming', icon: null, type: 'tab' },
];

export const officeOpenDays = [
  { id: 1, name: 'Every day' },
  { id: 2, name: 'Weekdays' },
  { id: 3, name: 'Weekends' },
  { id: 4, name: 'Monday' },
  { id: 5, name: 'Tuesday' },
  { id: 6, name: 'Wednesday' },
  { id: 7, name: 'Thursday' },
  { id: 8, name: 'Friday' },
  { id: 9, name: 'Saturday' },
  { id: 10, name: 'Sunday' },
];

export const contactCsvData = [
  {
    'First Name': 'Jane',
    'Last Name': 'Doe',
    Email: 'jane@sparknspur.com',
    Phone: '+14168221234',
    'Company Name': 'spark&spur',
    'Company Website': 'sparkandspur.com',
  },
  {
    'First Name': 'John',
    'Last Name': 'Doe',
    Email: 'john@sparknspur.com',
    Phone: '+14168221234',
    'Company Name': 'spark&spur',
    'Company Website': 'sparkandspur.com',
  },
];

export const emojiList = [
  { name: 'grinning face', jsCode: '\u{1F600}', code: 'U+1F600' },
  {
    name: 'grinning face with big eyes',
    jsCode: '\u{1F603}',
    code: 'U+1F603',
  },
  {
    name: 'grinning face with smiling eyes',
    jsCode: '\u{1F604}',
    code: 'U+1F604',
  },
  {
    name: 'beaming face with smiling eyes',
    jsCode: '\u{1F601}',
    code: 'U+1F601',
  },
  {
    name: 'grinning squinting face',
    jsCode: '\u{1F606}',
    code: 'U+1F606',
  },
  {
    name: 'grinning face with sweat',
    jsCode: '\u{1F605}',
    code: 'U+1F605',
  },
  {
    name: 'rolling on the floor laughing',
    jsCode: '\u{1F923}',
    code: 'U+1F923',
  },
  {
    name: 'face with tears of joy',
    jsCode: '\u{1F602}',
    code: 'U+1F602',
  },
  {
    name: 'slightly smiling face',
    jsCode: '\u{1F642}',
    code: 'U+1F642',
  },
  {
    name: 'upside-down face',
    jsCode: '\u{1F643}',
    code: 'U+1F643',
  },
  {
    name: 'melting face',
    jsCode: '\u{1FAE0}',
    code: 'U+1FAE0',
  },
  {
    name: 'winking face',
    jsCode: '\u{1F609}',
    code: 'U+1F609',
  },
  {
    name: 'smiling face with smiling eyes',
    jsCode: '\u{1F60A}',
    code: 'U+1F60A',
  },
  {
    name: 'smiling face with halo',
    jsCode: '\u{1F607}',
    code: 'U+1F607',
  },
  {
    name: 'smiling face with hearts',
    jsCode: '\u{1F970}',
    code: 'U+1F970',
  },
  {
    name: 'smiling face with heart-eyes',
    jsCode: '\u{1F60D}',
    code: 'U+1F60D',
  },
  {
    name: 'star-struck',
    jsCode: '\u{1F929}',
    code: 'U+1F929',
  },
  {
    name: 'face blowing a kiss',
    jsCode: '\u{1F618}',
    code: 'U+1F618',
  },
  {
    name: 'kissing face',
    jsCode: '\u{1F617}',
    code: 'U+1F617',
  },
  {
    name: 'kissing face with closed eyes',
    jsCode: '\u{1F61A}',
    code: 'U+1F61A',
  },
  {
    name: 'kissing face with smiling eyes',
    jsCode: '\u{1F619}',
    code: 'U+1F619',
  },
  {
    name: 'smiling face with tear',
    jsCode: '\u{1F972}',
    code: 'U+1F672',
  },
  {
    name: 'face savoring food',
    jsCode: '\u{1F60B}',
    code: 'U+1F60B',
  },
  {
    name: 'winking face with tongue',
    jsCode: '\u{1F61C}',
    code: 'U+1F61C',
  },
  {
    name: 'zany face',
    jsCode: '\u{1F92A}',
    code: 'U+1F92A',
  },
  {
    name: 'squinting face with tongue',
    jsCode: '\u{1F61D}',
    code: 'U+1F61D',
  },
  {
    name: 'money-mouth face',
    jsCode: '\u{1F911}',
    code: 'U+1F911',
  },
  {
    name: 'smiling face with open hands',
    jsCode: '\u{1F917}',
    code: 'U+1F917',
  },
  {
    name: 'face with hand over mouth',
    jsCode: '\u{1F92D}',
    code: 'U+1F92D',
  },
  {
    name: 'face with open eyes and hand over mouth',
    jsCode: '\u{1FAE2}',
    code: 'U+1FAE2',
  },
  {
    name: 'face with peeking eye',
    jsCode: '\u{1FAE3}',
    code: 'U+1FAE3',
  },
  {
    name: 'shushing face',
    jsCode: '\u{1F92B}',
    code: 'U+1F92B',
  },
  {
    name: 'thinking face',
    jsCode: '\u{1F914}',
    code: 'U+1F914',
  },
  {
    name: 'saluting face',
    jsCode: '\u{1FAE1}',
    code: 'U+1FAE1',
  },
  {
    name: 'zipper-mouth face',
    jsCode: '\u{1F910}',
    code: 'U+1F910',
  },
  {
    name: 'face with raised eyebrow',
    jsCode: '\u{1F928}',
    code: 'U+1F928',
  },
  {
    name: 'neutral face',
    jsCode: '\u{1F610}',
    code: 'U+1F610',
  },
  {
    name: 'expressionless face',
    jsCode: '\u{1F611}',
    code: 'U+1F611',
  },
  {
    name: 'face without mouth',
    jsCode: '\u{1F636}',
    code: 'U+1F636',
  },
  { name: 'dotted line face', jsCode: '\u{1FAE2}', code: 'U+1FAE2' },
  { name: 'smirking face', jsCode: '\u{1F60F}', code: 'U+1F60F' },
  { name: 'face with rolling eyes', jsCode: '\u{1F644}', code: 'U+1F644' },
  { name: 'grimacing face', jsCode: '\u{1F62C}', code: 'U+1F62C' },
  { name: 'face exhaling', jsCode: '\u{1F62E}', code: 'U+1F62E' },
  { name: 'lying face', jsCode: '\u{1F925}', code: 'U+1F925' },
  { name: 'relieved face', jsCode: '\u{1F90C}', code: 'U+1F90C' },
  { name: 'pensive face', jsCode: '\u{1F614}', code: 'U+1F614' },
  { name: 'sleepy face', jsCode: '\u{1F62A}', code: 'U+1F62A' },
  { name: 'drooling face', jsCode: '\u{1F924}', code: 'U+1F924' },
  { name: 'sleeping face', jsCode: '\u{1F634}', code: 'U+1F634' },
  { name: 'face with medical mask', jsCode: '\u{1F637}', code: 'U+1F637' },
  { name: 'face with thermometer', jsCode: '\u{1F912}', code: 'U+1F912' },
  { name: 'face with thermometer', jsCode: '\u{1F912}', code: 'U+1F912' },
  { name: 'face with head-bandage', jsCode: '\u{1F915}', code: 'U+1F915' },
  { name: 'nauseated face', jsCode: '\u{1F922}', code: 'U+1F922' },
  { name: 'face vomiting', jsCode: '\u{1F92E}', code: 'U+1F92E' },
  { name: 'sneezing face', jsCode: '\u{1F927}', code: 'U+1F927' },
  { name: 'hot face', jsCode: '\u{1F925}', code: 'U+1F925' },
  { name: 'cold face', jsCode: '\u{1F976}', code: 'U+1F976' },
  { name: 'woozy face', jsCode: '\u{1F974}', code: 'U+1F974' },
  {
    name: 'face with crossed-out eyes',
    jsCode: '\u{1F635}',
    code: 'U+1F635',
  },
  {
    name: 'exploding head',
    jsCode: '\u{1F92F}',
    code: 'U+1F92F',
  },
  {
    name: 'cowboy hat face',
    jsCode: '\u{1F920}',
    code: 'U+1F920',
  },
  {
    name: 'partying face',
    jsCode: '\u{1F973}',
    code: 'U+1F920',
  },
  {
    name: 'disguised face',
    jsCode: '\u{1F978}',
    code: 'U+1F978',
  },
  {
    name: 'smiling face with sunglasses',
    jsCode: '\u{1F60E}',
    code: 'U+1F60E',
  },
  {
    name: 'nerd face',
    jsCode: '\u{1F913}',
    code: 'U+1F913',
  },
  {
    name: 'face with monocle',
    jsCode: '\u{1F9D0}',
    code: 'U+1F9D0',
  },
  {
    name: 'confused face',
    jsCode: '\u{1F615}',
    code: 'U+1F615',
  },
  {
    name: 'face with diagonal mouth',
    jsCode: '\u{1FAE4}',
    code: 'U+1FAE4',
  },
  {
    name: 'worried face',
    jsCode: '\u{1F61F}',
    code: 'U+1F61F',
  },
  {
    name: 'slightly frowning face',
    jsCode: '\u{1F641}',
    code: 'U+1F641',
  },
  {
    name: 'face with open mouth',
    jsCode: '\u{1F62E}',
    code: 'U+1F62E',
  },
  {
    name: 'hushed face',
    jsCode: '\u{1F62F}',
    code: 'U+1F62F',
  },
  {
    name: 'astonished face',
    jsCode: '\u{1F632}',
    code: 'U+1F632',
  },
  {
    name: 'flushed face',
    jsCode: '\u{1F633}',
    code: 'U+1F633',
  },
  {
    name: 'pleading face',
    jsCode: '\u{1F97A}',
    code: 'U+1F97A',
  },
  {
    name: 'face holding back tears',
    jsCode: '\u{1F979}',
    code: 'U+1F979',
  },
  {
    name: 'frowning face with open mouth',
    jsCode: '\u{1F626}',
    code: 'U+1F626',
  },
  {
    name: 'anguished face',
    jsCode: '\u{1F627}',
    code: 'U+1F627',
  },
  {
    name: 'fearful face',
    jsCode: '\u{1F628}',
    code: 'U+1F628',
  },
  {
    name: 'anxious face with sweat',
    jsCode: '\u{1F630}',
    code: 'U+1F630',
  },
  {
    name: 'sad but relieved face',
    jsCode: '\u{1F625}',
    code: 'U+1F625',
  },
  {
    name: 'crying face',
    jsCode: '\u{1F622}',
    code: 'U+1F622',
  },
  {
    name: 'loudly crying face',
    jsCode: '\u{1F62D}',
    code: 'U+1F62D',
  },
  {
    name: 'face screaming in fear',
    jsCode: '\u{1F631}',
    code: 'U+1F631',
  },
  {
    name: 'confounded face',
    jsCode: '\u{1F616}',
    code: 'U+1F616',
  },
  {
    name: 'persevering face',
    jsCode: '\u{1F623}',
    code: 'U+1F623',
  },
  {
    name: 'disappointed face',
    jsCode: '\u{1F61E}',
    code: 'U+1F61E',
  },
  {
    name: 'downcast face with sweat',
    jsCode: '\u{1F613}',
    code: 'U+1F613',
  },
  {
    name: 'weary face',
    jsCode: '\u{1F629}',
    code: 'U+1F629',
  },
  {
    name: 'tired face',
    jsCode: '\u{1F62B}',
    code: 'U+1F62B',
  },
  {
    name: 'yawning face',
    jsCode: '\u{1F971}',
    code: 'U+1F971',
  },
  {
    name: 'face with steam from nose',
    jsCode: '\u{1F624}',
    code: 'U+1F624',
  },
  {
    name: 'enraged face',
    jsCode: '\u{1F621}',
    code: 'U+1F621',
  },
  {
    name: 'angry face',
    jsCode: '\u{1F620}',
    code: 'U+1F620',
  },
  {
    name: 'face with symbols on mouth',
    jsCode: '\u{1F92C}',
    code: 'U+1F92C',
  },
  {
    name: 'smiling face with horns',
    jsCode: '\u{1F608}',
    code: 'U+1F608',
  },
  {
    name: 'angry face with horns',
    jsCode: '\u{1F47F}',
    code: 'U+1F47F',
  },
  {
    name: 'skull',
    jsCode: '\u{1F480}',
    code: 'U+1F480',
  },

  {
    name: 'waving hand',
    jsCode: '\u{1F44B}',
    code: 'U+1F44B',
  },
  {
    name: 'raised back of hand',
    jsCode: '\u{1F91A}',
    code: 'U+1F91A',
  },
  {
    name: 'hand with fingers splayed',
    jsCode: '\u{1F590}',
    code: 'U+1F590',
  },
  {
    name: 'raised hand',
    jsCode: '\u{270B}',
    code: 'U+270B',
  },
  {
    name: 'vulcan salute',
    jsCode: '\u{1F596}',
    code: 'U+1F596',
  },
  {
    name: 'rightwards hand',
    jsCode: '\u{1FAF1}',
    code: 'U+1FAF1',
  },
  {
    name: 'leftwards hand',
    jsCode: '\u{1FAF2}',
    code: 'U+1FAF2',
  },
  {
    name: 'palm down hand',
    jsCode: '\u{1FAF3}',
    code: 'U+1FAF3',
  },
  {
    name: 'palm up hand',
    jsCode: '\u{1FAF4}',
    code: 'U+1FAF4',
  },

  {
    name: 'OK hand',
    jsCode: '\u{1F44C}',
    code: 'U+1F44C',
  },
  {
    name: 'pinched fingers',
    jsCode: '\u{1F90C}',
    code: 'U+1F90C',
  },
  {
    name: 'pinching hand',
    jsCode: '\u{1F90F}',
    code: 'U+1F90F',
  },
  {
    name: 'victory hand',
    jsCode: '\u{270C}',
    code: 'U+270C',
  },
  {
    name: 'crossed fingers',
    jsCode: '\u{1F91E}',
    code: 'U+1F91E',
  },
  {
    name: 'hand with index finger and thumb crossed',
    jsCode: '\u{1FAF0}',
    code: 'U+1FAF0',
  },
  {
    name: 'love-you gesture',
    jsCode: '\u{1F91F}',
    code: 'U+1F91F',
  },
  {
    name: 'sign of the horns',
    jsCode: '\u{1F918}',
    code: 'U+1F918',
  },
  {
    name: 'call me hand',
    jsCode: '\u{1F919}',
    code: 'U+1F919',
  },
  {
    name: 'backhand index pointing left',
    jsCode: '\u{1F448}',
    code: 'U+1F448',
  },
  {
    name: 'backhand index pointing right',
    jsCode: '\u{1F449}',
    code: 'U+1F449',
  },
  {
    name: 'backhand index pointing up',
    jsCode: '\u{1F446}',
    code: 'U+1F446',
  },
  {
    name: 'middle finger',
    jsCode: '\u{1F595}',
    code: 'U+1F595',
  },
  {
    name: 'backhand index pointing down',
    jsCode: '\u{1F447}',
    code: 'U+1F447',
  },
  {
    name: 'index pointing up',
    jsCode: '\u{261D}',
    code: 'U+261D',
  },
  {
    name: 'index pointing at the viewer',
    jsCode: '\u{1FAF5}',
    code: 'U+1FAF5',
  },
  {
    name: 'thumbs up',
    jsCode: '\u{1F44D}',
    code: 'U+1F44D',
  },
  {
    name: 'thumbs down',
    jsCode: '\u{1F44E}',
    code: 'U+1F44D',
  },
  {
    name: 'raised fist',
    jsCode: '\u{270A}',
    code: 'U+270A',
  },
  {
    name: 'oncoming fist',
    jsCode: '\u{1F44A}',
    code: 'U+F44A',
  },
  {
    name: 'left-facing fist',
    jsCode: '\u{1F91B}',
    code: 'U+F91B',
  },
  {
    name: 'right-facing fist',
    jsCode: '\u{1F91C}',
    code: 'U+F91C',
  },
  {
    name: 'clapping hands',
    jsCode: '\u{1F44F}',
    code: 'U+F44F',
  },
  {
    name: 'raising hands',
    jsCode: '\u{1F64C}',
    code: 'U+1F64C',
  },
  {
    name: 'heart hands',
    jsCode: '\u{1FAF6}',
    code: 'U+1FAF6',
  },
  {
    name: 'open hands',
    jsCode: '\u{1F450}',
    code: 'U+1F450',
  },
  {
    name: 'palms up together',
    jsCode: '\u{1F932}',
    code: 'U+1F932',
  },
  {
    name: 'handshake',
    jsCode: '\u{1F91D}',
    code: 'U+1F91D',
  },
  {
    name: '	folded hands',
    jsCode: '\u{1F64F}',
    code: 'U+1F64F',
  },
];
