import { emailStore } from '@/state/EmailStore';
import { fetchRequestWithToken } from '@/config/axios';

export const sendEmail = async (data: any) => {
  emailStore.requesting();
  try {
    const response = await fetchRequestWithToken({
      url: `/api/contacts/send-mail`,
      method: 'POST',
      data: {
        to: data.to,
        subject: data.subject,
        text: data.text,
        cc: data.cc,
        bcc: data.bcc,
      },
    });

    emailStore.requestEmailSuccess(response);
  } catch (error) {
    emailStore.requestEmailFailed(error);
  }
};
