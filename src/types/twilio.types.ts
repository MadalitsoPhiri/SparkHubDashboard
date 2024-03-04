export type TwilioIncomingPhoneNumber = {
  sid: string;
  sms_url: string;
  phone_number: string;
};

export type TwilioIncomingPhoneNumberResponse = {
  incoming_phone_numbers: TwilioIncomingPhoneNumber[];
};
