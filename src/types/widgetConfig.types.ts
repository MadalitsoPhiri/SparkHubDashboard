export type OfficeHours = {
  openDay: string;
  openTime: string;
  closeTime: string;
};
export type Availability = {
  reply_time?: string;
  officeHours?: OfficeHours[];
};

type Header = {
  main: string;
  description: string;
};

type ChatSuggestion = {
  suggestion1: string;
  suggestion2: string;
  suggestion3: string;
};

export type Greeting = {
  header: Header;
  chat_area_greeting_text: string;
};

export type Color = {
  border_color: string;
  btn_color: string;
  header_text_color: string;
  header_bg_color: string;
};

export type WidgetConfig = {
  fetching?: boolean;
  loading?: boolean;
  style: any;
  value: {
    _id?: string;
    availability?: Availability;
    colors?: any;
    allowed_origins?: string[];
    greetings?: Greeting;
    chat_suggestions?: ChatSuggestion;
    host_domain?: string;
    images?: {
      brand_logo_url: string;
    };
    code_snippet: string;
  } | null;
  questions: any;
  greetings: any;
  chat_suggestions: any;
};
