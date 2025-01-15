"use client";

import React from "react";
import Link from "next/link";
import Footer from "@/components/home/Footer";
import { ChevronLeft } from "lucide-react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-center mt-12">
        <Link
          href="/"
          className="flex items-center rounded-full border border-white hover:scale-110 transition-transform duration-700 ease-in-out hover:bg-orange-400"
        >
          <div className="flex items-center w-full h-full">
            <ChevronLeft className="w-11 h-11 text-white border border-white rounded-full" />
            <span className="ml-4 text-lg pr-5 p-2 font-medium text-white">
              Back to Home
            </span>
          </div>
        </Link>
      </div>
      <div className="md:w-[70%] mx-auto p-6">
        <h1 className="text-5xl font-bold mb-2 mt-16">PRIVACY NOTICE</h1>
        <p className="mb-4 text-gray-400">Last Updated on 26th November 2024</p>

        <div className="space-y-4">
          <p>
            This privacy notice for Xalchemyst Technologies Private Limited
            (doing business as &quot;Company&quot;) (<b>&#39;Company&#39;</b>,
            <b>&#39;we&#39;</b>, <b>&#39;us&#39;</b>, or <b>&#39;our&#39;</b>),
            describes how and why we might collect, store, use, and/or share (
            <b>&#39;process&#39;</b>) your information when you use our services
            (<b>&#39;Services&#39;</b>), such as when you:
          </p>
          <ul className="pl-3">
            <li>
              Visit our website at{" "}
              <a
                href="https://getalchemystai.com/"
                target="_blank"
                className="hover:text-blue-500"
              >
                <u>https://getalchemystai.com</u>
              </a>
              , or any website of ours that links to this privacy notice
            </li>
            <li>
              Engage with us in other related ways, including any sales,
              marketing, or events
            </li>
          </ul>
          <p>
            <b>Questions or concerns?</b> Reading this privacy notice will help
            you understand your privacy rights and choices. If you do not agree
            with our policies and practices, please do not use our Services. If
            you still have any questions or concerns, please contact us at
            getalchemystai@gmail.com
          </p>
        </div>

        <section className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">SUMMARY OF KEY POINTS</h2>
          <div className="space-y-4">
            <p>
              <b>
                <i>
                  This summary provides key points from our privacy notice, but
                  you can find out more details about any of these topics by
                  clicking the link following each key point.
                </i>
              </b>{" "}
            </p>
            <p>
              <b>What personal information do we process?</b> When you visit,
              use, or navigate our Services, we may process personal information
              depending on how you interact with <i>Alchemyst AI</i> and the
              Services, the choices you make, and the products and features you
              use. Click{" "}
              <a
                href="https://app.termly.io/builder/websites/4014c97c-ca2d-490e-85e4-e6cac81d7f02/documents/2484790/Final%20Details/Version%20Date#personalinfo"
                className="hover:text-blue-500"
              >
                <u>here</u>{" "}
              </a>
              to learn more.
            </p>
            <p>
              <b>Do we process any sensitive personal information?</b> We may
              process sensitive personal information when necessary with your
              consent or as otherwise permitted by applicable law. Click{" "}
              <a
                href="https://app.termly.io/builder/websites/4014c97c-ca2d-490e-85e4-e6cac81d7f02/documents/2484790/Final%20Details/Version%20Date#sensitiveinfo"
                className="hover:text-blue-500"
              >
                <u>here</u>{" "}
              </a>{" "}
              to learn more.
            </p>
            <p>
              <b>Do we receive any information from third parties?</b> We may
              receive information from public databases, marketing partners,
              social media platforms, and other outside sources.
            </p>
            <p>
              <b>How do we process your information?</b> We process your
              information to provide, improve, and administer our Services,
              communicate with you, for security and fraud prevention, and to
              comply with law. We may also process your information for other
              purposes with your consent. We process your information only when
              we have a valid legal reason to do so.
            </p>
            <p>
              <b>
                In what situations and with which types of parties do we share
                personal information?
              </b>{" "}
              We may share information in specific situations and with specific
              categories of third parties.
            </p>
            <p>
              <b>How do we keep your information safe?</b> We have
              organisational and technical processes and procedures in place to
              protect your personal information. However, no electronic
              transmission over the internet or information storage technology
              can be guaranteed to be 100% secure, so we cannot promise or
              guarantee that hackers, cybercriminals, or other unauthorised
              third parties will not be able to defeat our security and
              improperly collect, access, steal, or modify your information.
            </p>
            <p>
              <b>What are your rights?</b> Depending on where you are located
              geographically, the applicable privacy law may mean you have
              certain rights regarding your personal information.
            </p>
            <p>
              <b>How do you exercise your rights?</b> The easiest way to
              exercise your rights is by filling out our data subject request
              form, or by contacting us. We will consider and act upon any
              request in accordance with applicable data protection laws.
            </p>
          </div>
        </section>

        <section className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            1. WHAT INFORMATION DO WE COLLECT?
          </h2>
          <div className="space-y-4">
            <p className="text-xl">
              <b>A. Personal information you disclose to us</b>
            </p>
            <p>
              <i>
                <b>In Short:</b> We collect personal information that you
                provide to us.
              </i>
            </p>
            <p>
              We collect personal information that you voluntarily provide to us
              when you register on the Alchemyst AI, express an interest in
              obtaining information about us or our products and Services, when
              you participate in activities on the Services, or otherwise when
              you contact us.
            </p>
            <p>
              <b>Personal Information Provided by You.</b> The personal
              information that we collect depends on the context of your
              interactions with us and the Alchemyst AI, the choices you make,
              and the products and features you use. The personal information we
              collect may include the following:
            </p>
            <ul className="p-4">
              <li>Names</li>
              <li>Phone numbers</li>
              <li>Email addresses</li>

              <li>Mailing addresses</li>
              <li>Username</li>
              <li>Passwords</li>
              <li>Billing Address</li>
              <li>Debit/Credit card numbers</li>
            </ul>
            <p>
              <b>Sensitive Information.</b> When necessary, with your consent or
              as otherwise permitted by applicable law, we process the following
              categories of sensitive information:
            </p>
            <ul className="p-4">
              <li>financial data Payment</li>
            </ul>
            <p>
              <b>Payment Data.</b> We may collect data necessary to process your
              payment if you make purchases, such as your payment instrument
              number, and the security code associated with your payment
              instrument. All payment data is stored by Razorpay. You may find
              their privacy notice link(s) here:{" "}
              <a
                href="https://razorpay.com/privacy/"
                target="_blank"
                className="hover:text-blue-500"
              >
                <u>https://razorpay.com/privacy/</u>
              </a>
            </p>
            <p>
              <b>Social Media Login Data.</b> We may provide you with the option
              to register with us using your existing social media account
              details, like your Facebook, Twitter, or other social media
              account. If you choose to register in this way, we will collect
              the information described in the section called{" "}
              <u>&#39;HOW DO WE HANDLE YOUR SOCIAL LOGINS?&#39;</u> below.
            </p>
            <p>
              All personal information that you provide to us must be true,
              complete, and accurate, and you must notify us of any changes to
              such personal information.
            </p>
            <p className="pt-8 text-xl">
              <b>B. Information collected from other sources</b>
            </p>
            <p>
              <b>
                <i>In Short:</i>
              </b>{" "}
              <i>
                We may collect limited data from public databases, marketing
                partners, social media platforms, and other outside sources.
              </i>{" "}
            </p>
            <p>
              In order to enhance our ability to provide relevant marketing,
              offers, and services to you and update our records, we may obtain
              information about you from other sources, such as public
              databases, joint marketing partners, affiliate programs, data
              providers, social media platforms, and from other third parties.
              This information includes mailing addresses, job titles, email
              addresses, phone numbers, intent data (or user behaviour data),
              Internet Protocol (IP) addresses, social media profiles, social
              media URLs, and custom profiles, for purposes of targeted
              advertising and event promotion. If you interact with us on a
              social media platform using your social media account (e.g.
              Facebook or Twitter), we receive personal information about you
              such as your name, email address, and gender. Any personal
              information that we collect from your social media account depends
              on your social media account&#39;s privacy settings.
            </p>
          </div>
        </section>

        <section className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            2. HOW DO WE PROCESS YOUR INFORMATION?
          </h2>
          <div className="space-y-4">
            <p>
              <i>
                <b>In Short:</b> We process your information to provide,
                improve, and administer our Alchemyst AI, communicate with you,
                for security and fraud prevention, and to comply with law. We
                may also process your information for other purposes with your
                consent.
              </i>
            </p>
            <p>
              We process your personal information for a variety of reasons,
              depending on how you interact with our Services, including:
            </p>
            <ul className="p-4">
              <li>
                <b>
                  To facilitate account creation and authentication and
                  otherwise manage user accounts.
                </b>{" "}
                We may process your information so you can create and log in to
                your account, as well as keep your account in working order.
              </li>
              <li>
                <b>
                  To deliver and facilitate delivery of services to the user.
                </b>{" "}
                We may process your information to provide you with the
                requested service.
              </li>
              <li>
                <b>To send you marketing and promotional communications.</b> We
                may process the personal information you send to us for our
                marketing purposes, if this is in accordance with your marketing
                preferences. You can opt out of our marketing emails at any
                time. For more information, see{" "}
                <u>&#39;WHAT ARE YOUR PRIVACY RIGHTS?&#39;</u>
                {""}
                below).
              </li>
              <li>
                <b>
                  To evaluate and improve our Services, products, marketing, and
                  your experience.
                </b>{" "}
                We may process your information when we believe it is necessary
                to identify usage trends, determine the effectiveness of our
                promotional campaigns, and to evaluate and improve our Services,
                products, marketing, and your experience.
              </li>
              <li>
                <b>To comply with our legal obligations.</b> We may process your
                information to comply with our legal obligations, respond to
                legal requests, and exercise, establish, or defend our legal
                rights.
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
          </h2>
          <div className="space-y-4">
            <p>
              <i>
                <b>In Short:</b> We may share information in specific situations
                described in this section and/or with the following categories
                of third parties.
              </i>
            </p>
            <p>
              Vendors, Consultants, and Other Third-Party Service Providers. We
              may share your data with third-party vendors, service providers,
              contractors, or agents (&#x27;third parties&#x27;) who perform
              services for us or on our behalf and require access to such
              information to do that work. The categories of third parties we
              may share personal information with are as follows:
            </p>
            <ul className="p-4">
              <li>Data Analytics Services</li>
              <li>Finance & Accounting Service Providers</li>
              <li>Government Entities</li>
            </ul>
            <p>
              We also may need to share your personal information in the
              following situations:
            </p>
            <ul>
              <li>
                <b>Business Transfers.</b> We may share or transfer your
                information in connection with, or during negotiations of, any
                merger, sale of company assets, financing, or acquisition of all
                or a portion of our business to another company.
              </li>
              <li>
                <b>Affiliates.</b> We may share your information with our
                affiliates, in which case we will require those affiliates to
                honour this privacy notice. Affiliates include our parent
                company and any subsidiaries, joint venture partners, or other
                companies that we control or that are under common control with
                us.
              </li>
              <li>
                <b>Business Partners.</b> We may share your information with our
                business partners to offer you certain products, services, or
                promotions.
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            4. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
          </h2>
          <div className="space-y-4">
            <p>
              <i>
                <b>In Short:</b> If you choose to register or log in to our
                Services using a social media account, we may have access to
                certain information about you.
              </i>
            </p>
            <p>
              Our Services offer you the ability to register and log in using
              your third-party social media account details (like your Facebook
              or Twitter logins). Where you choose to do this, we will receive
              certain profile information about you from your social media
              provider. The profile information we receive may vary depending on
              the social media provider concerned, but will often include your
              name, email address, friends list, and profile picture, as well as
              other information you choose to make public on such a social media
              platform.
            </p>
            <p>
              We will use the information we receive only for the purposes that
              are described in this privacy notice or that are otherwise made
              clear to you on the relevant Services. Please note that we do not
              control, and are not responsible for, other uses of your personal
              information by your third- party social media provider. We
              recommend that you review their privacy notice to understand how
              they collect, use, and share your personal information, and how
              you can set your privacy preferences on their sites and apps.
            </p>
          </div>
        </section>

        <section className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            5. HOW LONG DO WE KEEP YOUR INFORMATION?
          </h2>
          <div className="space-y-4">
            <p>
              <i>
                <b>In Short:</b> We keep your information for as long as
                necessary to fulfil the purposes outlined in this privacy notice
                unless otherwise required by law.
              </i>
            </p>
            <p>
              We will only keep your personal information for as long as it is
              necessary for the purposes set out in this privacy notice, unless
              a longer retention period is required or permitted by law (such as
              tax, accounting, or other legal requirements). No purpose in this
              notice will require us keeping your personal information for
              longer than Thirty-Six (36) months past the termination of the
              user&#39;s account.
            </p>
            <p>
              When we have no ongoing legitimate business need to process your
              personal information, we will either delete or anonymise such
              information, or, if this is not possible (for example, because
              your personal information has been stored in backup archives),
              then we will securely store your personal information and isolate
              it from any further processing until deletion is possible.
            </p>
          </div>
        </section>

        <section className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            6. HOW DO WE KEEP YOUR INFORMATION SAFE?
          </h2>
          <div className="space-y-4">
            <p>
              <i>
                <b>In Short:</b> We aim to protect your personal information
                through a system of organisational and technical security
                measures.
              </i>
            </p>
            <p>
              We have implemented appropriate and reasonable technical and
              organisational security measures designed to protect the security
              of any personal information we process. However, despite our
              safeguards and efforts to secure your information, no electronic
              transmission over the Internet or information storage technology
              can be guaranteed to be 100% secure, so we cannot promise or
              guarantee that hackers, cybercriminals, or other unauthorised
              third parties will not be able to defeat our security and
              improperly collect, access, steal, or modify your information.
              Although we will do our best to protect your personal information,
              transmission of personal information to and from our Services is
              at your own risk. You should only access the Services within a
              secure environment.
            </p>
          </div>
        </section>

        <section className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            7. DO WE COLLECT INFORMATION FROM MINORS?
          </h2>
          <div className="space-y-4">
            <p>
              <i>
                <b>In Short:</b> We do not knowingly collect data from or market
                to children under 18 years of age.
              </i>
            </p>
            <p>
              We do not knowingly solicit data from or market to children under
              18 years of age. By using the Services, you represent that you are
              at least 18 or that you are the parent or guardian of such a minor
              and consent to such minor dependent&apos;s use of the Services. If
              we learn that personal information from users less than 18 years
              of age has been collected, we will deactivate the account and take
              reasonable measures to promptly delete such data from our records.
              If you become aware of any data we may have collected from
              children under age 18, please contact us at
              uttaran@getalchemystai.com .
            </p>
          </div>
        </section>

        <section className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            8. WHAT ARE YOUR PRIVACY RIGHTS?
          </h2>
          <div className="space-y-4">
            <p>
              <i>
                <b>In Short:</b> You may review, change, or terminate your
                account at any time.
              </i>
            </p>
            <p>
              <b>Withdrawing your consent:</b> If we are relying on your consent
              to process your personal information, which may be express and/or
              implied consent depending on the applicable law, you have the
              right to withdraw your consent at any time. You can withdraw your
              consent at any time by contacting us by using the contact details
              provided in the section
              <u>&#39;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&#39;</u> below.
            </p>
            <p>
              However, please note that this will not affect the lawfulness of
              the processing before its withdrawal nor, when applicable law
              allows, will it affect the processing of your personal information
              conducted in reliance on lawful processing grounds other than
              consent.
            </p>
            <p>
              <b>Opting out of marketing and promotional communications:</b> You
              can unsubscribe from our marketing and promotional communications
              at any time by clicking on the unsubscribe link in the emails that
              we send, or by contacting us using the details provided in the
              section <u>&#39;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&#39;</u>
              below. You will then be removed from the marketing lists. However,
              we may still communicate with you — for example, to send you
              service-related messages that are necessary for the administration
              and use of your account, to respond to service requests, or for
              other non-marketing purposes.
            </p>
            <p className="text-xl">
              <b>Account Information</b>
            </p>
            <p>
              If you would at any time like to review or change the information
              in your account or terminate your account, you can:
            </p>
            <ul className="pl-3">
              <li>
                Log in to your account settings and update your user account.
              </li>
            </ul>
            <p>
              Upon your request to terminate your account, we will deactivate or
              delete your account and information from our active databases.
              However, we may retain some information in our files to prevent
              fraud, troubleshoot problems, assist with any investigations,
              enforce our legal terms and/or comply with applicable legal
              requirements.
            </p>
            <p>
              If you have questions or comments about your privacy rights, you
              may email us at anuran@getalchemystai.com.
            </p>
          </div>
        </section>

        <section className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            9. CONTROLS FOR DO-NOT-TRACK FEATURES
          </h2>
          <div className="space-y-4">
            <p>
              Most web browsers and some mobile operating systems and mobile
              applications include a Do- Not-Track (&#39;DNT&#39;) feature or
              setting you can activate to signal your privacy preference not to
              have data about your online browsing activities monitored and
              collected. At this stage no uniform technology standard for
              recognising and implementing DNT signals has been finalised. As
              such, we do not currently respond to DNT browser signals or any
              other mechanism that automatically communicates your choice not to
              be tracked online. If a standard for online tracking is adopted
              that we must follow in the future, we will inform you about that
              practice in a revised version of this privacy notice.
            </p>
          </div>
        </section>

        <section className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            10. DO WE MAKE UPDATES TO THIS NOTICE?
          </h2>
          <div className="space-y-4">
            <p>
              <i>
                <b>In Short:</b> Yes, we will update this notice as necessary to
                stay compliant with relevant laws.
              </i>
            </p>
            <p>
              We may update this privacy notice from time to time. The updated
              version will be indicated by an updated &#39;Revised&#39; date and
              the updated version will be effective as soon as it is accessible.
              If we make material changes to this privacy notice, we may notify
              you either by prominently posting a notice of such changes or by
              directly sending you a notification. We encourage you to review
              this privacy notice frequently to be informed of how we are
              protecting your information.
            </p>
          </div>
        </section>

        <section className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
          </h2>
          <div className="space-y-4">
            <p>
              If you have questions or comments about this notice, you may email
              us at uttaran@getalchemystai.com or by post to:
            </p>
            <p>
              <b>Xalchemyst Technologies Private Limited</b>
              <br />
              <b>Address: </b>3rd Floor, Flat 3/A, 20 P C Ghosh Road, Patipukur,
              North 24Parganas, Patipukur, West Bengal, India, 700048
            </p>
          </div>
        </section>

        <section className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
            YOU?
          </h2>
          <div className="space-y-4">
            <p>
              Based on the applicable laws of your country, you may have the
              right to request access to the personal information we collect
              from you, change that information, or delete it. To request to
              review, update, or delete your personal information, please submit
              a request form.
            </p>
          </div>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
