import { makeAutoObservable } from 'mobx';

class WidgetConfigurationStore {
  isLoading = false;
  errors = {
    widget: null,
  };
  config: any = {
    fetching: true,
    style: {
      loading: false,
    },
    value: null,
    questions: { value: 3 },
  };
  faq = {
    is_adding_faq: false,
    faqs: [],
    fetching_faqs: true,
    is_add_editing: false,
    faq_active_index: null,
  };
  spark_gpt_survey = {
    is_adding_spark_gpt_question: false,
    spark_gpt_question_list: [],
    fetching_spark_gpt_question_list: true,
    is_editing_added_spark_gpt_question: false,
    active_spark_gpt_question_index: null,
  };
  old_brand_logo_url = '';
  constructor() {
    makeAutoObservable(this);
  }
  addConfig(payload: any) {
    this.config.value = payload;
    this.config.fetching = false;
    this.config.loading = false;
  }
  finishPublishLoading() {
    this.config.style.loading = false;
  }
  requestWidget() {
    this.isLoading = true;
  }
  requestWidgetSuccess() {
    this.isLoading = false;
    this.errors.widget = null;
    // this.widget = response;
  }
  requestWidgetFailed(payload: any) {
    this.isLoading = false;
    this.errors.widget = payload;
  }

  requestWidgetUpdate() {
    this.isLoading = true;
  }
  requestWidgetUpdateSuccess() {
    this.isLoading = false;
    this.errors.widget = null;
    // this.widget = payload?.response;
  }
  requestWidgetUpdateFailed(payload: any) {
    this.isLoading = false;
    this.errors.widget = payload;
  }

  switchStylingAccordion() {
    // const stylingIndex = this.accordion.styling.findIndex(item => {
    //   if (item.selected === true) {
    //     return true;
    //   }
    // });
    // if (stylingIndex != -1) {
    //   // found matching active accordion
    //   if (stylingIndex != payload)
    //     this.accordion.styling[stylingIndex].selected = false;
    // }
    // this.accordion.styling[payload].selected =
    //   !this.accordion.styling[payload].selected;
  }

  switchGeneralAccordion() {
    // const generalIndex = this.accordion.general.findIndex(item => {
    //   if (item.selected === true) {
    //     return true;
    //   }
    // });
    // if (generalIndex != -1) {
    //   // found matching active accordion
    //   if (generalIndex != payload)
    //     this.accordion.general[generalIndex].selected = false;
    // }
    // this.accordion.general[payload].selected =
    //   !this.accordion.general[payload].selected;
  }

  switchOffersAccordion() {
    // const offersIndex = this.accordion.offers.findIndex((item: any) => {
    //   if (item.selected === true) {
    //     return true;
    //   }
    // });
    // if (offersIndex != -1) {
    //   // found matching active accordion
    //   if (offersIndex != payload)
    //     this.accordion.offers[offersIndex].selected = false;
    // }
    // this.accordion.offers[payload].selected =
    //   !this.accordion.offers[payload].selected;
  }

  switchSetupAccordion() {
    // const setupIndex = this.accordion.setup.findIndex(item => {
    //   if (item.selected === true) {
    //     return true;
    //   }
    // });
    // if (setupIndex != -1) {
    //   // found matching active accordion
    //   if (setupIndex != payload)
    //     this.accordion.setup[setupIndex].selected = false;
    // }
    // this.accordion.setup[payload].selected =
    //   !this.accordion.setup[payload].selected;
  }

  switchSparkGPTAccordion() {
    // const sparkGPTIndex = this.accordion.sparkGPT.findIndex(item => {
    //   if (item.selected === true) {
    //     return true;
    //   }
    // });
    // if (sparkGPTIndex != -1) {
    //   // found matching active accordion
    //   if (sparkGPTIndex != payload)
    //     this.accordion.sparkGPT[sparkGPTIndex].selected = false;
    // }
    // this.accordion.sparkGPT[payload].selected =
    //   !this.accordion.sparkGPT[payload].selected;
  }

  updateHeaderTextColor(payload: any) {
    if (this.config.value) {
      this.config.value.colors.header_text_color = payload;
    }
  }
  updateHeaderBackgroundColor(payload: any) {
    if (this.config.value) {
      this.config.value.colors.header_bg_color = payload;
    }
  }

  updateBrandLogoUrl(payload: any) {
    if (this.config.value) {
      this.config.value.images.brand_logo_url = payload;
      this.old_brand_logo_url = '';
    }
  }

  removeBrandLogoUrl() {
    if (this.config.value) {
      this.old_brand_logo_url = this.config.value.images.brand_logo_url;
      this.config.value.images.brand_logo_url = '';
    }
  }

  updateAllowedOrigins(payload: any) {
    if (this.config.value && this.config.value?.allowed_origins !== undefined) {
      this.config.value.allowed_origins = payload;
    }
  }
  updateBorderColor(payload: any) {
    if (this.config.value) {
      this.config.value.colors.border_color = payload;
    }
  }
  updateButtonColor(payload: any) {
    if (this.config.value) {
      this.config.value.colors.btn_color = payload;
    }
  }
  set_fetching(payload: any) {
    if (payload) {
      this.config.fetching = payload;
    }
  }
  updateHeaderTextMain(payload: any) {
    this.config.value.greetings.header.main = payload;
  }
  updateHeaderTextDescription(payload: any) {
    this.config.value.greetings.header.description = payload;
  }
  updateChatAreaGreetingText(payload: any) {
    this.config.value.greetings.chat_area_greeting_text = payload;
  }

  updateChatSuggestion1(payload: any) {
    this.config.value.chat_suggestions.suggestion1 = payload;
  }
  updateChatSuggestion2(payload: any) {
    this.config.value.chat_suggestions.suggestion2 = payload;
  }
  updateChatSuggestion3(payload: any) {
    this.config.value.chat_suggestions.suggestion3 = payload;
  }

  updateDomainText(payload: any) {
    this.config.value.host_domain = payload;
  }

  set_widget_state_initial_state() {
    this.config.value = null;
  }
  set_fetching_faq(payload: any) {
    if (payload != undefined) {
      this.faq.fetching_faqs = payload;
    }
  }

  set_add_editing(payload: any) {
    if (payload != undefined) {
      this.faq.is_add_editing = payload;
    }
  }
  set_faq_active_index(payload: any) {
    this.faq.faq_active_index = payload;
  }
  set_is_adding_faq(payload: any) {
    if (payload != undefined) {
      this.faq.is_adding_faq = payload;
    }
  }
  add_faq(payload: any) {
    if (payload != undefined) {
      this.faq.faqs.push(payload as never);
    }
  }
  update_faq(payload: any) {
    if (payload != undefined) {
      const { index, faq } = payload;
      if (index != undefined && faq) {
        this.faq.faqs[index] = faq as never;
      }
    }
  }
  delete_faq(payload: any) {
    if (payload != undefined) {
      const { index } = payload;
      if (index != undefined) {
        this.faq.faqs.splice(index, 1);
      }
    }
  }
  add_faqs(payload: any) {
    if (payload != undefined) {
      this.faq.faqs = payload;
    }
  }

  add_spark_gpt_question(payload: any) {
    if (payload == undefined) {
      return;
    }

    this.spark_gpt_survey.spark_gpt_question_list.push(payload as never);
  }

  add_spark_gpt_question_list(payload: any) {
    if (payload == undefined) {
      return;
    }

    this.spark_gpt_survey.spark_gpt_question_list = payload;
  }

  set_is_adding_spark_gpt_question(payload: any) {
    if (payload == undefined) {
      return;
    }

    this.spark_gpt_survey.is_adding_spark_gpt_question = payload;
  }

  set_fetching_spark_gpt_question(payload: any) {
    if (payload == undefined) {
      return;
    }

    this.spark_gpt_survey.fetching_spark_gpt_question_list = false;
  }

  update_spark_gpt_question(payload: any) {
    if (
      payload == undefined ||
      !payload.index == undefined ||
      !payload.spark_gpt_question == undefined
    ) {
      return;
    }

    const { index, spark_gpt_question } = payload;

    this.spark_gpt_survey.spark_gpt_question_list[index] =
      spark_gpt_question as never;
  }

  set_active_spark_gpt_question_index(payload: any) {
    this.spark_gpt_survey.active_spark_gpt_question_index = payload;
  }

  set_is_editing_added_spark_gpt_question(payload: any) {
    if (payload == undefined) {
      return;
    }
    this.spark_gpt_survey.is_editing_added_spark_gpt_question = payload;
  }

  delete_spark_gpt_question(payload: any) {
    if (payload === undefined || payload?.index === undefined) {
      return;
    }

    const { index } = payload;
    this.spark_gpt_survey.spark_gpt_question_list.splice(index, 1);
  }

  publishLoading() {
    this.config.style.loading = true;
  }

  updateAvailabilityReplyTime(payload: any) {
    if (this.config.value.availability) {
      this.config.value.availability = {
        ...this.config.value.availability,
        reply_time: payload,
      };
    } else {
      this.config.value = {
        ...this.config.value,
        availability: { reply_time: payload },
      };
    }
  }

  updateOfficeHours(payload: any[]) {
    if (this.config.value.availability) {
      this.config.value.availability = {
        ...this.config.value.availability,
        officeHours: [...payload],
      };
    } else {
      this.config.value = {
        ...this.config.value,
        availability: {
          officeHours: [...payload],
        },
      };
    }
  }
  processConfigAck(payload: any) {
    if (payload.field === 'style') {
      this.config.style.loading = false;
    }
  }

  increase_question(payload: any) {
    this.config.questions.value += payload;
  }

  decrease_question(payload: any) {
    this.config.questions.value -= payload;
  }
}

export const WidgetConfigStore = new WidgetConfigurationStore();
