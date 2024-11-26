import React from 'react'
import styles from './style.module.scss'

const sections = [
  {
    title: 'What personal information do we process?',
    content:
      'When you visit, use, or navigate our Services, we may process personal information depending on how you interact with Alchemyst AI and the Services, the choices you make, and the products and features you use.',
    link: 'Click here to learn more.',
  },
  {
    title: 'Do we process any sensitive personal information?',
    content:
      'We may process sensitive personal information when necessary with your consent or as otherwise permitted by applicable law.',
    link: 'Click here to learn more.',
  },
  {
    title: 'Do we receive any information from third parties?',
    content:
      'We may receive information from public databases, marketing partners, social media platforms, and other outside sources.',
  },
  {
    title: 'How do we process your information?',
    content:
      'We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so.',
  },
  {
    title: 'In what situations and with which types of parties do we share personal information?',
    content:
      'We may share information in specific situations and with specific categories of third parties.',
  },
  {
    title: 'How do we keep your information safe?',
    content:
      'We have organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.',
  },
  {
    title: 'What are your rights?',
    content:
      'Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.',
  },
  {
    title: 'How do you exercise your rights?',
    content:
      'The easiest way to exercise your rights is by filling out our data subject request form, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.',
  },
];

const page = () => {
  return (
    <main className=" w-screen p-8 flex justify-center" >
      <div className="w-[80%]">
      <section className="mb-8 w-full flex text-center justify-center items-center">
        <h1><strong>Privacy Policy</strong></h1>
      </section>
        <section>
          {sections.map((section, index) => (
            <div key={index} className="mb-4">
              <h2 className="pb-2">
                <strong>{section.title}</strong>
              </h2>
              <p className='text-gray-400'>
                {section.content}
                {section.link && (
                  <>
                    {' '}
                    <a href="#">{section.link}</a>
                  </>
                )}
              </p>
            </div>
          ))}
        </section>
        <section>
            <ol>
                <li className = "mb-4">
                  <h1>WHAT INFORMATION DO WE COLLECT?</h1>
                  <h2>Personal information you disclose to us</h2>
                  <p className="text-gray-400"><strong>In Short:</strong> We collect personal information that you provide to us.</p>
                  <p className="text-gray-400">We collect personal information that you voluntarily provide to us when you register on the Alchemyst AI, express an interest in obtaining information about us or our products and services, when you participate in activities on the Services, or otherwise when you contact us.</p>
                  <h3>Personal Information Provided by You</h3>
                  <p className="text-gray-400">The personal information that we collect depends on the context of your interactions with us and the Alchemyst AI, the choices you make, and the products and features you use. The personal information we collect may include the following:</p><br />
                  <ul className="ml-4 text-gray-400">
                      <li>Names</li>
                      <li>Phone numbers</li>
                      <li>Email addresses</li>
                      <li>Mailing addresses</li>
                      <li>Usernames</li>
                      <li>Passwords</li>
                      <li>Billing addresses</li>
                      <li>Debit/credit card numbers</li>
                  </ul>
                  <h3>Sensitive Information</h3>
                  <p className="text-gray-400">When necessary, with your consent or as otherwise permitted by applicable law, we process the following categories of sensitive information:</p>
                  <ul className="text-gray-400 ml-4">
                      <li>Financial data</li>
                  </ul>
                  <h3>Payment Data</h3>
                  <p className="text-gray-400">We may collect data necessary to process your payment if you make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is stored by Razorpay. You may find their privacy notice link(s) here: <a href="https://razorpay.com/privacy/" target="_blank">https://razorpay.com/privacy/</a>.</p>
                  <h3>Social Media Login Data</h3>
                  <p className="text-gray-400">We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter, or other social media account. If you choose to register in this way, we will collect the information described in the section called HOW DO WE HANDLE YOUR SOCIAL LOGINS? below.</p>
                  <p className="text-gray-400">All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>
                  <h2>Information collected from other sources</h2>
                  <p className="text-gray-400"><strong>In Short:</strong> We may collect limited data from public databases, marketing partners, social media platforms, and other outside sources.</p>
                  <p className="text-gray-400">In order to enhance our ability to provide relevant marketing, offers, and services to you and update our records, we may obtain information about you from other sources, such as public databases, joint marketing partners, affiliate programs, data providers, social media platforms, and from other third parties. This information includes:</p>
                  <ul>
                      <li>Mailing addresses</li>
                      <li>Job titles</li>
                      <li>Email addresses</li>
                      <li>Phone numbers</li>
                      <li>Intent data (or user behaviour data)</li>
                      <li>Internet Protocol (IP) addresses</li>
                      <li>Social media profiles</li>
                      <li>Social media URLs</li>
                      <li>Custom profiles</li>
                  </ul>
                  <p>These are used for purposes of targeted advertising and event promotion. If you interact with us on a social media platform using your social media account (e.g., Facebook or Twitter), we receive personal information about you such as your name, email address, and gender. Any personal information that we collect from your social media account depends on your social media accounts privacy settings.</p>
                </li>

                <li className = "mb-4">
                  <h2>HOW DO WE PROCESS YOUR INFORMATION?</h2>
                  <p className="text-gray-400">
                    <strong>In Short:</strong> We process your information to provide, improve, and administer our
                    Alchemyst AI, communicate with you, for security and fraud prevention, and to comply with
                    law. We may also process your information for other purposes with your consent.
                  </p><br />
                  <p className="text-gray-400">
                    We process your personal information for a variety of reasons, depending on how you
                    interact with our Services, including:
                  </p><br />
                  <ul className="ml-4">
                    <li>
                      <strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> 
                      We may process your information so you can create and log in to your account, as well as keep your account in working order.
                    </li>
                    <li>
                      <strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.
                    </li>
                    <li>
                      <strong>To send you marketing and promotional communications.</strong> 
                      We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. 
                      You can opt out of our marketing emails at any time. For more information, see <a href="#privacy-rights">WHAT ARE YOUR PRIVACY RIGHTS?</a>.
                    </li>
                    <li>
                      <strong>To evaluate and improve our Services, products, marketing, and your experience.</strong> 
                      We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, 
                      and to evaluate and improve our Services, products, marketing, and your experience.
                    </li>
                    <li>
                      <strong>To comply with our legal obligations.</strong> 
                      We may process your information to comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights.
                    </li>
                  </ul>
                </li>

                <li className = "mb-4">
                  <h2>WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
                  <p className="text-gray-400">
                    <strong>In Short:</strong> We may share information in specific situations described in this
                    section and/or with the following categories of third parties.
                  </p><br />
                  <h3>Vendors, Consultants, and Other Third-Party Service Providers</h3><br />
                  <p className="text-gray-400">
                    We may share your data with third-party vendors, service providers, contractors, or agents
                    (third parties) who perform services for us or on our behalf and require access to such
                    information to do that work. The categories of third parties we may share personal
                    information with are as follows:
                  </p><br />
                  <ul className="text-gray-400 ml-4">
                    <li>Data Analytics Services</li>
                    <li>Finance &amp; Accounting Service Providers</li>
                    <li>Government Entities</li>
                  </ul>
                  <p className="text-gray-400"> We also may need to share your personal information in the following situations:</p>
                  <ul className="ml-4 text-gray-400">
                    <li>
                      <strong>Business Transfers:</strong> We may share or transfer your information in connection
                      with, or during negotiations of, any merger, sale of company assets, financing, or
                      acquisition of all or a portion of our business to another company.
                    </li>
                    <li>
                      <strong>Affiliates:</strong> We may share your information with our affiliates, in which case
                      we will require those affiliates to honour this privacy notice. Affiliates include our
                      parent company and any subsidiaries, joint venture partners, or other companies that we
                      control or that are under common control with us.
                    </li>
                    <li>
                      <strong>Business Partners:</strong> We may share your information with our business partners
                      to offer you certain products, services, or promotions.
                    </li>
                  </ul>
                </li>

                <li className = "mb-4">
                  <h2>HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
                  <p className="text-gray-400">
                    <strong>In Short:</strong> If you choose to register or log in to our Services using a social
                    media account, we may have access to certain information about you.
                  </p><br />
                  <p className="text-gray-400">
                    Our Services offer you the ability to register and log in using your third-party social media
                    account details (like your Facebook or Twitter logins). Where you choose to do this, we will
                    receive certain profile information about you from your social media provider. The profile
                    information we receive may vary depending on the social media provider concerned, but will
                    often include your name, email address, friends list, and profile picture, as well as other
                    information you choose to make public on such a social media platform.
                  </p><br />
                  <p className="text-gray-400">
                    We will use the information we receive only for the purposes that are described in this privacy
                    notice or that are otherwise made clear to you on the relevant Services. Please note that we do
                    not control, and are not responsible for, other uses of your personal information by your
                    third-party social media provider. We recommend that you review their privacy notice to
                    understand how they collect, use, and share your personal information, and how you can set
                    your privacy preferences on their sites and apps.
                  </p><br />
                </li>

                <li className = "mb-4">
                  <h2>HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
                  <p className="text-gray-400">
                    <strong>In Short:</strong> We keep your information for as long as necessary to fulfill the
                    purposes outlined in this privacy notice unless otherwise required by law.
                  </p> <br />
                  <p className="text-gray-400">
                    We will only keep your personal information for as long as it is necessary for the purposes
                    set out in this privacy notice, unless a longer retention period is required or permitted by
                    law (such as tax, accounting, or other legal requirements). No purpose in this notice will
                    require us keeping your personal information for longer than Thirty-Six (36) months past
                    the termination of the users account.
                  </p><br />
                  <p className="text-gray-400">
                    When we have no ongoing legitimate business need to process your personal information, we
                    will either delete or anonymize such information, or, if this is not possible (for example,
                    because your personal information has been stored in backup archives), then we will securely
                    store your personal information and isolate it from any further processing until deletion is
                    possible.
                  </p><br />

                </li>

                <li className = "mb-4">
                  <h2>HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
                  <p className="text-gray-400">
                    <strong>In Short:</strong> We aim to protect your personal information through a system of
                    organisational and technical security measures.
                  </p><br />
                  <p className="text-gray-400">
                    We have implemented appropriate and reasonable technical and organisational security measures
                    designed to protect the security of any personal information we process. However, despite our
                    safeguards and efforts to secure your information, no electronic transmission over the Internet
                    or information storage technology can be guaranteed to be 100% secure, so we cannot promise or
                    guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to
                    defeat our security and improperly collect, access, steal, or modify your information.
                  </p><br />
                  <p className="text-gray-400">
                    Although we will do our best to protect your personal information, transmission of personal
                    information to and from our Services is at your own risk. You should only access the Services within
                    a secure environment.
                  </p><br />
                </li>

                <li className = "mb-4">
                  <h2>DO WE COLLECT INFORMATION FROM MINORS?</h2>
                  <p className="text-gray-400">
                    <strong>In Short:</strong> We do not knowingly collect data from or market to children under
                    18 years of age.
                  </p><br />
                  <p className="text-gray-400">
                    We do not knowingly solicit data from or market to children under 18 years of age. By using the
                    Services, you represent that you are at least 18 or that you are the parent or guardian of such a
                    minor and consent to such minor dependent’s use of the Services. If we learn that personal
                    information from users less than 18 years of age has been collected, we will deactivate the account
                    and take reasonable measures to promptly delete such data from our records.
                  </p><br />
                  <p className="text-gray-400">
                    If you become aware of any data we may have collected from children under age 18, please contact us at
                    <a href="mailto:uttaran@getalchemystai.com">uttaran@getalchemystai.com</a>.
                  </p><br />
                </li>

                <li className = "mb-4">
                  <h2>WHAT ARE YOUR PRIVACY RIGHTS?</h2>
                  <p>
                    <strong>In Short:</strong> You may review, change, or terminate your account at any time.
                  </p><br />
                  <p className="text-gray-400">
                    <strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal
                    information, which may be express and/or implied consent depending on the applicable law, you have the
                    right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us
                    using the contact details provided in the section <em>HOW CAN YOU CONTACT US ABOUT THIS NOTICE? </em>
                    below.
                  </p><br />
                  <p className="text-gray-400">
                    However, please note that this will not affect the lawfulness of the processing before its withdrawal
                    nor, when applicable law allows, will it affect the processing of your personal information conducted
                    in reliance on lawful processing grounds other than consent.
                  </p><br />
                  <p className="text-gray-400">
                    <strong>Opting out of marketing and promotional communications:</strong> You can unsubscribe from our
                    marketing and promotional communications at any time by clicking on the unsubscribe link in the emails
                    that we send, or by contacting us using the details provided in the section <em>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</em> below.
                    You will then be removed from the marketing lists. However, we may still communicate with you — for
                    example, to send you service-related messages that are necessary for the administration and use of your
                    account, to respond to service requests, or for other non-marketing purposes.
                  </p><br />
                  <p className="text-gray-400">
                    <strong>Account Information:</strong> If you would at any time like to review or change the information
                    in your account or terminate your account, you can:
                  </p><br />
                  <ul className="text-gray-400">
                    <li>Log in to your account settings and update your user account.</li>
                  </ul>
                  <p className="text-gray-400">
                    Upon your request to terminate your account, we will deactivate or delete your account and information
                    from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot
                    problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
                  </p>
                  <p className="text-gray-400">
                    If you have questions or comments about your privacy rights, you may email us at{' '}
                    <a href="mailto:anuran@getalchemystai.com">anuran@getalchemystai.com</a>.
                  </p>
                </li>

                <li className = "mb-4">
                  <section id="do-not-track">
                    <h2>CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
                    <p className="text-gray-400">
                      Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track
                      (&apos;DNT&apos;
) feature or setting you can activate to signal your privacy preference not to have data about
                      your online browsing activities monitored and collected. At this stage, no uniform technology standard
                      for recognizing and implementing DNT signals has been finalized.
                    </p><br />
                    <p className="text-gray-400">
                      As such, we do not currently respond to DNT browser signals or any other mechanism that automatically
                      communicates your choice not to be tracked online. If a standard for online tracking is adopted that we
                      must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
                    </p><br />
                  </section>

                </li>
                
                <li className = "mb-4">
                  <section id="updates-to-notice">
                    <h2>DO WE MAKE UPDATES TO THIS NOTICE?</h2>
                    <p className="text-gray-400">
                      <strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.
                    </p><br />
                    <p className="text-gray-400">
                      We may update this privacy notice from time to time. The updated version will be indicated by an updated
                      Revised date and the updated version will be effective as soon as it is accessible.
                    </p><br />
                    <p className="text-gray-400">
                      If we make material changes to this privacy notice, we may notify you either by prominently posting a
                      notice of such changes or by directly sending you a notification. We encourage you to review this privacy
                      notice frequently to be informed of how we are protecting your information.
                    </p><br />
                  </section>

                </li>

                <li className = "mb-4">
                  <section id="contact-us-about-notice">
                    <h2>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
                    <p className="text-gray-400">
                      If you have questions or comments about this notice, you may email us at 
                      <a href="mailto:uttaran@getalchemystai.com">uttaran@getalchemystai.com</a> or by post to:
                    </p><br />
                    <address>
                      Xalchemyst Technologies Private Limited <br />
                      Add.: 3rd Floor, Flat 3/A, 20 P C Ghosh Road, Patipukur,<br />
                      North 24Parganas, Patipukur, West Bengal, India, 700048
                    </address>
                  </section>
                </li>

                <li className = "mb-4">
                  <section id="review-update-delete-data">
                    <h2>HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2><br />
                    <p className="text-gray-400">
                      Based on the applicable laws of your country, you may have the right to request access to the personal
                      information we collect from you, change that information, or delete it. To request to review, update, or
                      delete your personal information, please submit a request form.
                    </p>
                  </section>
                </li>

            </ol>
        </section>
        </div>
    </main>
  )
}

export default page