window.OnNewDashboard = (dashboard) => {
	console.log("OnNewDashboard");

	var hdlDBStarted, hdlDBStop, hdlCustomDataChanged, hdlDBRefresh;

	function handleDashboardStarted() {
		console.log("Dashboard.Started");
		if (dashboard.CustomData && dashboard.CustomData.hasOwnProperty("currentPath")) {
			document.getElementById("curPath").innerHTML = dashboard.CustomData.currentPath;
		} else console.warn("No CustomData set");
		document.getElementById("curTime").innerHTML = new Date().toISOString();
	}

	function handleDashboardStop() {
		console.log("Dashboard.Stop");
	}

	function handleCustomDataChanged(data) {
		console.log("Dashboard.CustomDataChanged, data=", data);
	}

	function handleDashboardRefresh() {
		console.log("Dashboard.Refresh");
		document.getElementById("curTime").innerHTML = new Date().toISOString();
	}

	dashboard.Events.Register(MFiles.Event.Started, handleDashboardStarted).then((handle) => {
		hdlDBStarted = handle;
		console.log("registered hdlDBStarted = " + handle);
	});
	dashboard.Events.Register(MFiles.Event.Stop, handleDashboardStop).then((handle) => {
		hdlDBStop = handle;
		console.log("registered hdlDBStop = " + handle);
	});
	dashboard.Events.Register(MFiles.Event.CustomDataChanged, handleCustomDataChanged).then((handle) => {
		hdlCustomDataChanged = handle;
		console.log("registered hdlCustomDataChanged = " + handle);
	});
	dashboard.Events.Register(MFiles.Event.Refresh, handleDashboardRefresh).then((handle) => {
		hdlDBRefresh = handle;
		console.log("registered hdlDBRefresh = " + handle);
	});

	// ShellListing events:

	function handleListingContentChanged(items) {
		console.log("Listing.ContentChanged. Items", items);
		document.getElementById("curTime").innerHTML = new Date().toISOString();
	}
	function handleListingListingActivated() {
		console.log("Listing.ListingActivated");
	}
	function handleListingListingDeactivated() {
		console.log("Listing.ListingDeactivated");
	}

	function handleListingListItemAdded(objectVersion) {
		console.log("Listing.ListItemAdded. objectVersion", objectVersion);
	}
	function handleListingListItemModified(oldServerObjVer, newObjVer) {
		console.log("Listing.ListItemModified. oldServerObjVer", oldServerObjVer, "newObjVer", newObjVer);
	}
	function handleListingListItemRemoved(listItem) {
		console.log("Listing.ListItemRemoved. listItem",listItem);
	}

	function handleListingSelectedItemsChanged(items) {
		console.log("Listing.SelectedItemsChanged. shellItems", items);
	}
	function handleListingSelectionChanged(items) {
		console.log("Listing.SelectionChanged. ShellItems=", items);
	}

	function handleListingSelectNextFolder() {
		console.log("Listing.SelectNextFolder");
	}
	function handleListingSelectNextObject() {
		console.log("Listing.SelectNextObject");
	}
	function handleListingSelectNextObjectFile() {
		console.log("Listing.SelectNextObjectFile");
	}
	function handleListingSelectPreviousFolder() {
		console.log("Listing.SelectPreviousFolder");
	}
	function handleListingSelectPreviousObject() {
		console.log("Listing.SelectPreviousObject");
	}

	function handleListingStarted() {
		console.log("Listing.Started");
	}
	function handleListingStop() {
		console.log("Listing.Stop");
	}

	var listing = dashboard.ShellFrame.ActiveListing || dashboard.ShellFrame.Listing;
	if (listing) {

		listing.Events.Register(MFiles.Event.ContentChanged, handleListingContentChanged).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.ContentChanged = " + handle);
		});
		listing.Events.Register(MFiles.Event.ListingActivated, handleListingListingActivated).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.ListingActivated = " + handle);
		});
		listing.Events.Register(MFiles.Event.ListingDeactivated, handleListingListingDeactivated).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.ListingDeactivated = " + handle);
		});

		listing.Events.Register(MFiles.Event.ListItemAdded, handleListingListItemAdded).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.ListItemAdded = " + handle);
		});
		listing.Events.Register(MFiles.Event.ListItemModified, handleListingListItemModified).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.ListItemModified = " + handle);
		});
		listing.Events.Register(MFiles.Event.ListItemRemoved, handleListingListItemRemoved).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.ListItemRemoved = " + handle);
		});

		listing.Events.Register(MFiles.Event.SelectedItemsChanged, handleListingSelectedItemsChanged).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.SelectedItemsChanged = " + handle);
		});
		listing.Events.Register(MFiles.Event.SelectionChanged, handleListingSelectionChanged).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.SelectionChanged = " + handle);
		});

		listing.Events.Register(MFiles.Event.SelectNextFolder, handleListingSelectNextFolder).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.SelectNextFolder = " + handle);
		});
		listing.Events.Register(MFiles.Event.SelectNextObject, handleListingSelectNextObject).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.SelectNextObject = " + handle);
		});
		listing.Events.Register(MFiles.Event.SelectNextObjectFile, handleListingSelectNextObjectFile).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.SelectNextObjectFile = " + handle);
		});
		listing.Events.Register(MFiles.Event.SelectPreviousFolder, handleListingSelectPreviousFolder).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.SelectPreviousFolder = " + handle);
		});
		listing.Events.Register(MFiles.Event.SelectPreviousObject, handleListingSelectPreviousObject).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.SelectPreviousObject = " + handle);
		});

		listing.Events.Register(MFiles.Event.Started, handleListingStarted).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.Started = " + handle);
		});
		listing.Events.Register(MFiles.Event.Stop, handleListingStop).then((handle) => {
			hdlDBRefresh = handle;
			console.log("registered Listing.Stop = " + handle);
		});
	}
}