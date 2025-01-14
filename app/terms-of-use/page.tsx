"use client";

import React from "react";
import Link from "next/link";
import Footer from "@/components/home/Footer";
import { ChevronLeft } from "lucide-react";

const TermsOfUse: React.FC = () => {
  const sections = [
    { id: "agreement-to-terms", title: "AGREEMENT TO TERMS" },
    { id: "intellectual-property", title: "INTELLECTUAL PROPERTY RIGHTS" },
    { id: "user-representations", title: "USER REPRESENTATIONS" },
    { id: "user-registration", title: "USER REGISTRATION" },
    { id: "prohibited-activities", title: "PROHIBITED ACTIVITIES" },
    { id: "license-and-access", title: "LICENSE AND ACCESS" },
    { id: "social-media", title: "SOCIAL MEDIA" },
    { id: "submissions", title: "SUBMISSIONS" },
    { id: "third-party-website", title: "THIRD-PARTY WEBSITE AND CONTENT" },
    { id: "site-management", title: "SITE MANAGEMENT" },
    { id: "privacy-policy", title: "PRIVACY POLICY" },
    { id: "copyright-infringements", title: "COPYRIGHT INFRINGEMENTS" },
    { id: "term-and-termination", title: "TERM AND TERMINATION" },
    { id: "modifications", title: "MODIFICATIONS AND INTERRUPTIONS" },
    { id: "governing-law", title: "GOVERNING LAW" },
    { id: "dispute-resolution", title: "DISPUTE RESOLUTION" },
    { id: "corrections", title: "CORRECTIONS" },
    { id: "disclaimer", title: "DISCLAIMER" },
    { id: "limitations-of-liability", title: "LIMITATIONS OF LIABILITY" },
    { id: "indemnification", title: "INDEMNIFICATION" },
    { id: "user-data", title: "USER DATA" },
    {
      id: "electronic-communications",
      title: "ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES",
    },
    { id: "miscellaneous", title: "MISCELLANEOUS" },
    { id: "contact-us", title: "CONTACT US" },
  ];

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
        <h1 className="text-center text-5xl font-bold mb-2 mt-16">
          TERMS OF USE
        </h1>
        <p className="text-center mb-4 pl-2 text-gray-400">
          Last Updated on 26th November 2024
        </p>

        <h2 className="text-2xl mb-4 mt-24">TABLE OF CONTENTS</h2>
        <nav aria-label="Table of Contents">
          <ol className="list-decimal list-inside mb-8">
            {sections.map((section, index) => (
              <li key={section.id} className="mb-2">
                <Link
                  href={`#${section.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <section id="agreement-to-terms" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">1. AGREEMENT TO TERMS</h2>
          <div className="space-y-4">
            <p>
              These Terms of Use constitute a legally binding agreement made
              between you, whether personally or on behalf of an entity (“you”)
              and Xalchemyst Technologies Private Limited, doing business as (
              <strong>"Company"</strong> <strong>"we"</strong>
              {", "}
              <strong>"us"</strong>, or <strong>"our" </strong>), concerning
              your access to and use of the{" "}
              <a
                href="https://getalchemystai.com/"
                className="hover:text-blue-500"
              >
                <u>https://getalchemystai.com</u>
              </a>{" "}
              website as well as any other media form (collectively, the
              “Site”). We are registered in India and have our registered office
              3rd Floor, Flat 3/A, 20 P C Ghosh Road, Patipukur, North
              24Parganas, Patipukur, West Bengal, India, 700048. You agree that
              by accessing the website, you have read, understood, and agreed to
              be bound by all of these Terms of Use. If you do not agree with
              all of these terms of use, then you are expressly prohibited from
              using the site and you must discontinue use immediately.
            </p>
            <p>
              Supplemental terms and conditions or documents that may be posted
              on the Site from time to time are hereby expressly incorporated
              herein by reference. We reserve the right, in our sole discretion,
              to make changes or modifications to these Terms of Use at any time
              and for any reason. We will alert you about any changes by
              updating the
              <b> “Last updated”</b> date of these Terms of Use, and you waive
              any right to receive specific notice of each such change. Please
              ensure that you check the applicable terms every time you use our
              Site so that you understand which Terms apply. You will be subject
              to and will be deemed to have been made aware of and to have
              accepted, the changes in any revised Terms of Use by your
              continued use of the Site after the date such revised Terms of Use
              are posted.
            </p>
            <p>
              The information provided on the Site is not intended for
              distribution to or use by any person or entity in any jurisdiction
              or country where such distribution or use would be contrary to law
              or regulation or which would subject us to any registration
              requirement within such jurisdiction or country. Accordingly,
              those persons who choose to access the Site from other locations
              do so on their own initiative and are solely responsible for
              compliance with local laws, if and to the extent local laws are
              applicable.
            </p>
            <p>
              The Website is owned and operated by Xalchemyst Technologies
              Private Limited. We have been incorporated under the Companies
              Act, 2013 under CIN U62011WB2024PTC270934 having its registered
              office at 3rd Floor, Flat 3/A, 20 P C Ghosh Road, Patipukur, North
              24Parganas, Patipukur, West Bengal, India, 700048.
            </p>
            <p>
              Our artificial intelligence platform enables the business by
              providing products/services which helps them in automating various
              business processes like sales automation, marketing automation,
              communication, software development, technology platforms,
              cloud-based platforms, data storage, web designing, Information
              Technology, database, IT tools and information products, web and
              mobile application development, lead generation, user interface
              solutions.
            </p>
          </div>
        </section>

        <section id="intellectual-property" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            2. INTELLECTUAL PROPERTY RIGHTS
          </h2>
          <div className="space-y-4">
            <p>
              Unless otherwise indicated, the Site is our proprietary property
              and all source code, databases, functionality, software, website
              designs, audio, video, text, photographs, and graphics on the Site
              (collectively, the “Content”) and the trademarks, service marks,
              and logos contained therein (the “Marks”) are owned or controlled
              by us or licensed to us, and are protected by copyright and
              trademark laws and various other intellectual property rights and
              unfair competition laws of the India, international copyright
              laws, and international conventions. The Content and the Marks are
              provided on the Site “Alchemyst AI” for your information and
              personal use only. Except as expressly provided in these Terms of
              Use, no part of the Site and no Content or Marks may be copied,
              reproduced, aggregated, republished, uploaded, posted, publicly
              displayed, encoded, translated, transmitted, distributed, sold,
              licensed, or otherwise exploited for any commercial purpose
              whatsoever, without our express prior written permission.
            </p>
            <p>
              Provided that you are eligible to use the Site, you are granted a
              limited license to access and use the Site and to download or
              print a copy of any portion of the Content to which you have
              properly gained access solely for your personal, non-commercial
              use. We reserve all rights not expressly granted to you in and to
              the Site, the Content and the Marks.
            </p>
          </div>
        </section>

        <section id="user-representations" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            3. USER REPRESENTATIONS
          </h2>
          <div className="space-y-4">
            <p>
              By using the Site, you represent and warrant that: <br />
              (1) all registration information you submit will be true,
              accurate, current, and complete; <br />
              (2) you will maintain the accuracy of such information and
              promptly update such registration information as necessary; <br />
              (3) you have the legal capacity and you agree to comply with these
              Terms of Use;
              <br />
              (4) you are not a minor in the jurisdiction in which you reside;{" "}
              <br />
              (5) you will not access the Site through automated or non- human
              means, whether through a bot, script, or otherwise; <br />
              (6) you will not use the Site for any illegal or unauthorized
              purpose; and <br />
              (7) your use of the Site will not violate any applicable law or
              regulation.
            </p>
            <p>
              If you provide any information that is untrue, inaccurate, not
              current, or incomplete, we have the right to suspend or terminate
              your account and refuse any and all current or future use of the
              Site (or any portion thereof).
            </p>
          </div>
        </section>

        <section id="user-registration" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">4. USER REGISTRATION</h2>
          <div className="space-y-4">
            <p>
              Our platform does not require any User Registration. For the
              purpose of submitting of information, any user can submit the
              information through Alchemyst Website. By agreeing to the Terms,
              you agree to receive promotional, transactional or other
              communications, and newsletters from the Company. You can opt out
              from such communications and/or newsletters by using or clicking
              the link for the opt out options as available in such
              communications.
            </p>
            <p>
              As part of the process for usage and access of the Alchemyst
              Website, the Company may collect your personally identifiable
              information/ preferences, including but not limited to name, email
              address, age, address, mobile phone number, and other contact
              details, demographic profile (like your age, gender, occupation,
              education, address etc). Information so collected is subject to
              the Company&apos;s Privacy Policy.
            </p>
          </div>
        </section>

        <section id="prohibited-activities" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            5. PROHIBITED ACTIVITIES
          </h2>
          <div className="space-y-10">
            <p>
              You may not access or use the Site for any purpose other than that
              for which we make the Site available. The Site may not be used in
              connection with any commercial endeavours except those that are
              specifically endorsed or approved by us.
            </p>
            <div>
              As a user of the Site, you agree{" "}
              <span className="text-red-500 text-xl">NOT</span> to:
              <ul className="space-y-4 mt-4 pl-3">
                <li>
                  Systematically retrieve data or other content from the Site to
                  create or compile, directly or indirectly, a collection,
                  compilation, database, or directory without written permission
                  from us.
                </li>
                <li>
                  Trick, defraud, or mislead us and other users, especially in
                  any attempt to learn sensitive account information such as
                  user passwords.
                </li>
                <li>
                  Circumvent, disable, or otherwise interfere with
                  security-related features of the Site, including features that
                  prevent or restrict the use or copying of any Content or
                  enforce limitations on the use of the Site and/or the Content
                  contained therein.
                </li>
                <li>
                  Disparage, tarnish, or otherwise harm, in our opinion, us
                  and/or the Site.
                </li>
                <li>
                  Use any information obtained from the Site in order to harass,
                  abuse, or harm another person.
                </li>
                <li>
                  Make improper use of our support services or submit false
                  reports of abuse or misconduct.
                </li>
                <li>
                  Use the Site in a manner inconsistent with any applicable laws
                  or regulations.
                </li>
                <li>
                  Engage in unauthorized framing of or linking to the Site.
                </li>
                <li>
                  Upload or transmit (or attempt to upload or to transmit)
                  viruses, Trojan horses, or other material, including excessive
                  use of capital letters and spamming (continuous posting of
                  repetitive text), that interferes with any party&apos;s
                  uninterrupted use and enjoyment of the Site or modifies,
                  impairs, disrupts, alters, or interferes with the use,
                  features, functions, operation, or maintenance of the Site.
                </li>
                <li>
                  Engage in any automated use of the system, such as using
                  scripts to send comments or messages, or using any data
                  mining, robots, or similar data gathering and extraction
                  tools.
                </li>
                <li>
                  Delete the copyright or other proprietary rights notice from
                  any Content.
                </li>
                <li>
                  Attempt to impersonate another user or person or use the
                  username of another user.
                </li>
                <li>
                  Upload or transmit (or attempt to upload or to transmit) any
                  material that acts as a passive or active information
                  collection or transmission mechanism, including without
                  limitation, clear graphics interchange formats (“gifs”),
                  1&times;1 pixels, web bugs, cookies, or other similar devices
                  (sometimes referred to as “spyware” or “passive collection
                  mechanisms” or “pcms”).
                </li>
                <li>
                  Interfere with, disrupt, or create an undue burden on the Site
                  or the networks or services connected to the Site.
                </li>
                <li>
                  Harass, annoy, intimidate, or threaten any of our employees or
                  agents engaged in providing any portion of the Site to you.
                </li>
                <li>
                  Attempt to bypass any measures of the Site designed to prevent
                  or restrict access to the Site, or any portion of the Site.
                </li>
                <li>
                  Copy or adapt the Site&apos;s software, including but not
                  limited to Flash, PHP, HTML, JavaScript, or other code.
                </li>
                <li>
                  Except as permitted by applicable law, decipher, decompile,
                  disassemble, or reverse engineer any of the software
                  comprising or in any way making up a part of the Site.
                </li>
                <li>
                  Except as may be the result of standard search engine or
                  Internet browser usage, use, launch, develop, or distribute
                  any automated system, including without limitation, any
                  spider, robot, cheat utility, scraper, or offline reader that
                  accesses the Site, or using or launching any unauthorized
                  script or other software.
                </li>
                <li>
                  Use a buying agent or purchasing agent to make purchases on
                  the Site.
                </li>
                <li>
                  Make any unauthorized use of the Site, including collecting
                  usernames and/or email addresses of users by electronic or
                  other means for the purpose of sending unsolicited email, or
                  creating user accounts by automated means or under false
                  pretenses.
                </li>
                <li>
                  Use the Site as part of any effort to compete with us or
                  otherwise use the Site and/or the Content for any
                  revenue-generating endeavor or commercial enterprise.
                </li>
                <li>
                  Use the Site to advertise or offer to sell goods and services.
                </li>
                <li>Sell or otherwise transfer your profile.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="license-and-access" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">6. LICENSE AND ACCESS</h2>
          <div className="space-y-10">
            <p>
              Subject to the provisions set out in these Terms, the Company
              grants you a personal, limited, non-exclusive, non-transferable
              and revocable license to access (for personal use only) the
              Alchemyst Website and avail the Services, only as expressly
              permitted in these Terms. Such limited license does not
              include/permit any resale or commercial use of the Alchemyst
              Website or its contents; any collection, use or derivative use of
              the Website, its contents, any product listings, descriptions, or
              prices; any downloading or copying of information for the benefit
              of another third party; or any use of data mining, robots, or
              similar data gathering and extraction tools. You hereby agree and
              undertake not to use, host, display, upload, modify, publish,
              transmit, update or share any information/ content/ message/
              language/ document (including pursuant to gifting services/
              printing services/ orders to be delivered to someone else-3rd
              party recipients/ messages to be delivered along with the order)
              (whether in writing or otherwise while communicating on the
              Alchemyst AI Platform including but not limited to communicating
              with our support agents or delivery partners, through any medium)
              which (“Prohibited Conduct”):
            </p>
            <ul className="space-y-4 pl-3">
              <li>
                Belongs to another person and to which you do not have any right
                or full rights;
              </li>
              <li>
                Is harmful, threatening, abusive, indecent, discriminatory,
                tortious, vulgar, profane, harassing, blasphemous, defamatory,
                problematic, obscene, pornographic, paedophilic, libellous,
                invasive of another&apos;s privacy, hateful, or racially,
                ethnically objectionable, disparaging, relating or encouraging
                money laundering or gambling, or otherwise offensive,
                objectionable, menacing, inappropriate or unlawful in any manner
                whatever;
              </li>
              <li>
                Contains material that violates the standards of the Services;
              </li>
              <li>
                Accuses others of illegal activity, or describes physical
                confrontations;
              </li>
              <li>Attempts to impersonate another person or entity;</li>
              <li>
                Disguises or attempts to disguise the origin of your messages,
                content, including but not limited to by: <br /> (a) submitting
                your content under a false name or false pretences; or <br />{" "}
                (b) disguising or attempting to disguise the IP address from
                which your content is submitted;
              </li>
              <li>Harms minors in any way;</li>
              <li>
                Infringes any patent, trademark, copyright or another
                proprietary/intellectual property right;
              </li>
              <li>
                Violates any applicable law and/ or may result in a civil/
                criminal liability;
              </li>
              <li>
                Contains software viruses or any other computer code, files or
                programs designed to interrupt, destroy or limit the
                functionality of any computer resource;
              </li>
              <li>
                Threatens the unity, integrity, defence, security or sovereignty
                of India, friendly relations with foreign states, or public
                order or causes incitement to the commission of any cognizable
                offence or prevents investigation of any offence or is insulting
                any other nation;
              </li>
              <li>Is misleading or known to be false in any way; and/ or</li>
              <li>Attempts to do any of the foregoing.</li>
            </ul>
            <p>
              You acknowledge that the company has no obligation to monitor your
              - or anyone else's - access to or use of the Services for
              violations of the terms, or to review or edit any content.
              However, we have the right to do so for the purpose of operating
              and improving the Services (including without limitation for fraud
              prevention, risk assessment, investigation and customer support
              purposes), to ensure your compliance with the terms and to comply
              with applicable law or the order or requirement of legal process,
              a court, consent decree, administrative agency or other
              governmental body.
            </p>
            <p>
              Any and all liability arising out of or relating to violation of
              these Terms including in relation to the aforesaid information/
              content/ message is your sole and absolute responsibility, and not
              of the company.
            </p>
            <p>
              Alchemyst Website or any portion of the Website may not be
              reproduced, duplicated, copied, sold, resold, visited, or
              otherwise exploited for any commercial purpose without express
              prior written consent of the company.
            </p>
            <p>
              You may not frame or utilize framing techniques to enclose any
              trademark, logo, or other proprietary information (including
              images, text, page layout, or form) of the Website or of the
              company and/or its group companies/ affiliates without the express
              prior written consent of the company.
            </p>
            <p>
              You may not use any meta tags or any other “hidden text” utilizing
              the company&apos;s name or trademarks without the express prior
              written consent of the company.
            </p>
            <p>
              You shall not attempt to gain unauthorized access to any portion
              or feature of the Website, or any other systems or networks
              connected to the Website or to any server, computer, network, or
              to any of the services offered on or through the Website, by
              hacking, 'password mining' or any other illegitimate means.
            </p>
          </div>
        </section>

        <section id="social-media" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">7. SOCIAL MEDIA</h2>
          <div className="space-y-10">
            <p>
              As part of the functionality of the Alchemyst AI, you may link
              your account with online accounts you have with third-party
              service providers (each such account, a “Third-Party Account”) by
              either: (1) providing your Third-Party Account login information
              through the Site; or (2) allowing us to access your Third-Party
              Account, as is permitted under the applicable terms and conditions
              that govern your use of each Third-Party Account. You represent
              and warrant that you are entitled to disclose your Third-Party
              Account login information to us and/or grant us access to your
              Third-Party Account, without breach by you of any of the terms and
              conditions that govern your use of the applicable Third-Party
              Account, and without obligating us to pay any fees or making us
              subject to any usage limitations imposed by the third-party
              service provider of the Third-Party Account. By granting us access
              to any Third-Party Accounts, you understand that (1) we may
              access, make available, and store (if applicable) any content that
              you have provided to and stored in your Third-Party Account (the
              “Social Network Content”) so that it is available on and through
              the Site via your account, including without limitation any friend
              lists and (2) we may submit to and receive from your Third-Party
              Account additional information to the extent you are notified when
              you link your account with the Third-Party Account. Depending on
              the Third-Party Accounts you choose and subject to the privacy
              settings that you have set in such Third-Party Accounts,
              personally identifiable information that you post to your
              Third-Party Accounts may be available on and through your account
              on the Site. Please note that if a Third-Party Account or
              associated service becomes unavailable or our access to such Third
              Party Account is terminated by the third-party service provider,
              then Social Network Content may no longer be available on and
              through the Site. You will have the ability to disable the
              connection between your account on the Site and your Third-Party
              Accounts at any time. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE
              THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD- PARTY
              ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH
              THIRD-PARTY SERVICE PROVIDERS. We make no effort to review any
              Social Network Content for any purpose, including but not limited
              to, for accuracy, legality, or non- infringement, and we are not
              responsible for any Social Network Content. You acknowledge and
              agree that we may access your email address book associated with a
              Third-Party Account and your contacts list stored on your mobile
              device or tablet computer solely for purposes of identifying and
              informing you of those contacts who have also registered to use
              the Site. You can deactivate the connection between the Site and
              your Third-Party Account by contacting us using the contact
              information below or through your account settings (if
              applicable). We will attempt to delete any information stored on
              our servers that was obtained through such Third- Party Account,
              except the username and profile picture that become associated
              with your account.
            </p>
          </div>
        </section>

        <section id="submissions" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">8. SUBMISSIONS</h2>
          <div className="space-y-10">
            <p>
              You acknowledge and agree that any questions, comments,
              suggestions, ideas, feedback, or other information regarding the
              Alchemyst AI ("Submissions") provided by you to us are non-
              confidential and shall become our sole property. We shall own
              exclusive rights, including all intellectual property rights, and
              shall be entitled to the unrestricted use and dissemination of
              these Submissions for any lawful purpose, commercial or otherwise,
              without acknowledgment or compensation to you. You hereby waive
              all moral rights to any such Submissions, and you hereby warrant
              that any such Submissions are original with you or that you have
              the right to submit such Submissions. You agree there shall be no
              recourse against us for any alleged or actual infringement or
              misappropriation of any proprietary right in your Submissions.
            </p>
          </div>
        </section>

        <section id="third-party-website" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            9. THIRD-PARTY WEBSITE AND CONTENT
          </h2>
          <div className="space-y-10">
            <p>
              The <i>Alchemyst AI</i> may contain (or you may be sent via the
              Site) links to other websites ("Third- Party Websites") as well as
              articles, photographs, text, graphics, pictures, designs, music,
              sound, video, information, applications, software, and other
              content or items belonging to or originating from third parties
              ("Third-Party Content"). Such Third-Party Websites and Third-
              Party Content are not investigated, monitored, or checked for
              accuracy, appropriateness, or completeness by us, and we are not
              responsible for any Third-Party Websites accessed through the Site
              or any Third-Party Content posted on, available through, or
              installed from the Site, including the content, accuracy,
              offensiveness, opinions, reliability, privacy practices, or other
              policies of or contained in the Third-Party Websites or the
              Third-Party Content. Inclusion of, linking to, or permitting the
              use or installation of any Third-Party Websites or any Third-Party
              Content does not imply approval or endorsement thereof by us. If
              you decide to leave the Site and access the Third-Party Websites
              or to use or install any Third-Party Content, you do so at your
              own risk, and you should be aware these Terms of Use no longer
              govern. You should review the applicable terms and policies,
              including privacy and data gathering practices, of any website to
              which you navigate from the <i>Alchemyst AI</i> or relating to any
              applications you use or install from the <i>Alchemyst AI</i>. Any
              purchases you make through Third-Party Websites will be through
              other websites and from other companies, and we take no
              responsibility whatsoever in relation to such purchases which are
              exclusively between you and the applicable third party. You agree
              and acknowledge that we do not endorse the products or services
              offered on Third- Party Websites and you shall hold us harmless
              from any harm caused by your purchase of such products or
              services. Additionally, you shall hold us harmless from any losses
              sustained by you or harm caused to you relating to or resulting in
              any way from any Third-Party Content or any contact with
              Third-Party Websites.
            </p>
          </div>
        </section>

        <section id="site-management" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">10. SITE MANAGEMENT</h2>
          <div className="space-y-10">
            <p>
              We reserve the right, but not the obligation, to: <br />
              (1) monitor the Alchemyst AI for violations of these Terms of Use;{" "}
              <br />
              (2) take appropriate legal action against anyone who, in our sole
              discretion, violates the law or these Terms of Use, including
              without limitation, reporting such user to law enforcement
              authorities; <br />
              (3) in our sole discretion and without limitation, refuse,
              restrict access to, limit the availability of, or disable (to the
              extent technologically feasible) any of your Contributions or any
              portion thereof; <br />
              (4) in our sole discretion and without limitation, notice, or
              liability, to remove from the Site or otherwise disable all files
              and content that are excessive in size or are in any way
              burdensome to our systems; <br />
              and (5) otherwise manage the Site in a manner designed to protect
              our rights and property and to facilitate the proper functioning
              of the Site.
            </p>
          </div>
        </section>

        <section id="privacy-policy" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">11. PRIVACY POLICY</h2>
          <div className="space-y-10">
            <p>
              We care about data privacy and security. By using the Site, you
              agree to be bound by our Privacy Policy posted on the Site, which
              is incorporated into these Terms of Use. Please be advised the
              Site is hosted in India. If you access the Site from any other
              region of the world with laws or other requirements governing
              personal data collection, use, or disclosure that differ from
              applicable laws in India, then through your continued use of the
              Site, you are transferring your data to India, and you agree to
              have your data transferred to and processed in India.
            </p>
          </div>
        </section>

        <section id="copyright-infringements" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            12. COPYRIGHT INFRINGEMENTS
          </h2>
          <div className="space-y-10">
            <p>
              We respect the intellectual property rights of others. If you
              believe that any material available on or through the{" "}
              <i>Alchemyst AI</i>
              infringes upon any copyright you own or control, please
              immediately notify us using the contact information provided below
              (a “Notification”). A copy of your Notification will be sent to
              the person who posted or stored the material addressed in the
              Notification. Please be advised that pursuant to applicable law
              you may be held liable for damages if you make material
              misrepresentations in a Notification. Thus, if you are not sure
              that material located on or linked to by the <i>
                Alchemyst AI
              </i>{" "}
              infringes your copyright, you should consider first contacting an
              attorney.
            </p>
          </div>
        </section>

        <section id="copyright-infringements" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            13. TERM AND TERMINATION
          </h2>
          <div className="space-y-10">
            <p>
              These Terms of Use shall remain in full force and effect while you
              use the Alchemyst AI.
              <b>
                {" "}
                WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE
                RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE
                OR LIABILITY, DENY ACCESS TO AND USE OF THE ALCHEMYST AI
                (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY
                REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH
                OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE
                TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY
                TERMINATE YOUR USE OR PARTICIPATION IN THE ALCHEMYST AI OR
                DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU
                POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
              </b>
            </p>
            <p>
              If we terminate or suspend your account for any reason, you are
              prohibited from registering and creating a new account under your
              name, a fake or borrowed name, or the name of any third party,
              even if you may be acting on behalf of the third party. In
              addition to terminating or suspending your account, we reserve the
              right to take appropriate legal action, including without
              limitation pursuing civil, criminal, and injunctive redress.
            </p>
          </div>
        </section>

        <section id="modifications" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            14. MODIFICATIONS AND INTERRUPTIONS
          </h2>
          <div className="space-y-10">
            <p>
              We reserve the right to change, modify, or remove the contents of
              the <i>Alchemyst AI</i> at any time or for any reason at our sole
              discretion without notice. However, we have no obligation to
              update any information on our <i>Alchemyst AI</i>. We also reserve
              the right to modify or discontinue all or part of the Site without
              notice at any time. We will not be liable to you or any third
              party for any modification, price change, suspension, or
              discontinuance of the
              <i>Alchemyst AI</i>.
            </p>
            <p>
              We cannot guarantee the <i>Alchemyst AI</i> will be available at
              all times. We may experience hardware, software, or other problems
              or need to perform maintenance related to the <i>Alchemyst AI</i>,
              resulting in interruptions, delays, or errors. We reserve the
              right to change, revise, update, suspend, discontinue, or
              otherwise modify the <i>Alchemyst AI</i> at any time or for any
              reason without notice to you. You agree that we have no liability
              whatsoever for any loss, damage, or inconvenience caused by your
              inability to access or use the <i>Alchemyst AI</i> during any
              downtime or discontinuance of the <i>Alchemyst AI</i>. Nothing in
              these Terms of Use will be construed to obligate us to maintain
              and support the <i>Alchemyst AI</i>
              or to supply any corrections, updates, or releases in connection
              therewith.
            </p>
          </div>
        </section>

        <section id="governing-law" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">15. GOVERNING LAW</h2>
          <div className="space-y-10">
            <p>
              These Terms shall be governed by and defined following the laws of
              India. XALCHEMYST TECHNOLOGIES PRIVATE LIMITED and yourself
              irrevocably consent that the courts of India shall have exclusive
              jurisdiction to resolve any dispute which may arise in connection
              with these terms.
            </p>
          </div>
        </section>

        <section id="dispute-resolution" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            16. DISPUTE RESOLUTION
          </h2>
          <div className="space-y-10">
            <div>
              <p className="font-semibold text-2xl">
                16.1 Informal Negotiations
              </p>
              <p>
                To expedite resolution and control the cost of any dispute,
                controversy, or claim related to these Terms of Use (each
                "Dispute" and collectively, the “Disputes”) brought by either
                you or us (individually, a “Party” and collectively, the
                “Parties”), the Parties agree to first attempt to negotiate any
                Dispute (except those Disputes expressly provided below)
                informally for at least Forty-Five (45) days before initiating
                arbitration. Such informal negotiations commence upon written
                notice from one Party to the other Party.
              </p>
            </div>
            <div>
              <p className="font-semibold text-2xl">16.2 Binding Arbitration</p>
              <p>
                Any dispute or claim under the Terms of Use shall be referred to
                and finally and exclusively resolved by arbitration in
                accordance with the Arbitration and Conciliation Act, 1996 or
                any statutory modification or re-enactment thereof for the time
                being in force. The arbitration shall be held at West Bengal and
                all proceedings in any such arbitration shall be conducted in
                English. There shall be 3 (three) arbitrators (“Arbitrators”),
                all of whom shall be fluent in English. Within thirty 30
                (thirty) Days of the reference of the dispute to arbitration,
                the Party raising the dispute and making the reference to
                arbitration shall appoint one Arbitrator and the other Party
                shall appoint the other Arbitrator. The third Arbitrator shall
                be appointed by the 2 (two) appointed Arbitrators. The arbitral
                award shall be final and binding upon the parties. The Parties
                shall equally bear the costs and expenses for the conduct of the
                arbitration proceedings, however; each Party shall bear their
                own legal expenses.
              </p>
            </div>
            <div>
              <p className="font-semibold text-2xl">16.3 Restrictions</p>
              <p>
                The Parties agree that any arbitration shall be limited to the
                Dispute between the Parties individually. To the full extent
                permitted by law, (a) no arbitration shall be joined with any
                other proceeding; (b) there is no right or authority for any
                Dispute to be arbitrated on a class- action basis or to utilize
                class action procedures; and (c) there is no right or authority
                for any Dispute to be brought in a purported representative
                capacity on behalf of the general public or any other persons.
              </p>
            </div>
            <div>
              <p className="font-semibold text-2xl">
                16.4 Exceptions to Informal Negotiations and Arbitration
              </p>
              <p>
                The Parties agree that the following Disputes are not subject to
                the above provisions concerning informal negotiations and
                binding arbitration: <br />
                (a) any Disputes seeking to enforce or protect, or concerning
                the validity of, any of the intellectual property rights of a
                Party;
                <br /> (b) any Dispute related to, or arising from, allegations
                of theft, piracy, invasion of privacy, or unauthorized use; and{" "}
                <br />
                (c) any claim for injunctive relief. If this provision is found
                to be illegal or unenforceable, then neither Party will elect to
                arbitrate any Dispute falling within that portion of this
                provision found to be illegal or unenforceable and such Dispute
                shall be decided by a court of competent jurisdiction within the
                courts listed for jurisdiction above, and the Parties agree to
                submit to the personal jurisdiction of that court.
              </p>
            </div>
          </div>
        </section>

        <section id="corrections" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">17. CORRECTIONS</h2>
          <div className="space-y-10">
            <p>
              There may be information on the <i>Alchemyst AI</i> that contains
              typographical errors, inaccuracies, or omissions, including
              descriptions, pricing, availability, and various other
              information. We reserve the right to correct any errors,
              inaccuracies, or omissions and to change or update the information
              on the <i>Alchemyst AI</i> at any time, without prior notice.
            </p>
          </div>
        </section>

        <section id="disclaimer" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">18. DISCLAIMER</h2>
          <div className="space-y-10">
            <p>
              THE <i>Alchemyst AI</i> IS PROVIDED ON AN{" "}
              <a
                href="https://getalchemystai.com/"
                className="hover:text-blue-500"
              >
                <u>HTTPS://GETALCHEMYSTAI.COM/</u>
              </a>{" "}
              AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE{" "}
              <i>Alchemyst AI</i>
              SOFTWARE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE
              FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
              EXPRESS OR IMPLIED, IN CONNECTION WITH THE <i>Alchemyst AI</i> AND
              YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              AND NON- INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS
              ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE&apos;S CONTENT OR
              THE CONTENT OF ANY WEBSITES LINKED TO THE <i>Alchemyst AI</i> AND
              WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY <br />
              (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS,
              <br /> (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE
              WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE
              <i>Alchemyst AI</i>,<br /> (3) ANY UNAUTHORIZED ACCESS TO OR USE
              OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION
              AND/OR FINANCIAL INFORMATION STORED THEREIN, <br />
              (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE{" "}
              <i>Alchemyst AI</i>, <br />
              (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE
              TRANSMITTED TO OR THROUGH THE <i>Alchemyst AI</i> BY ANY THIRD
              PARTY, AND/OR <br />
              (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR
              ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF
              ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA
              THE <i>Alchemyst AI</i>. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR
              ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR
              OFFERED BY A THIRD PARTY THROUGH THE <i>Alchemyst AI</i>, ANY
              HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED
              IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO
              OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION
              BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
              AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR
              IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE
              CAUTION WHERE APPROPRIATE.
            </p>
          </div>
        </section>

        <section id="limitations-of-liability" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            19. LIMITATIONS OF LIABILITY
          </h2>
          <div className="space-y-10">
            <p>
              IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE
              LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT,
              CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE
              DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR
              OTHER DAMAGES ARISING FROM YOUR USE OF THE ALCHEMYST AI, EVEN IF
              WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR
              LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE
              FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT
              PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR
              TO ANY CAUSE OF ACTION ARISING SUBJECT TO A MAXIMUM AMOUNT OF
              INDIAN RUPEES ONE LAKH. CERTAIN US STATE LAWS AND INTERNATIONAL
              LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE
              EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO
              YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT
              APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
            </p>
          </div>
        </section>

        <section id="indemnification" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">20. INDEMNIFICATION</h2>
          <div className="space-y-10">
            <p>
              You agree to defend, indemnify, and hold us harmless, including
              our subsidiaries, affiliates, and all of our respective officers,
              agents, partners, and employees, from and against any loss,
              damage, liability, claim, or demand, including reasonable
              attorneys&apos; fees and expenses, made by any third party due to
              or arising out of: <br />
              (1) your Contributions; <br />
              (2) use of the Alchemyst AI; <br />
              (3) breach of these Terms of Use; <br />
              (4) any breach of your representations and warranties set forth in
              these Terms of Use; <br />
              (5) your violation of the rights of a third party, including but
              not limited to intellectual property rights; or <br />
              (6) any overt harmful act toward any other user of the Alchemyst
              AI with whom you connected via the Alchemyst AI. Notwithstanding
              the foregoing, we reserve the right, at your expense, to assume
              the exclusive defence and control of any matter for which you are
              required to indemnify us, and you agree to cooperate, at your
              expense, with our defence of such claims. We will use reasonable
              efforts to notify you of any such claim, action, or proceeding
              which is subject to this indemnification upon becoming aware of
              it.
            </p>
          </div>
        </section>

        <section id="user-data" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">21. USER DATA</h2>
          <div className="space-y-10">
            <p>
              We will maintain certain data that you transmit to the{" "}
              <i>Alchemyst AI</i> for the purpose of managing the performance of
              the <i>Alchemyst AI</i>, as well as data relating to your use of
              the <i>Alchemyst AI</i>. Although we perform regular routine
              backups of data, you are solely responsible for all data that you
              transmit or that relates to any activity you have undertaken using
              the <i>Alchemyst AI</i>. You agree that we shall have no liability
              to you for any loss or corruption of any such data, and you hereby
              waive any right of action against us arising from any such loss or
              corruption of such data.
            </p>
          </div>
        </section>

        <section id="electronic-communications" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">
            22. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
          </h2>
          <div className="space-y-10">
            <p>
              Visiting the <i>Alchemyst AI</i>, sending us emails, and
              completing online forms constitute electronic communications. You
              consent to receive electronic communications, and you agree that
              all agreements, notices, disclosures, and other communications we
              provide to you electronically, via email and on the{" "}
              <i>Alchemyst AI</i>, satisfy any legal requirement that such
              communication be in writing. <b></b>YOU HEREBY AGREE TO THE USE OF
              ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND
              TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF
              TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE{" "}
              <i>Alchemyst AI</i>.<b /> You hereby waive any rights or
              requirements under any statutes, regulations, rules, ordinances,
              or other laws in any jurisdiction which require an original
              signature or delivery or retention of non-electronic records, or
              to payments or the granting of credits by any means other than
              electronic means.
            </p>
          </div>
        </section>

        <section id="miscellaneous" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">23. MISCELLANEOUS</h2>
          <div className="space-y-10">
            <p>
              These Terms of Use and any policies or operating rules posted by
              us on the <i>Alchemyst AI</i> or in respect to the{" "}
              <i>Alchemyst AI</i>
              constitute the entire agreement and understanding between you and
              us. Our failure to exercise or enforce any right or provision of
              these Terms of Use shall not operate as a waiver of such right or
              provision. These Terms of Use operate to the fullest extent
              permissible by law. We may assign any or all of our rights and
              obligations to others at any time. We shall not be responsible or
              liable for any loss, damage, delay, or failure to act caused by
              any cause beyond our reasonable control. If any provision or part
              of a provision of these Terms of Use is determined to be unlawful,
              void, or unenforceable, that provision or part of the provision is
              deemed severable from these Terms of Use and does not affect the
              validity and enforceability of any remaining provisions. There is
              no joint venture, partnership, employment or agency relationship
              created between you and us as a result of these Terms of Use or
              use of the
              <i>Alchemyst AI</i>. You agree that these Terms of Use will not be
              construed against us by virtue of having drafted them. You hereby
              waive any and all defences you may have based on the electronic
              form of these Terms of Use and the lack of signing by the parties
              hereto to execute these Terms of Use.
            </p>
          </div>
        </section>

        <section id="contact-us" className="mt-28 mb-8">
          <h2 className="text-4xl font-semibold mb-4">24. CONTACT US</h2>
          <div className="space-y-5">
            <p>
              In order to resolve a complaint regarding the Alchemyst AI or to
              receive further information regarding use of the Alchemyst AI,
              please contact us at:
            </p>
            <p>
              <b>XALCHEMYST TECHNOLOGIES PRIVATE LIMITED</b> <br />
              <b>Registered Office:</b> 3rd Floor, Flat 3/A, 20 P C Ghosh Road,
              Patipukur, North 24Parganas, Patipukur, West Bengal, India, 700048
              India
            </p>
            <p>
              <b>Phone:</b> (+91) 8910016942 <br /> <b>Email:</b>{" "}
              uttaran@getalchemystai.com
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

export default TermsOfUse;
