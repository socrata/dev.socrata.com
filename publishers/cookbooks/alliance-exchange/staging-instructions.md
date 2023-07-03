---
title: Staging Instructions and FAQ
noindex: true
layout: chromeless
---
# ![logo](https://www.tylertech.com/Portals/0/Logo-NavBar.jpg?ver=Js0wL8bzpXBsBHn_bv-Kjg%3d%3d) Staging - Instructions and FAQ

## 1. Prerequisites
- You must have passed the Certification or have attested that you will provide them
- You must have live production data in your CMS that is ready to send to the Staging Platform
- A County-Specific Credential Pair (Client ID and Client Secret): 
    - Please note this will be different than the one you used for Certification. Please see the API documentation for more info on Authentication and Authorization: [API Documentation](./api/index.html) 
    - *Credential Pairs must be sent to vendors via Kiteworks..*
    - Most vendors will have multiple sets of credentials to manage in Staging.
- You have received the invitation email to enroll in Notification Emails from the Staging Pipeline. We highly recommend that as many members of your team be enrolled as possible. 
 
## 2. Instructions for Transmitting Data on the Staging Pipeline 
### Step 1: Get an Authorization (Bearer) Token
Like before, the Staging Instance of the Pipeline is access-controlled such that each vendor has its own Credential Pair. A Credential Pair consists of a `Client ID` and `Client Secret`. Vendors should have received a `Client ID` and `Client Secret` via a secure email.

Vendors will use this pair to get a bearer token that will allow them to interact with the Judicial Analytics Pipeline.

#### Example cURL command
Note: this command will provide a bearer token that is valid for 60 minutes.
```
curl https://tyler-alliance-system-demo.auth-fips.us-gov-west-1.amazoncognito.com/oauth2/token -X POST -H "Content-Type: application/x-www-form-urlencoded" --user YOUR_CLIENT_ID:YOUR_CLIENT_SECRET -d "grant_type=client_credentials"
```

Please refer to the on the [Definitions and Guidance page](./staging-definitions.md) for more information.

### Step 2: Submit Messages to the Pipeline API
#### 1. Build the message
Every message consists of an envelope. The envelope contains a series of events, as well as metadata to help route the message appropriately.

An example message might look like:

```
{
    "ResolveMappings": true,
    "ValidateEnvelope": true,
    "Events": [
        {
            "EventType": "di-aoic-new-record-event",
            "Entities": [
                {
                    "EntityType": "di-aoic-problemsolvingcourts-screening",
                    "LinkEntity": true,
                    "EntityData": {
                        "recordid": "1234",
                        "name": "Jane Doe",
                        "offenderid": "4575",
                        "dateofbirth": "1982-04-20",
                        "sexperceived": "Female",
                        "sentencingcountyname": "Sangamon"
                    }
                }
            ]
        }
    ]
}
```
Details for each attribute of the `Envelope` are:

| field            | allowed_type | required | description                                                                                     |
|------------------|--------------|----------|-------------------------------------------------------------------------------------------------|
| Events           | array        | Y        | An array of events. For more details. [See next section](./staging-instructions#events)                               |

#### Events
Envelopes may consist of one or more `events`. Details for each attribute of the `Event` are:

| field            | allowed_type | required | description                                                         |
|------------------|--------------|----------|---------------------------------------------------------------------|
| Entities          | array        | Y        | An array of events. For more details. [See next section](#entities) |
| EventType         | string       | Y        | Always set to `di-aoic-new-record-event`                            |

#### Entities
Entities are the most important part of the message. This specifies the program, the record and the values associated with that record. 
Details for each attribute are as follows:

| field          | allowed_type | required | description                                                                                                                         |
|----------------|--------------|----------|-------------------------------------------------------------------------------------------------------------------------------------|
| EntityID       | string       | Y        | Always set to `AOIC`                                                                                                                |
| EntityType     | string       | Y        | Maps to the specific program and data in the format `di-[Program Name]-[Dataset Name]`. See [below for more examples](#entity-types) |
| EntityData     | object       | Y        | The record associated with this Entity                                                                                              |


#### Entity Types

EntityTypes map the record to a specific program and dataset. Valid EntityTypes are:

```
di-aoic-problemsolvingcourts-active-status
di-aoic-problemsolvingcourts-assessments
di-aoic-problemsolvingcourts-drug-testing
di-aoic-problemsolvingcourts-individual-background
di-aoic-problemsolvingcourts-redeploy
di-aoic-problemsolvingcourts-screening
di-aoic-problemsolvingcourts-termination
di-aoic-problemsolvingcourts-violations-and-sanctions
di-aoic-pretrial-active-status
di-aoic-pretrial-court-appearance-and-judicial-decisions
di-aoic-pretrial-courts-and-charges
di-aoic-pretrial-disposition-and-release
di-aoic-pretrial-drug-screening
di-aoic-pretrial-individual-background
di-aoic-pretrial-intake-and-assessment
di-aoic-pretrial-jail
di-aoic-pretrial-violations
di-aoic-probation-active-status
di-aoic-probation-ancillary-assessment
di-aoic-probation-drug-testing
di-aoic-probation-individual-background
di-aoic-probation-intake
di-aoic-probation-offenses
di-aoic-probation-programming-and-treatment
di-aoic-probation-supervision-and-sentencing
di-aoic-probation-termination
di-aoic-probation-violations-and-sanctions
di-aoic-reviewingcourt-case-status
di-aoic-reviewingcourt-party
di-aoic-reviewingcourt-financial
di-aoic-reviewingcourt-party-hearing
di-aoic-reviewingcourt-hearings
di-aoic-reviewingcourt-reviewing-courts
di-aoic-reviewingcourt-administration
di-aoic-trialcourt-case-status
di-aoic-trialcourt-documents
di-aoic-trialcourt-party
di-aoic-trialcourt-financial
di-aoic-trialcourt-adr
di-aoic-trialcourt-party-hearing
di-aoic-trialcourt-pretrial
di-aoic-trialcourt-hearings
di-aoic-trialcourt-ja
```

#### Entity Data

Every EntityData object must contain the elements, in the format required, listed in the [vendor folder](https://tylertech.sharepoint.com/sites/Client/DI/AOIC/Program%201%20%203%20Prepare%20Solution/Forms/AllItems.aspx?FolderCTID=0x012000E4E5E251D4298743B4D89B00DBBF4D85&View=%7B0F3FBEB1%2DB9A9%2D4E2E%2D957E%2D9E4144F8F6F9%7D&id=%2Fsites%2FClient%2FDI%2FAOIC%2FProgram%201%20%203%20Prepare%20Solution%2FData%20Elements%20%2D%20Versions&viewid=0f3fbeb1%2Db9a9%2D4e2e%2D957e%2D9e4144f8f6f9)

These should be passed as attributes in the object. For example:

```
{
    "Entities": [
        {
            "EntityType": "di-aoic-pretrial-violations",
            "LinkEntity": true,
            "EntityData": {
                "recordid": "2468",
                "name": "Dale Bell",
                "offenderid": "4354",
                "dateofbirth": "1989-03-29",
                "sexperceived": "Male",
                "prosecutingcountyname": "Cook"
            }
        }
    ]
}
```

#### Notes on the EntityData object

There are a couple of critical items to watch out for when building the EntityData object:

- *Data Elements* - Each Entity must include the required elements listed in the vendor folder, in the format specified. The format must be consistent with the Regular Expression patterns specified in the Data Elements.

- *RecordID* - The RecordID is used to allow the vendor to maintain (modify, update, delete) the data after it’s been submitted. This is a unique identifier for the object in the local source system. Each object must have a unique RecordID.

### 2. Send the message
Using the Bearer Token received from the Step 1, and the message prepared in the previous section, send an API call to PUT the Message built in the previous section. Please make sure to do a PUT rather than a POST.

Sample cURL and PowerShell commands can be found here to demonstrate minimal examples for each data element set.

##### Validate the response
A successful response will look like:

```
{
  "status":"SUCCESS",
  "EnvelopeId": "UNIQUE-ENVELOPE-ID"
}
```
If you receive a successful response, repeat Step 2, utilizing the same 60-min token, to submit additional record(s).


##### Important Note about Validation Error Notifications
Please note that, although Error Validation Workbooks are not used by default in the Staging Process, the Data Pipeline for Staging sends Notification Emails in a similar manner to the Data Pipeline for Certification.  These notifications are sent when an error is encountered during this step of the Validation Process.

### Step 3: Participate in Staging by Continuing to Submit Live Data
Completion is gauged by the following criteria.  Please note that, because Staging is an iterative process, some of the criteria are ongoing.

- Continue to submit live data to the Staging Environment until you have submitted all data elements for the respective program area.
- Work cooperatively and responsively with the AOIC to make refinements and updates to the data upon request. 

As you complete the milestones outlined above, please send updates to [data-certification@tylertech.com](mailto:data-certification@tylertech.com) as soon as possible.  We will document your team’s completion of these steps.

## 3. Resolving Error Messages 
### 3.1 Scenario: I Received an Error Notification Email. How Can I Make Sense of It?
- Please start by consulting the “Parsing Out Common Errors” section below. If you need additional help:

    - Please copy and paste the Envelope ID into an email to [data-certification@tylertech.com](mailto:data-certification@tylertech.com).
    - We will help you promptly to troubleshoot in more depth.

### 3.2 Scenario: I Receive an Error that Mentions “System_County_Association”
This type of error means that you have tried to submit a record for a county or court over which your company does not have jurisdiction.  If you believe this is incorrect, please let us know at data-certification@tylertech.com.

Here is an example of what this error might look like:

```
{
    "Message": "Event Schema Failed Validation.",
    "schemaPath": "#/definitions/System_County_Association/oneOf/23/properties/Entities/anyOf/3/items/properties/EntityData/properties/circuitcourtncicnumber/enum",
    "ErrorSchema": "di-aoic-new-record-event",
    "keyword": "enum",
    "params": {
      "allowedValues": [
        [LIST OF SEVERAL COUNTIES HERE]
      ]
    },
    "message": "should be equal to one of the allowed values",
    "dataPath": ".Entities[0].EntityData.circuitcourtncicnumber"
  }
```
*Fix*: Check your county-related variables:`circuitcourtncicnumber`, `sentencingcountyname`, `prosecutingcountyname`, `supervisingcounty`, and `county` to make sure they list a county over which you have jurisdiction.

## 4. Troubleshooting Tips
### 4.1 General Reminders:
- To submit records, please make sure to use PUT instead of POST
- Remember that Bearer Tokens expire after One Hour
- You may not be able to access the links in Error Notification emails; this is expected behavior

### 4.2 Parsing Out Common Errors
The Notification Emails will be triggered when an error is encountered at Step 2, as described above. Only one error is included per Error Notification Email, but please note there may actually be multiple errors in the submission. You will receive one email per submission with a single error until all errors are resolved. It is suggested that you correct the error on the element in question and investigate if that error may exist in multiple places throughout your submission. For example, if you receive a required error, it’s suggested to resolve the error for that element and check the rest of your submission to find other elements that cause that error before submitting again. After all errors are resolved, error emails will no longer be sent.

The following sections detail some of the most common errors you may encounter. Again, if you need additional troubleshooting help, please feel free to contact us at [data-certification@tylertech.com](mailto:data-certification@tylertech.com) and specify your Envelope ID(s) in the email.

#### 4.2.1 Pipeline Critical Elements
The Judicial Analytics System requires that all Pipeline Critical Elements be included. If one or more Pipeline Critical Elements is missing from the submission, you’ll receive an error.  Please note that an error that says “required” is actually referring to an error with Pipeline Critical Elements. Please see [Pipeline Critical Elements vs. Required Fields](./staging-definitions#3-pipeline-critical-elements-vs-required-fields) for more information.

```
keyword: required
dataPath: 
schemaPath: #/required
message: should have required property 'recordid'
Message: Contract Schema Failed Validation.
ErrorSchema: di-aoic-problemsolvingcourts-screening
Fix: Provide the Pipeline Critical Elements and resend message
``` 
#### 4.2.2 Keyword Pattern
In certification, critical elements have pattern matching that test the contents of the element’s string value. The pipeline validates the data by checking for a pattern within the string against RegEx for the expected date format. If that pattern is not met then you will receive an error

```
keyword: pattern
dataPath: .status_date
schemaPath: #/properties/status_date/pattern
message: should match pattern "^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$"
Message: Contract Schema Failed Validation.
ErrorSchema: di-aoic-court-case-status
```
*Fix*: Check the contents of the status_date (or equivalent) element and confirm that your submission matches the expected contents. In the example above, it tests that contents match a date format similar to the `YYYY-MM-DD` format.

#### 4.2.3 Additional Properties
There is a column in the submission that is not listed in the data elements.

```
keyword: additionalProperties
dataPath:
schemaPath: #/additionalProperties
message: should NOT have additional properties
Message: Contract Schema Failed Validation.
```
*Fix*: Remove any elements from the submission that are not included in the data elements. Please note that sometimes the error will not tell you which elements are extra.

#### 4.2.4 Type
Non-critical elements must have correct json formatting to either be a number or string. If the data element should be a number, it should not be formatted as a string. 

```
keyword: type
dataPath: .dateofbirth
schemaPath: #/properties/dateofbirth/type
message: should be string
Message: Contract Schema Failed Validation.
ErrorSchema: di-aoic-problemsolvingcourts-screeninghttps://socrata.atlassian.net/plugins/servlet/ac/com.ricksoft-inc.plugins.space-sync-for-confluence/com.ricksoft-inc.plugins.space-sync-for-confluence__mention-users-in-synced-site?page.id=2571796685&space.key=SD&content.id=2571796685&content.version=56&page.type=page&page.title=AOIC%20Staging%3A%20Instruction%20Steps%20and%20FAQs%20-%20DRAFT_v1.1&space.id=384172439&content.type=page&user.isExternalCollaborator=false&page.version=56
```
*Fix*: Ensure the dateofbirth is a `string`, formatted as `YYYY-MM-DD`.

#### 4.2.5 Categorical Variable Enumeration
If you receive an error with a keyword of enum, that means that the variable’s value needs to equal one of a finite list of values.

```
keyword: enum
dataPath: .initialacute2007override
schemaPath: #/properties/initialacute2007override/enum
message: should be equal to one of the allowed values
Message: Contract Schema Failed Validation.
ErrorSchema: di-aoic-probation-ancillary-assessment
```
*Fix*: Please consult the Data Elements and make sure the value for this variable in the record is equal to one of the enumerated values.

### 4.3 Excessive Error Handling Alternative
If you are still experiencing errors after troubleshooting at least three automated error emails and need additional assistance, you may request an Error Report Workbook by following the numbered steps below.  Please note that you will need to request additional credentials from us (at data-certification@tylertech.com) before you proceed to Step #1.

1. Submit your entries to the “Prep-Staging” Pipeline.  The endpoint for this pipeline is: `https://api.tyleralliance.com/exchange/Messages`.  Please note this endpoint is DIFFERENT than the primary endpoint you will use for Staging.  The endpoint for that pipeline (and the one you will likely use much more frequently) is given in the following section linked here: [2. Record Submission and Deletion](./staging-definitions#2-record-submission-and-deletion) 
2. After your submission, email the Tyler D&I Project Team at [data-certification@tylertech.com](mailto:data-certification@tylertech.com) 
    - Email Subject: “Error Report Workbook Request for Vendor_Name / County / Program_Area”
    - Email message must include: your envelope IDs and the date and time of submission.
3. On Thursday of each week, Tyler D&I Project Team will distribute all requested workbooks from the previous week. The Workbooks will include a listing of each error and ways to fix them.

## 5. Frequently Asked Questions (FAQ’s)
### How long will the Staging Process last?

The Staging Process will be iterative in nature and will continue until around the end of the year (2023).  Please see [Step 3](#3-resolving-error-messages) above for more information.

The Staging Environment will continue to remain live even after the Production Environment is launched.  It will be a place for continued testing to take place in a CJIS-compliant capacity.

### Do the "required" fields need to be entered for the entire data record to be accepted?

Please note that, when it comes to required fields, there are fields that are denoted as required in the Data Elements, and there are fields that are Critical Elements from the Pipeline’s perspective.  Only the Pipeline Critical Elements are truly required for a data record to be accepted.  Please see Pipeline Critical Elements vs. Required Fields for more information.

### Before I submit Live Data, how do I know that the Judicial Analytics System is secure?

Like the Production Environment that will follow this, the Staging Environment is hosted in AWS GovCloud and meets all the specifications of the CJIS compliance policy.  Furthermore, every Tyler Technologies employee with access to the environment has undergone a fingerprinting and background-check process.

### Some fields appear in multiple Datasets.  Do I need to set this field in all of them?

Yes - please do.  The datasets are not relational.  For example: If you set the `Case ID` in the Case Status Dataset, you also need to set it in the Party Hearing Dataset.

### How should I go about submitting Data Elements for monetary/currency values?

Certain elements, such as `restitution_amount` or `pretrial_fee_paid`, expect dollar amounts.  Please include a dollar amount value even when the value is zero, do NOT include a decimal point, dollar sign, or commas.  The last two digits of monetary/currency fields are assumed as “cents”. Please see the following examples:

| Actual Monetary/Currency Value          | Entered Value (submitted to the pipeline as) | 
|----------------|--------------|
| $5.99       | 599       | 
| $150.00       | 15000       | 
| $2939.00       | 293900       | 
| $0.99       | 99       | 
| $0.00       | 0       | 
| $500000.03       | 50000003      | 


## 6. Additional Resources 
Our team is here to help!  We are offering the following options to support you throughout this process:

- The Tyler Team will conduct Office Hours on a biweekly basis (every other week) for Vendors in the Staging Process. These sessions will focus on the current status report and provide an opportunity to discuss progress. Each vendor will be added to the meeting series and can join at any time. Attendance is optional. 

- If you have questions or need additional assistance, the Tyler Team may be contacted at [data-certification@tylertech.com](mailto:data-certification@tylertech.com).  We will gladly assist you with technical and procedural inquiries alike.

- [Staging pipeline instructions and FAQs](./staging-instructions.md)
- [Staging definitions and guidance](./staging-definitions.md)
