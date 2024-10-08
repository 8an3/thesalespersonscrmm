import { AuthType } from "~/utils/infobip/auth-type";
import { EmailStatus } from "~/utils/infobip/email-status-type";
import { InfobipAuth } from "~/utils/infobip/auth";
import { Validator } from "~/utils/infobip/validator";
//import { WhatsApp } from "../futureRoutes/client.whatsapp";
import { SMS } from "./client/sms";
import { Auth } from "./client/auth";
//import { Email } from "./client.email";
//import { TwoFA } from "../futureRoutes/client.2fa";
import {
  TwoFAApplication,
  TwoFAMessageTemplate,
  TwoFAPinCode,
  Pin,
  TwoFAVerificationStatus,
} from "~/models/2fa-models";

class Infobip {
  /**
   *
   * @param {InfobipAuth} config - Configuration object for Infobip API
   *
   */

  credentials: InfobipAuth;
  service: any;
  channels: any;
  auth: any;

  constructor({
    baseUrl,
    authType,
    apiKey,
    username,
    password,
    oauthToken,
    ibssoToken,
  }: InfobipAuth) {
    Validator.required(baseUrl, "Infobip.baseUrl");
    Validator.required(authType, "Infobip.authType");

    password && Validator.string(password, "Infobip.password");
    username && Validator.string(username, "Infobip.username");
    apiKey && Validator.string(apiKey, "Infobip.apiKey");
    oauthToken && Validator.string(oauthToken, "Infobip.oauthToken");
    ibssoToken && Validator.string(ibssoToken, "Infobip.ibssoToken");

    this.credentials = new InfobipAuth({
      baseUrl,
      authType,
      apiKey,
      username,
      password,
      oauthToken,
      ibssoToken,
    });
    this.channels = {
      whatsapp: new WhatsApp(this.credentials),
      // email: new Email(this.credentials),
      sms: new SMS(this.credentials),
    };
    this.service = {
      twoFA: new TwoFA(this.credentials),
    };
    this.auth = new Auth(this.credentials);
  }
}

export {
  Infobip,
  AuthType,
  EmailStatus,
  TwoFAApplication,
  TwoFAMessageTemplate,
  TwoFAPinCode,
  Pin,
  TwoFAVerificationStatus,
};
