// NOTE! This code is for demonstration purposes only and does not contain any kind of
//       error handling. MUST be revised before using in production.
// UIX2 sample application, ShellFrame & Dashboard
// Derived from: https://developer.m-files.com/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/Samples/ShellFrameAndDashboard/

function OnNewShellUI(shellUI) {
  /// <summary>Executed by the UIX when a ShellUI module is started.</summary>
  /// <param name="shellUI" type="MFiles.ShellUI">The shell UI object which was created.</param>

  // This is the start point of a ShellUI module.

  // Register to be notified when a new shell frame (MFiles.Event.NewShellFrame) is created.
  shellUI.Events.Register(MFiles.Event.NewShellFrame, onNewNormalShellFrame)
}

function onNewNormalShellFrame(shellFrame) {
 
  shellFrame.Events.Register(MFiles.Event.Started, onStarted)

  // NOTE: to be on the safe side, handle the callback in "async" function and await all the
  // return values, because when the postMessage API is used, all return values will be async.
  async function onStarted() {
	  // Set up custom commands in top menu
	  var dashboard;

	  const showDashboardCommand = await shellFrame.Commands.CreateCustomCommand('Show DashboardEvents dashboard');
	  const hideDashboardCommand = await shellFrame.Commands.CreateCustomCommand('Hide DashboardEvents dashboard');
	  const updateCustomDataCommand = await shellFrame.Commands.CreateCustomCommand('Update DashboardEvents CustomData');

      await shellFrame.Commands.AddCustomCommandToMenu(
          showDashboardCommand,
          MFiles.MenuLocation.MenuLocation_TopPaneMenu,
          1,
      );
      await shellFrame.Commands.AddCustomCommandToMenu(
          hideDashboardCommand,
          MFiles.MenuLocation.MenuLocation_TopPaneMenu,
          1,
	  );
	  await shellFrame.Commands.AddCustomCommandToMenu(
		  updateCustomDataCommand,
		  MFiles.MenuLocation.MenuLocation_TopPaneMenu,
		  1,
	  );
	  await shellFrame.Commands.Events.Register(
		  MFiles.Event.CustomCommand,
		  (command) => {
			  // Execute only our custom command.
			  if (command === showDashboardCommand) {
				  shellFrame.ShowDashboard('MyDashboard', { currentPath: shellFrame.CurrentPath }).then((dash) => {
					  console.log("ShowDashboard resolved promise.", dash);
					  if (dashboard && dash && dash != dashboard)
						  console.log("New dashboard does not match previous dashboard. olddashboard.__updatedAt=" + dashboard.__updatedAt + " new dashboard.__updatedAt=" + dash.__updatedAt + " delta=" + (dash.__updatedAt - dashboard.__updatedAt));
					  else
						  dashboard = dash;	// only update dashboard reference if it is the same dashboard as before. M-Files 25.10 sends us a new dashboard instance but it's actually the old one that is shown.

					  // Need to defer sending the NotifyApplication to dashboard to allow dashboard to register its event handlers
					  // Potential race condition! Using zero delay will not work in M-Files 25.10
					  setTimeout(() => {
						  console.log("About to NotifyApplication");
						  shellFrame.ShellUI.NotifyApplication("e52213ba-1a02-4383-9b40-06d02f642d90", "SHOW", { currentPath: shellFrame.CurrentPath });
					  }, 100);
				  });
			  }
			  if (command === hideDashboardCommand) {
				  shellFrame.ShellUI.NotifyApplication("e52213ba-1a02-4383-9b40-06d02f642d90", "HIDE", {});
				  shellFrame.ShowDefaultContent();
			  }
			  // The following will work only on M-Files 25.10 or later
			  if (command === updateCustomDataCommand && dashboard) {
				  dashboard.UpdateCustomData({ currentPath: shellFrame.CurrentPath });
			  }
		  },
	  )
  }
}