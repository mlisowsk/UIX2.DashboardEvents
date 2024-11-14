# UIX2.DashboardEvents
UIX v2 sample application, ShellFrame & Listing Dashboard
Logging calls to Dashboard and Listing event handlers to the browser console.

## Build

Use Visual Studio `Build Solution` to build the mfappx file, located in the project's `bin` folder.

To automatically deploy to an M-Files vault, you need to either

1. put a file named `install-application.user.json` with vault and admin credentials in the `UIX.Dashboard` folder, or alternatively 
2. edit the `install-application.ps1` located there, adding vault and admin credentials.

In case 1, the deployment group can be set in the VS project file, for example `<MFilesVaultGroup>test</MFilesVaultGroup>` will deploy to vaults in the group `test` after building.

## Use

1. Open the browser devtools by pressing F12.
2. Navigate to a view.
3. Select "Show DashboardEvents dashboard" from the top menu to display the dashboard.

Optionally, select an object or view before opening the dashboard, then edit that object in the metadata card and observe events.

### Source
Forked from source: https://developer.m-files.com/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/Samples/ShellFrameAndDashboard/