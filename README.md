# Use Cases
Small guides for how to accomplish certain tasks.

## View User Summary data
Guide on how to use the Summaries page to view user summary data

1. Login to the dashboard
2. Navigate to the summaries page from the home tab
3. View Summary Data
   - Click on the 'View Summary' button on the bottom right corner of an individual summary to view more details about a specific summary.
      - Click the 'Back' button on the bottom right hand of the viewed summary to return to the 'all summaries' view.
   - Click on the 'Filter by' Drop down menu and select a sorting option to sort by newest or oldest submitted summaries.
   - Click on the Search bar and type in the name of a user or a keyword from the summary title, topic, or summary body.

## Downloading User Summaries Data to a CSV
This use case details how to download all summary data collected from users using the Summaries page of the dashboard.

1. Login to the dashboard.
2. Navigate to the Summaries page from the home tab.
3. Click the 'Download All' button in the top right hand corner of the page.
4. Enter a name for the CSV file.
	- Optionally, Navigate to the location you would like the file to be saved.
5. Press the 'Save' button to save your csv file.

## Creating pairs using the Dashboard.
This use case will detail how to create new pairs using the Dashboard.

1)  Login to the dashboard which is located at (TODO).
2)  Navigate to the pairs page: At the left bar, select User Management -> Pairs.
3)  Click the 'Pair Creation' button at the top right to switch to the pair creation page.
4)  Choose a mentor/mentee by clicking the a user's corresponding Mentor/Mentee button to select a user for the chosen position.
4a) Optionally use the search bar to find specific users.
5)  Click the 'Create New Pair' button at the top right to finalize creating the pair.

## Marking pairs for deletion using the Dashboard
This use case will detail how to mark one or more pairs for deletion.
NOTE 1: These steps WILL NOT delete pairs, this will only mark selected pairs as Type 2.
	Type 0 pairs are active users that are not marked for deletion.
	Type 2 pairs are users that have been marked for deletion.
	Pairs will be deleted 30 days after being marked for deletion (UNIMPLEMENTED).
	Alternatively, follow the 'Deleting Pairs using MYSQL' use case in MentoringAPI's Readme to manually delete pairs.

1)  Login to the dashboard which is located at (TODO).
2)  Navigate to the pairs page: At the left bar, select User Management -> Pairs.
3)  Click the 'Select For Deletion' button to select this pair for deletion. Many pairs may be selected at once for deletion.
4)  Click the 'Confirm Changes' Button at the top bar.
5)  Review the amount of pairs selected for deletion, then enter your credentials and click the 'Confirm' button.
NOTE 2: Pairs can be selected for deletion and restore at the same time

## Unmarking pairs for deletion using the Dashboard
This use case will detail how to mark one or more pairs for restore.

1)  Login to the dashboard which is located at (TODO).
2)  Navigate to the pairs page: At the left bar, select User Management -> Pairs.
3)  Click the 'Select For Restore' button to select this pair for restore. Many pairs may be selected at once for a restore.
4)  Click the 'Confirm Changes' Button at the top bar.
5)  Review the amount of pairs selected for restore, then enter your credentials and click the 'Confirm' button.
NOTE 1: Pairs can be selected for deletion and restore at the same time
