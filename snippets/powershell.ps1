---
type: snippet
title: PowerShell
language: PowerShell
description: "[PowerShell](https://github.com/PowerShell/PowerShell) to extract data from SODA"
see_also:
- name: Socrata Powershell on GitHub
  url: https://github.com/joeywas/socrata-powershell
---

$url = "https://%%domain%%/resource/%%uid%%"
$apptoken = "YOURAPPTOKENHERE"

# Set header to accept JSON
$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Accept","application/json")
$headers.Add("X-App-Token",$apptoken)

%%if_private%%
# Encode authentication details
# The email address and password for a valid Socrata account
$username = "user@agency.gov"
$password = "password"
# Create auth information for HTTP Basic Auth
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $username,$password)))
# Pass in authentication for private dataset
$headers.Add("Authorization",("Basic {0}" -f $base64AuthInfo))
%%end%%

$results = Invoke-RestMethod -Uri $url -Method get -Headers $headers
