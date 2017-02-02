---
layout: post
categories: blog
tags:
- fme
- data cleanse
- data validation
title: "Validate Your Data with FME"
date: 2017-02-02
author: cdesisto 
---

This post describes how to use an FME workspace to validate your data and highlight what data cleansing needs to be undertaken before putting it into Socrata. FME is a powerful tool for not only data automation, but data analysis. Here we will use it to do a ‘health check' on our data to understand what [errors, warnings](https://support.socrata.com/hc/en-us/articles/202950008-Import-Warning-and-Errors) and roadblocks it may cause. To better understand the rules for importing data, check out this [support article](https://knowledge.safe.com/articles/715/working-with-date-and-time-attributes-tutorial.html) that discusses importing your data into Socrata.

## Prerequisites:

- An installed copy of FME Desktop 2016.1 - the latest version can be downloaded [here](https://www.safe.com/support/support-resources/fme-downloads/)
- Limited experience for use with FME, for a warmup see this previous post: [Using the FME Socrata Writer](https://dev.socrata.com/blog/2014/10/09/fme-socrata-writer.html)
- An installed copy of Microsoft Excel
- Read access to a dataset of your choice that will be ingressed to Socrata
- Publishing rights to a Socrata domain - you will need this if you plan to publish your cleansed data to Socrata. It is not required for the data cleanse operation, but is a good test of data cleanliness to publish it.

## Contents:

1. Getting to know data validation rules for Socrata
2. Creating your schema map
3. Running the FME validation workspace
4. Interpreting your results

## Data Validation for Socrata

Data must be properly formatted for each data type to be ingressed into Socrata. If the data is not formatted it may not load properly, or in some cases not at all. If you are using FME to publish your data, the workflow will fail if your data is not formatted. Data types are used to tell a common story by allowing each data type to be filtered, displayed and analyzed in their own ways.

This post and the FME workspace will be focusing on the following data types:

- Calendar date
- Checkbox
- Number
- Percent
- Text

These data types are the most commonly used and have a high potential for error, but are also very easy to fix! This workspace can be used and reused as a tool to assess a variety of datasets that you plan to ingress to Socrata. The output file from the workspace will guide you to where errors may lie within your dataset and give you an idea of how many, if any, errors need to be fixed. As a user, you will need to know:
What your data should look like
If the rule failures are problems with the data
If action should be taken to change the data

## Creating Your Schema Map

In order for FME to validate your data against the correct rules, each attribute (or column) must be assigned a data type that Socrata can read. From here each feature (or row) can be broken apart so every cell is matched to the correct set of rules. To do this, we must establish a schema for your dataset, a schema is what tells the program how to read and organize your data. You will be building your schema in an Excel using a template file which will be read by your FME workspace - this is much easier than assigning each attribute a data type within FME.

1. Open the Schema Map Template in Excel, rename and save your Schema Map.
2. Open the dataset to validate in Excel. _Note:_ you may have to extract your dataset from another source like a database, it is best practice to export as a `.csv`.
3. Highlight all attribute names on the sheet and Copy.

    ![Schema_Map1](/img/FME_Data_Cleanse/2017-01-31_Schema_Map1.png)

4. In your schema map workbook, on the Schema_Map sheet, in cell A2 Paste Special, Transpose. This will create a list of your attributes to validate.

    ![Schema_Map2](/img/FME_Data_Cleanse/2017-01-31_Schema_Map2.png)

5. Use the drop down menu in cell B2 to select the Socrata data type for the attribute in cell A2. Repeat this for all attributes listed in column A.
      Note: Best practice that ZIP codes, unique ID fields (employee/invoice ID's) should be set to text to avoid errors such as dropping leading zeros (northeast US Zip codes), and dashes in ZIP code plus four's.
6. Save your changes.

## Running the FME Validation Workspace

This workspace is intended for a range of users, it is heavily annotated to inform users how things are working and shows all connections/transformers.

1. Open the FME validation workspace, rename and save your validation workspace. Note your workspace may look different based on operating system and FME version. These screenshots come from FME 2016.1.3.0 - Build 16709 - WIN64, used in Windows 10 Pro.

   ![Workspace1](/img/FME_Data_Cleanse/2017-01-31_Workspace1.png)

2. Update Published Parameters by double clicking on each parameter in the Navigator pane

   * `Entity`: Your organization/entity name (used only for output file naming purposes)

   * `Dataset_Name`: Populate this with your dataset, general text or dataset identifier are allowed (used only for output file naming purposes)

   * `Dataset_Path`: The full file path for where the dataset to validate including extension

   * `Output_Folder`: Folder where you want the output `.xlsx`, you must include the final "/" at the end of the path

   ![Workspace2](/img/FME_Data_Cleanse/2017-01-31_Workspace2.png)

3. Add your schema map to the workspace by updating the AttributeValueMapper transformer

    1. Open the `AttributeValueMapper` dialogue box and click Import

       ![Workspace3](/img/FME_Data_Cleanse/2017-01-31_Workspace3.png)

    2. Select the format of your dataset to validate and its file path, then click next

       ![Workspace4](/img/FME_Data_Cleanse/2017-01-31_Workspace4.png)

    3. Change the Import Mode to Attribute Values. Select the Feature Type by clicking the box next to `Schema_Map` to point the Import Wizard to the correct Excel sheet, then click Next

       ![Workspace5](/img/FME_Data_Cleanse/2017-01-31_Workspace5.png)

    4. Select the attributes for the source and destination fields. The "Source Value" should come from `SourceAttributeName` and the destination should come from `DestinationDataType`. Click "Import"

       ![Workspace6](/img/FME_Data_Cleanse/2017-01-31_Workspace6.png)

    5. FME should have imported your dataset's attribute names and data types. Click OK to complete the import process.

       ![Workspace7](/img/FME_Data_Cleanse/2017-01-31_Workspace7.png)

4. Add inspectors where you want to monitor specific errors.

    *  If there are specific errors you want to track more closely, you can insert `Inspectors` on `AttributeValidators` or `Testers`. If you want to track a specific validation rule that you're curious about, adding an inspector midway through the workspace will show which specific cells do not pass validation rules. `Inspectors` can be added by right clicking on an outgoing port (green triangle pointing right) of a transformer and clicking "Connect Inspector."

       ![Workspace8](/img/FME_Data_Cleanse/2017-01-31_Workspace8.png)

5. Run the workspace

   * Click the green "play" button in the toolbar.

       ![Workspace9](/img/FME_Data_Cleanse/2017-01-31_Workspace9.png)

6. Examine your results and assess your data

   * An `.xlsx` will be output the folder you specified with a name including your entity, the dataset validated and a timestamp of when the workspace was ran.

## Interpreting your results

With the Excel output quantifying potential errors to fix, use your favorite platform to cleanse the data. To better understand each of validation rules, check out this [table](https://opendata.socrata.com/dataset/Data-Validation-Failures/9wr8-8fe8). If you cannot see the errors in your dataset that the workspace is reporting, open your dataset in the FME Data Inspector. If you are using Excel to view your dataset, it may be automatically formatting the data and hiding the errors.

Not all validation failures are errors in the dataset, it is up to the user to decide if these should be ignored or if they should be changed. For example, if negative numbers are found in a dataset, the user needs to decide if they can be allowed or amended.

The workspace can be reran to validate a cleansed dataset as many times as you like. If you change your schema, you will need to update the schema map and workspace to read any changes (revisit the Creating Your Schema Map or Running the FME Validation Workspace sections of this page).

### Dates:

Safe has created a quick [tutorial](https://knowledge.safe.com/articles/715/working-with-date-and-time-attributes-tutorial.html) to better understand how dates are handled in FME. It's recommended to learn about how dates are read, especially by the [DateFormatter](http://docs.safe.com/fme/2016.1/html/FME_Desktop_Documentation/FME_Transformers/Transformers/dateformatter.htm). This tutorial will give you enough knowledge to make you dangerous, but some experimentation will help you understand what's happening under the hood.

**WARNING:** The DateFormatter coerces your data from one string into another, some of the calculations it does in the process may change your data. Review this [cheat sheet](https://opendata.socrata.com/dataset/FME-Date-Formatter-Data-Coercion/7bdf-9qsu) to see how DateFormatter coerces common errors in date fields to properly formatted dates. There may be consequences when you set the Source Date Format parameter to be "Unknown - Automatic Detection." You can decrease errors by properly populating the Source Date Format parameter, see the DateFormatter help link above. If your date is in a format that has day before month, then you must input an expected format.


#### Pro Tips for dates:
To avoid letting DateFormatter create problems, you can format your date to YYYYMMDD before it is read into FME. For example, you can use the following expression in SQL to help - if that is how your data is stored.

    SELECT CONVERT(VARCHAR(10),getdate(),120)

When choosing a date format to publish on Socrata, the Socrata writer in FME has two different date formats to write. The data type `calendar_date` should be used if there is no time zone included in the data. If time zone data is not essential, it is recommended not to include it.

Some common date formats converted to FME date formats:

- `DD.MM.YYYY` → `%d.%m.%Y`
- `MM/DD/YYYY` → `%m/%d/%Y`
- `MM-DD-YY` → `%m"-"%d"-"%y`
- `YYYY-MM-DD['T']HH:mm:ssZ` (ISO8601 with timezone) → `%Y-%m-%dT%H:%M:%S%Z`

Other links to better understand date formatting:

- <https://msdn.microsoft.com/en-us/library/ms187928.aspx>
- <http://socrata.github.io/datasync/resources/using-map-fields-dialog.html>
- <http://socrata.github.io/datasync/resources/control-config.html#datetime-formatting>

### Leading Zeros:
Leading zeros are zeros at the beginning of your data e.g. 0001234. They can cause problems when importing into Socrata as a number. Not all leading zeros are errors or poor data, for example some zip codes, vendor ID's or phone numbers start with a zero and must be present. In these cases you may consider switching the data type to text. For advice on how to clean up your leading zeros, here's a [support article](https://support.socrata.com/hc/en-us/articles/206108587-Tips-and-Tricks-How-to-handle-leading-zeros-when-publishing-a-dataset) to help.
