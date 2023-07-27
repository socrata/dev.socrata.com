---
title: Overview
noindex: true
layout: chromeless
---
# ![logo](https://www.tylertech.com/Portals/0/Logo-NavBar.jpg?ver=Js0wL8bzpXBsBHn_bv-Kjg%3d%3d) Understanding the Staging Pipeline
## Overview
Welcome to the Staging Environment and Pipeline! The Staging Process is an opportunity for you to harness the work you did in Certification, aligning your mock data with the Data Elements, and now apply it to live data in a production-like environment. The purpose of this documentation is to inform CMS Vendors on how to access, connect, and transmit live data from your source system through the Staging Pipeline and, ultimately, in to the Staging Environment. 

## How this benefits you (a CMS vendor) and the AOIC

The AOIC will be working diligently together with the Tyler Technologies team throughout the Staging Process to refine the Judicial Analytics Dashboard and its metrics to make it as valuable of a resource as possible for the state and for the Supreme, Appellate, and Circuit courts. Your assistance in sharing live data to feed the Staging Platform is critical. While this process will be iterative in nature, we kindly ask for your continued cooperation and flexibility as the AOIC identifies data element updates that will significantly improve the final Production Solution. Please be reassured that this work in the near term will yield benefits for you in the future in terms of time savings and greater insights for the courts you serve.

## How is this different from the [certification process](/publishers/cookbooks/alliance-exchange/certification.html)?
- Staging is long term.
    - The Staging Pipeline and Environment are accessible indefinitely. 
    - The Staging Process provides an opportunity make necessary adjustments. 
    - The Staging Process and Environment allows CMS Vendors to refine the quality and quantity of their data to meet the acceptance threshold for Production.
    - All questions concerning Staging should be submitted to [data-staging@tylertech.onmicrosoft.com](mailto:data-staging@tylertech.onmicrosoft.com).
- Staging requires Live Data instead of Mock Data.
    - Live Data is considered as: data sent directly from a Test or Production CMS to the Staging platform.
    - As a result, it is conducted in a CJIS-compliant environment that approximates the specifications of the production environment.
    - Because data integrity is more important in this environment, the environment allows you to perform modifications of specific records when there is erroneous or unwanted data present.  Please see the following section on the Definitions and Guidance page that discusses how to perform Edits and Deletions: [Guidance and Best Practices for Data Modification](/publishers/cookbooks/alliance-exchange/staging-definitions#guidance-and-best-practices-for-data-modification-edits-and-deletions) 
- The data you submit should be more complete and of higher quality than the mock data used during the Certification Process.
- The ultimate goal of working in the Staging Environment is to achieve a Production standard of data quality and quantity.
- There is more thorough validation than before. Examples of these validations are identified below.
- The process for notifying you of errors encountered in a submission will no longer be shared using workbooks. Rather, data submissions that fail the enhanced validation will be identified by the HTTP status/code you receive immediately after a submission to the API.

## Enhanced validation in staging
The staging environment enforces additional validation on every submission. Important items to note are:
- Additional Properties are not allowed 
    - Additional Properties are variables that are not part of the official Data Elements.
    - Please see the following section for how to fix this [4.2.3 Additional Properties](/publishers/cookbooks/alliance-exchange/staging-instructions#423-additional-properties)

- Type checking is enforced
    - Each Data Element has a designated data type that it needs to match.  These include `number`, `string`, `date`, `list`, and `yes/no`.  If the Data Element’s value is `Hello World` and the type is `number`, for example, that will cause a type error.
    - Please see the following section for how to fix type errors: [4.2.4 Type](/publishers/cookbooks/alliance-exchange/staging-instructions#424-type) 
- Formatting pattern matching is enforced
    - Please see the following section for how to fix pattern-matching errors [4.2.2 Keyword Pattern](/publishers/cookbooks/alliance-exchange/staging-instructions#422-keyword-pattern) 
- Categorical Data Elements only accept allowed values
    - Categorical Data Elements are of type list.  These are elements that have a finite set of possible values; you can think of them as multiple choice.
    - For example, county is a list type element.  There are 102 counties in Illinois, and the value of the county needs to be one of those; it can’t be Hillsborough, Dallas, or Palm Beach, as these are not counties in Illinois, for example.
    - Please see the following section for how to fix categorical/enumeration errors: [4.2.5 Categorical Variable Enumeration](/publishers/cookbooks/alliance-exchange/staging-instructions#425-categorical-variable-enumeration)

## Other Resources
- [Staging Pipeline Instructions and FAQs](/publishers/cookbooks/alliance-exchange/staging-instructions.html)
- [Staging Definitions and Best Practices](/publishers/cookbooks/alliance-exchange/staging-definitions.html)


