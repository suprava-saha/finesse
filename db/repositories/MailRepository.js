import nodemailer from 'nodemailer';

class MailRepository {
  // /**
  //  * Constructor to initialize the MailRepository class.
  //  * @param {string} service - The email service provider (e.g., 'gmail').
  //  * @param {string} user - Email address used for authentication.
  //  * @param {string} pass - Password for the email address.
  //  */
  // constructor(service, user, pass) {
  //   // Initialize the transporter using the provided service, user, and pass
  //   this.transporter = this.#createTransporter(service, user, pass);
  // }

  constructor() {
    // Initialize the transporter using the provided service, user, and pass
    this.transporter = this.#createTransporter('gmail', process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
  }

  /**
   * Private arrow function to create and configure a Nodemailer transporter.
   * @param {string} service - The email service provider (e.g., 'gmail').
   * @param {string} user - Email address used for authentication.
   * @param {string} pass - Password for the email address.
   * @returns {Object} - Nodemailer transporter object configured for the specified service.
   */
  #createTransporter = (service, user, pass) => {
    // Create a Nodemailer transporter using the specified service and authentication details
    return nodemailer.createTransport({
      service: service, // Use provided service
      auth: {
        user: user, // Use provided user
        pass: pass, // Use provided password
      },
    });
  };

  /**
   * Method to set the mail options for sending an email.
   * @param {string} from - Sender email address.
   * @param {string} to - Recipient email address.
   * @param {string} subject - Subject of the email.
   * @param {string} text - Plain text body of the email.
   * @param {string} [html] - Optional HTML body of the email.
   * @returns {Object} - Configured mail options object.
   */
  setMailOptions = (from, to, subject, text, html = '') => {
    return {
      from: from, // Sender email address
      to: to, // Recipient email address
      subject: subject, // Subject of the email
      text: text, // Plain text body of the email
      html: html // Optional HTML body
    };
  };

  /**
   * Method to send an email with the provided mail options.
   * @param {Object} mailOptions - Options for the email to be sent.
   * @returns {Promise} - Resolves with the response if the email is sent successfully.
   * @throws {Error} - Throws an error if email sending fails.
   */
  sendMail = async (mailOptions) => {
    try {
      // Attempt to send the email using the configured transporter
      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      // Throw a new error with a descriptive message if email sending fails
      throw new Error(`Error sending email: ${error.message}`);
    }
  };
}

export default MailRepository;
