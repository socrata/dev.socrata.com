---
title: Overview
noindex: true
layout: chromeless
---
# ![logo](https://www.tylertech.com/Portals/0/Logo-NavBar.jpg?ver=Js0wL8bzpXBsBHn_bv-Kjg%3d%3d) Tyler Data Pipeline Certification 
These instructions and resources are intended to walk through
the technical process of certifying data in the Tyler Judicial
Analytics Pipeline. This is a prerequisite to be granted access
to the staging pipeline.

Vendors will leverage their vendor specific authorization token
and the Judicial Analytics Pipeline to upload and validate data. A
connection will qualify for certification and verification if a
`SUCCESS` response is received for at least 10 records per program, and there are no errors within the
Pipeline’s internal logs.

Each Vendor should submit all available data elements and
specifically include all pipeline critical elements noted in the
Pipeline Critical Elements section below. The submission is
considered acceptable if no validation errors are triggered and
the required data elements contain a value suitable for its
respective datatype. **Certification will occur by program per
county.**

**Important: For courts integration, a completed Court Data
Elements Mapping Tool must be returned to AOIC before
certification can begin.**

## Prerequisites

The following are required to begin the Certification
Process:

* A minimum of 10 records reflecting data requirements per
program (Probation, Pretrial, PSC, and Courts)
* Vendor specific Credential Pair 
* Submission of the Court Mapping Tool to AOIC *(Courts
Program only)

## Step 1: Get an Authorization (Bearer) Token
The Certification Instance of the Pipeline is access-controlled
such that each vendor has its own credential pair. A credential
pair consists of a `Client ID` and `Client Secret`. Vendors should
have received a `Client ID` and `Client Secret` via a secure email.

Vendors will use this pair to get a bearer token that will allow
them to interact with the Judicial Analytics Pipeline.
```
Note: this command will provide a bearer token that is valid for 60 minutes.
```
#### Example curl command 

```
curl https://tyler-alliance-system-dev.auth.us-east-1.amazoncognito.com/oauth2/token -X POST -H "Content-Type: application/x-www-form-urlencoded" --user YOUR_CLIENT_ID:YOUR_CLIENT_SECRET -d "grant_type=client_credentials"
```
Please refer to the [API documentation](api) for more information.

## Step 2: Submit Messages to the Pipeline API
### Build the message
Every message consists of an `envelope`. The `envelope` contains a series of `events`, as well as metadata to help route the message appropriately.

An example message might look like:
```json
{
  "Events": [
    {
      "Entities": [
        {
          "EntityId": "AOIC",
          "EntityType": "di-aoic-problem-solving-courts-individual-background",
          "EntityData": {
              "name": "Dale Bell",
              "localid": 9152,
              "instanceid": "5008",
              "offenderid": "4354",
              "dateofbirth": "11/12/1982",
              "sexperceived": "Male",
              "recordid": 2468,
              "county": "cook"
           }
        }
      ],
      "EventType": "di-aoic-new-record-event"
    }
  ]
}
```
Details for each attribute of the `Envelope` are:

| field            | allowed_type | required | description                                                                                     |
|------------------|--------------|----------|-------------------------------------------------------------------------------------------------|
| Events           | array        | Y        | An array of events. For more details. [See next section](#events)                               |

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
| EntityType     | string       | Y        | Maps to the specific program and data in the format `di-[Program Name]-[Dataset Name]`. See [below for more examples](#entitytypes) |
| EntityData     | object       | Y        | The record associated with this entity                                                                                              |

##### Entity Types
Entity types map the record to a specific program and dataset. Valid EntityTypes are:
```
di-aoic-court-administration
di-aoic-court-adr
di-aoic-court-case-status
di-aoic-court-documents
di-aoic-court-financial
di-aoic-court-hearings
di-aoic-court-ja
di-aoic-court-party
di-aoic-court-party-hearing
di-aoic-court-pretrial
di-aoic-court-reviewing-courts
di-aoic-problemsolvingcourts-active-status
di-aoic-problemsolvingcourts-assessments
di-aoic-problemsolvingcourts-drug-testing
di-aoic-problemsolvingcourts-individual-background
di-aoic-problemsolvingcourts-redeploy
di-aoic-problemsolvingcourts-screening
di-aoic-problemsolvingcourts-termination
di-aoic-problemsolvingcourts-violations-and-sanctions
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
```


##### Entity Data
Every entity data object must contain the elements, in the format required, listed in the [vendor folder](https://tylertech.sharepoint.com/sites/Client/DI/AOIC/Program%201%20%203%20Prepare%20Solution/Forms/AllItems.aspx?RootFolder=%2Fsites%2FClient%2FDI%2FAOIC%2FProgram%201%20%203%20Prepare%20Solution%2FVendor%20docs%2FData%20Elements%20%2D%20ALL&FolderCTID=0x012000E4E5E251D4298743B4D89B00DBBF4D85&View=%7B0F3FBEB1%2DB9A9%2D4E2E%2D957E%2D9E4144F8F6F9%7D)

These should be passed as attributes in the object. For example:
```json
{
    "Entities": [
        {
            "EntityType": "di-aoic-pretrial-violations",
            "EntityId": "violations_record",
            "EntityData": {
                "name": "Dale Bell",
                "localid": 9152,
                "instanceid": "5008",
                "offenderid": "4354",
                "dateofbirth": "11/12/1982",
                "sexperceived": "Male",
                "recordid": 2468,
                "county": "cook"
            }
        }
    ]
}
```

##### Notes on the entity data object
There are a couple of critical items to watch out for when building the entityData object:
* **Data Elements** - Each entity **must** include the required elements listed in the [vendor folder](https://tylertech.sharepoint.com/sites/Client/DI/AOIC/Program%201%20%203%20Prepare%20Solution/Forms/AllItems.aspx?RootFolder=%2Fsites%2FClient%2FDI%2FAOIC%2FProgram%201%20%203%20Prepare%20Solution%2FVendor%20docs%2FData%20Elements%20%2D%20ALL&FolderCTID=0x012000E4E5E251D4298743B4D89B00DBBF4D85&View=%7B0F3FBEB1%2DB9A9%2D4E2E%2D957E%2D9E4144F8F6F9%7D), in the format specified. Failure to include these elements, or to format them in the right way could result in certification failure.
* **RecordID** - The RecordID is used to allow the vendor the maintain (modify, update, delete) the data after it's been submitted. This is a unique identifier for the object in the local source system. Each object **must** have a unique RecordID.  


### Send the message
Using the Bearer Token received from the Step 1, and the message prepared in the previous section, send an API
call to **PUT** the Message built in the previous section. 

Sample cURL and PowerShell commands can be found [here](https://tylertech.sharepoint.com/sites/Client/DI/AOIC/Program%201%20%203%20Prepare%20Solution/Forms/AllItems.aspx?csf=1&web=1&e=XIcIAS&cid=a0eb1b19%2D1106%2D4d00%2D8323%2D8d93d5213bbc&RootFolder=%2Fsites%2FClient%2FDI%2FAOIC%2FProgram%201%20%203%20Prepare%20Solution%2FVendor%20docs%2FCertification%20directions%2Fcertification%5Fexample%5Fcommands&FolderCTID=0x012000E4E5E251D4298743B4D89B00DBBF4D85) to
demonstrate minimal examples for each data element set.

### Validate the response
A successful response will look like:
```json
{
  "status":"SUCCESS",
  "EnvelopeId": "UNIQUE-ENVELOPE-ID"
}
```
If you receive a successful response, repeat Step 2, utilizing the same 60-min token, to submit
additional record(s).

**Make sure to screenshot and copy the SUCCESS response
with the envelopeID, this is needed for Step 3**

## Step 3: Complete Certification
Vendors must submit their SUCCESS response via [Vendor Successful Submission form](https://forms.office.com/Pages/ResponsePage.aspx?id=-fDFfFvuBkGmLRufe-RhGIWjic7n3kZCuRa8Z_5piIZURURKTzRMNU9QMDRONFlMV1MyMVFMTlhUUS4u) (also see Troubleshooting Errors section above). Note: Separate forms must be submitted for each county program area.
The form **must** include:
* Vendor Name 
* County 
* Program 
* EnvelopeID

Tyler will confirm receipt of the email within 1 business day.

Upon successful validation Tyler will submit the vendor’s certification with the AOIC and notify the vendor that certification has been completed. 
* Successful submissions will include all critical elements and correct formatting of all available data elements. 
* When a successful submission has been verified, Tyler will request that the vendor confirm that they will resolve data issues noted during the certification process prior to being granted access to the staging pipeline.
* When a submission has been verified as successful and the confirmation is received by the vendor, Tyler will submit the vendor’s certification to the AOIC and notify the vendor that certification has been completed.  

## Examples
The following section provides a series of data element examples for each program.

### Pretrial Program Pipeline Critical Elements
In addition to the Data Verification Prerequisites, the following elements must be included in every Pretrial record:

* prosecutingcounty
* instanceid
* offenderid
* name
* localid
* dateofbirth
* sexperceived
* recordid (see note below)

##### Example
```json
{
    "Entities": [
        {
            "EntityType": "di-aoic-pretrial-violations",
            "EntityId": "violations_record",
            "EntityData": {
                "name": "Dale Bell",
                "localid": 9152,
                "instanceid": "5008",
                "offenderid": "4354",
                "dateofbirth": "11/12/1982",
                "sexperceived": "Male",
                "prosecutingcounty": "cook",
                "recordid": 3456
            }
        }
    ]
}
```

##### Notes
`recordid` - A record ID or primary key for the record. This number should be unique. You are free to submit a string in any format as long as it uniquely identifies the record in your system. If you have concerns and would like to discuss alternative approaches, please contact us.



### Probation Program Pipeline Critical Elements
In addition to the Data Verification Prerequisites, the
following elements must be included in every Probation
record:

* sentencingcounty
* instanceid
* offenderid
* name
* localid
* dateofbirth
* sexperceived
* recordid (see note below)

##### Example
```json
{
    "Entities": [
        {
            "EntityType": "di-aoic-probation-individual-background",
            "EntityId": "individual_background_record",
            "EntityData": {
                "name": "John Smith",
                "localid": 6726,
                "instanceid": "3005",
                "offenderid": "4535",
                "dateofbirth": "03/14/1959",
                "sexperceived": "Male",
                "sentencingcounty": "kankakee",
                "recordid": 6789
            }
        }
    ]
}
```
##### Notes
`recordid` - A record ID or primary key for the record. This number should be unique. You are free to submit a string in any format as long as it uniquely identifies the record in your system. If you have concerns and would like to discuss alternative approaches, please contact us.

### Problem Solving Courts Program Pipeline Critical Elements
In addition to the Data Verification Prerequisites, the
following elements must be included in every PSC record:
* sentencingcounty
* instanceid
* offenderid
* name
* localid
* dateofbirth
* sexperceived
* recordid (see note below)

##### Example
```json
{
    "Entities": [
        {
            "EntityType": "di-aoic-problem-solving-courts-screening",
            "EntityId": "screening_record",
            "EntityData": {
                "name": "Jane Doe",
                "localid": 2667,
                "instanceid": "3423",
                "offenderid": "4575",
                "dateofbirth": "12/21/1991",
                "sexperceived": "Female",
                "sentencingcounty": "sangamon",
                "recordid": 1234
            }
        }
    ]
}
```
##### Notes
`recordid` - A record ID or primary key for the record. This number should be unique. You are free to submit a string in any format as long as it uniquely identifies the record in your system. If you have concerns and would like to discuss alternative approaches, please contact us.


### Courts Program Pipeline Critical Elements
In addition to the Data Verification Prerequisites, the
following elements must be included in every Courts record:
* courtcircuitnciccode
* casetype
* casesequencenumber
* recordid (see note below)

##### Example
```json
{
    "Entities": [
        {
            "EntityType": "di-aoic-courts-case-status",
            "EntityId": "case_status_record",
            "EntityData": {
                "circuitcourtnciccode": "IL081025J-Rock Island 14th",
                "casetype": "traffic",
                "casesequencenumber": "18",
                "recordid": 2468
            }
        }
    ]
}
```
##### Notes
`recordid` - A record ID or primary key for the record. This number should be unique. You are free to submit a string in any format as long as it uniquely identifies the record in your system. If you have concerns and would like to discuss alternative approaches, please contact us.



## Troubleshooting Errors
When submitting records to the pipeline, you will receive a SUCCESS message that indicates that your envelope was successfully received. However, there may be errors in the submission. You will be notified of errors via email in approximately under a minute of submission. The email you receive will come from AWS Notifications with a subject containing Connected Communities Error.

The notification will indicate a single error that needs to be fixed, though there may be multiple errors in the submission. You will receive one email per submission with a single error until all errors are resolved. It is suggested that you correct the error on the element in question and investigate if that error may exist throughout your submission. For example, if you receive a required error, it’s suggested to resolve the error for that element and interrogate the rest of your submission to find other elements that cause that error before submitting again.
After all errors are resolved, error emails will no longer be sent. At this time, you should submit your SUCCESS information into the [Vendor Successful Submission form](https://forms.office.com/Pages/ResponsePage.aspx?id=-fDFfFvuBkGmLRufe-RhGIWjic7n3kZCuRa8Z_5piIZURURKTzRMNU9QMDRONFlMV1MyMVFMTlhUUS4u)
The following sections detail some of the most common errors you may encounter.
### Required Element
The certification endpoint requires critical elements, if one of the critical elements is missing from the submission, you’ll receive an error.
```
keyword: required
dataPath:
schemaPath: #/required
message: should have required property '.county'
Message: Contract Schema Failed Validation.
ErrorSchema: di-aoic-pretrial-individual-background
```
**Fix:** Provide critical elements and resend message
### Keyword Pattern
In certification, critical elements have pattern matching that test the contents of the element’s string value. The pipeline validates the data by checking for a pattern within the string against RegEx for the expected date format. If that pattern is not met then you will receive an error
```
keyword: pattern
dataPath: .status_date
schemaPath: #/properties/status_date/pattern
message: should match pattern "(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d"
Message: Contract Schema Failed Validation.
ErrorSchema: di-aoic-courts-case-status
```

**Fix:** Check the contents of the dataPath element and confirm that your submission matches the expected contents. In the example below, it tests that contents match a date format similar to MM/DD/YYYY format.
### Additional Properties
There is an element in the submission that is not listed in the data elements.
```
keyword: additionalProperties
dataPath:
schemaPath: #/additionalProperties
message: should NOT have additional properties
Message: Contract Schema Failed Validation.
```
**Fix:** Remove any elements from the submission that are not included in the data elements. The element in question may or may not be listed as the dataPath.
### Type
Non-critical elements must have correct json formatting to either be a number or string. If the data element should be a number, it should not be formatted as a string.
```
keyword: type
dataPath: .localid
schemaPath: #/properties/localid/type
message: should be number
Message: Contract Schema Failed Validation.
ErrorSchema: di-aoic-problem-solving-courts-individual-background
```
**Fix:** Ensure the dataPath element’s submission includes a number and is not wrapped in quotes.



## FAQ 
1. Where can I find more information about the API? 
   * Please refer to the [API documentation](api) for more information.
2. What happens if I get a SUCCESS response but receive an
error message for data validation?
   * If there is an error in your submission, you’ll receive an
   email from AWS Notifications within a few minutes of your
   SUCCESS response.
   * See the notification email you received. Each error will
   have Error Details, which indicate the type of error
   encountered. Once fixed, please try to upload again. If you
   have issues, please reach out directly
   to the Tyler team at [data-certification@tylertech.com](mailto:data-certification@tylertech.com).
   After you correct an error and re-submit, you may receive
   another error message calling out another error in the
   submission. Repeat the retry process until all errors are
   corrected. 
2. I have multiple counties and program areas to submit.
Can I reuse my Token to repeat Step 2? 
   * Yes. The Token can be used to repeat Step 2 several times.
   However, the token is time-sensitive and will need to be
   recreated at 60 minutes.

3. What does a response of "message":"Unauthorized" mean? 
   * It means there is an issue with your bearer token, a token
   is valid for 60 minutes, so you may need to recreate it.

4. How do I complete the certification reimbursement
process? 
   * Reach out to the AOIC with reimbursement specific
   questions. They are providing a FAQ for things related to
   this process.

5. Who can I contact for assistance?
   * Please contact [data-certification@tylertech.com](mailto:data-certification@tylertech.com) for
   assistance, questions, or live support.

6. What are the data elements necessary for certification of
each Program?
   * See the Pipeline Critical Elements section above or review
   this SharePoint folder for .txt examples of each data
   element reporting program’s PowerShell or cURL (Mac)
   PUT call.

## Need Help?

Our team is here to help! We are offering various options to
support you throughout this process:

* Office Hours: We are excited to offer Office Hours each
Wednesday 12:00pm Central Daylight Time through April
26th. Each vendor has already been added to this standing
meeting and can join at any time. Simply bring your questions
or issues and we’ll be ready to help via screen-share.

* 1:1 Meetings: In addition to Office Hours, our team is
scheduling time with each vendor to walk through questions
and/or through the process described above. If you would like
to schedule time with us, please notify us at [data-certification@tylertech.com](mailto:data-certification@tylertech.com). Otherwise, our team will reach
out to you starting the week of March 13th to schedule time
proactively.

* Email Help: If you prefer, you can also reach out to us at
  [data-certification@tylertech.com](mailto:data-certification@tylertech.com). Our dedicated team of
experts will respond as quickly as possible between 8am –
8pm Central Daylight Time, within 1 business day, excluding
weekends. When writing in, it is helpful if you consider the
following guidelines to help ensure that we can respond and
resolve your question as quickly and efficiently as possible:
  * Describe your question or issue 
  * Share relevant context about the issue, including links,
  screenshots and specific steps taken
