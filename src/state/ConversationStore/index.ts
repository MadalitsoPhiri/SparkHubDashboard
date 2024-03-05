/* eslint-disable @typescript-eslint/no-empty-function */
import { CONVERSATION_SORT, UPLOAD_STATUS } from '@/constants/index';
import { makeAutoObservable, observable } from 'mobx';
import { Conversation } from 'types/conversation.types';
import { Message } from 'types/message.type';
import { User } from 'types/user.types';

export class ConversationStore {
  traffic = [];
  selectedIndex = null;
  selectedType = null;
  searchMode = false;
  searchTerm = '';
  loading = true;
  is_side_panel_open = true;
  getConversationsFailed = undefined;
  lastOpenConversationResponse: any = null;
  lastClosedConversationResponse: any = null;
  cons = observable(new Map<string, Conversation>());
  open_conversations: Array<any> = [];
  unread_conversations = 0;
  search_conversations: Array<any> = [];
  play_notification = false;
  closed_conversations: Array<any> = [];
  open_conversations_count = 0;
  closed_conversations_count = 0;
  upload_queue: Array<any> = [];
  upload_state = {
    progress: 0.0,
    uploading: false,
    cancel_upload: false,
    file_id: null,
  };
  typing_status_timeout: Record<string, NodeJS.Timeout> = {};
  typing_status: Record<string, any> = {};
  conversation_typing_status: Record<string, any> = {};
  selected_conversation_id: string | null = null;
  selected_thread_id: string | null = null;
  fetching_conversations = true;
  fetching_closed_conversations = true;
  fetching_more_open_conversations = false;
  fetching_more_closed_conversations = false;
  reRenderMessages = true;
  reRenderConversationList = true;
  finalMessageLists: Record<string, Message[]> = {};
  finalConversationList: Message[] = [];
  sorted_by = CONVERSATION_SORT.LATEST;

  constructor() {
    makeAutoObservable(this);
  }
  requestTotalConversation() {
    this.getConversationsFailed = undefined;
  }
  update_unread_conversations(value: number) {
    this.unread_conversations = value;
  }
  setReRenderMessages(value: boolean) {
    this.reRenderMessages = value;
  }
  setReRenderConversationList(value: boolean) {
    this.reRenderConversationList = value;
  }
  set_fetching_conversations(payload: boolean) {
    this.fetching_conversations = payload;
  }
  set_play_notification(play: boolean) {
    this.play_notification = play;
  }
  set_closed_fetching_conversations(payload: any) {
    this.fetching_closed_conversations = payload;
  }
  set_fetching_more_open_conversations(payload: any) {
    this.fetching_more_open_conversations = payload;
  }
  set_fetching_more_closed_conversations(payload: any) {
    this.fetching_more_closed_conversations = payload;
  }
  set_selected_conversation_id(id: string | null) {
    this.selected_conversation_id = id;
  }
  set_open_conversations_count(newVal: number) {
    this.open_conversations_count = newVal;
  }
  set_closed_conversations_count(newVal: number) {
    this.closed_conversations_count = newVal;
  }
  set_fetching_messages(payload: any) {
    const { conversation_id, is_fetching } = payload;
    if (conversation_id && is_fetching != undefined) {
      const con = this.cons.get(conversation_id);
      if (con) {
        con.fetching_messages = is_fetching;
        this.cons.set(conversation_id, con);
      }
    }
  }
  setSearchMode(mode: boolean) {
    this.searchMode = mode;
  }
  cancelCurrentAttachmentsUpload() {
    this.upload_state.cancel_upload = true;
  }
  remove_conversations_by_userId(payload: any) {
    const { _id } = payload;
    const current_cons = this.cons;
    current_cons.forEach((value, key) => {
      if ((value.lead as User)?._id === _id) {
        current_cons.delete(key);
      }
    });
    this.cons = current_cons;
    this.selected_conversation_id = null;
  }
  set_fetched_messages(payload: any) {
    const { conversation_id, fetched } = payload;
    if (conversation_id && fetched) {
      if (this.cons.has(conversation_id)) {
        const con = this.cons.get(conversation_id);
        if (con) {
          con.fetched_messages = fetched;
          this.cons.set(conversation_id, con);
        }
      }
    }
  }
  isUploadQueueEmpty(payload: any) {
    const { callback = () => {} } = payload;
    callback(this.upload_queue.length <= 0);
  }
  peakUploadQueue(payload: any) {
    const { callback = () => {} } = payload;
    if (this.upload_queue.length) {
      callback(this.upload_queue[0]);
    } else {
      callback(null);
    }
  }
  queueUpload(payload: any) {
    if (payload) {
      this.upload_queue.push(payload);
      this.upload_queue = [...this.upload_queue];
    }
  }
  dequeueUpload() {
    this.upload_queue.shift();
    this.upload_queue = [...this.upload_queue];
  }

  updateFileAttachmentState(payload: any) {
    const { file_id, status, url } = payload;
    const con = this.cons.get(file_id.split('-')[0]);
    if (con) {
      const index = con?.attachments?.findIndex(
        (item: any) => item.file.id === file_id,
      );
      if (index != undefined && index != null && con) {
        if (con.attachments) {
          con.attachments[index].status = status;
          con.attachments[index].url = url;
          con.attachments = [...(con.attachments as any[])];
          this.cons.set(file_id.split('-')[0], con);
          this.setReRenderConversationList(true);
          this.setReRenderMessages(true);
        }
      }
    }
  }
  removeAttachment(payload: any) {
    const { conversationId, index } = payload;
    if (conversationId && index != undefined) {
      const con = this.cons.get(conversationId);

      if (con) {
        const temp = [...(con.attachments as any[])];
        const temp_attachment = temp[index];
        this.upload_queue = this.upload_queue.filter(
          attachment => attachment.id != temp_attachment.file.id,
        );
        temp.splice(index, 1);
        con.attachments = temp;
        this.cons.set(conversationId, con);
        this.setReRenderConversationList(true);
      }
    }
  }
  clearAttachments(payload: any) {
    const { conversationId } = payload;
    if (conversationId) {
      const con = this.cons.get(conversationId);
      if (con) {
        con.attachments = [];
        this.cons.set(conversationId, con);
        this.setReRenderConversationList(true);
      }
    }
  }
  set_is_sending_message(payload: any) {
    const { conversation_id, is_sending } = payload;
    if (conversation_id && is_sending) {
      if (this.cons.has(conversation_id)) {
        const con = this.cons.get(conversation_id);
        if (con) {
          con.sending_message = is_sending;
          this.cons.set(conversation_id, con);
          this.setReRenderConversationList(true);
          this.setReRenderMessages(true);
        }
      }
    }
  }
  update_sent_message(payload: any) {
    const { old_id, msg, conversation_id } = payload;
    if (old_id && msg && conversation_id) {
      if (this.cons.has(conversation_id)) {
        const con = this.cons.get(conversation_id);
        if (con) {
          con.last_message = msg;
          if (con.messages) {
            con.messages.set(msg._id, { ...msg, status: 'default' });
            con.messages.delete(old_id);
          }
          this.cons.set(conversation_id, con);
          this.setReRenderConversationList(true);
          this.setReRenderMessages(true);
        }
      }
    }
  }
  updateUploadState(payload: any) {
    const { progress, uploading, cancel_upload = false, file_id } = payload;
    this.upload_state = { progress, uploading, cancel_upload, file_id };
  }
  updateUploadProgress(payload: any) {
    const { progress, file_id } = payload;
    this.upload_state.progress = progress;
    this.upload_state.file_id = file_id;
  }
  add_to_upload_queue(payload: any) {
    const { files } = payload;
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        this.upload_queue.push(files[i]);
      }
    }
  }
  add_messages(payload: any) {
    const { conversation_id, messages } = payload;
    if (conversation_id && messages) {
      const con = this.cons.get(conversation_id);
      if (con) {
        con.fetched_messages = true;
        con.fetching_messages = false;
        if (!con.messages) {
          con.messages = observable(new Map());
        }
        messages.forEach((msg: any) => {
          con.messages?.set(msg._id, { ...msg, status: 'default' });
        });

        this.cons.set(conversation_id, con);
        this.setReRenderConversationList(true);
        this.setReRenderMessages(true);
      }
      const conversation_index = this.open_conversations.findIndex(
        (value: any) => value._id === conversation_id,
      );
      if (conversation_index >= 0) {
        this.open_conversations[conversation_index].messages.push(messages);
      }
    }
  }
  add_new_message(payload: any) {
    const { msg, status } = payload;
    if (msg && status) {
      if (typeof msg.conversation === 'object') {
        const conversation_index = this.open_conversations.findIndex(
          value => value._id === msg.conversation._id,
        );

        if (conversation_index) {
          this.open_conversations[conversation_index].messages.set(
            msg._id,
            msg,
          );
          this.open_conversations[conversation_index].last_message = msg;
        }

        if (this.cons.has(msg.conversation._id)) {
          const con = this.cons.get(msg.conversation._id);
          if (con) {
            con.messages?.set(msg._id, {
              ...msg,
              status,
            });
            con.last_message = msg;
            this.cons.set(msg.conversation._id, con);
            this.setReRenderConversationList(true);
            this.setReRenderMessages(true);
          }
        }
      } else if (typeof msg.conversation === 'string') {
        const conversation_index = this.open_conversations.findIndex(
          value => value._id === msg.conversation,
        );

        if (conversation_index) {
          this.open_conversations[conversation_index].messages.set(
            msg._id,
            msg,
          );
          this.open_conversations[conversation_index].last_message = msg;
        }

        if (this.cons.has(msg.conversation)) {
          const con = this.cons.get(msg.conversation);
          if (con) {
            if (!con.messages) {
              con.messages = observable(new Map());
            }
            con.messages.set(msg._id, {
              ...msg,
              status,
            });
            con.last_message = msg;
            this.cons.set(msg.conversation, con);
            this.setReRenderConversationList(true);
            this.setReRenderMessages(true);
          }
        }
      } else {
        //...
      }
    }
  }
  set_updating_convo(payload: any) {
    if (payload !== undefined) {
      const { conversation_id, updating } = payload;
      if (this.cons.has(conversation_id)) {
        const con = this.cons.get(conversation_id);
        if (con) {
          con.updating_convo = updating;
          this.cons.set(conversation_id, con);
          this.setReRenderConversationList(true);
          this.setReRenderMessages(true);
        }
      }
    }
  }
  add_new_conversation(payload: any) {
    const { message, conversation } = payload;
    if (conversation) {
      let processed_message = null;
      if (message) {
        processed_message = { ...message, status: 'default' };
        conversation.messages = observable(
          new Map([[message._id, processed_message]]),
        );
      }
      this.cons.set(conversation._id, {
        ...conversation,
        fetching_messages: false,
        fetched_messages: true,
        sending_message: false,
        typing: null,
        updating_convo: false,
        attachments: [],
        attachments_uploaded: true,
      });
      this.setReRenderConversationList(true);
      this.open_conversations.push({
        ...conversation,
        messages:
          message && processed_message
            ? observable(new Map([[message._id, processed_message]]))
            : observable(new Map()),
        fetching_messages: false,
        fetched_messages: true,
        sending_message: false,
        typing: null,
        updating_convo: false,
        attachments: [],
        attachments_uploaded: true,
      });
    }

    ConStore.set_open_conversations_count(
      ConStore.open_conversations_count + 1,
    );
  }
  update_conversation(payload: any) {
    const { conversation } = payload;
    if (conversation) {
      const con = this.cons.get(conversation._id);
      if (con) {
        this.cons.set(conversation._id, {
          ...conversation,
          messages: con.messages,
          fetching_messages: con.fetching_messages,
          fetched_messages: con.fetched_messages,
          sending_message: con.sending_message,
          typing: con.typing,
          updating_convo: con.updating_convo,
        });
        this.setReRenderConversationList(true);
      }
    }
  }
  get_conversations_successful(payload: any) {
    this.fetching_conversations = false;
    this.lastOpenConversationResponse = payload;
    //TODO:process conversations here

    if (!(payload?.conversations?.length > 0)) {
      this.cons?.clear();
      this.open_conversations = [];
      this.set_open_conversations_count(0);

      return;
    }

    const conversations = payload.conversations ?? [];
    this.set_open_conversations_count(payload?.count);

    conversations.forEach((con: any) => {
      this.cons.set(con._id, {
        ...con,
        messages: observable(new Map()),
        fetching_messages: false,
        fetched_messages: false,
        sending_message: false,
        typing: null,
        updating_convo: false,
        attachments: [],
        attachments_uploaded: true,
      });
    });
    this.setReRenderConversationList(true);

    this.open_conversations = conversations.map((conversation: any) => {
      return {
        ...conversation,
        messages: [],
        fetching_messages: false,
        fetched_messages: false,
        sending_message: false,
        typing: null,
        updating_convo: false,
        attachments: [],
        attachments_uploaded: true,
      };
    });
  }
  get_more_open_conversations_successful(payload: any) {
    const { conversations } = payload;

    this.lastOpenConversationResponse = payload;
    const new_cons = conversations.map((conversation: any) => {
      return {
        ...conversation,
        messages: [],
        fetching_messages: false,
        fetched_messages: false,
        sending_message: false,
        typing: null,
        updating_convo: false,
        attachments: [],
        attachments_uploaded: true,
      };
    });
    this.open_conversations.push(...new_cons);
  }
  get_more_closed_conversations_successful(payload: any) {
    const { conversations } = payload;
    this.lastOpenConversationResponse = payload;
    const new_cons = conversations.map((conversation: any) => {
      return {
        ...conversation,
        messages: [],
        fetching_messages: false,
        fetched_messages: false,
        sending_message: false,
        typing: null,
        updating_convo: false,
        attachments: [],
        attachments_uploaded: true,
      };
    });
    this.closed_conversations.push(...new_cons);
  }
  get_closed_conversations_successful(payload: any) {
    this.fetching_closed_conversations = false;

    //TODO:process conversations here
    const conversations = payload?.conversations ?? [];
    ConStore.set_closed_conversations_count(
      payload?.count ?? ConStore.closed_conversations_count,
    );

    this.lastClosedConversationResponse = payload;
    conversations.forEach((con: any) => {
      this.cons.set(con._id, {
        ...con,
        messages: observable(new Map()),
        fetching_messages: false,
        fetched_messages: false,
        sending_message: false,
        typing: null,
        updating_convo: false,
        attachments: [],
        attachments_uploaded: true,
      });
    });
    this.setReRenderConversationList(true);
    this.closed_conversations = conversations.map((conversation: any) => {
      return {
        ...conversation,
        messages: [],
        fetching_messages: false,
        fetched_messages: false,
        sending_message: false,
        typing: null,
        updating_convo: false,
        attachments: [],
        attachments_uploaded: true,
      };
    });
  }
  get_contact_conversations_successful(payload: Conversation[]) {
    this.fetching_conversations = false;

    const contactConversationsMap = observable(
      new Map(payload.map((con: Conversation) => [con._id as string, con])),
    );

    this.cons = contactConversationsMap;
  }
  clear_open_conversations() {
    this.open_conversations = [];
    this.set_open_conversations_count(0);
  }
  clear_closed_conversations() {
    this.closed_conversations = [];
    this.set_closed_conversations_count(0);
  }

  update_typing_status(payload: any) {
    if (payload != null || payload != undefined) {
      const { conversation_id, user_id } = payload;
      this.conversation_typing_status[conversation_id] = {
        [user_id]: payload,
      };
      payload;
    }
  }
  add_attachments(payload: any) {
    const { files, conversationId } = payload;
    if (files && files?.length) {
      const con = this.cons.get(conversationId);
      const final = [];
      for (let i = 0; i < files.length; i++) {
        final.push({
          file: files[i],
          status: UPLOAD_STATUS.WAITING,
          url: null,
        });
      }
      if (con) {
        con.attachments_uploaded = false;
        con.attachments = [...final, ...(con.attachments as any[])];
        this.cons.set(conversationId, con);
        this.setReRenderConversationList(true);
      }
    }
  }
  getConversationsLoading() {
    this.loading = true;
  }
  set_conversation_state_initial_state() {
    this.cons = observable(new Map());
  }
  set_typing_status(payload: any) {
    if (payload) {
      const { conversation_id, status } = payload;
      this.typing_status[conversation_id] = { status };
    }
  }
  set_read_receipts(payload: any) {
    if (payload) {
      const { conversation_id, messages } = payload;
      const conversation = this.cons.get(conversation_id);
      const current_messages = conversation?.messages;
      messages.forEach((message: any) => {
        const updated_msg = { ...message, seen: true };
        current_messages?.set(message._id, updated_msg);
        if (conversation && conversation?.last_message?._id === message._id) {
          (conversation.last_message as Message).seen = true;
        }
      });
      if (conversation) {
        conversation.messages = current_messages;
        this.cons.set(conversation_id, conversation);
        this.setReRenderConversationList(true);
        this.setReRenderMessages(true);
      }
    }
  }
  set_typing_status_timeout(payload: {
    conversation_id: string;
    timeout: NodeJS.Timeout;
  }) {
    if (payload) {
      const { conversation_id, timeout } = payload;
      this.typing_status_timeout[conversation_id] = timeout;
    }
  }
  updateSelectedIndex(payload: any) {
    this.selectedIndex = payload.index;
    this.selectedType = payload.type;
  }
  setSidePanelOpen() {
    this.is_side_panel_open = !this.is_side_panel_open;
  }
  set_sorted_by(payload: any) {
    if (payload) {
      this.sorted_by = payload;
    }
  }

  remove_message(payload: any) {
    const conversation = payload.messageData.conversation;
    if (conversation) {
      if (this.cons.has(conversation._id)) {
        const con = this.cons.get(conversation._id);
        if (con?.messages) {
          con.messages?.delete(payload.messageData._id);

          con.last_message = Array.from(
            con.messages.values(),
          )?.pop() as Message;

          this.cons.set(conversation._id, con);
          this.setReRenderConversationList(true);
        }
      }
    }
  }
  setSearchTerm(term: string) {
    this.searchTerm = term;
  }
  setSearchConversations(conversations: Array<any>) {
    const final_converations: any[] = [];
    conversations.forEach(item => {
      if (!this.cons.has(item[0])) {
        this.cons.set(item[0], item[1]);
      }
      final_converations.push({
        ...item[1]?._doc,
        last_message: item[1].messages[0],
      });
    });
    this.search_conversations = final_converations;
  }
}
export const ConStore = new ConversationStore();
