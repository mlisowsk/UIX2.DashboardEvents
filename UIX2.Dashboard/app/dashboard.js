window.OnNewDashboard = (dashboard) => {
	console.log("OnNewDashboard");

	var hdlDBStarted, hdlDBStop, hdlCustomDataChanged, hdlDBRefresh;

	function handleDashboardStarted() {
		console.log("Dashboard.Started");
		if (dashboard.CustomData && dashboard.CustomData.currentPath) {
			document.getElementById("curPath").innerHTML = dashboard.CustomData.currentPath;
		} else console.warn("No CustomData set");
	}

	function handleDashboardStop() {
		console.log("Dashboard.Stop");
	}

	function handleCustomDataChanged() {
		console.log("Dashboard.CustomDataChanged");
	}

	function handleDashboardRefresh() {
		console.log("Dashboard.Refresh");
	}

	dashboard.Events.Register(MFiles.Event.Started, handleDashboardStarted).then((handle) => {
		hdlDBStarted = handle;
		console.log("hdlDBStarted = " + handle);
	});
	dashboard.Events.Register(MFiles.Event.Stop, handleDashboardStop).then((handle) => {
		hdlDBStop = handle;
		console.log("hdlDBStop = " + handle);
	});
	dashboard.Events.Register(MFiles.Event.Refresh, handleCustomDataChanged).then((handle) => {
		hdlCustomDataChanged = handle;
		console.log("hdlCustomDataChanged = " + handle);
	});
	dashboard.Events.Register(MFiles.Event.Refresh, handleDashboardRefresh).then((handle) => {
		hdlDBRefresh = handle;
		console.log("hdlDBRefresh = " + handle);
	});
}