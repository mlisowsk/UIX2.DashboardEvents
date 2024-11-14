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

	  const showDashboardCommand = await shellFrame.Commands.CreateCustomCommand('Show DashboardEvents dashboard');
	  //const updateCustomDataCommand = await shellFrame.Commands.CreateCustomCommand('Update CustomData');

      await shellFrame.Commands.AddCustomCommandToMenu(
          showDashboardCommand,
          MFiles.MenuLocation.MenuLocation_TopPaneMenu,
          1,
      );
      //await shellFrame.Commands.AddCustomCommandToMenu(
      //    updateCustomDataCommand,
      //    MFiles.MenuLocation.MenuLocation_TopPaneMenu,
      //    1,
      //);
	  await shellFrame.Commands.Events.Register(
		  MFiles.Event.CustomCommand,
		  (command) => {
			  // Execute only our custom command.
			  if (command === showDashboardCommand) {
				  shellFrame.ShowDashboard('MyDashboard', { currentPath: shellFrame.CurrentPath });
			  }
			  // commented out since we have no way to get the dashboard handle
			  //if (command === updateCustomDataCommand) {
				 // myDashboard.UpdateCustomData('MyDashboard', { currentPath: shellFrame.CurrentPath });
			  //}
		  },
	  )
  }
}