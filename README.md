# Use Cases
Small guides for how to accomplish certain tasks.

Last updated - May 11th, 2022

# Table of Contents  
1. [Logging in](#login)  
2. [Settings](#settings)  
	- [Changing Password](#password)
3. [Topics](#topics)
	- [Creating Topics](#crtopics)
	- [Editing Topics](#edtopics)
4. [Summaries](#summaries)
	- [View User Summary data](#visummaries)
	- [Downloading User Summaries Data to a CSV](#dlsummaries)
4. [Pairs](#pairs)
	- [Creating Pairs](#crpairs)
	- [Marking Pairs for deletion](#dlpairs)
	- [Unmarking Pairs for deletion](#repairs)
4. [Users](#users)
	- [Marking Users for deletion](#dlusers)
	- [Unmarking Users for deletion](#reusers)
	

<a name="login"/>

## Logging in
This use case will detail how to login to the dashboard

1. Navigate to mentorsapp.cs.wwu.edu/dash.
2. Enter your administration login credentials then click the login button.
2b. If you have forgotten your credentials, click the blue text saying 'No Problem' and follow the provided steps.

<a name="settings"/>

<a name="password"/>

## Changing Password
This use case will detail how to change your admin password.

1)  Login to the dashboard.
2)  Navigate to the Settings page: At the left bar, select Home -> Settings.
3)  Enter your current password.
4)  Enter your new password in both 'New Password' and 'Confirm Password'.
5)  Click the 'Submit' button.

<a name="topics"/>

<a name="crtopics"/>

## Creating Topics
This use case will detail how to create new topics.

1)  Login to the dashboard.
2)  Navigate to the Topics page: At the left bar, select Home -> Topics.
3)  Click the 'Add New Topic' button at the top right.
4)  Enter the new topics title, description and due date.
4a) Optionally mark the topic as active or archived.
4b) Optionally notify all users that a new topic was created.
5)  Click the 'Update' button at the bottom right to finalize creating the topic.
5b) todo - The topic will not be immediately shown, refresh the page to show the topic.

<a name="edtopics"/>

## Editing Topics
This use case will detail how to edit topics.

1)  Login to the dashboard.
2)  Navigate to the Topics page: At the left bar, select Home -> Topics.
3)  Click the 'Edit' button next to the topic you wish to update.
4)  Edit the topics title, description and/or due date.
4a) Optionally mark the topic as active or archived.
4b) Optionally notify all users that a topic was edited.
5)  Click the 'Update' button at the bottom right to finalize editing the topic.
5b) todo - The edits will not be immediately shown, refresh the page to show the edits.

<a name="summaries"/>

<a name="visummaries"/>

## View User Summary data
Guide on how to use the Summaries page to view user summary data

1. Login to the dashboard.
2. Navigate to the summaries page from the home tab.
3. View Summary Data.
   - Click on the 'View Summary' button on the bottom right corner of an individual summary to view more details about a specific summary.
      - Click the 'Back' button on the bottom right hand of the viewed summary to return to the 'all summaries' view.
   - Click on the 'Filter by' Drop down menu and select a sorting option to sort by newest or oldest submitted summaries.
   - Click on the Search bar and type in the name of a user or a keyword from the summary title, topic, or summary body.

<a name="dlsummaries"/>

## Downloading User Summaries Data to a CSV
This use case details how to download all summary data collected from users using the Summaries page.

1. Login to the dashboard.
2. Navigate to the Summaries page from the home tab.
3. Click the 'Download All' button in the top right hand corner of the page.
4. Enter a name for the CSV file.
	- Optionally, navigate to the location you would like the file to be saved.
5. Press the 'Save' button to save your csv file.

<a name="pairs"/>

<a name="crpairs"/>

## Creating Pairs
This use case will detail how to create new pairs.

1)  Login to the dashboard.
2)  Navigate to the Pairs page: At the left bar, select Students -> Pairs.
3)  Click the 'Pair Creation' button at the top right.
4)  Choose a mentor/mentee by clicking the a user's corresponding Mentor/Mentee button to select a user for the chosen position.
4a) Optionally use the search bar to find specific users.
5)  Click the 'Create New Pair' button at the top right to finalize creating the pair.

<a name="dlpairs"/>

## Marking Pairs for deletion
This use case will detail how to mark one or more pairs for deletion.
- These steps WILL NOT delete pairs, this will only mark selected pairs as Type 2.
- Type 0 pairs are active users that are not marked for deletion.
- Type 2 pairs are users that have been marked for deletion.
- Pairs will be deleted 30 days after being marked for deletion (UNIMPLEMENTED).
- Alternatively, follow the 'Deleting Pairs using MYSQL' use case in MentoringAPI's Readme to manually delete pairs.

1)  Login to the dashboard.
2)  Navigate to the Pairs page: At the left bar, select Students -> Pairs.
3)  Click the 'Select For Deletion' button to select this pair for deletion. Many pairs may be selected at once for deletion.
4)  Click the 'Confirm Changes' Button at the top bar.
5)  Review the amount of pairs selected for deletion, then enter your credentials and click the 'Confirm' button.
- Pairs can be selected for deletion and restore at the same time.

<a name="repairs"/>

## Unmarking Pairs for deletion
This use case will detail how to mark one or more pairs for restore.

1)  Login to the dashboard.
2)  Navigate to the Pairs page: At the left bar, select Students -> Pairs.
3)  Click the 'Select For Restore' button to select this pair for restore. Many pairs may be selected at once for a restore.
4)  Click the 'Confirm Changes' Button at the top bar.
5)  Review the amount of pairs selected for restore, then enter your credentials and click the 'Confirm' button.
NOTE 1: Pairs can be selected for deletion and restore at the same time.

<a name="users"/>

<a name="dlusers"/>

## Marking Users for deletion
This use case will detail how to a user for deletion.
- These steps WILL NOT delete users.
- Users will be deleted 30 days after being marked for deletion (UNIMPLEMENTED).
- Alternatively, follow the 'Deleting Users using MYSQL' use case in MentoringAPI's Readme to manually delete users (UNIMPLEMENTED).

1)  Login to the dashboard.
2)  Navigate to the Users page: At the left bar, select Students -> Users.
3)  Click the 'View' button on the user you wish to mark for deletion.
4)  Click the 'Mark User for Deletion' button at the top right.
5)  Enter your password and click the 'Confirm' button to finish marking the pair for deletion.

<a name="reusers"/>

## Unmarking Users for deletion
This use case will detail how to unmark a user for deletion.

1)  Login to the dashboard.
2)  Navigate to the Users page: At the left bar, select Students -> Users.
3)  Click the 'View' button on the user you wish to unmark for deletion.
4)  Click the 'Unmark User for Deletion' button at the top right.
5)  Enter your password and click the 'Confirm' button to finish unmarking the pair for deletion.
