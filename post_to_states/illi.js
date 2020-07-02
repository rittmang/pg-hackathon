var request = require('request');
const cheerio=require('cheerio');

var options = {
  'method': 'POST',
  'url': 'https://ilesonline.idfpr.illinois.gov/DFPR/Lookup/LicenseLookup.aspx',
  'headers': {
    'Connection': ' keep-alive',
    'Content-Length': ' 6288',
    'Cache-Control': ' no-cache',
    'X-Requested-With': ' XMLHttpRequest',
    'X-MicrosoftAjax': ' Delta=true',
    'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    'Content-Type': ' application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': ' */*',
    'Origin': ' https://ilesonline.idfpr.illinois.gov',
    'Sec-Fetch-Site': ' same-origin',
    'Sec-Fetch-Mode': ' cors',
    'Sec-Fetch-Dest': ' empty',
    'Referer': ' https://ilesonline.idfpr.illinois.gov/DFPR/Lookup/LicenseLookup.aspx',
    'Accept-Encoding': ' gzip, deflate, br',
    'Accept-Language': ' en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6',
    'Cookie': ' ASP.NET_SessionId=hwbzrx3d3j0u5ddkho0vj4wd; ASP.NET_SessionId=cpkfagwdbyqr1pbqcnnmkuly'
  },
  body: "ctl00%24ScriptManager1=ctl00%24MainContentPlaceHolder%24ucLicenseLookup%24UpdtPanelGridLookup%7Cctl00%24MainContentPlaceHolder%24ucLicenseLookup%24UpdtPanelGridLookup&__EVENTTARGET=ctl00%24MainContentPlaceHolder%24ucLicenseLookup%24UpdtPanelGridLookup&__EVENTARGUMENT=11~~12&__VIEWSTATE=%2FwEPDwUKLTY1NTQxOTE5Nw9kFgJmD2QWBGYPZBYEAggPFgIeBGhyZWYFQEFzc2V0cy9jc3MvZ2VuZXJhdGVkL2tlbmRvLm1pbi5jc3M%2FdmVyPTIwMTUwNDEzX1JlbGVhc2UuODYuMjEwMzBkAgkPFgIfAAVBQXNzZXRzL2Nzcy9nZW5lcmF0ZWQvc3R5bGVzLm1pbi5jc3M%2FdmVyPTIwMTUwNDEzX1JlbGVhc2UuODYuMjEwMzBkAgEPZBYKAgIPDxYCHgtOYXZpZ2F0ZVVybAUeL0RGUFIvQWNjb3VudC9Vc2VyQWNjb3VudC5hc3B4ZGQCBQ8WAh4HVmlzaWJsZWdkAgcPZBYCAgEPZBYCAgEPZBYCZg9kFgJmD2QWLAIDDw8WAh4TQXNzb2NpYXRlZENvbnRyb2xJRAUebGJNdWx0aXBsZUNyZWRlbnRpYWxUeXBlUHJlZml4ZGQCBQ8QD2QWBB4LX2NhdnVfbGFiZWwFDUxpY2Vuc2UgVHlwZToeE19jYXZ1X3NlYXJjaEZpZWxkSUQFAjExZGRkAgoPDxYCHwMFCGRkU3RhdHVzZGQCDA8QD2QWBh4FdGl0bGUFN0FsbCBsaWNlbnNlcyBkaXNwbGF5ZWQgdW5sZXNzIG90aGVyIHN0YXR1cyBpcyBzZWxlY3RlZC4fBAUPTGljZW5zZSBTdGF0dXM6HwUFATJkZGQCEQ8PFgIfAwUddGJDcmVkZW50aWFsTnVtYmVyX0NyZWRlbnRpYWxkZAITDw9kFgYfBgU8UGxlYXNlIGVudGVyIHRoZSBmdWxsIGxpY2Vuc2UgbnVtYmVyIHdpdGggbm8gcGVyaW9kIG9yIGRhc2guHwQFD0xpY2Vuc2UgTnVtYmVyOh8FBQIxMmQCGA8PFgIfAwUNdGJEQkFfQ29udGFjdGRkAhoPD2QWBh8GBRNMZWdhbCBCdXNpbmVzcyBOYW1lHwQFFExlZ2FsIEJ1c2luZXNzIE5hbWU6HwUFATNkAh8PDxYCHwMFF3RiREJBQWxpYXNfQ29udGFjdEFsaWFzZGQCIQ8PZBYGHwYFCURCQSBBbGlhcx8EBRJEb2luZyBCdXNpbmVzcyBBczofBQUCMzNkAiYPDxYCHwMFE3RiRmlyc3ROYW1lX0NvbnRhY3RkZAIoDw9kFgYfBgUrUGxlYXNlIGVudGVyIGFsbCBvciBwYXJ0IG9mIHRoZSBmaXJzdCBuYW1lLh8EBQtGaXJzdCBOYW1lOh8FBQE0ZAItDw8WAh8DBRJ0Ykxhc3ROYW1lX0NvbnRhY3RkZAIvDw9kFgYfBgUqUGxlYXNlIGVudGVyIGFsbCBvciBwYXJ0IG9mIHRoZSBsYXN0IG5hbWUuHwQFCkxhc3QgTmFtZTofBQUBNWQCNA8PFgIfAwUVdGJDaXR5X0NvbnRhY3RBZGRyZXNzZGQCNg8PZBYGHwYFKFBsZWFzZSBlbnRlciBhbGwgb3IgcGFydCBvZiBhIGNpdHkgbmFtZS4fBAUFQ2l0eTofBQUBNmQCOw8PFgIfAwUIZGRTdGF0ZXNkZAI9DxAPFggeFEFwcGVuZERhdGFCb3VuZEl0ZW1zZx4NRGF0YVRleHRGaWVsZAUEVGV4dB4ORGF0YVZhbHVlRmllbGQFBVZhbHVlHgtfIURhdGFCb3VuZGcWCB8GBVNQbGVhc2Ugc2VsZWN0IElsbGlub2lzIHRvIHNlZSB0aGUgY291bnRpZXMgYXZhaWxhYmxlIGluIHRoZSBjb3VudHkgc2VsZWN0aW9uIGJlbG93Lh8EBQZTdGF0ZTofBQUBNx4Ib25jaGFuZ2UFT1N0YXRlQ2hhbmdlKHRoaXMsJ2N0bDAwX01haW5Db250ZW50UGxhY2VIb2xkZXJfdWNMaWNlbnNlTG9va3VwX2N0bDAzX2RkQ291bnR5JykQFVMAB0FsYWJhbWEGQWxhc2thB0FsYmVydGEOQW1lcmljYW4gU2Ftb2EHQXJpem9uYQhBcmthbnNhcwxBcm15IEFkZHJlc3MRQXJteSBBaXIgRm9yY2UgUE8LQXJteSBFdXJvcGUEQXNpYRBCcml0aXNoIENvbHVtYmlhCkNhbGlmb3JuaWEIQ29sb3JhZG8LQ29ubmVjdGljdXQIRGVsYXdhcmUURGlzdHJpY3Qgb2YgQ29sdW1iaWERRmVkIFN0IE1pY3JvbmVzaWEHRmxvcmlkYQdHZW9yZ2lhBEd1YW0GSGF3YWlpBUlkYWhvCElsbGlub2lzB0luZGlhbmEESW93YQdJcmVsYW5kBkthbnNhcwhLZW50dWNreQlMb3Vpc2lhbmEFTWFpbmUITWFuaXRvYmEQTWFyc2hhbGwgSXNsYW5kcwhNYXJ5bGFuZA1NYXNzYWNodXNldHRzBk1leGljbwhNaWNoaWdhbglNaW5uZXNvdGELTWlzc2lzc2lwcGkITWlzc291cmkHTW9udGFuYQhOZWJyYXNrYQZOZXZhZGENTmV3IEJydW5zd2ljaxlOZXcgRm91bmxhbmQgYW5kIExhYnJhZG9yDU5ldyBIYW1wc2hpcmUKTmV3IEplcnNleQpOZXcgTWV4aWNvCE5ldyBZb3JrDE5ld2ZvdW5kbGFuZA5Ob3J0aCBDYXJvbGluYQxOb3J0aCBEYWtvdGEXTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmQVTm9ydGh3ZXN0IFRlcnJpdG9yaWVzC05vdmEgU2NvdGlhCE51cm5hdnV0BE9oaW8IT2tsYWhvbWEHT250YXJpbwZPcmVnb24FUGFsYXUMUGVubnN5bHZhbmlhFFByaW5jZSBFZHdhcmQgSXNsYW5kC1B1ZXJ0byBSaWNvBlF1ZWJlYwxSaG9kZSBJc2xhbmQMU2Fza2F0Y2hld2FuCVNpbmdhcG9yZQ5Tb3V0aCBDYXJvbGluYQxTb3V0aCBEYWtvdGEGVGFpd2FuCVRlbm5lc3NlZQVUZXhhcwdVbmtub3duBFV0YWgHVmVybW9udA5WaXJnaW4gSXNsYW5kcwhWaXJnaW5pYQpXYXNoaW5ndG9uDVdlc3QgVmlyZ2luaWEJV2lzY29uc2luB1d5b21pbmcFWXVrb24VUwACQUwCQUsCQUICQVMCQVoCQVICQUECQVACQUUCQUkCQkMCQ0ECQ08CQ1QCREUCREMCRk0CRkwCR0ECR1UCSEkCSUQCSUwCSU4CSUECSVICS1MCS1kCTEECTUUCTUICTUgCTUQCTUECTVgCTUkCTU4CTVMCTU8CTVQCTkUCTlYCTkICTkwCTkgCTkoCTk0CTlkCTkYCTkMCTkQCTVACTlQCTlMCTlUCT0gCT0sCT04CT1ICUFcCUEECUEUCUFICUFECUkkCU0sCU0cCU0MCU0QCVFcCVE4CVFgCVUsCVVQCVlQCVkkCVkECV0ECV1YCV0kCV1kCWVQUKwNTZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dkZAJCDw8WAh8DBQhkZENvdW50eWRkAkQPEA8WAh4HRW5hYmxlZGgWBh8GBURZb3UgbXVzdCBzZWxlY3QgSWxsaW5vaXMgaW4gdGhlIFN0YXRlIGxpc3QgYWJvdmUgdG8gc2VsZWN0IGEgY291bnR5Lh8EBQdDb3VudHk6HwUFATkPFgFmFgEFDlNlbGVjdCBhIFN0YXRlFgFmZAJJDw8WAh8DBRh0YlppcENvZGVfQ29udGFjdEFkZHJlc3NkZAJLDw9kFgYfBmUfBAUEWmlwOh8FBQE4ZAIKDxYCHglpbm5lcmh0bWwF1AQ8ZGl2PiAgICA8cCBzdHlsZT0iZmxvYXQ6bGVmdDsiPjxhIGhyZWY9Imh0dHA6Ly93d3cuaWRmcHIuY29tL2RlZmF1bHQuYXNwIiBjbGFzcz0idG1wbF9mb290ZXJsaW5rIiB0YXJnZXQ9Il9wYXJlbnQiPkZpbmFuY2lhbCAmIFByb2Zlc3Npb25hbCBSZWd1bGF0aW9uPC9hPjwvcD4gICAgPHAgc3R5bGU9ImZsb2F0OnJpZ2h0OyI%2BPGEgaHJlZj0iaHR0cDovL3d3dy5pbGxpbm9pcy5nb3YvIiAgdGFyZ2V0PSJfcGFyZW50Ij4gU3RhdGUgb2YgSWxsaW5vaXM8L2E%2BICAgfCA8YSBocmVmPSJodHRwczovL3d3dy5pbGxpbm9pcy5nb3YvUGFnZXMvUHJpdmFjeS5hc3B4IiAgdGFyZ2V0PSJfcGFyZW50Ij5JbGxpbm9pcyBQcml2YWN5IEluZm9ybWF0aW9uPC9hPiAgIHwgPGEgaHJlZj0iaHR0cDovL3d3dy5kaHMuc3RhdGUuaWwudXMvcGFnZS5hc3B4P2l0ZW09MzI3NjUiICB0YXJnZXQ9Il9wYXJlbnQiPkFjY2Vzc2liaWxpdHk8L2E%2BICAgfCA8YSBocmVmPSJodHRwOi8vd3d3LmlkZnByLmNvbS9jb250YWN0LmFzcCIgdGFyZ2V0PSJfcGFyZW50Ij5Db250YWN0IElERlBSPC9hPjwvcD4gIDwvZGl2PiAgPGRpdiBzdHlsZT0iY2xlYXI6Ym90aDsiPjwvZGl2PmQCCw8WAh8CaGQYAgUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgEFUWN0bDAwJE1haW5Db250ZW50UGxhY2VIb2xkZXIkdWNMaWNlbnNlTG9va3VwJGN0bDAzJGxiTXVsdGlwbGVDcmVkZW50aWFsVHlwZVByZWZpeAU8Y3RsMDAkTWFpbkNvbnRlbnRQbGFjZUhvbGRlciR1Y0xpY2Vuc2VMb29rdXAkZ3ZTZWFyY2hSZXN1bHRzD2dksFUt1EYqW2NxfN4ITA1Amkl9vwt2xVFwjhA3lhNcajw%3D&__VIEWSTATEGENERATOR=EDF8B53E&ctl00%24MainContentPlaceHolder%24ucLicenseLookup%24ctl03%24lbMultipleCredentialTypePrefix=41&ctl00%24MainContentPlaceHolder%24ucLicenseLookup%24ctl03%24ddStatus=&ctl00%24MainContentPlaceHolder%24ucLicenseLookup%24ctl03%24tbDBA_Contact=&ctl00%24MainContentPlaceHolder%24ucLicenseLookup%24ctl03%24tbDBAAlias_ContactAlias=&ctl00%24MainContentPlaceHolder%24ucLicenseLookup%24ctl03%24tbFirstName_Contact=&ctl00%24MainContentPlaceHolder%24ucLicenseLookup%24ctl03%24tbLastName_Contact=&ctl00%24MainContentPlaceHolder%24ucLicenseLookup%24ctl03%24tbCity_ContactAddress=&ctl00%24MainContentPlaceHolder%24ucLicenseLookup%24ctl03%24ddStates=&ctl00%24MainContentPlaceHolder%24ucLicenseLookup%24ctl03%24ddCounty=&ctl00%24MainContentPlaceHolder%24ucLicenseLookup%24ctl03%24tbZipCode_ContactAddress=&ctl00%24MainContentPlaceHolder%24ucLicenseLookup%24ResizeLicDetailPopupID_ClientState=0%2C0&__ASYNCPOST=true&ctl00%24MainContentPlaceHolder%24ucLicenseLookup%24ctl03%24tbCredentialNumber_Credential=019027488&:"

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  const fs = require('fs');
    /*fs.writeFile("./test.html", response.body, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });*/
    const $ = cheerio.load( response.body);

    var aTagEntire = ($('#ctl00_MainContentPlaceHolder_ucLicenseLookup_gvSearchResults > tbody > tr > td:nth-child(1)').html())
    //console.log(aTagEntire)
    var start = aTagEntire.indexOf("(")
    var end = aTagEntire.indexOf(")")
    var subString = aTagEntire.slice(start+7,end-7)
    newUrl = "https://ilesonline.idfpr.illinois.gov/DFPR/Lookup/licensedetail.aspx?id=" + subString
    //console.log(subString)

    var options = {
        'method': 'GET',
        'url': newUrl,
        'headers': {
          'Cookie': 'ASP.NET_SessionId=bmxbnfa5kwnb0m22hlahppme'
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        /*fs.writeFile("./test.html", response.body, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });*/

        const $ = cheerio.load( response.body);

        console.log("Name",$("#Grid0 > tbody > tr > td:nth-child(1)").text())
        console.log("Status",$("#Grid1 > tbody > tr > td:nth-child(3)").text())
        console.log("Exp Date",$("#Grid1 > tbody > tr > td:nth-child(6)").text())
        console.log("Disciplined" ,$("#Grid1 > tbody > tr > td:nth-child(7)").text())
        

      });
      
});


